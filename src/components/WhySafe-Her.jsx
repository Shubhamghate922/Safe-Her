import React from 'react';
import { Zap, MapPin, Cloud, Sparkles, Bell, Lock } from 'lucide-react';

const reasonsData = [
  { icon: Zap, title: "Instant Emergency Alerts", desc: "Sub-second delivery to trusted contacts." },
  { icon: MapPin, title: "Real-Time Location Tracking", desc: "Continuously updated GPS beacon." },
  { icon: Cloud, title: "Secure Cloud Storage", desc: "Encrypted at rest and in transit." },
  { icon: Sparkles, title: "Easy User Experience", desc: "Designed for panic moments — big buttons, clear cues." },
  { icon: Bell, title: "Fast Notification System", desc: "Redundant SMS, push, and voice channels." },
  { icon: Lock, title: "Privacy Protection", desc: "Your data is yours — never sold, ever." },
];

const WhySafeHer = () => {
  return (
    <section id="why-safeher" className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1 rounded-full text-purple-600 text-xs font-semibold shadow-sm border border-purple-100">
             <span className="text-purple-500">ⓘ</span> WHY SAFEHER
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Built for the moments that <br /> <span className="text-gray-900">matter</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Reliability, privacy, and speed — engineered end to end.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasonsData.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/80">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySafeHer;