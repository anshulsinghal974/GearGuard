import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/store';
import { Wrench, Edit } from 'lucide-react';
import { useState } from 'react';
import EquipmentForm from '../components/EquipmentForm';

export default function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const { getEquipment, getRequestsByEquipment, departments, users, teams } = useStore();
  const [showEditForm, setShowEditForm] = useState(false);

  const equipment = id ? getEquipment(id) : undefined;
  const requests = equipment ? getRequestsByEquipment(equipment.id) : [];

  if (!equipment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Equipment not found</p>
        <Link to="/equipment" className="text-primary-600 hover:text-primary-800 mt-4 inline-block">
          Back to Equipment List
        </Link>
      </div>
    );
  }

  const department = departments.find((d) => d.id === equipment.department);
  const employee = users.find((u) => u.id === equipment.assignedEmployee);
  const team = teams.find((t) => t.id === equipment.maintenanceTeamId);
  const technician = equipment.assignedTechnicianId
    ? users.find((u) => u.id === equipment.assignedTechnicianId)
    : null;

  const openRequests = requests.filter((r) => r.status !== 'repaired' && r.status !== 'scrap');
  const totalRequests = requests.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/equipment" className="text-primary-600 hover:text-primary-800 text-sm mb-2 inline-block">
            ← Back to Equipment List
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{equipment.name}</h1>
        </div>
        <button
          onClick={() => setShowEditForm(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Edit className="h-5 w-5 mr-2" />
          Edit
        </button>
      </div>

      {showEditForm && (
        <EquipmentForm
          equipment={equipment}
          onClose={() => setShowEditForm(false)}
          onSave={() => setShowEditForm(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Equipment Details</h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Serial Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{equipment.serialNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{equipment.category || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{equipment.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900">{department?.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Assigned Employee</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee?.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Maintenance Team</dt>
                  <dd className="mt-1 text-sm text-gray-900">{team?.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Assigned Technician</dt>
                  <dd className="mt-1 text-sm text-gray-900">{technician?.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(equipment.purchaseDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Warranty Expiry</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(equipment.warrantyExpiryDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        equipment.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {equipment.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </dd>
                </div>
              </dl>
              {equipment.notes && (
                <div className="mt-6">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900">{equipment.notes}</dd>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Maintenance Requests</h2>
                <Link
                  to={`/requests?equipment=${equipment.id}`}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.slice(0, 5).map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.requestType === 'preventive'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {request.requestType === 'preventive' ? 'Preventive' : 'Corrective'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === 'new'
                                ? 'bg-gray-100 text-gray-800'
                                : request.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : request.status === 'repaired'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {request.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Link
                to={`/requests?equipment=${equipment.id}`}
                className="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Wrench className="h-5 w-5 mr-2" />
                Maintenance Requests
                {openRequests.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {openRequests.length}
                  </span>
                )}
              </Link>
              <div className="mt-4 text-sm text-gray-500">
                <p>Total Requests: {totalRequests}</p>
                <p>Open Requests: {openRequests.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

