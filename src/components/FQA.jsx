import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "How does the SOS button work?",
    answer: "One tap on the SOS button triggers a 5-second countdown, then instantly sends an alert with your live location to all your trusted contacts via SMS and push notification."
  },
  {
    question: "Is my location private?",
    answer: "Yes, your location is only shared with the trusted contacts you specifically add to your emergency list. It is not sold, shared, or used for any marketing purposes."
  },
  {
    question: "How many emergency contacts can I add?",
    answer: "You can add up to 10 trusted emergency contacts to ensure maximum reach during an emergency."
  },
  {
    question: "Can I edit my contacts?",
    answer: "Yes, you can add, remove, and prioritize your emergency contacts at any time from within the app settings."
  },
  {
    question: "Is SafeHer free?",
    answer: "SafeHer offers a completely free basic plan. We also offer a premium tier with advanced features like automated voice call alerts."
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-4 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-bold text-gray-900 text-lg">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      
      {/* Collapsible Content */}
      <div className={`px-8 transition-all duration-300 ease-in-out ${isOpen ? 'pb-6 max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <p className="text-gray-500 leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1 rounded-full text-purple-600 text-xs font-semibold shadow-sm border border-purple-100">
             <span className="text-purple-500">ⓘ</span> FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Frequently asked questions</h2>
          <p className="text-gray-500 text-lg">Everything you need to know before you get started.</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;