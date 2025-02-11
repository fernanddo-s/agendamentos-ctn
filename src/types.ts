export interface Appointment {
  id: string;
  registration: string;
  phone: string;
  date: string;
  isVerified: boolean;
}

export interface AppointmentFormData {
  registration: string;
  phone: string;
  date: string;
}