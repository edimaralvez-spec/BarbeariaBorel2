
import React from 'react';
import { Service, Barber } from './types';
import { Scissors, Zap, User, Clock, CheckCircle, Calendar, ChevronRight, LayoutDashboard, FileText, LogOut, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';

export const SERVICES: Service[] = [
  { id: '1', name: 'Corte Social', price: 45, duration: 40 },
  { id: '2', name: 'Barba Completa', price: 35, duration: 30 },
  { id: '3', name: 'Corte + Barba', price: 70, duration: 60 },
  { id: '4', name: 'Degradê Navalhado', price: 55, duration: 45 },
  { id: '5', name: 'Pezinho', price: 20, duration: 15 },
];

export const BARBERS: Barber[] = [
  { id: 'b1', name: 'Borel (Proprietário)', avatar: 'https://picsum.photos/id/64/100/100', specialty: 'Mestre em Tesoura' },
];

export const BUSINESS_INFO = {
  address: 'Rua Principal, 123 - Centro, São Paulo',
  hours: 'Seg - Sáb: 09:00 às 19:00',
  phone: '(11) 99999-9999',
  instagram: '@barbeariaborel'
};

export const ICONS = {
  Scissors: <Scissors className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Check: <CheckCircle className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  ChevronRight: <ChevronRight className="w-5 h-5" />,
  Dashboard: <LayoutDashboard className="w-5 h-5" />,
  Reports: <FileText className="w-5 h-5" />,
  Logout: <LogOut className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
  WhatsApp: <MessageCircle className="w-4 h-4" />,
};

export const BUSINESS_PHONE = '5511999999999';
