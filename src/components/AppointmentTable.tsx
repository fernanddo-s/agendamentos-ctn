import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Appointment } from '../types';

interface Props {
  appointments: Appointment[];
  onToggleVerification: (id: string) => void;
  onDeleteAppointment: (id: string) => void;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function AppointmentTable({ 
  appointments, 
  onToggleVerification,
  onDeleteAppointment,
  itemsPerPage,
  currentPage,
  onPageChange 
}: Props) {
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = appointments.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja apagar este agendamento?')) {
      onDeleteAppointment(id);
      // Ajusta a página atual se necessário após a exclusão
      const newTotalPages = Math.ceil((appointments.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages) {
        onPageChange(Math.max(1, newTotalPages));
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matrícula
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.registration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(appointment.date).toLocaleString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {appointment.isVerified ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Verificado
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Pendente
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onToggleVerification(appointment.id)}
                      className={`px-3 py-1 rounded-full text-white ${
                        appointment.isVerified
                          ? 'bg-orange-600 hover:bg-orange-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {appointment.isVerified ? 'Desfazer' : 'Verificar'}
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="p-1.5 rounded-full text-red-600 hover:bg-red-50"
                      title="Apagar agendamento"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md">
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, appointments.length)} de {appointments.length} resultados
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}