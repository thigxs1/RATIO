import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { Home, Users, Receipt, Settings as SettingsIcon, Plus } from 'lucide-react'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Groups from './pages/Groups'
import Expenses from './pages/Expenses'
import Settings from './pages/Settings'
import AdminDashboard from './pages/AdminDashboard'

function Dashboard() {
  const { profile } = useAuth();
  
  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Olá, {profile?.full_name?.split(' ')[0] || 'Visitante'}! 👋</h1>
          <p className="text-slate-500">Aqui está o seu resumo de hoje.</p>
        </div>
        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center border-2 border-brand-500 overflow-hidden">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-brand-700 font-bold">{profile?.full_name?.[0] || 'U'}</span>
          )}
        </div>
      </header>

      {/* Cards de Saldo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800">
          <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">A receber</p>
          <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">R$ 150,00</p>
        </div>
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800">
          <p className="text-rose-700 dark:text-rose-400 text-sm font-medium">A pagar</p>
          <p className="text-2xl font-bold text-rose-800 dark:text-rose-300">R$ 85,90</p>
        </div>
      </div>

      {/* Grupos Recentes */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Seus Grupos</h2>
          <button className="text-brand-600 text-sm font-semibold">Ver todos</button>
        </div>
        <div className="space-y-3">
          {['Viagem Praia', 'Churrasco de Domingo', 'Apartamento'].map((group) => (
            <div key={group} className="card p-4 flex items-center gap-4 active:bg-slate-50 dark:active:bg-slate-700 cursor-pointer">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                <Users className="text-slate-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{group}</h3>
                <p className="text-xs text-slate-500">Último gasto: há 2 horas</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">R$ 450,00</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botão Flutuante (Add Gasto) */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-brand-500 text-white rounded-full shadow-lg shadow-brand-200 dark:shadow-none flex items-center justify-center active:scale-90 transition-transform z-10">
        <Plus size={28} />
      </button>
    </div>
  )
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

function App() {
  const location = useLocation();
  const hideNavRoutes = ['/login', '/admin'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen relative shadow-2xl shadow-slate-200 dark:shadow-none pb-24">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/groups" element={<PrivateRoute><Groups /></PrivateRoute>} />
          <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Routes>

        {showNav && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-8 py-4 flex justify-between items-center z-50 rounded-t-3xl">
            <Link to="/" className={`flex flex-col items-center gap-1.5 transition-colors ${location.pathname === '/' ? 'text-brand-500' : 'text-slate-400'}`}>
              <Home size={24} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Início</span>
            </Link>
            <Link to="/groups" className={`flex flex-col items-center gap-1.5 transition-colors ${location.pathname === '/groups' ? 'text-brand-500' : 'text-slate-400'}`}>
              <Users size={24} strokeWidth={location.pathname === '/groups' ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Grupos</span>
            </Link>
            <Link to="/expenses" className={`flex flex-col items-center gap-1.5 transition-colors ${location.pathname === '/expenses' ? 'text-brand-500' : 'text-slate-400'}`}>
              <Receipt size={24} strokeWidth={location.pathname === '/expenses' ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Gastos</span>
            </Link>
            <Link to="/settings" className={`flex flex-col items-center gap-1.5 transition-colors ${location.pathname === '/settings' ? 'text-brand-500' : 'text-slate-400'}`}>
              <SettingsIcon size={24} strokeWidth={location.pathname === '/settings' ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Ajustes</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  )
}

export default App
