import React, { useState, useEffect } from 'react';
import { X, User, Mail, Shield, MapPin, Activity, Plus } from 'lucide-react';

const UserModal = ({ isOpen, onClose, onSubmit, initialData = null, title = 'Add New User' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member',
    status: 'Active',
    safetyScore: 95,
    city: 'Mumbai',
    contactName: '',
    contactPhone: '',
    contactRelation: 'Family',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || 'Member',
        status: initialData.status || 'Active',
        safetyScore: initialData.safetyScore !== undefined ? initialData.safetyScore : 95,
        city: initialData.city || 'Mumbai',
        contactName: initialData.emergencyContacts?.[0]?.name || '',
        contactPhone: initialData.emergencyContacts?.[0]?.phone || '',
        contactRelation: initialData.emergencyContacts?.[0]?.relation || 'Family',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'Member',
        status: 'Active',
        safetyScore: 95,
        city: 'Mumbai',
        contactName: '',
        contactPhone: '',
        contactRelation: 'Family',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      safetyScore: Number(formData.safetyScore),
      city: formData.city,
    };

    if (formData.contactName && formData.contactPhone) {
      payload.emergencyContacts = [
        {
          name: formData.contactName,
          phone: formData.contactPhone,
          relation: formData.contactRelation,
        },
      ];
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-purple-100 transform transition-all">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User size={20} />
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Shreya Gupta"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. shreya@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Protected User">Protected User</option>
                <option value="Member">Member</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Safety Score (0-100)</label>
              <input
                type="number"
                name="safetyScore"
                min="0"
                max="100"
                value={formData.safetyScore}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai, Delhi, Bengaluru"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <h4 className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-1">
              <Shield size={14} /> Emergency Contact (BSON Sub-document)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Contact Name"
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200"
              />
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200"
              />
              <input
                type="text"
                name="contactRelation"
                value={formData.contactRelation}
                onChange={handleChange}
                placeholder="Relation (e.g. Parent)"
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity shadow-md flex items-center gap-1"
            >
              {initialData ? 'Update Document (PUT)' : 'Create User (POST)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
