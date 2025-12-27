import { useState } from 'react';
import { useStore } from '../store/store';
import { Plus, Factory, Edit, Trash2 } from 'lucide-react';
import WorkCenterForm from '../components/WorkCenterForm';

export default function WorkCenters() {
  const { workCenters, deleteWorkCenter } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkCenter, setSelectedWorkCenter] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedWorkCenter(id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this work center?')) {
      deleteWorkCenter(id);
    }
  };

  const getAlternativeWorkCenterNames = (alternativeIds: string[]) => {
    return alternativeIds
      .map((id) => {
        const wc = workCenters.find((w) => w.id === id);
        return wc ? wc.tag : null;
      })
      .filter(Boolean)
      .join(', ') || 'None';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Work Centers</h1>
        <button
          onClick={() => {
            setSelectedWorkCenter(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Work Center
        </button>
      </div>

      {showForm && (
        <WorkCenterForm
          workCenter={selectedWorkCenter ? workCenters.find((wc) => wc.id === selectedWorkCenter) : undefined}
          onClose={() => {
            setShowForm(false);
            setSelectedWorkCenter(null);
          }}
          onSave={() => {
            setShowForm(false);
            setSelectedWorkCenter(null);
          }}
        />
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost per Hour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity Time Efficiency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OEE Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alternative Work Centers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workCenters.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                      <Factory className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p>No work centers found. Click "Add Work Center" to create one.</p>
                    </td>
                  </tr>
                ) : (
                  workCenters.map((workCenter) => (
                    <tr key={workCenter.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {workCenter.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {workCenter.tag}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${workCenter.costPerHour.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workCenter.capacityTimeEfficiency.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workCenter.oeeTarget.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="max-w-xs inline-block truncate">
                          {getAlternativeWorkCenterNames(workCenter.alternativeWorkCenterIds)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(workCenter.id)}
                            className="text-primary-600 hover:text-primary-900"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(workCenter.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

