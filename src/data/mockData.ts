import { User, Business, Meeting, Correspondence, AttendanceRecord, Project, Customer } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'علی محمدی',
  email: 'ali@company.com',
  role: 'مدیر سیستم',
  businessId: '1',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
};

export const businesses: Business[] = [
  {
    id: '1',
    name: 'شرکت تکنولوژی پردازش',
    plan: 'premium',
    expiryDate: new Date('2024-12-31'),
    isActive: true,
    userCount: 25,
    settings: {
      rtl: true,
      theme: 'light',
      timezone: 'Asia/Tehran',
      currency: 'IRR'
    }
  },
  {
    id: '2',
    name: 'موسسه مشاوره کسب‌وکار',
    plan: 'basic',
    expiryDate: new Date('2024-06-30'),
    isActive: true,
    userCount: 12,
    settings: {
      rtl: true,
      theme: 'light',
      timezone: 'Asia/Tehran',
      currency: 'IRR'
    }
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'علی محمدی',
    email: 'ali@company.com',
    role: 'مدیر سیستم',
    businessId: '1',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'سارا حسینی',
    email: 'sara@company.com',
    role: 'مدیر فروش',
    businessId: '1',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'محمد رضایی',
    email: 'mohammad@company.com',
    role: 'توسعه‌دهنده',
    businessId: '1',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const meetings: Meeting[] = [
  {
    id: '1',
    title: 'جلسه بررسی پروژه',
    description: 'بررسی پیشرفت پروژه‌های جاری',
    date: new Date('2024-02-20T10:00:00'),
    duration: 60,
    attendees: users.slice(0, 2),
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'برنامه‌ریزی فروش ماهانه',
    description: 'بررسی اهداف فروش و استراتژی‌های جدید',
    date: new Date('2024-02-22T14:00:00'),
    duration: 90,
    attendees: users,
    status: 'scheduled'
  }
];

export const correspondences: Correspondence[] = [
  {
    id: '1',
    title: 'درخواست بودجه پروژه جدید',
    content: 'احتراماً، درخواست تخصیص بودجه برای پروژه توسعه سامانه جدید را دارم.',
    sender: users[2],
    recipients: [users[0]],
    priority: 'high',
    status: 'sent',
    createdAt: new Date('2024-02-19T09:30:00')
  },
  {
    id: '2',
    title: 'گزارش پیشرفت پروژه',
    content: 'گزارش هفتگی پیشرفت پروژه‌های در دست اقدام',
    sender: users[1],
    recipients: [users[0]],
    priority: 'medium',
    status: 'read',
    createdAt: new Date('2024-02-18T16:00:00')
  }
];

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    userId: '1',
    date: new Date('2024-02-19'),
    checkIn: new Date('2024-02-19T08:00:00'),
    checkOut: new Date('2024-02-19T17:30:00'),
    breakTime: 60,
    totalHours: 8.5,
    status: 'present',
    location: 'دفتر مرکزی'
  },
  {
    id: '2',
    userId: '2',
    date: new Date('2024-02-19'),
    checkIn: new Date('2024-02-19T08:15:00'),
    checkOut: new Date('2024-02-19T17:00:00'),
    breakTime: 45,
    totalHours: 8,
    status: 'late',
    location: 'دفتر مرکزی'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'سامانه مدیریت مشتریان',
    description: 'توسعه سامانه CRM جدید',
    status: 'in-progress',
    progress: 65,
    assignees: users.slice(1, 3),
    deadline: new Date('2024-03-15'),
    budget: 50000000
  },
  {
    id: '2',
    name: 'بهینه‌سازی وب‌سایت',
    description: 'بهبود عملکرد و SEO وب‌سایت شرکت',
    status: 'planning',
    progress: 25,
    assignees: [users[2]],
    deadline: new Date('2024-04-01'),
    budget: 25000000
  }
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'شرکت صنایع غذایی آریا',
    email: 'info@arya-food.com',
    phone: '021-88776655',
    company: 'صنایع غذایی آریا',
    status: 'active',
    lastContact: new Date('2024-02-18'),
    value: 75000000
  },
  {
    id: '2',
    name: 'موسسه آموزشی پیشرو',
    email: 'contact@pishro.edu',
    phone: '021-77665544',
    company: 'موسسه آموزشی پیشرو',
    status: 'prospect',
    lastContact: new Date('2024-02-15'),
    value: 30000000
  }
];