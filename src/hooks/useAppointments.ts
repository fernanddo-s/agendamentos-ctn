import { useState, useEffect } from 'react';
import { Appointment, AppointmentFormData } from '../types';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (data: AppointmentFormData) => {
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      ...data,
      isVerified: false,
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const toggleVerification = (id: string) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id
          ? { ...appointment, isVerified: !appointment.isVerified }
          : appointment
      )
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
  };

  const filterByDate = (date: string) => {
    if (!date) return appointments;
    return appointments.filter(
      appointment => appointment.date.split('T')[0] === date
    );
  };

  return {
    appointments,
    addAppointment,
    toggleVerification,
    deleteAppointment,
    filterByDate,
  };
}