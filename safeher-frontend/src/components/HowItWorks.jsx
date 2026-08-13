import React from 'react';
import { UserPlus, Users, Zap, MapPin, Bell, ShieldCheck, ArrowRight } from 'lucide-react';

const stepsData = [
  { icon: UserPlus, step: "Step 1", title: "Create Account", desc: "Sign up in under 60 seconds." },
  { icon: Users, step: "Step 2", title: "Add Emergency Contacts", desc: "Add up to 10 trusted contacts." },
  { icon: Zap, step: "Step 3", title: "Click SOS Button", desc: "One tap fires the alert." },
  { icon: MapPin, step: "Step 4", title: "Share Live Location", desc: "GPS beacon activates." },
  { icon: Bell, step: "Step 5", title: "Contacts Get Alert", desc: "SMS + push in seconds." },
  { icon: ShieldCheck, step: "Step 6", title: "Get Immediate Help", desc: "Responders on the way." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-purple-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-tr from-purple-100 to-pink-100 px-4 py-1 rounded-full text-purple-600 text-xs font-semibold tracking-wider">
            <ArrowRight size={12} className="rotate-45" /> HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Six simple steps to 
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">safety</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">From setup to rescue — SafeHer works the moment you need it.</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          {stepsData.map((step, index) => (
            <div key={index} className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50 group">
              {/* Icon with gradient */}
              <div className="w-14 h-14 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <step.icon size={26} />
              </div>
              <div className="mt-3">
                <p className="text-transparent bg-clip-text bg-gradient-to-tr from-purple-500 to-pink-500 text-xs font-bold uppercase tracking-wide mb-1">{step.step}</p>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm mt-2">{step.desc}</p>
              
              {/* Decorative Arrow */}
              {(index + 1) % 3 !== 0 && index !== stepsData.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-purple-300">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;