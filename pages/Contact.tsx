
import React from 'react';
import { ORGANIZER } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Contact Information</h1>
          <p className="text-slate-500 font-medium">We're here to answer your technical and administrative questions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-slate-200 p-10 rounded-2xl shadow-sm h-full flex flex-col justify-center">
            <h3 className="text-sm font-bold text-sky-600 mb-8 uppercase tracking-[0.2em]">Administrative Office</h3>
            <div className="space-y-4 text-slate-600">
              <p className="text-xl font-bold text-slate-900">{ORGANIZER}</p>
              <p className="font-medium text-sm">G.H. Raisoni University Campus, Badnera Road</p>
              <p className="font-medium text-sm">Amravati, Maharashtra - 444607</p>
            </div>

            <div className="my-10 h-px bg-slate-100 w-full"></div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Support</div>
                  <div className="text-slate-900 font-semibold text-sm">support@turbobotgp.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reporting Hours</div>
                  <div className="text-slate-900 font-semibold text-sm">10:00 AM - 5:00 PM (IST)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 h-[450px] shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119335.7972410313!2d77.70295624792482!3d20.9226500806443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a496837887d9%3A0xe5452d37803d1576!2sAmravati%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709472000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              className="grayscale-[0.5] opacity-80"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
