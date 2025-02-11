import React from 'react';
import { AppointmentFormData } from '../types';

interface Props {
  onSubmit: (data: AppointmentFormData) => void;
}

export function AppointmentForm({ onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: AppointmentFormData = {
      registration: formData.get('registration') as string,
      phone: formData.get('phone') as string,
      date: formData.get('date') as string,
    };
    onSubmit(data);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="registration" className="block text-sm font-medium text-gray-700">
          Matrícula
        </label>
        <input
          type="text"
          id="registration"
          name="registration"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Data do Agendamento
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Adicionar Agendamento
      </button>
    </form>
  );
}