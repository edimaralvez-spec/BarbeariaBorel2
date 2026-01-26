
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
            <div>
              <h1 className="text-2xl font-display font-bold text-[#D4AF37]">Barbearia Borel</h1>
              {title && <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1 font-semibold">{title}</p>}
            </div>
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-black">
              <span className="text-[#D4AF37] font-bold">B</span>
            </div>
          </div>
        </header>
      )}
      
      <main className={`flex-grow ${hideHeader ? '' : 'p-5'} pb-24`}>
        {children}
      </main>

      <footer className="p-8 text-center border-t border-white/5 bg-[#0C0C0C]">
        <h3 className="font-display text-[#D4AF37] mb-2">Barbearia Borel</h3>
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-4">Desde 2024 • O melhor corte da região</p>
        <div className="text-[10px] text-neutral-500 space-y-1">
          <p>&copy; 2024 Barbearia Borel - Todos os direitos reservados</p>
          <p>Desenvolvido para Excelência</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
