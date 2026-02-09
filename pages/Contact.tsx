
import React from 'react';
import { ORGANIZER } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 bg-white min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 -ml-24 -mt-24 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-black text-[10px] tracking-[0.2em] mb-4 border border-slate-100 uppercase">
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none">
            CONTACT <span className="text-sky-600">COMMAND</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Have technical queries or administrative questions? Our coordination team is ready to assist you in your championship journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 p-10 lg:p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col justify-center group">
              <h3 className="text-[10px] font-black text-sky-600 mb-8 uppercase tracking-[0.3em]">Administrative Headquarters</h3>

              <div className="space-y-6 mb-12">
                <p className="text-3xl font-black text-slate-900 leading-tight tracking-tight">
                  {ORGANIZER}
                </p>
                <div className="space-y-1 text-slate-500 font-medium text-lg italic">
                  <p>G.H. Raisoni University Campus, Badnera Road</p>
                  <p>Amravati, Maharashtra - 444607</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-slate-50">
                <div className="flex items-center space-x-5 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm group-hover/item:scale-110 transition-transform group-hover/item:bg-sky-600 group-hover/item:text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Email</div>
                    <div className="text-slate-900 font-black text-sm tracking-tight">support@roborace.dev</div>
                  </div>
                </div>

                <div className="flex items-center space-x-5 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm group-hover/item:scale-110 transition-transform group-hover/item:bg-slate-900 group-hover/item:text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Operational Hours</div>
                    <div className="text-slate-900 font-black text-sm tracking-tight">10:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] overflow-hidden border border-slate-100 shadow-lg h-[500px] lg:h-auto relative group">
            <div className="absolute inset-0 bg-sky-900/10 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119335.7972410313!2d77.70295624792482!3d20.9226500806443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a496837887d9%3A0xe5452d37803d1576!2sAmravati%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709472000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="grayscale-[0.2] contrast-[1.1]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
