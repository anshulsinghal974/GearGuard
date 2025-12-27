import { useState } from 'react';
import { useStore } from '../store/store';
import { Plus, Users } from 'lucide-react';
import MaintenanceTeamForm from '../components/MaintenanceTeamForm';

export default function MaintenanceTeams() {
  const { teams, users } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const getTeamMembers = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return [];
    return team.memberIds.map((id) => users.find((u) => u.id === id)).filter(Boolean);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Maintenance Teams</h1>
        <button
          onClick={() => {
            setSelectedTeam(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Team
        </button>
      </div>

      {showForm && (
        <MaintenanceTeamForm
          team={selectedTeam ? teams.find((t) => t.id === selectedTeam) : undefined}
          onClose={() => {
            setShowForm(false);
            setSelectedTeam(null);
          }}
          onSave={() => {
            setShowForm(false);
            setSelectedTeam(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => {
          const members = getTeamMembers(team.id);
          return (
            <div
              key={team.id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">{team.name}</h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedTeam(team.id);
                    setShowForm(true);
                  }}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              {team.description && (
                <p className="text-sm text-gray-600 mb-4">{team.description}</p>
              )}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Team Members ({members.length})</p>
                <div className="space-y-2">
                  {members.length > 0 ? (
                    members.map((member) => (
                      <div key={member!.id} className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-semibold mr-2">
                          {member!.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        {member!.name}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No members assigned</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

