import { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { MaintenanceTeam } from '../types';
import { X } from 'lucide-react';

interface MaintenanceTeamFormProps {
  team?: MaintenanceTeam;
  onClose: () => void;
  onSave: () => void;
}

export default function MaintenanceTeamForm({ team, onClose, onSave }: MaintenanceTeamFormProps) {
  const { addTeam, updateTeam, users } = useStore();
  const [formData, setFormData] = useState<Partial<MaintenanceTeam>>({
    name: '',
    description: '',
    memberIds: [],
  });

  useEffect(() => {
    if (team) {
      setFormData(team);
    }
  }, [team]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team) {
      updateTeam(team.id, formData);
    } else {
      const newTeam: MaintenanceTeam = {
        id: Date.now().toString(),
        name: formData.name!,
        description: formData.description,
        memberIds: formData.memberIds || [],
      };
      addTeam(newTeam);
    }
    onSave();
  };

  const toggleMember = (userId: string) => {
    const currentMembers = formData.memberIds || [];
    if (currentMembers.includes(userId)) {
      setFormData({ ...formData, memberIds: currentMembers.filter((id) => id !== userId) });
    } else {
      setFormData({ ...formData, memberIds: [...currentMembers, userId] });
    }
  };

  const technicians = users.filter((u) => u.role === 'technician');

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {team ? 'Edit Maintenance Team' : 'Add Maintenance Team'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
            <div className="border border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto">
              {technicians.length > 0 ? (
                <div className="space-y-2">
                  {technicians.map((tech) => {
                    const isSelected = formData.memberIds?.includes(tech.id);
                    return (
                      <label
                        key={tech.id}
                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleMember(tech.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-semibold mr-2">
                            {tech.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                          <span className="text-sm text-gray-900">{tech.name}</span>
                          <span className="ml-2 text-xs text-gray-500">({tech.email})</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No technicians available</p>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selected: {formData.memberIds?.length || 0} member(s)
            </p>
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
              {team ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

