
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BookingFlow from './components/BookingFlow';
import AdminPanel from './components/AdminPanel';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'client' | 'admin' | 'success'>('client');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'borel123') { // Senha retornada para borel123
      setIsAdminLoggedIn(true);
      setView('admin');
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Senha incorreta!');
    }
  };

  const resetView = () => {
    setView('client');
    setIsAdminLoggedIn(false);
  };

  return (
    <Layout title={view === 'admin' ? 'Painel Gestão' : 'Agendamento Online'}>
      {view === 'client' && !showAdminLogin && (
        <>
          <BookingFlow onComplete={() => setView('success')} />
          <button 
            onClick={() => setShowAdminLogin(true)}
            className="fixed bottom-6 right-6 w-12 h-12 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-neutral-500 hover:text-[#D4AF37] transition-colors shadow-2xl z-40"
            title="Acesso Admin"
          >
            {ICONS.Dashboard}
          </button>
        </>
      )}

      {showAdminLogin && (
        <div className="flex flex-col items-center justify-center pt-20 space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
            <span className="text-[#D4AF37]">{ICONS.Dashboard}</span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Acesso Restrito</h3>
            <p className="text-xs text-neutral-500">Apenas para o proprietário Borel</p>
          </div>
          <form onSubmit={handleAdminLogin} className="w-full space-y-4">
            <input 
              type="password" 
              placeholder="Senha de acesso"
              className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-700 focus:border-[#D4AF37] focus:outline-none transition-all"
              autoFocus
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
            />
            <button 
              type="submit"
              className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl transition-all"
            >
              Entrar no Sistema
            </button>
            <button 
              type="button"
              onClick={() => setShowAdminLogin(false)}
              className="w-full text-neutral-500 text-xs font-bold uppercase tracking-widest"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {view === 'admin' && isAdminLoggedIn && (
        <AdminPanel onLogout={resetView} />
      )}

      {view === 'success' && (
        <div className="flex flex-col items-center justify-center pt-20 space-y-6 text-center animate-in zoom-in-90 duration-500">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-20" />
            <div className="text-green-500 scale-150">
              {ICONS.Check}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold text-white">Tudo Pronto!</h2>
            <p className="text-neutral-400 max-w-[250px] mx-auto">Seu agendamento foi confirmado. Enviamos os detalhes para o Borel e ele já está te esperando!</p>
          </div>
          <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 w-full">
            <p className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest mb-4">O que acontece agora?</p>
            <ul className="text-left text-xs space-y-3 text-neutral-400">
              <li className="flex gap-2">
                <span className="text-[#D4AF37]">•</span> O barbeiro recebeu sua notificação.
              </li>
              <li className="flex gap-2">
                <span className="text-[#D4AF37]">•</span> Você receberá um lembrete no WhatsApp.
              </li>
              <li className="flex gap-2">
                <span className="text-[#D4AF37]">•</span> Chegue com 5 minutos de antecedência.
              </li>
            </ul>
          </div>
          <button 
            onClick={() => setView('client')}
            className="w-full border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/5 transition-all"
          >
            Fazer outro agendamento
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
