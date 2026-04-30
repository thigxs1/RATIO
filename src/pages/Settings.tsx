import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut } from 'lucide-react';

export default function Settings() {
  const { profile, signOut } = useAuth();
  const { theme, colorHex, setTheme, setColorHex } = useTheme();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Ajustes</h1>
      
      <div className="card p-4 space-y-4">
        <h2 className="font-semibold text-lg">Perfil</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
             {profile?.avatar_url ? (
               <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <span className="text-slate-500 font-bold">Foto</span>
             )}
          </div>
          <div>
            <p className="font-bold">{profile?.full_name || 'Sem nome'}</p>
            <p className="text-sm text-slate-500">{profile?.status || 'Sem status'}</p>
          </div>
        </div>
        <p className="text-xs text-brand-600 font-medium cursor-pointer">Editar Perfil (Em breve)</p>
      </div>

      <div className="card p-4 space-y-4">
        <h2 className="font-semibold text-lg">Aparência</h2>
        
        <div className="flex justify-between items-center">
          <span>Modo Escuro</span>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg"
          >
            {theme === 'dark' ? 'Ativado' : 'Desativado'}
          </button>
        </div>

        <div className="space-y-2">
          <span>Cor Principal</span>
          <div className="flex gap-2">
             {['#0ea5e9', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b'].map(color => (
               <button 
                 key={color}
                 onClick={() => setColorHex(color)}
                 className={`w-8 h-8 rounded-full border-2 ${colorHex === color ? 'border-slate-900 dark:border-white' : 'border-transparent'}`}
                 style={{ backgroundColor: color }}
               />
             ))}
          </div>
        </div>
      </div>

      <button 
        onClick={signOut}
        className="w-full flex items-center justify-center gap-2 p-3 text-rose-600 bg-rose-50 dark:bg-rose-900/20 rounded-xl font-bold"
      >
        <LogOut size={20} />
        Sair da Conta
      </button>
    </div>
  );
}
