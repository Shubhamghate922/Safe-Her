import React from 'react';
import { Phone, MessageSquare, MapPin, Shield, Users, CheckCircle, Star, Trash2, Plus } from 'lucide-react';

const EmergencyContacts = () => {
  const contacts = [
    { id: 1, name: 'Ravi Doe', initials: 'RD', phone: '+91 90000 12345', relation: 'Father', status: 'active', isPrimary: true, email: 'ravi.doe@email.com' },
    { id: 2, name: 'Meera Doe', initials: 'MD', phone: '+91 90000 23456', relation: 'Mother', status: 'active', isPrimary: false, email: 'meera.doe@email.com' },
    { id: 3, name: 'Aarav Kumar', initials: 'AK', phone: '+91 90000 34567', relation: 'Brother', status: 'active', isPrimary: false, email: 'aarav.kumar@email.com' },
    { id: 4, name: 'Priya Singh', initials: 'PS', phone: '+91 90000 45678', relation: 'Best Friend', status: 'active', isPrimary: false, email: 'priya.singh@email.com' },
    { id: 5, name: 'Officer Rao', initials: 'OR', phone: '+91 100', relation: 'Local Police', status: 'active', isPrimary: false, email: 'police@emergency.in' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
              <Users className="text-purple-600 hover:scale-110 transition-transform duration-300" size={24} />
              Emergency Contacts
            </h1>
            <p className="text-sm text-gray-500 mt-1 hover:text-purple-500 transition-colors duration-300">These people will be alerted the moment you tap SOS.</p>
          </div>
          <button className="bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-purple-700 hover:scale-105 hover:shadow-lg transition-all duration-300">
            <Plus size={18} className="hover:rotate-90 transition-transform duration-300" />
            Add Contact
          </button>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Photo</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Name</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Phone</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Relation</span>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-purple-50 hover:scale-[1.01] transition-all duration-300 cursor-pointer">
                    {/* Photo/Avatar */}
                    <td className="px-6 py-4">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm hover:scale-110 hover:rotate-6 transition-all duration-300
                          ${contact.isPrimary ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-purple-600'}`}>
                          {contact.initials}
                        </div>
                        {contact.isPrimary && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5 hover:scale-110 hover:rotate-12 transition-all duration-300">
                            
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800 hover:text-purple-600 hover:scale-105 transition-all duration-300">{contact.name}</span>
                        {contact.isPrimary && (
                          <span className="text-[8px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold hover:bg-yellow-200 hover:scale-105 transition-all duration-300">
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 hover:text-purple-600 hover:scale-105 transition-all duration-300 inline-block">{contact.phone}</span>
                    </td>

                    {/* Relation */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 hover:text-purple-600 hover:scale-105 transition-all duration-300 inline-block">{contact.relation}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-purple-100 hover:scale-110 hover:rotate-3 rounded-full transition-all duration-300 text-purple-600">
                          <Phone size={16} />
                        </button>
                        <button className="p-2 hover:bg-purple-100 hover:scale-110 hover:-rotate-3 rounded-full transition-all duration-300 text-purple-600">
                          <MessageSquare size={16} />
                        </button>
                        <button className="p-2 hover:bg-purple-100 hover:scale-110 hover:rotate-3 rounded-full transition-all duration-300 text-purple-600">
                          <MapPin size={16} />
                        </button>
                        <button className="p-2 hover:bg-yellow-100 hover:scale-110 hover:rotate-6 rounded-full transition-all duration-300 text-yellow-600">
                          <Star size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-100 hover:scale-110 hover:-rotate-3 rounded-full transition-all duration-300 text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="bg-purple-50 p-3 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
              <Users size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">{contacts.length}</p>
              <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">Total Contacts</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="bg-green-50 p-3 rounded-full hover:bg-green-100 hover:scale-110 transition-all duration-300">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors duration-300">{contacts.filter(c => c.status === 'active').length}</p>
              <p className="text-xs text-gray-500 hover:text-green-500 transition-colors duration-300">Active Contacts</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="bg-yellow-50 p-3 rounded-full hover:bg-yellow-100 hover:scale-110 transition-all duration-300">
              <Star size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 hover:text-yellow-600 transition-colors duration-300">{contacts.filter(c => c.isPrimary).length}</p>
              <p className="text-xs text-gray-500 hover:text-yellow-500 transition-colors duration-300">Primary Contact</p>
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

export default EmergencyContacts;