import React from 'react';
import { Mail, Phone, MapPin, Send, UserCircle } from 'lucide-react';

const Contact = () => {
  return (
    
    <section id="contact" className="py-24 px-4 sm:px-6 bg-white relative overflow-hidden ">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-tr from-purple-100 to-pink-100 px-4 py-1 rounded-full text-purple-600 text-xs font-semibold">
            <span className="text-purple-500"><UserCircle className="w-4 h-4 text-purple-500" /></span> CONTACT
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Get in 
            <span className="bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent"> touch</span>
          </h2>
          <p className="text-gray-500 text-lg">Questions, partnerships, or feedback — we'd love to hear from you.</p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Left Column: Form */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-gray-50/50 transition-all duration-300 hover:border-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="safeher@example.com" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-gray-50/50 transition-all duration-300 hover:border-purple-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-gray-50/50 transition-all duration-300 hover:border-purple-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Write your message..." 
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-gray-50/50 transition-all duration-300 hover:border-purple-300 resize-none"
                ></textarea>
              </div>

              <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Info & Map */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="group bg-white rounded-full p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                <Mail size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="font-semibold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                  support@safeher.app
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-full p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                <Phone size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <p className="font-semibold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                  +91 9699 XXX XXX
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-full p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Address</p>
                <p className="font-semibold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                  Dastur Nagar, Amravati, Maharashtra 444606
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-3xl h-48 w-full overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50 mt-2 group">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Map Location" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white p-2 rounded-full shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={24} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
