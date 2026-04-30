import { Plus, Users as UsersIcon, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useQuery } from '@tanstack/react-query';

export default function Groups() {
  const { user } = useAuth();

  const { data: groups, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          group_members!inner(user_id)
        `)
        .eq('group_members.user_id', user?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Meus Grupos</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerencie seus rateios</p>
        </div>
        <button className="w-12 h-12 bg-brand-500 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <Plus size={24} />
        </button>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : groups && groups.length > 0 ? (
        <div className="space-y-4">
          {groups.map((group: any) => (
            <div key={group.id} className="card p-5 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="w-14 h-14 bg-brand-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-600">
                <UsersIcon size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{group.name}</h3>
                <p className="text-sm text-slate-500">{group.description || 'Sem descrição'}</p>
              </div>
              <ChevronRight className="text-slate-300" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600">
             <UsersIcon size={48} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Nenhum grupo ainda</h3>
            <p className="text-slate-500 max-w-[200px] mx-auto text-sm">Crie seu primeiro grupo para começar a dividir gastos!</p>
          </div>
          <button className="btn-primary py-3 px-8 shadow-xl">
            Criar Primeiro Grupo
          </button>
        </div>
      )}
    </div>
  );
}
