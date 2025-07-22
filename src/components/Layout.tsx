import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  Mail, 
  Clock, 
  FolderOpen, 
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { currentUser } from '../data/mockData';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'داشبورد', icon: Home },
  { id: 'users', label: 'کاربران', icon: Users },
  { id: 'meetings', label: 'جلسات', icon: Calendar },
  { id: 'correspondence', label: 'نامه‌نگاری', icon: Mail },
  { id: 'attendance', label: 'حضور و غیاب', icon: Clock },
  { id: 'projects', label: 'پروژه‌ها', icon: FolderOpen },
  { id: 'customers', label: 'مشتریان', icon: Building2 },
  { id: 'messages', label: 'پیام‌ها', icon: MessageSquare },
  { id: 'billing', label: 'پرداخت', icon: CreditCard },
];

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">سیستم مدیریت کسب‌وکار</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white border-l transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200
                    ${activeTab === item.id 
                      ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen p-6">
          {children}
        </main>
      </div>
    </div>
  );
};