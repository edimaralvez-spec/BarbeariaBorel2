
import React from 'react';
import { COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto shadow-2xl shadow-black bg-[#0C0C0C]/80 backdrop-blur-sm relative border-x border-white/5">
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
      
      <main className="flex-grow p-5 pb-24">
        {children}
      </main>

      <footer className="p-4 text-center text-[10px] text-neutral-600 border-t border-white/5 bg-[#0C0C0C]">
        &copy; 2024 Barbearia Borel - Gestão & Agendamento
      </footer>
    </div>
  );
};

export default Layout;
