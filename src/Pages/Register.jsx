import React, { useState } from 'react';
import { Shield, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, MapPin, Star, CheckCircle, ShieldCheck, Users } from 'lucide-react';
import { number } from 'framer-motion';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl hover:scale-110 transition-transform duration-300">
              <Shield className="text-white" size={28} />
            </div>
            <span className="text-white text-2xl font-bold">SafeHer</span>
          </div>
          <button className="mt-6 text-white/70 hover:text-white text-sm flex items-center gap-2 transition-all duration-300 hover:translate-x-[-4px]">
            <ArrowLeft size={16} />
            Back to home
          </button>
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight hover:scale-[1.02] transition-transform duration-300">
            Safety that travels with you.
          </h1>
          <p className="text-white/90 text-lg mb-8 leading-relaxed hover:text-white transition-colors duration-300">
            One tap alerts your trusted circle with your live location — because peace of mind shouldn't wait.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white hover:translate-x-2 transition-transform duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white/30 transition-colors duration-300">
                <Shield size={16} />
              </div>
              <span className="text-sm">One-tap SOS to trusted contacts</span>
            </div>
            <div className="flex items-center gap-3 text-white hover:translate-x-2 transition-transform duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white/30 transition-colors duration-300">
                <MapPin size={16} />
              </div>
              <span className="text-sm">Real-time location sharing</span>
            </div>
            <div className="flex items-center gap-3 text-white hover:translate-x-2 transition-transform duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white/30 transition-colors duration-300">
                <Lock size={16} />
              </div>
              <span className="text-sm">Private, encrypted history</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex gap-6 text-white/60 text-xs">
          <span className="flex items-center gap-1 hover:text-white transition-colors duration-300 hover:scale-105">
            <CheckCircle size={14} />
            50K+ Users
          </span>
          <span className="flex items-center gap-1 hover:text-white transition-colors duration-300 hover:scale-105">
            <ShieldCheck size={14} />
            Encrypted
          </span>
          <span className="flex items-center gap-1 hover:text-white transition-colors duration-300 hover:scale-105">
            <Star size={14} />
            4.9 Rating
          </span>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="text-purple-600" size={28} />
              <span className="text-2xl font-bold text-purple-600">SafeHer</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Create your account</h2>
            <p className="text-sm text-gray-500 mt-1">Join thousands of women who feel safer with SafeHer.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">Create your account</h2>
              <p className="text-sm text-gray-500 mt-1 hover:text-purple-500 transition-colors duration-300">Join thousands of women who feel safer with SafeHer.</p>
            </div>
            <form className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5 hover:text-purple-600 transition-colors duration-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="Enter Your Name" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 transition-all duration-300" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5 hover:text-purple-600 transition-colors duration-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" placeholder="name@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 transition-all duration-300" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5 hover:text-purple-600 transition-colors duration-300">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="tel" placeholder="+91 XXXX XXX XXX" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 transition-all duration-300" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5 hover:text-purple-600 transition-colors duration-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="********" className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 transition-all duration-300" />
                  
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5 hover:text-purple-600 transition-colors duration-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="********" className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 transition-all duration-300" />
                </div>
              </div>
              <div>
                <label className="flex items-start gap-3 cursor-pointer hover:text-purple-600 transition-colors duration-300">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-purple-600 hover:underline font-semibold hover:text-purple-800 transition-colors duration-300">Terms</a>
                    {' '}and{' '}
                    <a href="#" className="text-purple-600 hover:underline font-semibold hover:text-purple-800 transition-colors duration-300">Privacy Policy</a>.
                  </span>
                </label>
              </div>
              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                Create Account <ArrowRight size={18} />
              </button>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="#" className="text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-300">Login</a>
                </p>
              </div>
            </form>
          </div>
          <div className="lg:hidden flex justify-center gap-6 mt-6 text-xs text-gray-500">
            <span className="flex items-center gap-1 hover:text-purple-600 transition-colors duration-300 hover:scale-105">
              <ShieldCheck size={14} className="text-purple-600" />
              Encrypted
            </span>
            <span className="flex items-center gap-1 hover:text-purple-600 transition-colors duration-300 hover:scale-105">
              <Users size={14} className="text-purple-600" />
              50K+ Users
            </span>
            <span className="flex items-center gap-1 hover:text-purple-600 transition-colors duration-300 hover:scale-105">
              <Star size={14} className="text-purple-600" />
              4.9 Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;