import { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { MaintenanceRequest } from '../types';
import { X } from 'lucide-react';

interface MaintenanceRequestFormProps {
  request?: MaintenanceRequest;
  equipmentId?: string;
  onClose: () => void;
  onSave: () => void;
}

export default function MaintenanceRequestForm({
  request,
  equipmentId,
  onClose,
  onSave,
}: MaintenanceRequestFormProps) {
  const { addRequest, updateRequest, equipments, teams, users } = useStore();
  const [formData, setFormData] = useState<Partial<MaintenanceRequest>>({
    subject: '',
    equipmentId: equipmentId || '',
    requestType: 'corrective',
    scheduledDate: '',
    duration: undefined,
    status: 'new',
    maintenanceTeamId: '',
    assignedTechnicianId: '',
    description: '',
  });

  useEffect(() => {
    if (request) {
      setFormData(request);
    } else if (equipmentId) {
      // Auto-fill from equipment
      const equipment = equipments.find((e) => e.id === equipmentId);
      if (equipment) {
        setFormData({
          ...formData,
          equipmentId: equipment.id,
          maintenanceTeamId: equipment.maintenanceTeamId,
          assignedTechnicianId: equipment.assignedTechnicianId || '',
        });
      }
    }
  }, [request, equipmentId]);

  // Auto-fill team when equipment changes
  useEffect(() => {
    if (formData.equipmentId && !request) {
      const equipment = equipments.find((e) => e.id === formData.equipmentId);
      if (equipment) {
        setFormData((prev) => ({
          ...prev,
          maintenanceTeamId: equipment.maintenanceTeamId,
          assignedTechnicianId: equipment.assignedTechnicianId || prev.assignedTechnicianId || '',
        }));
      }
    }
  }, [formData.equipmentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const equipment = equipments.find((e) => e.id === formData.equipmentId);
    const team = teams.find((t) => t.id === formData.maintenanceTeamId);
    const technician = formData.assignedTechnicianId
      ? users.find((u) => u.id === formData.assignedTechnicianId)
      : null;

    if (request) {
      updateRequest(request.id, formData);
    } else {
      const newRequest: MaintenanceRequest = {
        id: Date.now().toString(),
        subject: formData.subject!,
        equipmentId: formData.equipmentId!,
        equipmentName: equipment?.name,
        requestType: formData.requestType!,
        scheduledDate: formData.scheduledDate,
        duration: formData.duration,
        status: formData.status!,
        maintenanceTeamId: formData.maintenanceTeamId!,
        maintenanceTeamName: team?.name,
        assignedTechnicianId: formData.assignedTechnicianId,
        assignedTechnicianName: technician?.name,
        category: equipment?.category,
        description: formData.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addRequest(newRequest);
    }
    onSave();
  };

  const selectedEquipment = formData.equipmentId
    ? equipments.find((e) => e.id === formData.equipmentId)
    : null;

  const selectedTeamTechnicians = formData.maintenanceTeamId
    ? teams
        .find((t) => t.id === formData.maintenanceTeamId)
        ?.memberIds.map((id) => users.find((u) => u.id === id))
        .filter(Boolean) || []
    : [];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {request ? 'Edit Maintenance Request' : 'New Maintenance Request'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject *</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Equipment *</label>
            <select
              required
              value={formData.equipmentId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  equipmentId: e.target.value,
                  maintenanceTeamId: '',
                  assignedTechnicianId: '',
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              disabled={!!equipmentId}
            >
              <option value="">Select Equipment</option>
              {equipments
                .filter((e) => e.isActive)
                .map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.name} - {eq.serialNumber}
                  </option>
                ))}
            </select>
            {selectedEquipment && (
              <p className="mt-1 text-sm text-gray-500">
                Team: {teams.find((t) => t.id === selectedEquipment.maintenanceTeamId)?.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Request Type *</label>
            <select
              required
              value={formData.requestType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  requestType: e.target.value as 'corrective' | 'preventive',
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="corrective">Corrective (Breakdown)</option>
              <option value="preventive">Preventive (Planned)</option>
            </select>
          </div>

          {formData.requestType === 'preventive' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Scheduled Date *</label>
                <input
                  type="date"
                  required
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.duration || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Maintenance Team *</label>
            <select
              required
              value={formData.maintenanceTeamId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintenanceTeamId: e.target.value,
                  assignedTechnicianId: '',
                })
              }
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
              <option value="">Unassigned</option>
              {selectedTeamTechnicians.map((tech) => (
                <option key={tech!.id} value={tech!.id}>
                  {tech!.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Only team members can be assigned to requests
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
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
              {request ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

