import React, { useState } from 'react';
import { CreditCard, Calendar, CheckCircle, AlertTriangle, Download, Zap } from 'lucide-react';
import { Business } from '../types';
import { businesses } from '../data/mockData';

export const BillingPayment: React.FC = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    {
      id: 'basic',
      name: 'پایه',
      price: 500000,
      features: ['تا 10 کاربر', 'پشتیبانی ایمیلی', '5GB فضای ذخیره‌سازی', 'گزارش‌گیری پایه'],
      popular: false
    },
    {
      id: 'premium',
      name: 'حرفه‌ای',
      price: 1200000,
      features: ['تا 50 کاربر', 'پشتیبانی تلفنی', '20GB فضای ذخیره‌سازی', 'گزارش‌گیری پیشرفته', 'API دسترسی'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'سازمانی',
      price: 2500000,
      features: ['کاربران نامحدود', 'پشتیبانی اختصاصی', 'فضای نامحدود', 'گزارش‌گیری سفارشی', 'تیکت‌های اولویت‌دار'],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'کارت بانکی', icon: CreditCard },
    { id: 'wallet', name: 'کیف پول', icon: Zap },
    { id: 'transfer', name: 'انتقال بانکی', icon: Download }
  ];

  const getBusinessStatus = (business: Business) => {
    const daysLeft = Math.ceil((business.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 0) return { status: 'expired', text: 'منقضی شده', color: 'text-red-600' };
    if (daysLeft <= 30) return { status: 'warning', text: `${daysLeft} روز باقی‌مانده`, color: 'text-orange-600' };
    return { status: 'active', text: 'فعال', color: 'text-green-600' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <CreditCard className="text-blue-600" size={28} />
              پرداخت و تمدید سرویس
            </h2>
            <p className="text-gray-500 mt-1">مدیریت اشتراک و پرداخت کسب‌وکارها</p>
          </div>
        </div>
      </div>

      {/* Business Status Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {businesses.map((business) => {
          const statusInfo = getBusinessStatus(business);
          return (
            <div key={business.id} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-500">طرح {business.plan}</p>
                </div>
                <span className={`font-medium ${statusInfo.color}`}>
                  {statusInfo.text}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">تاریخ انقضا:</span>
                  <span className="font-medium">{business.expiryDate.toLocaleDateString('fa-IR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">تعداد کاربران:</span>
                  <span className="font-medium">{business.userCount} نفر</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">وضعیت:</span>
                  <span className={`font-medium ${business.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {business.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedBusiness(business);
                    setShowPayment(true);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  تمدید سرویس
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  مشاهده فاکتور
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Plans */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">طرح‌های اشتراک</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-xl p-6 relative transition-all duration-200 cursor-pointer hover:shadow-md ${
                plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-1/2 transform translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">محبوب‌ترین</span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h4 className="font-semibold text-gray-900 text-lg">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-gray-500 text-sm mr-1">تومان/ماهانه</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setShowPayment(true);
                }}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                انتخاب طرح
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900">تاریخچه پرداخت‌ها</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">تاریخ</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">کسب‌وکار</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">طرح</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">مبلغ</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">وضعیت</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-600">1403/01/15</td>
                <td className="py-4 px-6 text-gray-900">شرکت تکنولوژی پردازش</td>
                <td className="py-4 px-6 text-gray-600">حرفه‌ای</td>
                <td className="py-4 px-6 text-gray-900">1,200,000 تومان</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    پرداخت شده
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    مشاهده فاکتور
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-600">1402/12/10</td>
                <td className="py-4 px-6 text-gray-900">موسسه مشاوره کسب‌وکار</td>
                <td className="py-4 px-6 text-gray-600">پایه</td>
                <td className="py-4 px-6 text-gray-900">500,000 تومان</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    در انتظار
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-orange-600 hover:text-orange-700 text-sm">
                    پیگیری پرداخت
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">پرداخت و تمدید سرویس</h3>
              {selectedBusiness && (
                <p className="text-sm text-gray-500 mt-1">{selectedBusiness.name}</p>
              )}
            </div>
            
            <div className="p-6 space-y-6">
              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">انتخاب طرح</label>
                <div className="grid gap-3">
                  {plans.map((plan) => (
                    <label key={plan.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={selectedPlan === plan.id}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`border rounded-lg p-4 transition-colors ${
                        selectedPlan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{plan.name}</h4>
                            <p className="text-sm text-gray-500">{plan.features.slice(0, 2).join(' • ')}</p>
                          </div>
                          <span className="font-semibold text-lg">{plan.price.toLocaleString('fa-IR')} تومان</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">روش پرداخت</label>
                <div className="grid gap-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <label key={method.id} className="cursor-pointer">
                        <input type="radio" name="payment" className="sr-only" />
                        <div className="border rounded-lg p-4 hover:border-gray-300 transition-colors flex items-center gap-3">
                          <IconComponent size={20} className="text-gray-600" />
                          <span>{method.name}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">خلاصه پرداخت</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>طرح انتخابی:</span>
                    <span>{selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مدت اشتراک:</span>
                    <span>1 ماه</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تخفیف:</span>
                    <span className="text-green-600">-50,000 تومان</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>مبلغ کل:</span>
                    <span>
                      {selectedPlan ? (plans.find(p => p.id === selectedPlan)?.price || 0).toLocaleString('fa-IR') : '0'} تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3">
              <button 
                onClick={() => {
                  setShowPayment(false);
                  setSelectedBusiness(null);
                  setSelectedPlan('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                انصراف
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                پرداخت
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};