
import React, { useState, useMemo } from 'react';
import { storageService } from '../services/storageService';
import { ICONS, SERVICES, BARBERS } from '../constants';
import { Appointment } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ClientSummary {
  name: string;
  phone: string;
  totalAppointments: number;
  lastVisit: string;
  totalSpent: number;
  history: Appointment[];
}

const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clientes'>('dashboard');
  const [filter, setFilter] = useState<'hoje' | 'semana' | 'mes'>('hoje');
  const [selectedClient, setSelectedClient] = useState<ClientSummary | null>(null);
  
  const appointments = storageService.getAppointments();

  const filteredAppointments = useMemo(() => {
    const now = new Date();
    return appointments.filter(app => {
      const appDate = new Date(app.date);
      if (filter === 'hoje') {
        return appDate.toDateString() === now.toDateString();
      } else if (filter === 'semana') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return appDate >= weekAgo;
      } else {
        return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
      }
    }).sort((a, b) => (a.time > b.time ? 1 : -1));
  }, [appointments, filter]);

  const stats = useMemo(() => {
    const total = filteredAppointments.length;
    const revenue = filteredAppointments.reduce((acc, app) => {
      const service = SERVICES.find(s => s.id === app.serviceId);
      return acc + (service?.price || 0);
    }, 0);
    return { total, revenue };
  }, [filteredAppointments]);

  const clientsList = useMemo(() => {
    const clientsMap = new Map<string, ClientSummary>();
    
    appointments.forEach(app => {
      const key = app.clientPhone.replace(/\D/g, '');
      const service = SERVICES.find(s => s.id === app.serviceId);
      const price = service?.price || 0;
      
      if (!clientsMap.has(key)) {
        clientsMap.set(key, {
          name: app.clientName,
          phone: app.clientPhone,
          totalAppointments: 1,
          lastVisit: app.date,
          totalSpent: price,
          history: [app]
        });
      } else {
        const existing = clientsMap.get(key)!;
        existing.totalAppointments += 1;
        existing.totalSpent += price;
        existing.history.push(app);
        if (new Date(app.date) > new Date(existing.lastVisit)) {
          existing.lastVisit = app.date;
        }
      }
    });
    
    return Array.from(clientsMap.values()).sort((a, b) => b.totalAppointments - a.totalAppointments);
  }, [appointments]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredAppointments.forEach(app => {
      const service = SERVICES.find(s => s.id === app.serviceId);
      const name = service?.name || 'Outro';
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredAppointments]);

  const COLORS_CHART = ['#D4AF37', '#A6892C', '#7F671E', '#5E4D16', '#3D320E'];

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanPhone}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {ICONS.Dashboard} Painel Administrativo
        </h2>
        <button 
          onClick={onLogout}
          className="text-red-500 p-2 hover:bg-red-500/10 rounded-full transition-colors"
        >
          {ICONS.Logout}
        </button>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-white/5">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'dashboard' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-neutral-500'}`}
        >
          Resumo
        </button>
        <button 
          onClick={() => setActiveTab('clientes')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'clientes' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-neutral-500'}`}
        >
          Clientes
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
              <p className="text-xs text-neutral-400 uppercase tracking-tighter">Agendamentos</p>
              <p className="text-2xl font-bold text-[#D4AF37]">{stats.total}</p>
            </div>
            <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
              <p className="text-xs text-neutral-400 uppercase tracking-tighter">Receita Estimada</p>
              <p className="text-2xl font-bold text-green-500">R$ {stats.revenue}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 p-1 bg-black/40 rounded-lg">
            {(['hoje', 'semana', 'mes'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all uppercase ${
                  filter === f ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-neutral-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 h-64">
            <p className="text-xs font-bold mb-4 flex items-center gap-2 text-neutral-400 uppercase tracking-widest">
              {ICONS.Reports} Serviços mais procurados
            </p>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_CHART[index % COLORS_CHART.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Appointment List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-neutral-400 uppercase">Agenda do Período</h3>
            {filteredAppointments.length === 0 ? (
              <div className="py-10 text-center text-neutral-600 italic">
                Nenhum agendamento para este período.
              </div>
            ) : (
              filteredAppointments.map(app => {
                const service = SERVICES.find(s => s.id === app.serviceId);
                const barber = BARBERS.find(b => b.id === app.barberId);
                return (
                  <div key={app.id} className="bg-[#121212] p-4 rounded-xl border border-white/5 group hover:border-[#D4AF37]/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-white">{app.clientName}</h4>
                        <p className="text-xs text-neutral-500">{app.clientPhone}</p>
                      </div>
                      <div className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold px-2 py-1 rounded">
                        {app.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                        <span className="text-[#D4AF37]">{ICONS.Scissors}</span>
                        {service?.name}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                        <span className="text-neutral-500">{ICONS.User}</span>
                        {barber?.name.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'clientes' && !selectedClient && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Base de Clientes</h3>
          {clientsList.length === 0 ? (
            <div className="py-20 text-center text-neutral-600 italic">
              Ainda não há clientes registrados.
            </div>
          ) : (
            clientsList.map((client, idx) => (
              <div 
                key={idx}
                className="bg-[#121212] p-4 rounded-xl border border-white/5 flex items-center justify-between hover:border-[#D4AF37]/30 transition-all cursor-pointer group"
                onClick={() => setSelectedClient(client)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">{client.name}</h4>
                    <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-tighter">
                      {client.totalAppointments} visita{client.totalAppointments > 1 ? 's' : ''} • Última em {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openWhatsApp(client.phone);
                  }}
                  className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 transition-all hover:text-white"
                >
                  {ICONS.WhatsApp}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'clientes' && selectedClient && (
        <div className="animate-in slide-in-from-right duration-300 space-y-6">
          <button 
            onClick={() => setSelectedClient(null)}
            className="flex items-center gap-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-white"
          >
            ← Voltar para a Lista
          </button>
          
          <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-2xl mx-auto">
              {selectedClient.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{selectedClient.name}</h3>
              <p className="text-sm text-neutral-500">{selectedClient.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-neutral-500 uppercase font-bold">Total Gasto</p>
                <p className="text-lg font-bold text-green-500">R$ {selectedClient.totalSpent}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-neutral-500 uppercase font-bold">Visitas</p>
                <p className="text-lg font-bold text-[#D4AF37]">{selectedClient.totalAppointments}</p>
              </div>
            </div>
            <button 
              onClick={() => openWhatsApp(selectedClient.phone)}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all"
            >
              {ICONS.WhatsApp} Entrar em contato
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Histórico de Atendimentos</h4>
            {selectedClient.history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((h, i) => {
              const service = SERVICES.find(s => s.id === h.serviceId);
              return (
                <div key={i} className="bg-[#121212] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-white">{service?.name}</p>
                    <p className="text-[10px] text-neutral-500">{new Date(h.date).toLocaleDateString('pt-BR')} às {h.time}</p>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37]">R$ {service?.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
