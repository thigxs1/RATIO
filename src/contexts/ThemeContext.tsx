import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colorHex: string;
  setTheme: (theme: Theme) => Promise<void>;
  setColorHex: (hex: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [colorHex, setColorHexState] = useState<string>('#0ea5e9');

  useEffect(() => {
    // Load preference from DB when auth changes
    const fetchPreferences = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('theme, color_hex')
          .eq('id', session.user.id)
          .single();
        
        if (data) {
          if (data.theme) setThemeState(data.theme as Theme);
          if (data.color_hex) setColorHexState(data.color_hex);
        }
      }
    };
    
    fetchPreferences();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchPreferences();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Apply Dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply Brand Color (simplistic approach: setting base 500 color)
    // In a real advanced setup we'd generate the 50-950 scale using color-mix or similar
    document.documentElement.style.setProperty('--brand-500', colorHex);
  }, [theme, colorHex]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from('profiles').update({ theme: newTheme }).eq('id', session.user.id);
    }
  };

  const setColorHex = async (newHex: string) => {
    setColorHexState(newHex);
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from('profiles').update({ color_hex: newHex }).eq('id', session.user.id);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colorHex, setTheme, setColorHex }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
