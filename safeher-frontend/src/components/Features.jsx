import React from 'react';
import { Zap, MapPin, Bell, Clock, User, Users, Shield, Sparkles } from 'lucide-react';

const featuresData = [
  { 
    icon: Zap, 
    title: "One-Tap SOS Alert", 
    desc: "Send an emergency signal with a single tap — no fumbling, no delay.",
  },
  { 
    icon: MapPin, 
    title: "Live Location Sharing", 
    desc: "Share your real-time GPS location with trusted contacts instantly.",
  },
  { 
    icon: Bell, 
    title: "Emergency Contact Notification", 
    desc: "Automatic SMS + push alerts to your trusted circle within seconds.",
  },
  { 
    icon: Clock, 
    title: "Emergency History", 
    desc: "Every alert is logged with time, location, and status for review.",
  },
  { 
    icon: User, 
    title: "User Profile Management", 
    desc: "Manage medical info, blood group, and identifiers responders may need.",
  },
  { 
    icon: Users, 
    title: "Trusted Contacts", 
    desc: "Add, edit, and prioritize the people SafeHer will contact for you.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-gradient-to-tr from-purple-100 to-pink-100 px-5 py-2 rounded-full text-purple-600 text-xs font-semibold tracking-wider uppercase">
            <Sparkles size={14} className="inline mr-2" />
             Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-normal">
            Everything you need to feel 
            <br /> 
            <span className="bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent ">
              safe & secure
            </span>
          </h2>
          
          <p className="text-gray-500 max-w-xl mx-auto">
            A complete safety toolkit designed with women, for women.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50"
            >
              {/* Icon with gradient background */}
              <div className="w-14 h-14 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <feature.icon 
                  size={26} 
                  className="text-white" 
                />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
              <Shield size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">100% Free • No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;