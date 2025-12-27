import { create } from 'zustand';
import { Equipment, MaintenanceTeam, User, MaintenanceRequest, Department, WorkCenter } from '../types';

interface StoreState {
  // Data
  equipments: Equipment[];
  teams: MaintenanceTeam[];
  users: User[];
  requests: MaintenanceRequest[];
  departments: Department[];
  workCenters: WorkCenter[];
  
  // Actions
  addEquipment: (equipment: Equipment) => void;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => void;
  deleteEquipment: (id: string) => void;
  getEquipment: (id: string) => Equipment | undefined;
  
  addTeam: (team: MaintenanceTeam) => void;
  updateTeam: (id: string, team: Partial<MaintenanceTeam>) => void;
  deleteTeam: (id: string) => void;
  
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  getUser: (id: string) => User | undefined;
  
  addRequest: (request: MaintenanceRequest) => void;
  updateRequest: (id: string, request: Partial<MaintenanceRequest>) => void;
  deleteRequest: (id: string) => void;
  getRequest: (id: string) => MaintenanceRequest | undefined;
  getRequestsByEquipment: (equipmentId: string) => MaintenanceRequest[];
  
  addDepartment: (department: Department) => void;
  
  addWorkCenter: (workCenter: WorkCenter) => void;
  updateWorkCenter: (id: string, workCenter: Partial<WorkCenter>) => void;
  deleteWorkCenter: (id: string) => void;
  getWorkCenter: (id: string) => WorkCenter | undefined;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial data
  equipments: [
    {
      id: '1',
      name: 'CNC Machine 01',
      serialNumber: 'CNC-2024-001',
      purchaseDate: '2023-01-15',
      warrantyExpiryDate: '2025-01-15',
      location: 'Production Floor A',
      department: '1',
      assignedEmployee: '1',
      maintenanceTeamId: '1',
      assignedTechnicianId: '3',
      category: 'Machinery',
      isActive: true,
    },
    {
      id: '2',
      name: 'Laptop - John Doe',
      serialNumber: 'LAP-2024-002',
      purchaseDate: '2024-03-20',
      warrantyExpiryDate: '2026-03-20',
      location: 'Office - Desk 5',
      department: '2',
      assignedEmployee: '2',
      maintenanceTeamId: '3',
      assignedTechnicianId: '5',
      category: 'IT Equipment',
      isActive: true,
    },
  ],
  
