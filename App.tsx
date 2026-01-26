
import React, { useState } from 'react';
import Layout from './components/Layout';
import BookingFlow from './components/BookingFlow';
import AdminPanel from './components/AdminPanel';
import { ICONS, SERVICES, BUSINESS_INFO } from './constants';

const LandingPage: React.FC<{ onStartBooking: () => void }> = ({ onStartBooking }) => (
  <div className="animate-in fade-in duration-700">
    {/* Hero Section */}
    <div className="relative h-[400px] flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      <div className="relative z-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#D4AF37] drop-shadow-lg">Barbearia Borel</h1>
        <p className="text-neutral-300 max-w-xs mx-auto text-sm font-medium tracking-wide">Transformando estilo em confiança com a arte da barbearia clássica.</p>
        <button 
          onClick={onStartBooking}
          className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#B8962E] transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-95"
        >
          Agendar seu Horário
        </button>
      </div>
    </div>

    <div className="p-6 space-y-12">
      {/* Services Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.3em] mb-2">Nossos Serviços</h2>
          <p className="text-xl font-display font-bold text-white">Excelência em cada detalhe</p>
        </div>
        <div className="grid gap-3">
          {SERVICES.slice(0, 3).map(service => (
            <div key={service.id} className="bg-[#121212] p-4 rounded-xl border border-white/5 flex justify-between items-center group hover:border-[#D4AF37]/30 transition-all">
              <div>
                <h4 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">{service.name}</h4>
                <p className="text-xs text-neutral-500">{service.duration} minutos de cuidado</p>
              </div>
              <span className="font-bold text-[#D4AF37]">R$ {service.price}</span>
            </div>
          ))}
          <button onClick={onStartBooking} className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest pt-2 hover:underline">Ver tabela completa</button>
        </div>
      </section>

      {/* Location/Info Section */}
      <section className="bg-[#121212] p-6 rounded-3xl border border-white/5 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
            {ICONS.MapPin}
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Localização</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">{BUSINESS_INFO.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
            {ICONS.Clock}
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Horário de Funcionamento</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">{BUSINESS_INFO.hours}</p>
          </div>
        </div>
        <div className="flex gap-4 pt-2">
          <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
            {ICONS.Instagram} Instagram
          </a>
          <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
            {ICONS.WhatsApp} WhatsApp
          </a>
        </div>
      </section>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'booking' | 'admin' | 'success'>('landing');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'borel123') {
      setIsAdminLoggedIn(true);
      setView('admin');
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Senha incorreta!');
    }
  };

  const resetView = () => {
    setView('landing');
    setIsAdminLoggedIn(false);
  };

  return (
    <Layout 
      hideHeader={view === 'landing'} 
      title={view === 'admin' ? 'Painel Gestão' : 'Agendamento Online'}
    >
      {view === 'landing' && (
        <LandingPage onStartBooking={() => setView('booking')} />
      )}

      {view === 'booking' && (
        <div className="animate-in slide-in-from-right duration-500">
           <button 
            onClick={() => setView('landing')}
            className="mb-6 flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            ← Voltar ao Início
          </button>
          <BookingFlow onComplete={() => setView('success')} />
        </div>
      )}

      {showAdminLogin && (
        <div className="flex flex-col items-center justify-center pt-20 space-y-6 animate-in zoom-in-95 duration-300 p-6">
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
            {ICONS.Dashboard}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Acesso Administrativo</h3>
            <p className="text-xs text-neutral-500">Exclusivo para o Borel</p>
          </div>
          <form onSubmit={handleAdminLogin} className="w-full space-y-4">
            <input 
              type="password" 
              placeholder="Digite a senha"
              className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-700 focus:border-[#D4AF37] focus:outline-none transition-all"
              autoFocus
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl shadow-lg shadow-[#D4AF37]/20 transition-all active:scale-95">
              Entrar
            </button>
            <button type="button" onClick={() => setShowAdminLogin(false)} className="w-full text-neutral-500 text-xs font-bold uppercase py-2">
              Cancelar
            </button>
          </form>
        </div>
      )}

      {view === 'admin' && isAdminLoggedIn && (
        <div className="p-2">
          <AdminPanel onLogout={resetView} />
        </div>
      )}

      {view === 'success' && (
        <div className="flex flex-col items-center justify-center pt-20 space-y-6 text-center animate-in zoom-in-90 duration-500 px-4">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-20" />
            <div className="text-green-500 scale-150">{ICONS.Check}</div>
          </div>
          <h2 className="text-3xl font-display font-bold text-white">Agendado!</h2>
          <p className="text-neutral-400 text-sm max-w-[250px]">O Borel já recebeu sua reserva e está te aguardando. Um lembrete será enviado em breve!</p>
          <button 
            onClick={() => setView('landing')}
            className="w-full border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/5 transition-all mt-4"
          >
            Voltar para o Site
          </button>
        </div>
      )}

      {/* Floating Admin Button */}
      {view === 'landing' && (
        <button 
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-6 right-6 w-10 h-10 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-neutral-700 hover:text-[#D4AF37] transition-all z-40"
        >
          {ICONS.Dashboard}
        </button>
      )}
    </Layout>
  );
};

export default App;
