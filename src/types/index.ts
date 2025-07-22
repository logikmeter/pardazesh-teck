export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  businessId: string;
  lastLogin?: Date;
}

export interface Business {
  id: string;
  name: string;
  logo?: string;
  plan: 'basic' | 'premium' | 'enterprise';
  expiryDate: Date;
  isActive: boolean;
  userCount: number;
  settings: BusinessSettings;
}

export interface BusinessSettings {
  rtl: boolean;
  theme: string;
  timezone: string;
  currency: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  attendees: User[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface Correspondence {
  id: string;
  title: string;
  content: string;
  sender: User;
  recipients: User[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'sent' | 'read' | 'replied' | 'archived';
  createdAt: Date;
  attachments?: string[];
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  breakTime: number;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  assignees: User[];
  deadline: Date;
  budget?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'prospect' | 'active' | 'inactive';
  lastContact?: Date;
  value: number;
}