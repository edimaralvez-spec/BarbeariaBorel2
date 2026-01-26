
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  hideHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, hideHeader }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto shadow-2xl shadow-black bg-[#0C0C0C]/90 backdrop-blur-md relative border-x border-white/5 ring-1 ring-white/5">
      {!hideHeader && (
        <header className="p-6 border-b border-white/5 bg-[#121212]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-display logo-style text-premium-gold">
                Barbearia Borel
              </h1>
              <span className="sub-logo mt-1">ESTILO & TRADIÇÃO</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-black shadow-inner">
              <span className="text-[#D4AF37] font-display font-black text-xl italic">B</span>
            </div>
          </div>
          {title && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.3em]">
                {title}
              </p>
            </div>
          )}
        </header>
      )}
      
      <main className={`flex-grow ${hideHeader ? '' : 'p-5'} pb-24`}>
        {children}
      </main>

      <footer className="p-10 text-center border-t border-white/5 bg-[#0C0C0C]">
        <div className="mb-6">
          <h3 className="font-display text-2xl text-premium-gold logo-style mb-1">Barbearia Borel</h3>
          <div className="h-px w-12 bg-[#D4AF37]/30 mx-auto"></div>
        </div>
        <p className="text-[10px] text-neutral-600 uppercase tracking-[0.4em] mb-6">Excelência em cada detalhe</p>
        <div className="text-[10px] text-neutral-500 space-y-1">
          <p>&copy; 2024 Barbearia Borel - Todos os direitos reservados</p>
          <p className="opacity-50">Premium Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
