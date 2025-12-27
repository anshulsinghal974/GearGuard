import { useState } from 'react';
import { Plus } from 'lucide-react';
import MaintenanceRequestForm from '../components/MaintenanceRequestForm';
import KanbanBoard from '../components/KanbanBoard';
import { useSearchParams } from 'react-router-dom';

export default function MaintenanceRequests() {
  const [showForm, setShowForm] = useState(false);
  const [searchParams] = useSearchParams();
  const equipmentId = searchParams.get('equipment');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Maintenance Requests</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Request
        </button>
      </div>

      {showForm && (
        <MaintenanceRequestForm
          equipmentId={equipmentId || undefined}
          onClose={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <KanbanBoard />
      </div>
    </div>
  );
}

