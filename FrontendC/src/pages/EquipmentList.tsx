import { useState } from 'react';
import { useStore } from '../store/store';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import EquipmentForm from '../components/EquipmentForm';

export default function EquipmentList() {
  const { equipments, departments, users, teams } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState<string>('all');

  const filteredEquipments = equipments.filter((eq) => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'all' || eq.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const getDepartmentName = (id: string) => departments.find((d) => d.id === id)?.name || 'N/A';
  const getEmployeeName = (id: string) => users.find((u) => u.id === id)?.name || 'N/A';
  const getTeamName = (id: string) => teams.find((t) => t.id === id)?.name || 'N/A';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Equipment
        </button>
      </div>

      {showForm && (
        <EquipmentForm
          onClose={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="block pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serial Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Maintenance Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipments.map((equipment) => (
                  <tr key={equipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {equipment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {equipment.serialNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getDepartmentName(equipment.department)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getEmployeeName(equipment.assignedEmployee)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTeamName(equipment.maintenanceTeamId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {equipment.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          equipment.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {equipment.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/equipment/${equipment.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

