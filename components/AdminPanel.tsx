
import React, { useState, useMemo } from 'react';
import { storageService } from '../services/storageService';
import { ICONS, SERVICES, BARBERS } from '../constants';
import { Appointment } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [filter, setFilter] = useState<'hoje' | 'semana' | 'mes'>('hoje');
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

  // Data for Chart: Group by service
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
        <p className="text-xs font-bold mb-4 flex items-center gap-2 text-neutral-400">
          {ICONS.Reports} DISTRIBUIÇÃO POR SERVIÇO
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
        <h3 className="text-sm font-bold text-neutral-400 uppercase">Lista de Agendamentos</h3>
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
  );
};

export default AdminPanel;
