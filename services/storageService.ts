
import { Appointment } from '../types';

const STORAGE_KEY = 'barbearia_borel_appointments';

export const storageService = {
  getAppointments: (): Appointment[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAppointment: (appointment: Appointment): void => {
    const appointments = storageService.getAppointments();
    appointments.push(appointment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  },

  updateAppointmentStatus: (id: string, status: Appointment['status']): void => {
    const appointments = storageService.getAppointments();
    const updated = appointments.map(app => 
      app.id === id ? { ...app, status } : app
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteAppointment: (id: string): void => {
    const appointments = storageService.getAppointments();
    const filtered = appointments.filter(app => app.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
