
import React from 'react';
import { RULES } from '../constants';
import ModernButton from '../components/NeonButton';

const Rules: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 bg-white min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 font-black text-[10px] tracking-[0.2em] mb-4 border border-sky-100 uppercase">
            Official Guidelines
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none">
            COMMUNICATION <span className="text-sky-600">HANDBOOK</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            Technical and safety standards designed to ensure a competitive and fair racing environment for RoboRace 26.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {RULES.map((section, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl border border-slate-100 p-10 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                <div className="text-6xl font-black text-slate-900 leading-none select-none">0{idx + 1}</div>
              </div>

              <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-wider flex items-center">
                <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs mr-4 shadow-lg shadow-sky-600/20">
                  {idx + 1}
                </span>
                {section.title}
              </h2>

              <ul className="space-y-4">
                {section.rules.map((rule, ruleIdx) => (
                  <li key={ruleIdx} className="flex items-start space-x-4 text-slate-600 text-[15px] leading-relaxed group/item">
                    <span className="mt-2 w-2 h-2 rounded-full bg-sky-400 shrink-0 group-hover/item:scale-125 transition-transform group-hover/item:bg-sky-600"></span>
                    <span className="font-medium">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 lg:p-16 rounded-[40px] bg-slate-900 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Full Technical Documentation</h3>
            <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
              Download the comprehensive rulebook containing track dimensions, scoring algorithms, and battery safety protocols.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <ModernButton onClick={() => window.open('#', '_blank')} className="min-w-[240px]">
                Download PDF Rulebook
              </ModernButton>
              <div className="flex items-center space-x-3 text-slate-500 font-bold text-xs uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Last Updated: Feb 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
