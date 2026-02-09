
import React from 'react';
import { EVENT_NAME, ORGANIZER } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-bold mb-4 text-slate-900">
            ROBORACE <span className="text-sky-600">26</span>
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
            National robotics championship fostering technical innovation and competitive excellence in young engineers.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold mb-4 text-sky-600 uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            <li><a href="#/" className="hover:text-sky-600 transition-colors">Event Home</a></li>
            <li><a href="#/rules" className="hover:text-sky-600 transition-colors">Technical Rules</a></li>
            <li><a href="#/register" className="hover:text-sky-600 transition-colors">Registration</a></li>
            <li><a href="#/contact" className="hover:text-sky-600 transition-colors">Help Desk</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold mb-4 text-sky-600 uppercase tracking-widest">Location</h4>
          <p className="text-slate-500 text-sm font-medium mb-1">{ORGANIZER}</p>
          <p className="text-slate-400 text-xs">Amravati, Maharashtra, India</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 {EVENT_NAME}</p>
      </div>
    </footer>
  );
};

export default Footer;
