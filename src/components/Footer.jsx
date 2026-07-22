import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-purple-600 p-1.5 rounded-full text-white">
                <Shield size={24} />
              </div>
              <span className="text-xl font-bold text-gray-800">Safe<span className="text-purple-600">Her</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A premium women's safety platform for instant SOS alerts, live location sharing, and trusted-contact notifications.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition">
                ✦
              </a>
              <a href="#" className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition">
                ✧
              </a>
              <a href="#" className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition">
                ◆
              </a>
              <a href="#" className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition">
                ■
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition">Home</a></li>
              <li><a href="#features" className="hover:text-purple-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-purple-600 transition">How It Works</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">About</a></li>
              <li><a href="#contact" className="hover:text-purple-600 transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Safety Tips</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Emergency Guide</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Community</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Status</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Emergency Disclaimer</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Cookies</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2026 SafeHer. All rights reserved.</p>
          <p>Made with care for women's safety worldwide.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;