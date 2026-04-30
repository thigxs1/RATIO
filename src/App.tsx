import { Routes, Route, Link } from 'react-router-dom'
import { Home, Users, Receipt, Settings, Plus } from 'lucide-react'

function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Olá, Thiago! 👋</h1>
          <p className="text-slate-500">Aqui está o seu resumo de hoje.</p>
        </div>
        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center border-2 border-brand-500">
          <span className="text-brand-700 font-bold">TO</span>
        </div>
      </header>

      {/* Cards de Saldo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
          <p className="text-emerald-700 text-sm font-medium">A receber</p>
          <p className="text-2xl font-bold text-emerald-800">R$ 150,00</p>
        </div>
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
          <p className="text-rose-700 text-sm font-medium">A pagar</p>
          <p className="text-2xl font-bold text-rose-800">R$ 85,90</p>
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
            <div key={group} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <Users className="text-slate-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{group}</h3>
                <p className="text-xs text-slate-500">Último gasto: há 2 horas</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">R$ 450,00</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botão Flutuante (Add Gasto) */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-brand-600 text-white rounded-full shadow-lg shadow-brand-200 flex items-center justify-center active:scale-90 transition-transform">
        <Plus size={28} />
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen pb-24">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex flex-col items-center gap-1 text-brand-600">
          <Home size={22} />
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/groups" className="flex flex-col items-center gap-1 text-slate-400">
          <Users size={22} />
          <span className="text-[10px] font-medium">Grupos</span>
        </Link>
        <Link to="/expenses" className="flex flex-col items-center gap-1 text-slate-400">
          <Receipt size={22} />
          <span className="text-[10px] font-medium">Gastos</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center gap-1 text-slate-400">
          <Settings size={22} />
          <span className="text-[10px] font-medium">Ajustes</span>
        </Link>
      </nav>
    </div>
  )
}

export default App
