import React from 'react';
import { 
  Users, 
  Calendar, 
  Mail, 
  Clock, 
  TrendingUp, 
  Building2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { businesses, users, meetings, correspondences, attendanceRecords, projects } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const todayAttendance = attendanceRecords.filter(record => {
    const today = new Date().toDateString();
    return record.date.toDateString() === today;
  });

  const upcomingMeetings = meetings.filter(meeting => meeting.date > new Date());
  const unreadCorrespondences = correspondences.filter(c => c.status === 'sent');
  const activeProjects = projects.filter(p => p.status === 'in-progress');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">داشبورد مدیریت کسب‌وکار</h2>
        <p className="text-blue-100">مدیریت یکپارچه و هوشمند کسب‌وکارها</p>
      </div>

      {/* Business Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-blue-600" />
          کسب‌وکارهای فعال
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {businesses.map((business) => (
            <div key={business.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{business.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  business.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {business.isActive ? 'فعال' : 'غیرفعال'}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>طرح اشتراک:</span>
                  <span className="font-medium">{business.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span>تعداد کاربران:</span>
                  <span className="font-medium">{business.userCount} نفر</span>
                </div>
                <div className="flex justify-between">
                  <span>انقضا:</span>
                  <span className="font-medium">{business.expiryDate.toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">کاربران فعال</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp size={14} />
                +12% این ماه
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">جلسات امروز</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingMeetings.length}</p>
              <p className="text-blue-600 text-sm">برنامه‌ریزی شده</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">نامه‌های خوانده نشده</p>
              <p className="text-2xl font-bold text-gray-900">{unreadCorrespondences.length}</p>
              <p className="text-orange-600 text-sm">نیاز به بررسی</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Mail className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">حضور امروز</p>
              <p className="text-2xl font-bold text-gray-900">{todayAttendance.length}</p>
              <p className="text-purple-600 text-sm">از {users.length} نفر</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Clock className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Meetings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-green-600" />
            جلسات پیش رو
          </h3>
          <div className="space-y-3">
            {upcomingMeetings.slice(0, 3).map((meeting) => (
              <div key={meeting.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                  <p className="text-sm text-gray-500">
                    {meeting.date.toLocaleDateString('fa-IR')} - {meeting.date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{meeting.duration} دقیقه</span>
              </div>
            ))}
            {upcomingMeetings.length === 0 && (
              <p className="text-gray-500 text-center py-4">جلسه‌ای برنامه‌ریزی نشده است</p>
            )}
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-blue-600" />
            وضعیت پروژه‌ها
          </h3>
          <div className="space-y-3">
            {activeProjects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  مهلت: {project.deadline.toLocaleDateString('fa-IR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-medium text-yellow-800">اطلاعیه‌های سیستم</h4>
            <p className="text-yellow-700 text-sm mt-1">
              2 کسب‌وکار در 30 روز آینده نیاز به تمدید اشتراک دارند. 
              <button className="font-medium underline mr-2">مشاهده جزئیات</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};