  teams: [
    {
      id: '1',
      name: 'Mechanics',
      description: 'Mechanical maintenance team',
      memberIds: ['3', '4'],
    },
    {
      id: '2',
      name: 'Electricians',
      description: 'Electrical maintenance team',
      memberIds: ['4'],
    },
    {
      id: '3',
      name: 'IT Support',
      description: 'IT equipment maintenance',
      memberIds: ['5'],
    },
  ],
  
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'employee', teamIds: [] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'employee', teamIds: [] },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'technician', teamIds: ['1'] },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'technician', teamIds: ['1', '2'] },
    { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'technician', teamIds: ['3'] },
    { id: '6', name: 'Manager Bob', email: 'bob@example.com', role: 'manager', teamIds: [] },
  ],
  
  requests: [
    {
      id: '1',
      subject: 'Leaking Oil',
      equipmentId: '1',
      equipmentName: 'CNC Machine 01',
      requestType: 'corrective',
      status: 'in_progress',
      assignedTechnicianId: '3',
      assignedTechnicianName: 'Mike Johnson',
      maintenanceTeamId: '1',
      maintenanceTeamName: 'Mechanics',
      category: 'Machinery',
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-10T09:00:00Z',
      isOverdue: false,
    },
  ],
  
  departments: [
    { id: '1', name: 'Production' },
    { id: '2', name: 'IT' },
    { id: '3', name: 'Administration' },
    { id: '4', name: 'Logistics' },
  ],
  
  workCenters: [
    {
      id: '1',
      code: 'WC001',
      tag: 'Assembly 1',
      alternativeWorkCenterIds: [],
      costPerHour: 50.00,
      capacityTimeEfficiency: 100.00,
      oeeTarget: 34.59,
    },
    {
      id: '2',
      code: 'WC002',
      tag: 'Drill 1',
      alternativeWorkCenterIds: [],
      costPerHour: 75.00,
      capacityTimeEfficiency: 100.00,
      oeeTarget: 90.00,
    },
  ],
  
  // Equipment actions
  addEquipment: (equipment) => set((state) => ({
    equipments: [...state.equipments, equipment],
  })),
  
  updateEquipment: (id, equipment) => set((state) => ({
    equipments: state.equipments.map((eq) =>
      eq.id === id ? { ...eq, ...equipment } : eq
    ),
  })),
  
  deleteEquipment: (id) => set((state) => ({
    equipments: state.equipments.filter((eq) => eq.id !== id),
  })),
  
  getEquipment: (id) => get().equipments.find((eq) => eq.id === id),
  
  // Team actions
  addTeam: (team) => set((state) => ({
    teams: [...state.teams, team],
  })),
  
  updateTeam: (id, team) => set((state) => ({
    teams: state.teams.map((t) => (t.id === id ? { ...t, ...team } : t)),
  })),
  
  deleteTeam: (id) => set((state) => ({
    teams: state.teams.filter((t) => t.id !== id),
  })),
  
  // User actions
  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),
  
  updateUser: (id, user) => set((state) => ({
    users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
  })),
  
  getUser: (id) => get().users.find((u) => u.id === id),
  
  // Request actions
  addRequest: (request) => set((state) => {
    // Calculate overdue status
    const isOverdue = request.scheduledDate
      ? new Date(request.scheduledDate) < new Date() && request.status !== 'repaired' && request.status !== 'scrap'
      : false;
    const requestWithOverdue = { ...request, isOverdue };
    return { requests: [...state.requests, requestWithOverdue] };
  }),
  
  updateRequest: (id, request) => set((state) => {
    const updated = state.requests.map((r) => {
      if (r.id === id) {
        // Calculate overdue status
        const scheduledDate = request.scheduledDate || r.scheduledDate;
        const status = request.status || r.status;
        const isOverdue = scheduledDate
          ? new Date(scheduledDate) < new Date() && status !== 'repaired' && status !== 'scrap'
          : false;
        return { ...r, ...request, updatedAt: new Date().toISOString(), isOverdue };
      }
      return r;
    });
    // If moving to scrap, mark equipment as inactive
    if (request.status === 'scrap') {
      const req = updated.find((r) => r.id === id);
      if (req) {
        return {
          requests: updated,
          equipments: state.equipments.map((eq) =>
            eq.id === req.equipmentId
              ? { ...eq, isActive: false, notes: 'Equipment scrapped due to maintenance request' }
              : eq
          ),
        };
      }
    }
    return { requests: updated };
  }),
  
  deleteRequest: (id) => set((state) => ({
    requests: state.requests.filter((r) => r.id !== id),
  })),
  
  getRequest: (id) => get().requests.find((r) => r.id === id),
  
  getRequestsByEquipment: (equipmentId) =>
    get().requests.filter((r) => r.equipmentId === equipmentId),
  
  // Department actions
  addDepartment: (department) => set((state) => ({
    departments: [...state.departments, department],
  })),
  
  // Work Center actions
  addWorkCenter: (workCenter) => set((state) => ({
    workCenters: [...state.workCenters, workCenter],
  })),
  
  updateWorkCenter: (id, workCenter) => set((state) => ({
    workCenters: state.workCenters.map((wc) =>
      wc.id === id ? { ...wc, ...workCenter } : wc
    ),
  })),
  
  deleteWorkCenter: (id) => set((state) => ({
    workCenters: state.workCenters.filter((wc) => wc.id !== id),
  })),
  
  getWorkCenter: (id) => get().workCenters.find((wc) => wc.id === id),
}));

