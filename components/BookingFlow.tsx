
import React, { useState } from 'react';
import { SERVICES, BARBERS, ICONS } from '../constants';
import { Appointment, Service, Barber } from '../types';
import { storageService } from '../services/storageService';
import { whatsappService } from '../services/whatsappService';

const BookingFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: '',
    barberId: '',
    date: '',
    time: ''
  });

  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleBooking = async () => {
    setLoading(true);
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clientId: 'temp-user',
      clientName: formData.name,
      clientPhone: formData.phone,
      serviceId: formData.serviceId,
      barberId: formData.barberId,
      date: formData.date,
      time: formData.time,
      status: 'confirmado',
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    storageService.saveAppointment(newAppointment);

    // Simulated API call delay
    await new Promise(r => setTimeout(r, 1500));
    
    // WhatsApp notifications (Simulated by opening link)
    whatsappService.sendNewBookingNotification(newAppointment);
    
    setLoading(false);
    onComplete();
  };

  const selectedService = SERVICES.find(s => s.id === formData.serviceId);
  const selectedBarber = BARBERS.find(b => b.id === formData.barberId);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map(s => (
          <div 
            key={s} 
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
          />
        ))}
      </div>

      {/* Step 1: Identification */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-white">Olá! Vamos começar?</h2>
            <p className="text-neutral-500 text-sm">Insira seus dados para agendar seu horário.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Como deseja ser chamado?"
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-700 focus:border-[#D4AF37] focus:outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">WhatsApp</label>
              <input 
                type="tel" 
                placeholder="(00) 00000-0000"
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-700 focus:border-[#D4AF37] focus:outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <button 
            disabled={!formData.name || !formData.phone}
            onClick={nextStep}
            className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#B8962E] disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-[#D4AF37]/20"
          >
            Escolher Serviço {ICONS.ChevronRight}
          </button>
        </div>
      )}

      {/* Step 2: Service Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-white">O que vamos fazer hoje?</h2>
            <p className="text-neutral-500 text-sm">Selecione o serviço desejado.</p>
          </div>
          <div className="space-y-3">
            {SERVICES.map(service => (
              <button
                key={service.id}
                onClick={() => {
                  setFormData({...formData, serviceId: service.id});
                  nextStep();
                }}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  formData.serviceId === service.id 
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' 
                  : 'border-white/5 bg-[#121212] hover:border-white/20'
                }`}
              >
                <div className="text-left">
                  <p className={`font-bold ${formData.serviceId === service.id ? 'text-[#D4AF37]' : 'text-white'}`}>{service.name}</p>
                  <p className="text-xs text-neutral-500">{service.duration} min</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">R$ {service.price}</p>
                </div>
              </button>
            ))}
          </div>
          <button onClick={prevStep} className="w-full text-neutral-500 text-xs font-bold py-2 uppercase tracking-widest">Voltar</button>
        </div>
      )}

      {/* Step 3: Barber Selection */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-white">Quem vai te atender?</h2>
            <p className="text-neutral-500 text-sm">Nossos profissionais especialistas.</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {BARBERS.map(barber => (
              <button
                key={barber.id}
                onClick={() => {
                  setFormData({...formData, barberId: barber.id});
                  nextStep();
                }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  formData.barberId === barber.id 
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' 
                  : 'border-white/5 bg-[#121212] hover:border-white/20'
                }`}
              >
                <img src={barber.avatar} alt={barber.name} className="w-12 h-12 rounded-full border border-white/10" />
                <div className="text-left">
                  <p className={`font-bold ${formData.barberId === barber.id ? 'text-[#D4AF37]' : 'text-white'}`}>{barber.name}</p>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">{barber.specialty}</p>
                </div>
              </button>
            ))}
          </div>
          <button onClick={prevStep} className="w-full text-neutral-500 text-xs font-bold py-2 uppercase tracking-widest">Voltar</button>
        </div>
      )}

      {/* Step 4: Date and Time */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-white">Qual o melhor horário?</h2>
            <p className="text-neutral-500 text-sm">Confirme o dia e a hora.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Data</label>
              <input 
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] focus:outline-none"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Horário</label>
              <div className="grid grid-cols-4 gap-2">
                {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                  <button
                    key={t}
                    onClick={() => setFormData({...formData, time: t})}
                    className={`py-3 rounded-lg text-xs font-bold transition-all border ${
                      formData.time === t ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-[#121212] text-neutral-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 mt-4">
            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Resumo do Agendamento</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Serviço:</span>
                <span className="text-white font-semibold">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Barbeiro:</span>
                <span className="text-white font-semibold">{selectedBarber?.name}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                <span className="text-[#D4AF37] font-bold">Total:</span>
                <span className="text-[#D4AF37] font-bold">R$ {selectedService?.price}</span>
              </div>
            </div>
          </div>

          <button 
            disabled={!formData.date || !formData.time || loading}
            onClick={handleBooking}
            className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#B8962E] disabled:opacity-50 transition-all shadow-lg shadow-[#D4AF37]/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Confirmar Agendamento {ICONS.Check}</>
            )}
          </button>
          <button onClick={prevStep} className="w-full text-neutral-500 text-xs font-bold py-2 uppercase tracking-widest">Voltar</button>
        </div>
      )}

    </div>
  );
};

export default BookingFlow;
