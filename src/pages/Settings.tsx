
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut } from 'lucide-react';

export default function Settings() {
  const { profile, signOut } = useAuth();
  const { theme, colorHex, setTheme, setColorHex } = useTheme();

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Ajustes</h1>
        <p className="text-slate-500 dark:text-slate-400">Personalize sua experiência</p>
      </header>
      
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h2 className="font-bold text-slate-700 dark:text-slate-200">Seu Perfil</h2>
        </div>
        <div className="p-6 flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 bg-gradient-to-tr from-brand-500 to-brand-300 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg group-active:scale-95 transition-transform">
               {profile?.avatar_url ? (
                 <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-white text-2xl font-black">{profile?.full_name?.[0] || '?'}</span>
               )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-[10px] shadow-sm">
              ✨
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-xl">{profile?.full_name || 'Usuário Ratio'}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg inline-block">
              {profile?.status || 'Sem status definido'}
            </p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h2 className="font-bold text-slate-700 dark:text-slate-200">Aparência</h2>
        </div>
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold block">Modo Escuro</span>
              <span className="text-xs text-slate-500">Visual mais confortável à noite</span>
            </div>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${theme === 'dark' ? 'bg-brand-500' : 'bg-slate-200'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <span className="font-semibold block">Cor de Destaque</span>
              <span className="text-xs text-slate-500">Sua cor favorita em todo o app</span>
            </div>
            <div className="flex justify-between">
               {['#0ea5e9', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b'].map(color => (
                 <button 
                   key={color}
                   onClick={() => setColorHex(color)}
                   className={`w-10 h-10 rounded-2xl border-4 transition-all active:scale-90 ${colorHex === color ? 'border-brand-500 shadow-xl' : 'border-transparent opacity-50 hover:opacity-100'}`}
                   style={{ backgroundColor: color }}
                 />
               ))}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={signOut}
        className="w-full flex items-center justify-center gap-3 p-4 text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/10 dark:hover:bg-rose-900/20 rounded-2xl font-extrabold transition-all active:scale-[0.98]"
      >
        <LogOut size={22} />
        Sair da Conta
      </button>

      <div className="text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Ratio v1.0.0 (Beta)</p>
      </div>
    </div>
  );
}
