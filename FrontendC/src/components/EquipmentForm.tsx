import { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { Equipment } from '../types';
import { X } from 'lucide-react';

interface EquipmentFormProps {
  equipment?: Equipment;
  onClose: () => void;
  onSave: () => void;
}

export default function EquipmentForm({ equipment, onClose, onSave }: EquipmentFormProps) {
  const { addEquipment, updateEquipment, departments, users, teams } = useStore();
  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiryDate: '',
    location: '',
    department: '',
    assignedEmployee: '',
    maintenanceTeamId: '',
    assignedTechnicianId: '',
    category: '',
    isActive: true,
  });

  useEffect(() => {
    if (equipment) {
      setFormData(equipment);
    }
  }, [equipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (equipment) {
      updateEquipment(equipment.id, formData);
    } else {
      const newEquipment: Equipment = {
        id: Date.now().toString(),
        name: formData.name!,
        serialNumber: formData.serialNumber!,
        purchaseDate: formData.purchaseDate!,
        warrantyExpiryDate: formData.warrantyExpiryDate!,
        location: formData.location!,
        department: formData.department!,
        assignedEmployee: formData.assignedEmployee!,
        maintenanceTeamId: formData.maintenanceTeamId!,
        assignedTechnicianId: formData.assignedTechnicianId || '',
        category: formData.category || '',
        isActive: formData.isActive ?? true,
      };
      addEquipment(newEquipment);
    }
    onSave();
  };

  // Get technicians for selected team
  const selectedTeamTechnicians = formData.maintenanceTeamId
    ? teams.find((t) => t.id === formData.maintenanceTeamId)?.memberIds.map((id) => users.find((u) => u.id === id)).filter(Boolean) || []
    : [];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {equipment ? 'Edit Equipment' : 'Add Equipment'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Equipment Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Serial Number *</label>
              <input
                type="text"
                required
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Date *</label>
              <input
                type="date"
                required
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Warranty Expiry Date *</label>
              <input
                type="date"
                required
                value={formData.warrantyExpiryDate}
                onChange={(e) => setFormData({ ...formData, warrantyExpiryDate: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Department *</label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned Employee *</label>
              <select
                required
                value={formData.assignedEmployee}
                onChange={(e) => setFormData({ ...formData, assignedEmployee: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Employee</option>
                {users.filter((u) => u.role === 'employee').map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Maintenance Team *</label>
              <select
                required
                value={formData.maintenanceTeamId}
                onChange={(e) => setFormData({ ...formData, maintenanceTeamId: e.target.value, assignedTechnicianId: '' })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned Technician</label>
              <select
                value={formData.assignedTechnicianId}
                onChange={(e) => setFormData({ ...formData, assignedTechnicianId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                disabled={!formData.maintenanceTeamId}
              >
                <option value="">Select Technician</option>
                {selectedTeamTechnicians.map((tech) => (
                  <option key={tech!.id} value={tech!.id}>
                    {tech!.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              {equipment ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

