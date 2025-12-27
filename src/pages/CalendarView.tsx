import { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { useStore } from '../store/store';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import MaintenanceRequestForm from '../components/MaintenanceRequestForm';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView() {
  const { requests } = useStore();
  const [showForm, setShowForm] = useState(false);

  // Filter only preventive maintenance requests
  const preventiveRequests = useMemo(
    () => requests.filter((r) => r.requestType === 'preventive' && r.scheduledDate),
    [requests]
  );

  const events = useMemo(
    () =>
      preventiveRequests.map((request) => ({
        id: request.id,
        title: `${request.subject} - ${request.equipmentName}`,
        start: new Date(request.scheduledDate!),
        end: request.duration
          ? new Date(new Date(request.scheduledDate!).getTime() + request.duration * 60 * 60 * 1000)
          : new Date(new Date(request.scheduledDate!).getTime() + 60 * 60 * 1000),
        resource: request,
      })),
    [preventiveRequests]
  );

  const eventStyleGetter = (event: any) => {
    const request = event.resource as typeof requests[0];
    let backgroundColor = '#3b82f6';
    if (request.status === 'repaired') {
      backgroundColor = '#10b981';
    } else if (request.status === 'scrap') {
      backgroundColor = '#ef4444';
    } else if (request.isOverdue) {
      backgroundColor = '#dc2626';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        border: 'none',
        color: 'white',
        padding: '2px 5px',
      },
    };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Preventive Request
        </button>
      </div>

      {showForm && (
        <MaintenanceRequestForm
          onClose={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
        />
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Legend</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Scheduled / In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Repaired</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Scrap / Overdue</span>
          </div>
        </div>
      </div>
    </div>
  );
}

