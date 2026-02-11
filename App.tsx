
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BookingFlow from './components/BookingFlow';
import AdminPanel from './components/AdminPanel';
import { storageService } from './services/storageService';
import { ICONS, SERVICES, BUSINESS_INFO, BUSINESS_PHONE } from './constants';

const LandingPage: React.FC<{ onStartBooking: () => void }> = ({ onStartBooking }) => (
  <div className="animate-in fade-in duration-1000">
    {/* Hero Section */}
    <div className="relative h-[500px] flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.5em] block animate-pulse">BEM-VINDO À</span>
          <h1 className="text-5xl md:text-6xl font-display font-black text-premium-gold logo-style py-2">
            Barbearia<br/>Borel
          </h1>
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-px w-8 bg-[#D4AF37]/40"></div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-[0.3em] font-medium">Since 2024</span>
            <div className="h-px w-8 bg-[#D4AF37]/40"></div>
          </div>
        </div>
        
        <p className="text-neutral-300 max-w-xs mx-auto text-sm font-light leading-relaxed italic">
          "Onde a tradição da tesoura encontra a sofisticação do homem moderno."
        </p>
        
        <div className="pt-4">
          <button 
            onClick={onStartBooking}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black transition-all duration-200 bg-[#D4AF37] rounded-full hover:bg-[#B8962E] active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <span className="uppercase text-xs tracking-[0.2em]">Agendar Agora</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f1d37a] to-[#d4af37] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          </button>
        </div>
      </div>
      
      {/* Indicador de Scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
      </div>
    </div>

    <div className="p-6 space-y-16">
      {/* Services Section */}
      <section className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.4em]">Experiências</h2>
          <p className="text-3xl font-display font-bold text-white italic"> Serviços</p>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-4">
          {SERVICES.slice(0, 3).map(service => (
            <div key={service.id} className="bg-[#121212] p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-[#D4AF37]/40 transition-all duration-500 hover:translate-x-1">
              <div className="space-y-1">
                <h4 className="font-bold text-white text-lg group-hover:text-premium-gold transition-colors">{service.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600 text-[10px] uppercase font-bold tracking-widest">{service.duration} MINUTOS</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-display font-bold text-premium-gold italic">R$ {service.price}</span>
              </div>
            </div>
          ))}
          <button onClick={onStartBooking} className="w-full text-center py-4 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-colors">
            Visualizar Todos os Serviços +
          </button>
        </div>
      </section>

      {/* Location/Info Section */}
      <section className="relative overflow-hidden bg-[#121212] p-8 rounded-[40px] border border-white/5 space-y-8 shadow-inner">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-black border border-[#D4AF37]/20 rounded-2xl text-[#D4AF37] shadow-lg">
              {ICONS.MapPin}
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-1">Localização</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">{BUSINESS_INFO.address}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-5">
            <div className="p-4 bg-black border border-[#D4AF37]/20 rounded-2xl text-[#D4AF37] shadow-lg">
              {ICONS.Clock}
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-1">Horário Premium</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">{BUSINESS_INFO.hours}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 relative z-10">
          <a 
            href={BUSINESS_INFO.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-4 bg-black/50 border border-white/5 rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            {ICONS.Instagram} Instagram
          </a>
          <a 
            href={`https://wa.me/${BUSINESS_PHONE}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-4 bg-black/50 border border-white/5 rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            {ICONS.WhatsApp} Contato
          </a>
        </div>
      </section>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'booking' | 'admin' | 'success'>('landing');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Garantir que o SuperAdmin exista no banco ao iniciar
  useEffect(() => {
    storageService.ensureSuperAdmin();
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    setIsLoggingIn(true);
    
    // Autenticação Real via Firebase (Usando as strings exatas para Admin / Admin123)
    const isValid = await storageService.verifyAdminCredentials(adminUser.trim(), adminPassword);

    if (isValid) {
      setIsAdminLoggedIn(true);
      setView('admin');
      setShowAdminLogin(false);
      setAdminPassword('');
      setAdminUser('');
    } else {
      setLoginError(true);
    }
    setIsLoggingIn(false);
  };

  const resetView = () => {
    setView('landing');
    setIsAdminLoggedIn(false);
  };

  return (
    <Layout 
      hideHeader={view === 'landing'} 
      title={view === 'admin' ? 'Gestão de Negócios' : 'Reserva Online'}
    >
      {view === 'landing' && (
        <LandingPage onStartBooking={() => setView('booking')} />
      )}

      {view === 'booking' && (
        <div className="animate-in slide-in-from-right duration-500 p-2">
           <button 
            onClick={() => setView('landing')}
            className="mb-8 flex items-center gap-3 text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-all"
          >
            <span className="text-lg">←</span> Voltar ao Início
          </button>
          <BookingFlow onComplete={() => setView('success')} />
        </div>
      )}

      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-3xl mx-auto flex items-center justify-center text-black shadow-2xl shadow-[#D4AF37]/20 rotate-12">
                {ICONS.Dashboard}
              </div>
              <h3 className="text-2xl font-display font-black text-premium-gold italic">Portal de Gestão</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-[0.4em] font-bold">Autenticação Cloud</p>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-[32px] p-8 shadow-2xl space-y-6">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-black text-neutral-600 tracking-widest ml-1">Usuário</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">{ICONS.User}</span>
                      <input 
                        type="text" 
                        placeholder="Nome de acesso"
                        className={`w-full bg-black/50 border ${loginError ? 'border-red-500/50' : 'border-white/5'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-800 focus:border-[#D4AF37] focus:outline-none transition-all text-sm`}
                        autoFocus
                        value={adminUser}
                        onChange={e => {
                          setAdminUser(e.target.value);
                          setLoginError(false);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-black text-neutral-600 tracking-widest ml-1">Senha de acesso</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">{ICONS.Zap}</span>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className={`w-full bg-black/50 border ${loginError ? 'border-red-500/50' : 'border-white/5'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-800 focus:border-[#D4AF37] focus:outline-none transition-all text-sm tracking-widest`}
                        value={adminPassword}
                        onChange={e => {
                          setAdminPassword(e.target.value);
                          setLoginError(false);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {loginError && (
                  <p className="text-center text-red-500 text-[9px] font-bold uppercase tracking-widest animate-bounce">
                    Acesso Negado: Dados incorretos
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={isLoggingIn || !adminUser || !adminPassword}
                  className="w-full bg-white text-black font-black py-5 rounded-2xl shadow-xl uppercase text-[10px] tracking-widest hover:bg-[#D4AF37] active:scale-95 transition-all flex items-center justify-center disabled:opacity-30 disabled:grayscale"
                >
                  {isLoggingIn ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : 'Entrar no Sistema'}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-[8px] uppercase font-black text-neutral-700 tracking-[0.3em] bg-[#121212] px-4">Segurança Borel</div>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => setShowAdminLogin(false)} 
              className="w-full text-neutral-600 text-[9px] font-bold uppercase tracking-[0.4em] py-2 hover:text-white transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}

      {view === 'admin' && isAdminLoggedIn && (
        <div className="animate-in fade-in duration-500">
          <AdminPanel onLogout={resetView} />
        </div>
      )}

      {view === 'success' && (
        <div className="flex flex-col items-center justify-center pt-24 space-y-8 text-center animate-in zoom-in-90 duration-700 px-6">
          <div className="relative">
            <div className="w-28 h-28 bg-[#D4AF37]/10 rounded-full flex items-center justify-center relative z-10 border border-[#D4AF37]/20">
              <div className="text-green-500 scale-[2.5]">{ICONS.Check}</div>
            </div>
            <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full animate-ping opacity-20"></div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-4xl font-display font-black text-premium-gold italic">Confirmado!</h2>
            <p className="text-neutral-500 text-sm font-light max-w-[280px] leading-relaxed mx-auto">
              Sua presença foi registrada em nossa agenda premium. Gerfferson já está preparando tudo para sua chegada.
            </p>
          </div>
          
          <button 
            onClick={() => setView('landing')}
            className="w-full border border-white/10 text-neutral-400 font-bold py-5 rounded-2xl hover:bg-white/5 hover:text-white transition-all mt-8 uppercase text-[10px] tracking-[0.3em]"
          >
            Retornar ao Portal
          </button>
        </div>
      )}

      {/* Botão Admin Flutuante Discreto */}
      {view === 'landing' && (
        <button 
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-8 right-8 w-12 h-12 bg-black border border-white/5 rounded-full flex items-center justify-center text-neutral-800 hover:text-[#D4AF37] transition-all duration-500 z-40 shadow-2xl group"
        >
          <div className="group-hover:rotate-12 transition-transform">{ICONS.Dashboard}</div>
        </button>
      )}
    </Layout>
  );
};

export default App;
