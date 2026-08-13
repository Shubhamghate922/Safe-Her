import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, MapPin, Shield, Users, 
  CheckCircle, Star, Trash2, Plus, Loader2, Edit2
} from 'lucide-react';
import { contactsAPI } from '../services/api';
import toast from 'react-hot-toast';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    isPrimary: false,
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await contactsAPI.getAll();
      if (response.success) {
        setContacts(response.data);
      }
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        const response = await contactsAPI.update(editingContact._id, formData);
        if (response.success) {
          toast.success('Contact updated successfully');
          setShowAddModal(false);
          setEditingContact(null);
          fetchContacts();
        }
      } else {
        const response = await contactsAPI.create(formData);
        if (response.success) {
          toast.success('Contact added successfully');
          setShowAddModal(false);
          fetchContacts();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await contactsAPI.delete(id);
      if (response.success) {
        toast.success('Contact deleted successfully');
        fetchContacts();
      }
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      relationship: contact.relationship,
      isPrimary: contact.isPrimary,
    });
    setShowAddModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-purple-600" />
      </div>
    );
  }

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
            <p className="text-sm text-gray-500 mt-1 hover:text-purple-500 transition-colors duration-300">
              These people will be alerted the moment you tap SOS.
            </p>
          </div>
          <button 
            onClick={() => {
              setEditingContact(null);
              setFormData({ name: '', phone: '', email: '', relationship: '', isPrimary: false });
              setShowAddModal(true);
            }}
            className="bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-purple-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <Plus size={18} className="hover:rotate-90 transition-transform duration-300" />
            Add Contact
          </button>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          {contacts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-semibold">No emergency contacts</p>
              <p className="text-sm">Add your trusted contacts who will be alerted during emergencies</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Name</span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Phone</span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Relation</span>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Primary</span>
                    </th>
                    <th className="px-6 py-4 text-right">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-purple-600 transition-colors duration-300">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-purple-50 hover:scale-[1.01] transition-all duration-300 cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm hover:scale-110 hover:rotate-6 transition-all duration-300
                            ${contact.isPrimary ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-purple-600'}`}>
                            {contact.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-800 hover:text-purple-600 hover:scale-105 transition-all duration-300">
                              {contact.name}
                            </span>
                            {contact.email && (
                              <p className="text-xs text-gray-500">{contact.email}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 hover:text-purple-600 hover:scale-105 transition-all duration-300 inline-block">
                          {contact.phone}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 hover:text-purple-600 hover:scale-105 transition-all duration-300 inline-block">
                          {contact.relationship}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {contact.isPrimary && (
                          <Star size={20} className="text-yellow-400 hover:scale-110 transition-transform duration-300" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => handleEdit(contact)}
                            className="p-2 hover:bg-blue-100 hover:scale-110 hover:rotate-3 rounded-full transition-all duration-300 text-blue-600"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(contact._id)}
                            className="p-2 hover:bg-red-100 hover:scale-110 hover:-rotate-3 rounded-full transition-all duration-300 text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
              <p className="text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors duration-300">
                {contacts.filter(c => c.isPrimary).length}
              </p>
              <p className="text-xs text-gray-500 hover:text-green-500 transition-colors duration-300">Primary Contacts</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="bg-yellow-50 p-3 rounded-full hover:bg-yellow-100 hover:scale-110 transition-all duration-300">
              <Star size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 hover:text-yellow-600 transition-colors duration-300">
                {contacts.filter(c => c.relationship).length}
              </p>
              <p className="text-xs text-gray-500 hover:text-yellow-500 transition-colors duration-300">Relationships</p>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {editingContact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Husband">Husband</option>
                    <option value="Wife">Wife</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPrimary"
                    checked={formData.isPrimary}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="text-sm text-gray-700">Set as primary contact</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {editingContact ? 'Update' : 'Add'} Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;