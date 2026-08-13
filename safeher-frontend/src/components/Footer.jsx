import React from 'react';
import { Github, Linkedin, MessageCircle, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
  <img
    src="/Safe-Her logo.png"
    alt="Safe-Her Logo"
    className="w-12 h-12 object-contain scale-180"
  />
</div>
              <span className="text-xl font-bold text-gray-800">
                Safe<span className="bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">Her</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A premium women's safety platform for instant SOS alerts, live location sharing, and trusted-contact notifications.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Home</a></li>
              <li><a href="#features" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">How It Works</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">About</a></li>
              <li><a href="#contact" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Safety Tips</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Emergency Guide</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Community</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Status</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Emergency Disclaimer</a></li>
              <li><a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all duration-300">Cookies</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2026 SafeHer. All rights reserved.</p>
          <p className="bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
            Made with care for women's safety worldwide.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;