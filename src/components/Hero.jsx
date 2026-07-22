import React from 'react';
import { ArrowRight, Shield, Bell, MapPin, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50/80 via-white/50 to-purple-100/60 relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text */}
        <div className="space-y-8 z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-purple-700 text-xs font-medium border border-purple-200">
            <Sparkles size={14} /> Trusted by 50,000+ women worldwide
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
            Your Safety, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">One Tap Away</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-600 max-w-md leading-relaxed">
            SafeHer is a smart women safety platform that instantly sends SOS alerts, shares live location, and notifies trusted contacts during emergencies.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-purple-500/30 hover:scale-105 transition">
              Get Started <ArrowRight size={18} />
            </button>
            <button className="bg-white text-gray-800 font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition border border-gray-100">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div><span className="text-2xl font-bold text-purple-600">120K+</span><p className="text-sm text-gray-500 font-medium">Alerts sent</p></div>
            <div><span className="text-2xl font-bold text-purple-600">&lt; 3s</span><p className="text-sm text-gray-500 font-medium">Response time</p></div>
            <div><span className="text-2xl font-bold text-purple-600">4.9★</span><p className="text-sm text-gray-500 font-medium">User rating</p></div>
          </div>
        </div>

        {/* Right Column: Floating Phone & Badges */}
        <div className="relative flex justify-center items-center h-[500px]">
          {/* Floating Alert Badge */}
          <div className="absolute -top-10 -left-10 md:-left-20 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 z-20 border border-gray-100 animate-bounce">
            <div className="bg-red-100 p-2 rounded-full text-red-500"><Bell size={20} /></div>
            <div>
              <p className="text-sm font-bold text-gray-800">Alert sent</p>
              <p className="text-xs text-gray-500">3 contacts notified</p>
            </div>
          </div>

          {/* The Phone Mockup */}
          <div className="w-[240px] h-[480px] bg-gradient-to-b from-purple-500 via-purple-500 to-pink-500 rounded-[40px] shadow-2xl border-4 border-white/50 relative flex flex-col items-center pt-10 z-10">
            <div className="text-white/80 text-xs font-medium mb-6 flex items-center gap-1"><Shield size={12}/> SafeHer</div>
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
              <Shield className="text-red-500 w-16 h-16" />
            </div>
            <div className="text-white font-bold text-2xl tracking-wider">SOS</div>
            <div className="absolute bottom-8 text-white/60 text-[10px]">Tap to send alert</div>
          </div>

          {/* Right Badges */}
          <div className="absolute top-10 -right-10 md:-right-20 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2 z-20 border border-gray-100">
            <div className="bg-purple-100 p-1 rounded-full"><Shield size={14} className="text-purple-600" /></div>
            <span className="text-xs font-semibold text-gray-800">Protected</span>
          </div>

          <div className="absolute -bottom-10 -right-5 md:-right-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 z-20 border border-gray-100">
            <div className="bg-purple-100 p-2 rounded-full text-purple-600"><MapPin size={20} /></div>
            <div>
              <p className="text-sm font-bold text-gray-800">Live location</p>
              <p className="text-xs text-gray-500">Sharing in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;