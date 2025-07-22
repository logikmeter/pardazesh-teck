import React, { useState } from 'react';
import { Clock, Calendar, MapPin, TrendingUp, UserCheck, AlertCircle, Download } from 'lucide-react';
import { AttendanceRecord } from '../types';
import { attendanceRecords, users } from '../data/mockData';

export const AttendanceTracking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedUser, setSelectedUser] = useState('all');
  const [showCheckIn, setShowCheckIn] = useState(false);

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date.toISOString().split('T')[0] === selectedDate;
    const matchesUser = selectedUser === 'all' || record.userId === selectedUser;
    return matchesDate && matchesUser;
  });

  const todayStats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    absent: users.length - attendanceRecords.length,
    totalHours: attendanceRecords.reduce((sum, r) => sum + r.totalHours, 0)
  };

  const getStatusColor = (status: string) => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      late: 'bg-orange-100 text-orange-800',
      absent: 'bg-red-100 text-red-800',
      'half-day': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || colors.present;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Clock className="text-blue-600" size={28} />
              سیستم حضور و غیاب
            </h2>
            <p className="text-gray-500 mt-1">پیگیری دقیق و سازماندهی شده حضور و غیاب کارکنان</p>
          </div>
          <button 
            onClick={() => setShowCheckIn(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <UserCheck size={18} />
            ثبت حضور
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">حاضران امروز</p>
              <p className="text-2xl font-bold text-green-600">{todayStats.present}</p>
              <p className="text-sm text-gray-500">از {users.length} نفر</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">تأخیرها</p>
              <p className="text-2xl font-bold text-orange-600">{todayStats.late}</p>
              <p className="text-sm text-gray-500">نیاز به پیگیری</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <AlertCircle className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">غایبان</p>
              <p className="text-2xl font-bold text-red-600">{todayStats.absent}</p>
              <p className="text-sm text-gray-500">عذر موجه</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <Calendar className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">کل ساعات کاری</p>
              <p className="text-2xl font-bold text-blue-600">{todayStats.totalHours.toFixed(1)}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <TrendingUp size={14} />
                +5% نسبت به دیروز
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Clock className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">کارمند</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">همه کارمندان</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عملیات</label>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Download size={16} />
                گزارش Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900">گزارش حضور و غیاب</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">کارمند</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">ورود</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">خروج</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">کل ساعات</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">وضعیت</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">محل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const user = users.find(u => u.id === record.userId);
                return (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
                          alt={user?.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {record.checkIn ? record.checkIn.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {record.checkOut ? record.checkOut.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{record.totalHours} ساعت</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(record.status)}`}>
                        {record.status === 'present' ? 'حاضر' :
                         record.status === 'late' ? 'تأخیر' :
                         record.status === 'absent' ? 'غایب' : 'نیم‌روز'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={14} />
                        {record.location || '-'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Clock className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">هیچ رکوردی برای این تاریخ یافت نشد</p>
          </div>
        )}
      </div>

      {/* Check-in Modal */}
      {showCheckIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">ثبت حضور</h3>
            <div className="space-y-4">
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <Clock className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">محل حضور</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="office">دفتر مرکزی</option>
                  <option value="remote">دورکاری</option>
                  <option value="field">کار میدانی</option>
                  <option value="meeting">جلسه خارجی</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات (اختیاری)</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="توضیحات تکمیلی..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCheckIn(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                انصراف
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                ثبت حضور
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};