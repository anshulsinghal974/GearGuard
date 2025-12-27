export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiryDate: string;
  location: string;
  department: string;
  assignedEmployee: string;
  maintenanceTeamId: string;
  assignedTechnicianId: string;
  category: string;
  isActive: boolean;
  notes?: string;
}

export interface MaintenanceTeam {
  id: string;
  name: string;
  description?: string;
  memberIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'manager' | 'technician' | 'employee';
  teamIds: string[];
}

export interface MaintenanceRequest {
  id: string;
  subject: string;
  equipmentId: string;
  equipmentName?: string;
  requestType: 'corrective' | 'preventive';
  scheduledDate?: string;
  duration?: number; // in hours
  status: 'new' | 'in_progress' | 'repaired' | 'scrap';
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  maintenanceTeamId: string;
  maintenanceTeamName?: string;
  category?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  isOverdue?: boolean;
}

export interface Department {
  id: string;
  name: string;
}

export interface WorkCenter {
  id: string;
  code: string;
  tag: string;
  alternativeWorkCenterIds: string[];
  costPerHour: number;
  capacityTimeEfficiency: number; // Percentage (0-100)
  oeeTarget: number; // Overall Equipment Effectiveness Target (0-100)
}

