import React, { useState } from 'react';
import { AppointmentForm } from './components/AppointmentForm';
import { AppointmentTable } from './components/AppointmentTable';
import { useAppointments } from './hooks/useAppointments';

function App() {
  const { addAppointment, toggleVerification, deleteAppointment, filterByDate } = useAppointments();
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAppointments = filterByDate(selectedDate);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Sistema de Agendamentos
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AppointmentForm onSubmit={addAppointment} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">
                Filtrar por data
              </label>
              <input
                type="date"
                id="dateFilter"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {filteredAppointments.length > 0 ? (
              <AppointmentTable
                appointments={filteredAppointments}
                onToggleVerification={toggleVerification}
                onDeleteAppointment={deleteAppointment}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">
                  Nenhum agendamento encontrado{selectedDate ? ' para esta data' : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;