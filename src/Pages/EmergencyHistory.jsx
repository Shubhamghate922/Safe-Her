import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Shield, Clock, MapPin, ChevronDown, ChevronUp, Users } from 'lucide-react';

const EmergencyHistory = () => {
  const historyData = [
    {
      id: 1,
      date: '2026-07-20',
      time: '22:14',
      location: 'Andheri West, Mumbai',
      status: 'RESOLVED',
      details: 'SOS alert triggered. Location shared with 3 contacts. Police notified.',
      responseTime: '2 mins',
      contactsNotified: ['Ravi Doe', 'Meera Doe', 'Priya Singh'],
    },
    {
      id: 2,
      date: '2026-07-18',
      time: '19:02',
      location: 'Bandra Station',
      status: 'RESOLVED',
      details: 'Safety check-in missed. Auto-alert sent to emergency contacts.',
      responseTime: '5 mins',
      contactsNotified: ['Ravi Doe', 'Meera Doe'],
    },
    {
      id: 3,
      date: '2026-07-15',
      time: '08:44',
      location: 'Powai Lake Rd',
      status: 'TEST',
      details: 'Test alert conducted. All systems functioning properly.',
      responseTime: '1 min',
      contactsNotified: ['All Contacts'],
    },
    {
      id: 4,
      date: '2026-07-10',
      time: '23:31',
      location: 'Marine Drive',
      status: 'RESOLVED',
      details: 'Live location shared. Contact confirmed safety.',
      responseTime: '3 mins',
      contactsNotified: ['Ravi Doe'],
    },
    {
      id: 5,
      date: '2026-07-05',
      time: '17:10',
      location: 'Colaba',
      status: 'CANCELLED',
      details: 'Alert cancelled by user. False alarm.',
      responseTime: 'N/A',
      contactsNotified: [],
    },
    {
      id: 6,
      date: '2026-06-28',
      time: '20:55',
      location: 'Juhu Beach',
      status: 'RESOLVED',
      details: 'SOS alert triggered. Contact responded within 2 minutes.',
      responseTime: '2 mins',
      contactsNotified: ['Ravi Doe', 'Meera Doe', 'Priya Singh'],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-green-100 text-green-700';
      case 'TEST':
        return 'bg-purple-100 text-purple-700';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <CheckCircle size={14} className="text-green-600" />;
      case 'TEST':
        return <Shield size={14} className="text-purple-600" />;
      case 'CANCELLED':
        return <XCircle size={14} className="text-gray-500" />;
      default:
        return <AlertTriangle size={14} className="text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
              <AlertTriangle className="text-purple-600 hover:scale-110 transition-transform duration-300" size={24} />
              Emergency History
            </h1>
            <p className="text-sm text-gray-500 mt-1 hover:text-purple-500 transition-colors duration-300">
              Every alert, logged and searchable.
            </p>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Date/Time</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Location</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Status</span>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {historyData.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-purple-50 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">{item.date}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                          <Clock size={12} />
                          {item.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400 hover:text-purple-600 transition-colors duration-300" />
                        <span className="text-sm text-gray-700 hover:text-purple-600 transition-colors duration-300">{item.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full hover:scale-105 transition-all duration-300 ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-purple-600 text-sm font-semibold hover:underline flex items-center gap-1 justify-end hover:scale-105 transition-all duration-300"
                      >
                        View
                        <ChevronDown size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">{historyData.length}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                <AlertTriangle size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 hover:text-green-500 transition-colors duration-300">Resolved</p>
                <p className="text-2xl font-bold text-green-600 hover:scale-105 transition-transform duration-300">
                  {historyData.filter(i => i.status === 'RESOLVED').length}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-full hover:bg-green-100 hover:scale-110 transition-all duration-300">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">Tests</p>
                <p className="text-2xl font-bold text-purple-600 hover:scale-105 transition-transform duration-300">
                  {historyData.filter(i => i.status === 'TEST').length}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                <Shield size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 hover:text-blue-500 transition-colors duration-300">Avg Response</p>
                <p className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform duration-300">2.6 min</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full hover:bg-blue-100 hover:scale-110 transition-all duration-300">
                <Clock size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Safety Tip */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 hover:scale-110 hover:rotate-6 transition-all duration-300">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">Safety Tip</h4>
              <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5 hover:text-purple-700 transition-colors duration-300">
                Share your live trip with a trusted contact before entering any cab. 
                Your contacts will receive real-time location updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHistory;