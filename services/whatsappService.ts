
import { Appointment, Service, Barber } from '../types';
import { SERVICES, BARBERS, BUSINESS_PHONE } from '../constants';

export const whatsappService = {
  sendNewBookingNotification: (appointment: Appointment) => {
    const service = SERVICES.find(s => s.id === appointment.serviceId);
    const barber = BARBERS.find(b => b.id === appointment.barberId);
    
    const message = `*Novo Agendamento na Barbearia Borel!*\n\n` +
      `👤 *Cliente:* ${appointment.clientName}\n` +
      `📞 *Telefone:* ${appointment.clientPhone}\n` +
      `✂️ *Serviço:* ${service?.name || 'N/A'}\n` +
      `🧔 *Barbeiro:* ${barber?.name || 'N/A'}\n` +
      `📅 *Data:* ${appointment.date}\n` +
      `⏰ *Horário:* ${appointment.time}\n\n` +
      `_Mensagem automática do sistema de gestão._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
    
    // Simula o envio abrindo uma nova aba
    window.open(whatsappUrl, '_blank');
  },

  sendConfirmationToClient: (appointment: Appointment) => {
    const service = SERVICES.find(s => s.id === appointment.serviceId);
    const dateFormatted = new Date(appointment.date).toLocaleDateString('pt-BR');
    
    const message = `Olá ${appointment.clientName}! Seu agendamento na *Barbearia Borel* foi realizado com sucesso!\n\n` +
      `✂️ *Serviço:* ${service?.name}\n` +
      `📅 *Data:* ${dateFormatted}\n` +
      `⏰ *Horário:* ${appointment.time}\n\n` +
      `Estamos te esperando! 💈`;

    const encodedMessage = encodeURIComponent(message);
    const cleanPhone = appointment.clientPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
};
