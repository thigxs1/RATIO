import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { profile, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!profile?.is_admin) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <h1 className="text-3xl font-bold text-brand-500">Painel Admin Global</h1>
      <p className="text-slate-400 mt-2">Visão geral do sistema RATIO</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400">Total de Usuários</h3>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400">Total de Grupos</h3>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400">Volume Transacionado</h3>
          <p className="text-4xl font-bold mt-2 text-emerald-500">R$ 0,00</p>
        </div>
      </div>
    </div>
  );
}
