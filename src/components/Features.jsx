import React from 'react';
import { Zap, MapPin, Bell, Clock, User, Users } from 'lucide-react';

const featuresData = [
  { icon: Zap, title: "One-Tap SOS Alert", desc: "Send an emergency signal with a single tap — no fumbling, no delay." },
  { icon: MapPin, title: "Live Location Sharing", desc: "Share your real-time GPS location with trusted contacts instantly." },
  { icon: Bell, title: "Emergency Contact Notification", desc: "Automatic SMS + push alerts to your trusted circle within seconds." },
  { icon: Clock, title: "Emergency History", desc: "Every alert is logged with time, location, and status for review." },
  { icon: User, title: "User Profile Management", desc: "Manage medical info, blood group, and identifiers responders may need." },
  { icon: Users, title: "Trusted Contacts", desc: "Add, edit, and prioritize the people SafeHer will contact for you." },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-purple-100 px-4 py-1 rounded-full text-purple-600 text-xs font-semibold tracking-wider uppercase">
            ⚡ Features
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Everything you need to feel <br /> <span className="text-gray-900">safe</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto">A complete safety toolkit designed with women, for women.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100/80 group">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;