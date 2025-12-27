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
    {
      id: '3',
      name: 'Welding Station Alpha',
      serialNumber: 'WLD-2024-003',
      purchaseDate: '2022-06-10',
      warrantyExpiryDate: '2024-06-10',
      location: 'Production Floor B',
      department: '1',
      assignedEmployee: '7',
      maintenanceTeamId: '1',
      assignedTechnicianId: '8',
      category: 'Machinery',
      isActive: true,
    },
    {
      id: '4',
      name: 'Desktop Computer - Finance',
      serialNumber: 'PC-2024-004',
      purchaseDate: '2024-01-05',
      warrantyExpiryDate: '2026-01-05',
      location: 'Finance Office',
      department: '5',
      assignedEmployee: '12',
      maintenanceTeamId: '3',
      assignedTechnicianId: '9',
      category: 'IT Equipment',
      isActive: true,
    },
    {
      id: '5',
      name: 'Forklift 2000',
      serialNumber: 'FL-2023-005',
      purchaseDate: '2021-09-12',
      warrantyExpiryDate: '2023-09-12',
      location: 'Warehouse',
      department: '6',
      assignedEmployee: '15',
      maintenanceTeamId: '4',
      assignedTechnicianId: '10',
      category: 'Vehicle',
      isActive: true,
    },
    {
      id: '6',
      name: '3D Printer Pro',
      serialNumber: '3DP-2024-006',
      purchaseDate: '2023-11-20',
      warrantyExpiryDate: '2025-11-20',
      location: 'R&D Lab',
      department: '7',
      assignedEmployee: '18',
      maintenanceTeamId: '2',
      assignedTechnicianId: '11',
      category: 'Machinery',
      isActive: true,
    },
    {
      id: '7',
      name: 'Tablet - Field Operations',
      serialNumber: 'TAB-2024-007',
      purchaseDate: '2024-02-14',
      warrantyExpiryDate: '2026-02-14',
      location: 'Field Operations',
      department: '8',
      assignedEmployee: '21',
      maintenanceTeamId: '3',
      assignedTechnicianId: '9',
      category: 'IT Equipment',
      isActive: true,
    },
    {
      id: '8',
      name: 'Lathe Machine MK2',
      serialNumber: 'LTH-2023-008',
      purchaseDate: '2020-04-18',
      warrantyExpiryDate: '2022-04-18',
      location: 'Machine Shop',
      department: '1',
      assignedEmployee: '24',
      maintenanceTeamId: '1',
      assignedTechnicianId: '8',
      category: 'Machinery',
      isActive: true,
    },
    {
      id: '9',
      name: 'Air Compressor Unit',
      serialNumber: 'AC-2022-009',
      purchaseDate: '2019-08-25',
      warrantyExpiryDate: '2021-08-25',
      location: 'Production Floor C',
      department: '1',
      assignedEmployee: '27',
      maintenanceTeamId: '4',
      assignedTechnicianId: '10',
      category: 'Utilities',
      isActive: true,
    },
    {
      id: '10',
      name: 'Server Rack - Data Center',
      serialNumber: 'SRV-2024-010',
      purchaseDate: '2024-05-01',
      warrantyExpiryDate: '2027-05-01',
      location: 'Data Center',
      department: '2',
      assignedEmployee: '30',
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
    {
      id: '4',
      name: 'Vehicle Maintenance',
      description: 'Fleet and vehicle maintenance specialists',
      memberIds: ['10', '13'],
    },
    {
      id: '5',
      name: 'HVAC Team',
      description: 'Heating, ventilation, and air conditioning',
      memberIds: ['11', '14'],
    },
    {
      id: '6',
      name: 'Plumbing Team',
      description: 'Plumbing and water systems maintenance',
      memberIds: ['15', '16'],
    },
    {
      id: '7',
      name: 'Electronics Repair',
      description: 'Electronic equipment and circuit board repair',
      memberIds: ['8', '9'],
    },
    {
      id: '8',
      name: 'General Maintenance',
      description: 'General facility maintenance and repairs',
      memberIds: ['17', '18'],
    },
    {
      id: '9',
      name: 'Safety Equipment',
      description: 'Safety systems and equipment maintenance',
      memberIds: ['19', '20'],
    },
    {
      id: '10',
      name: 'Production Equipment',
      description: 'Production line equipment specialists',
      memberIds: ['3', '8', '21'],
    },
    {
      id: '11',
      name: 'Network Support',
      description: 'Network infrastructure and connectivity',
      memberIds: ['5', '22'],
    },
    {
      id: '12',
      name: 'Quality Control Equipment',
      description: 'Testing and quality control equipment maintenance',
      memberIds: ['23', '24'],
    },
    {
      id: '13',
      name: 'Emergency Response',
      description: '24/7 emergency maintenance response team',
      memberIds: ['10', '11', '25'],
    },
    {
      id: '14',
      name: 'Preventive Maintenance',
      description: 'Scheduled preventive maintenance specialists',
      memberIds: ['8', '13', '26'],
    },
    {
      id: '15',
      name: 'Special Projects',
      description: 'Custom projects and installations',
      memberIds: ['14', '27', '28'],
    },
  ],
  
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'employee', teamIds: [] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'employee', teamIds: [] },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'technician', teamIds: ['1'] },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'technician', teamIds: ['1', '2'] },
    { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'technician', teamIds: ['3'] },
    { id: '6', name: 'Manager Bob', email: 'bob@example.com', role: 'manager', teamIds: [] },
    { id: '7', name: 'Alice Cooper', email: 'alice@example.com', role: 'employee', teamIds: [] },
    { id: '8', name: 'David Miller', email: 'david@example.com', role: 'technician', teamIds: ['1', '7'] },
    { id: '9', name: 'Emily Chen', email: 'emily@example.com', role: 'technician', teamIds: ['3', '7'] },
    { id: '10', name: 'Frank Wilson', email: 'frank@example.com', role: 'technician', teamIds: ['4', '13'] },
    { id: '11', name: 'Grace Lee', email: 'grace@example.com', role: 'technician', teamIds: ['5', '13'] },
    { id: '12', name: 'Henry Taylor', email: 'henry@example.com', role: 'employee', teamIds: [] },
    { id: '13', name: 'Ivy Martinez', email: 'ivy@example.com', role: 'technician', teamIds: ['4', '14'] },
    { id: '14', name: 'Jack Anderson', email: 'jack@example.com', role: 'technician', teamIds: ['5', '15'] },
    { id: '15', name: 'Karen White', email: 'karen@example.com', role: 'employee', teamIds: [] },
    { id: '16', name: 'Lucas Garcia', email: 'lucas@example.com', role: 'technician', teamIds: ['6'] },
    { id: '17', name: 'Mia Rodriguez', email: 'mia@example.com', role: 'technician', teamIds: ['8'] },
    { id: '18', name: 'Noah Lopez', email: 'noah@example.com', role: 'employee', teamIds: [] },
    { id: '19', name: 'Olivia Davis', email: 'olivia@example.com', role: 'technician', teamIds: ['9'] },
    { id: '20', name: 'Paul Moore', email: 'paul@example.com', role: 'technician', teamIds: ['9'] },
    { id: '21', name: 'Quinn Jackson', email: 'quinn@example.com', role: 'technician', teamIds: ['10'] },
    { id: '22', name: 'Rachel Thompson', email: 'rachel@example.com', role: 'technician', teamIds: ['11'] },
    { id: '23', name: 'Sam Harris', email: 'sam@example.com', role: 'technician', teamIds: ['12'] },
    { id: '24', name: 'Tina Clark', email: 'tina@example.com', role: 'employee', teamIds: [] },
    { id: '25', name: 'Victor Lewis', email: 'victor@example.com', role: 'technician', teamIds: ['13'] },
    { id: '26', name: 'Wendy Walker', email: 'wendy@example.com', role: 'technician', teamIds: ['14'] },
    { id: '27', name: 'Xavier Hall', email: 'xavier@example.com', role: 'employee', teamIds: [] },
    { id: '28', name: 'Yara Allen', email: 'yara@example.com', role: 'technician', teamIds: ['15'] },
    { id: '29', name: 'Zach Young', email: 'zach@example.com', role: 'manager', teamIds: [] },
    { id: '30', name: 'Amy King', email: 'amy@example.com', role: 'employee', teamIds: [] },
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
    {
      id: '2',
      subject: 'Routine Maintenance',
      equipmentId: '3',
      equipmentName: 'Welding Station Alpha',
      requestType: 'preventive',
      status: 'new',
      scheduledDate: '2024-12-15T09:00:00Z',
      duration: 4,
      assignedTechnicianId: '8',
      assignedTechnicianName: 'David Miller',
      maintenanceTeamId: '1',
      maintenanceTeamName: 'Mechanics',
      category: 'Machinery',
      createdAt: '2024-11-20T10:00:00Z',
      updatedAt: '2024-11-20T10:00:00Z',
      isOverdue: false,
    },
    {
      id: '3',
      subject: 'Screen Flickering',
      equipmentId: '4',
      equipmentName: 'Desktop Computer - Finance',
      requestType: 'corrective',
      status: 'repaired',
      assignedTechnicianId: '9',
      assignedTechnicianName: 'Emily Chen',
      maintenanceTeamId: '3',
      maintenanceTeamName: 'IT Support',
      category: 'IT Equipment',
      createdAt: '2024-10-15T14:00:00Z',
      updatedAt: '2024-10-16T16:30:00Z',
      completedAt: '2024-10-16T16:30:00Z',
      isOverdue: false,
    },
    {
      id: '4',
      subject: 'Battery Replacement',
      equipmentId: '5',
      equipmentName: 'Forklift 2000',
      requestType: 'preventive',
      status: 'in_progress',
      scheduledDate: '2024-11-25T08:00:00Z',
      duration: 2,
      assignedTechnicianId: '10',
      assignedTechnicianName: 'Frank Wilson',
      maintenanceTeamId: '4',
      maintenanceTeamName: 'Vehicle Maintenance',
      category: 'Vehicle',
      createdAt: '2024-11-01T09:00:00Z',
      updatedAt: '2024-11-25T08:15:00Z',
      isOverdue: false,
    },
    {
      id: '5',
      subject: 'Calibration Required',
      equipmentId: '6',
      equipmentName: '3D Printer Pro',
      requestType: 'preventive',
      status: 'new',
      scheduledDate: '2024-12-01T10:00:00Z',
      duration: 3,
      assignedTechnicianId: '11',
      assignedTechnicianName: 'Grace Lee',
      maintenanceTeamId: '2',
      maintenanceTeamName: 'Electricians',
      category: 'Machinery',
      createdAt: '2024-11-18T11:00:00Z',
      updatedAt: '2024-11-18T11:00:00Z',
      isOverdue: false,
    },
  ],
  
  departments: [
    { id: '1', name: 'Production' },
    { id: '2', name: 'IT' },
    { id: '3', name: 'Administration' },
    { id: '4', name: 'Logistics' },
    { id: '5', name: 'Finance' },
    { id: '6', name: 'Warehouse' },
    { id: '7', name: 'Research & Development' },
    { id: '8', name: 'Field Operations' },
    { id: '9', name: 'Human Resources' },
    { id: '10', name: 'Quality Assurance' },
    { id: '11', name: 'Marketing' },
    { id: '12', name: 'Sales' },
    { id: '13', name: 'Customer Service' },
    { id: '14', name: 'Engineering' },
    { id: '15', name: 'Manufacturing' },
    { id: '16', name: 'Shipping' },
    { id: '17', name: 'Purchasing' },
    { id: '18', name: 'Legal' },
    { id: '19', name: 'Security' },
    { id: '20', name: 'Facilities' },
  ],
  
  workCenters: [
    {
      id: '1',
      code: 'WC001',
      tag: 'Assembly 1',
      alternativeWorkCenterIds: ['2', '3'],
      costPerHour: 50.00,
      capacityTimeEfficiency: 100.00,
      oeeTarget: 34.59,
    },
    {
      id: '2',
      code: 'WC002',
      tag: 'Drill 1',
      alternativeWorkCenterIds: ['1'],
      costPerHour: 75.00,
      capacityTimeEfficiency: 100.00,
      oeeTarget: 90.00,
    },
    {
      id: '3',
      code: 'WC003',
      tag: 'Assembly 2',
      alternativeWorkCenterIds: ['1'],
      costPerHour: 52.00,
      capacityTimeEfficiency: 98.50,
      oeeTarget: 35.20,
    },
    {
      id: '4',
      code: 'WC004',
      tag: 'Welding Station',
      alternativeWorkCenterIds: ['5'],
      costPerHour: 85.00,
      capacityTimeEfficiency: 95.00,
      oeeTarget: 78.50,
    },
    {
      id: '5',
      code: 'WC005',
      tag: 'Cutting Station',
      alternativeWorkCenterIds: ['4'],
      costPerHour: 80.00,
      capacityTimeEfficiency: 92.00,
      oeeTarget: 82.30,
    },
    {
      id: '6',
      code: 'WC006',
      tag: 'Quality Control',
      alternativeWorkCenterIds: ['7'],
      costPerHour: 65.00,
      capacityTimeEfficiency: 100.00,
      oeeTarget: 88.00,
    },
    {
      id: '7',
      code: 'WC007',
      tag: 'Inspection Station',
      alternativeWorkCenterIds: ['6'],
      costPerHour: 60.00,
      capacityTimeEfficiency: 100.00,
      oeeTarget: 85.50,
    },
    {
      id: '8',
      code: 'WC008',
      tag: 'Packaging Line',
      alternativeWorkCenterIds: ['9'],
      costPerHour: 45.00,
      capacityTimeEfficiency: 105.00,
      oeeTarget: 75.00,
    },
    {
      id: '9',
      code: 'WC009',
      tag: 'Shipping Dock',
      alternativeWorkCenterIds: ['8'],
      costPerHour: 40.00,
      capacityTimeEfficiency: 100.00,
      oeeTarget: 70.00,
    },
    {
      id: '10',
      code: 'WC010',
      tag: 'Testing Lab',
      alternativeWorkCenterIds: [],
      costPerHour: 95.00,
      capacityTimeEfficiency: 90.00,
      oeeTarget: 92.00,
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

