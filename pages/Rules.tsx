
import React from 'react';
import { RULES } from '../constants';
import ModernButton from '../components/NeonButton';

const Rules: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Competition Guidelines</h1>
          <p className="text-slate-500 font-medium">Technical and safety standards for RoboRace 26</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RULES.map((section, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-100 p-8 shadow-sm">
              <h2 className="text-lg font-bold text-sky-600 mb-6 uppercase tracking-wider">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.rules.map((rule, ruleIdx) => (
                  <li key={ruleIdx} className="flex items-start space-x-3 text-slate-600 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 rounded-2xl bg-sky-50 border border-sky-100 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Official Rulebook</h3>
          <p className="text-slate-600 mb-8 text-sm max-w-lg mx-auto leading-relaxed">
            For detailed track diagrams and technical scoring breakdowns, please download the full PDF documentation.
          </p>
          <ModernButton onClick={() => window.open('#', '_blank')}>
            Download Rulebook PDF
          </ModernButton>
        </div>
      </div>
    </div>
  );
};

export default Rules;
