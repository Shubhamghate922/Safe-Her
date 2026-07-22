import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-1 rounded-full text-purple-600 text-xs font-semibold">
             <span className="text-purple-500">ⓘ</span> CONTACT
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Get in touch</h2>
          <p className="text-gray-500 text-lg">Questions, partnerships, or feedback — we'd love to hear from you.</p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Write your message..." 
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 transition resize-none"
                ></textarea>
              </div>

              <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-purple-500/30 hover:scale-105 transition">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Info & Map */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="bg-white rounded-full p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="font-semibold text-gray-800">support@safeher.app</p>
              </div>
            </div>

            <div className="bg-white rounded-full p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <p className="font-semibold text-gray-800">+1 (555) 010-2025</p>
              </div>
            </div>

            <div className="bg-white rounded-full p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Address</p>
                <p className="font-semibold text-gray-800">221B Safety Lane, Mumbai, IN</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-3xl h-48 w-full overflow-hidden relative shadow-sm border border-gray-100 mt-2">
              {/* Replace this placeholder with an actual Google Maps <iframe> or Leaflet component later */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Map Location" 
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                 <div className="bg-purple-600 text-white p-2 rounded-full shadow-lg"><MapPin size={24} /></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;