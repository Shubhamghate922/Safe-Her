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
    <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-white to-purple-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-1 rounded-full text-purple-600 text-xs font-semibold tracking-wider border border-purple-100">
             <ArrowRight size={12} className="rotate-45" /> HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Six simple steps to safety</h2>
          <p className="text-gray-500 max-w-xl mx-auto">From setup to rescue — SafeHer works the moment you need it.</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {stepsData.map((step, index) => (
            <div key={index} className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col gap-3 hover:shadow-2xl transition-shadow group">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <step.icon size={26} />
              </div>
              <div>
                <p className="text-purple-600 text-xs font-bold uppercase tracking-wide mb-1">{step.step}</p>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-gray-500 text-sm">{step.desc}</p>
              
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