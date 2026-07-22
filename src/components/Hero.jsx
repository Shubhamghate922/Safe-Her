import React from "react";
import { ArrowRight, Shield, Bell, MapPin, Sparkles, Play, Star, Users, Clock } from "lucide-react";
import dashboardImage from "../assets/Safe-Her-DashBoard-Image.jpeg";
import { FaLessThan } from "react-icons/fa";

const Hero = () => {
  const features = [
    { icon: Shield, label: "SOS Alert", color: "from-purple-500 to-purple-400" },
    { icon: Bell, label: "Smart Notifications", color: "from-pink-500 to-pink-400" },
    { icon: MapPin, label: "Live Location", color: "from-purple-400 to-pink-400" },
  ];

  const stats = [
    { value: "120K+", label: "Alerts sent", icon: Users },
    { value: "< 3s", label: "Response time", icon: Clock },
    { value: "4.9★", label: "User rating", icon: Star },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 overflow-hidden bg-white flex items-center">
      {/* Background Glow - Simple version */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-purple-500/30 blur-[180px]" />
        <div className="absolute bottom-[-180px] left-20 w-[550px] h-[550px] rounded-full bg-blue-400/20 blur-[180px]" />
        <div className="absolute top-10 -right-40 w-[650px] h-[650px] rounded-full bg-pink-400/30 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="space-y-6 z-10">
          {/* Trust Badge with hover */}
          <div className="inline-flex items-center gap-2 bg-purple-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-purple-700 text-xs font-medium border border-purple-200 hover:bg-purple-200/80 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default">
            <Sparkles size={14} className="hover:rotate-180 transition-transform duration-500" />
            Trusted by 50,000+ women worldwide
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
            Your Safety,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500">
              One Tap Away
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-md leading-relaxed hover:text-gray-800 transition-colors duration-300">
            SafeHer is a smart women safety platform that instantly sends SOS
            alerts, shares live location, and notifies trusted contacts during
            emergencies.
          </p>

          {/* Feature Chips with hover */}
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 hover:border-purple-200 transition-all duration-300 cursor-default"
              >
                <div className={`p-1 rounded-full bg-gradient-to-r ${feature.color} hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={12} className="text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Buttons with hover */}
          <div className="flex flex-wrap gap-4">
            <button className="group flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-2xl hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
              <span>Get Started</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
            </button>

            <button className="group flex items-center gap-2 bg-white text-gray-800 font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <Play size={18} className="text-purple-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <span>Learn More</span>
            </button>
          </div>

          {/* Stats with hover */}
          <div className="flex flex-wrap gap-8 pt-4">
            {stats.map((stat, index) => (
              <div key={index} className="group cursor-default hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent  transition-all duration-300">
                    {stat.value}
                  </span>
                  <stat.icon size={18} className="text-purple-400 group-hover:text-pink-500 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                </div>
                <p className="text-sm text-gray-500 font-medium group-hover:text-purple-600 transition-colors duration-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Dashboard Image with subtle movement */}
        <div className="relative flex justify-center items-center group">
          {/* Floating badges with hover */}
          <div className="absolute -top-4 -left-4 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 z-10 hover:scale-110 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-700">Active</span>
              <span className="text-xs text-gray-500">• 2,341 online</span>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 z-10 hover:scale-110 hover:shadow-2xl hover:border-pink-200 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-purple-500 group-hover:text-pink-500 transition-colors duration-300" />
              <span className="text-xs font-semibold text-gray-700">Protected</span>
              <span className="text-xs text-gray-500">• 99.9%</span>
            </div>
          </div>

          {/* Image with subtle movement on hover */}
          <div className="relative w-full max-w-md">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-700"></div>
            
            {/* Image container with movement */}
            <div className="relative transform group-hover:scale-105 group-hover:rotate-1 group-hover:translate-y-[-8px] transition-all duration-700 ease-out">
              <img 
                src={dashboardImage} 
                alt="Safe-Her Dashboard" 
                className="relative w-full h-auto rounded-2xl shadow-2xl border border-white/20 group-hover:shadow-3xl group-hover:border-purple-300/50 transition-all duration-700"
              />
              
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Decorative elements that move */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-purple-400/20 rounded-full blur-xl group-hover:translate-x-2 group-hover:translate-y-[-4px] transition-all duration-700"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-pink-400/20 rounded-full blur-xl group-hover:translate-x-[-4px] group-hover:translate-y-2 transition-all duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;