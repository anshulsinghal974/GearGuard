import { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { WorkCenter } from '../types';
import { X } from 'lucide-react';

interface WorkCenterFormProps {
  workCenter?: WorkCenter;
  onClose: () => void;
  onSave: () => void;
}

export default function WorkCenterForm({ workCenter, onClose, onSave }: WorkCenterFormProps) {
  const { addWorkCenter, updateWorkCenter, workCenters } = useStore();
  const [formData, setFormData] = useState<Partial<WorkCenter>>({
    code: '',
    tag: '',
    alternativeWorkCenterIds: [],
    costPerHour: 0,
    capacityTimeEfficiency: 100,
    oeeTarget: 0,
  });

  useEffect(() => {
    if (workCenter) {
      setFormData(workCenter);
    }
  }, [workCenter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (workCenter) {
      updateWorkCenter(workCenter.id, formData);
    } else {
      const newWorkCenter: WorkCenter = {
        id: Date.now().toString(),
        code: formData.code!,
        tag: formData.tag!,
        alternativeWorkCenterIds: formData.alternativeWorkCenterIds || [],
        costPerHour: formData.costPerHour || 0,
        capacityTimeEfficiency: formData.capacityTimeEfficiency || 100,
        oeeTarget: formData.oeeTarget || 0,
      };
      addWorkCenter(newWorkCenter);
    }
    onSave();
  };

  const toggleAlternativeWorkCenter = (workCenterId: string) => {
    const currentAlternatives = formData.alternativeWorkCenterIds || [];
    if (currentAlternatives.includes(workCenterId)) {
      setFormData({
        ...formData,
        alternativeWorkCenterIds: currentAlternatives.filter((id) => id !== workCenterId),
      });
    } else {
      setFormData({
        ...formData,
        alternativeWorkCenterIds: [...currentAlternatives, workCenterId],
      });
    }
  };

  // Filter out the current work center from alternatives list
  const availableWorkCenters = workCenters.filter((wc) => wc.id !== workCenter?.id);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {workCenter ? 'Edit Work Center' : 'Add Work Center'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Code *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., WC001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tag *</label>
              <input
                type="text"
                required
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Assembly 1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost per Hour *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.costPerHour}
                onChange={(e) =>
                  setFormData({ ...formData, costPerHour: parseFloat(e.target.value) || 0 })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity Time Efficiency (%) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                required
                value={formData.capacityTimeEfficiency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacityTimeEfficiency: parseFloat(e.target.value) || 0,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="100.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">OEE Target (%) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                required
                value={formData.oeeTarget}
                onChange={(e) =>
                  setFormData({ ...formData, oeeTarget: parseFloat(e.target.value) || 0 })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alternative Work Centers
            </label>
            <div className="border border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto">
              {availableWorkCenters.length > 0 ? (
                <div className="space-y-2">
                  {availableWorkCenters.map((wc) => {
                    const isSelected = formData.alternativeWorkCenterIds?.includes(wc.id);
                    return (
                      <label
                        key={wc.id}
                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAlternativeWorkCenter(wc.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <span className="text-sm font-medium text-gray-900">{wc.tag}</span>
                          <span className="ml-2 text-xs text-gray-500">({wc.code})</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No other work centers available</p>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selected: {formData.alternativeWorkCenterIds?.length || 0} alternative(s)
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
              {workCenter ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

