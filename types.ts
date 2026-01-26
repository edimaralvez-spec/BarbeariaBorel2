
export type AppointmentStatus = 'pendente' | 'confirmado' | 'concluido' | 'cancelado';

export interface Barber {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // em minutos
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  barberId: string;
  date: string; // ISO format YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  isAdmin: boolean;
}
