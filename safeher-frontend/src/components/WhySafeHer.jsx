import React from 'react';
import { Zap, MapPin, Cloud, Sparkles, Bell, Lock ,ShieldCheck } from 'lucide-react';

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
    <section id="why-safeher" className="py-24 px-4 sm:px-6 bg-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-tr from-purple-100 to-pink-100 px-4 py-1 rounded-full text-purple-600 text-xs font-semibold">
            <span className="text-purple-500"><ShieldCheck className="w-5 h-5 text-purple-600" /></span> WHY SAFEHER
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Built for the moments that <br />
            <span className="bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">matter</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Reliability, privacy, and speed — engineered end to end.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasonsData.map((item, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50">
              {/* Icon with gradient */}
              <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySafeHer;