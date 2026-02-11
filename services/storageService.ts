
import { ref, push, set, onValue, update, remove, off, get, child } from "firebase/database";
import { db } from "./firebase";
import { Appointment } from "../types";

const APPOINTMENTS_PATH = 'appointments';
const ADMINS_PATH = 'admins';

export const storageService = {
  // Escuta mudanças em tempo real e chama o callback com a lista atualizada
  subscribeToAppointments: (callback: (appointments: Appointment[]) => void) => {
    const appointmentsRef = ref(db, APPOINTMENTS_PATH);
    onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: Appointment[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key 
        }));
        callback(list);
      } else {
        callback([]);
      }
    });
    return () => off(appointmentsRef);
  },

  saveAppointment: async (appointment: Appointment): Promise<string> => {
    const appointmentsRef = ref(db, APPOINTMENTS_PATH);
    const newAppointmentRef = push(appointmentsRef);
    await set(newAppointmentRef, {
      ...appointment,
      id: newAppointmentRef.key
    });
    return newAppointmentRef.key as string;
  },

  updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<void> => {
    const appointmentRef = ref(db, `${APPOINTMENTS_PATH}/${id}`);
    await update(appointmentRef, { status });
  },

  deleteAppointment: async (id: string): Promise<void> => {
    const appointmentRef = ref(db, `${APPOINTMENTS_PATH}/${id}`);
    await remove(appointmentRef);
  },

  // Sistema de Autenticação via Banco de Dados
  verifyAdminCredentials: async (username: string, password: string): Promise<boolean> => {
    const dbRef = ref(db);
    try {
      // Busca pelo nome de usuário exato
      const snapshot = await get(child(dbRef, `${ADMINS_PATH}/${username}`));
      if (snapshot.exists()) {
        const adminData = snapshot.val();
        return adminData.password === password;
      }
      return false;
    } catch (error) {
      console.error("Erro na autenticação:", error);
      return false;
    }
  },

  // Inicializa o banco com o superadmin solicitado
  ensureSuperAdmin: async () => {
    const adminsRef = ref(db, ADMINS_PATH);
    const snapshot = await get(adminsRef);
    if (!snapshot.exists()) {
      // Cria o usuário Admin solicitado
      await set(ref(db, `${ADMINS_PATH}/Admin`), {
        username: 'Admin',
        password: 'Admin123',
        name: 'Super Admin Borel',
        role: 'superadmin',
        createdAt: new Date().toISOString()
      });
      console.log("SuperAdmin 'Admin' inicializado no banco com sucesso.");
    }
  }
};
