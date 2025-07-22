import React, { useState } from 'react';
import { Mail, Plus, Search, Filter, Send, Star, Archive, Reply, Forward, Paperclip } from 'lucide-react';
import { Correspondence } from '../types';
import { correspondences, users } from '../data/mockData';

export const CorrespondenceSystem: React.FC = () => {
  const [correspondenceList, setCorrespondenceList] = useState<Correspondence[]>(correspondences);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Correspondence | null>(null);

  const filteredCorrespondences = correspondenceList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      read: 'bg-green-100 text-green-800',
      replied: 'bg-purple-100 text-purple-800',
      archived: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Mail className="text-blue-600" size={28} />
              سیستم نامه‌نگاری
            </h2>
            <p className="text-gray-500 mt-1">مدیریت کامل نامه‌نگاری اداری با سطوح دسترسی</p>
          </div>
          <button 
            onClick={() => setShowCompose(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            نامه جدید
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="جستجو در نامه‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="draft">پیش‌نویس</option>
              <option value="sent">ارسال شده</option>
              <option value="read">خوانده شده</option>
              <option value="replied">پاسخ داده شده</option>
              <option value="archived">آرشیو شده</option>
            </select>
          </div>
          <div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">همه اولویت‌ها</option>
              <option value="urgent">فوری</option>
              <option value="high">مهم</option>
              <option value="medium">متوسط</option>
              <option value="low">کم</option>
            </select>
          </div>
        </div>
      </div>

      {/* Correspondence List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900">فهرست نامه‌ها</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredCorrespondences.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(item.priority)}`}>
                      {item.priority === 'urgent' ? 'فوری' : 
                       item.priority === 'high' ? 'مهم' :
                       item.priority === 'medium' ? 'متوسط' : 'کم'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status === 'draft' ? 'پیش‌نویس' :
                       item.status === 'sent' ? 'ارسال شده' :
                       item.status === 'read' ? 'خوانده شده' :
                       item.status === 'replied' ? 'پاسخ داده شده' : 'آرشیو شده'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>فرستنده: {item.sender.name}</span>
                    <span>گیرندگان: {item.recipients.length} نفر</span>
                    <span>{item.createdAt.toLocaleDateString('fa-IR')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Reply size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Forward size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Star size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Archive size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCorrespondences.length === 0 && (
          <div className="text-center py-12">
            <Mail className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">هیچ نامه‌ای یافت نشد</p>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">نامه جدید</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">موضوع</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="موضوع نامه"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اولویت</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="low">کم</option>
                    <option value="medium">متوسط</option>
                    <option value="high">مهم</option>
                    <option value="urgent">فوری</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">گیرندگان</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">انتخاب گیرنده</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">متن نامه</label>
                <textarea
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="متن نامه را اینجا بنویسید..."
                ></textarea>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Paperclip size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">ضمیمه فایل</span>
                  <input type="file" multiple className="hidden" />
                </label>
              </div>
            </div>
            
            <div className="p-6 border-t flex gap-3">
              <button 
                onClick={() => setShowCompose(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                انصراف
              </button>
              <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                پیش‌نویس
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Send size={16} />
                ارسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};