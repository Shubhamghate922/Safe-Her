import React from 'react';
import { Star } from "lucide-react";

const testimonialsData = [
  {
    name: "Priya Sharma",
    role: "Student, Delhi",
    initials: "PS",
    quote: "\"SafeHer's SOS button gave me confidence to walk home at night. My family gets my location instantly.\""
  },
  {
    name: "Ayesha Khan",
    role: "Software Engineer",
    initials: "AK",
    quote: "\"The interface is beautiful and simple. In an emergency, the last thing you want is a confusing UI.\""
  },
  {
    name: "Neha Verma",
    role: "Marketing Lead",
    initials: "NV",
    quote: "\"The live location share saved my sister during a scary cab ride. Every woman should have this.\""
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-tr from-purple-100 to-pink-100 px-4 py-1 rounded-full text-purple-600 text-xs font-semibold">
  <Star className="w-4 h-4 text-purple-500" />
  <span>TESTIMONIALS</span>
</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Loved by women <br />
            <span className="bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">everywhere</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Stories from real users who trust SafeHer every day.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-purple-200/50 flex flex-col h-full">
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 text-lg mb-4">
                {'★'.repeat(5).split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
              
              {/* Quote */}
              <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow">
                {testimonial.quote}
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform duration-300">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;