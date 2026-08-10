import React from 'react';
import { X, Database, ShieldCheck, MapPin, Phone, Code, Clock } from 'lucide-react';

const UserDetailModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-purple-100 transform transition-all">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Database className="text-purple-400" size={22} />
            <div>
              <h3 className="font-bold text-base">MongoDB Document Inspector</h3>
              <p className="text-[10px] text-gray-400 font-mono">BSON ObjectId: {user._id || user.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* User Overview */}
          <div className="flex items-center gap-4 bg-purple-50/70 p-4 rounded-2xl border border-purple-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center text-xl font-bold">
              {user.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase() : 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  user.status === 'Active' ? 'bg-green-100 text-green-700' :
                  user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {user.status}
                </span>
                <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-600 font-mono mt-0.5">{user.email}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1"><MapPin size={13}/> {user.city || 'Mumbai'}</span>
                <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-purple-600"/> Score: {user.safetyScore}/100</span>
                <span className="flex items-center gap-1"><Clock size={13}/> Created: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Emergency Contacts (Subdocuments) */}
          <div>
            <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Phone size={14} className="text-purple-600"/> Emergency Contacts (Embedded BSON Subdocument Array)
            </h5>
            {user.emergencyContacts && user.emergencyContacts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
                    <p className="font-bold text-gray-800">{contact.name} <span className="text-[10px] text-purple-600 font-normal">({contact.relation})</span></p>
                    <p className="text-gray-600 font-mono mt-0.5">{contact.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No embedded contacts registered.</p>
            )}
          </div>

          {/* BSON Document JSON Viewer */}
          <div>
            <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Code size={14} className="text-pink-600"/> Raw BSON Document Data
            </h5>
            <pre className="bg-slate-950 text-emerald-400 text-xs p-4 rounded-2xl overflow-x-auto font-mono leading-relaxed border border-slate-800">
{JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
