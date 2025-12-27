import { useMemo } from 'react';
import { useStore } from '../store/store';
import { BarChart3 } from 'lucide-react';

export default function Reports() {
  const { requests, teams } = useStore();

  // Requests per Team
  const requestsPerTeam = useMemo(() => {
    const teamStats: Record<string, { name: string; count: number }> = {};
    teams.forEach((team) => {
      teamStats[team.id] = { name: team.name, count: 0 };
    });
    requests.forEach((request) => {
      if (teamStats[request.maintenanceTeamId]) {
        teamStats[request.maintenanceTeamId].count++;
      }
    });
    return Object.values(teamStats).sort((a, b) => b.count - a.count);
  }, [requests, teams]);

  // Requests per Equipment Category
  const requestsPerCategory = useMemo(() => {
    const categoryStats: Record<string, number> = {};
    requests.forEach((request) => {
      const category = request.category || 'Uncategorized';
      categoryStats[category] = (categoryStats[category] || 0) + 1;
    });
    return Object.entries(categoryStats)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [requests]);

  // Status distribution
  const statusDistribution = useMemo(() => {
    const statusStats: Record<string, number> = {};
    requests.forEach((request) => {
      statusStats[request.status] = (statusStats[request.status] || 0) + 1;
    });
    return Object.entries(statusStats).map(([status, count]) => ({ status, count }));
  }, [requests]);

  // Type distribution
  const typeDistribution = useMemo(() => {
    const typeStats: Record<string, number> = {
      corrective: 0,
      preventive: 0,
    };
    requests.forEach((request) => {
      typeStats[request.requestType]++;
    });
    return Object.entries(typeStats).map(([type, count]) => ({ type, count }));
  }, [requests]);

  const maxCount = Math.max(
    ...requestsPerTeam.map((t) => t.count),
    ...requestsPerCategory.map((c) => c.count),
    1
  );

  return (
    <div>
      <div className="flex items-center mb-6">
        <BarChart3 className="h-8 w-8 text-primary-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests per Team */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Requests per Team</h2>
          <div className="space-y-4">
            {requestsPerTeam.map((team) => (
              <div key={team.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{team.name}</span>
                  <span className="font-semibold text-gray-900">{team.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-primary-600 h-4 rounded-full transition-all"
                    style={{ width: `${(team.count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requests per Category */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Requests per Equipment Category</h2>
          <div className="space-y-4">
            {requestsPerCategory.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.category}</span>
                  <span className="font-semibold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full transition-all"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Status Distribution</h2>
          <div className="space-y-3">
            {statusDistribution.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {item.status.replace('_', ' ')}
                </span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                    <div
                      className={`h-3 rounded-full ${
                        item.status === 'new'
                          ? 'bg-gray-500'
                          : item.status === 'in_progress'
                          ? 'bg-blue-500'
                          : item.status === 'repaired'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${(item.count / requests.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Type Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Request Type Distribution</h2>
          <div className="space-y-3">
            {typeDistribution.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">{item.type}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                    <div
                      className={`h-3 rounded-full ${
                        item.type === 'preventive' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(item.count / requests.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Summary Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{requests.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Requests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {requests.filter((r) => r.status === 'in_progress').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {requests.filter((r) => r.status === 'repaired').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Repaired</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {requests.filter((r) => r.isOverdue).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Overdue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

