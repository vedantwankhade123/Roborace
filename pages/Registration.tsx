import React, { useState } from 'react';
import ModernButton from '../components/NeonButton';
import { DEPARTMENTS } from '../constants';

const Registration: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    collegeName: '',
    cityState: '',
    email: '',
    phone: '',
    department: '',
    robotSpecs: '',
    agreedToRules: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-24 px-4 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full text-center p-12 rounded-2xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-emerald-500"></div>
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg">
            ✓
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">REGISTRATION CONFIRMED!</h1>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm">
            Your registration request has been received. Our coordination team will review the details and contact you via email shortly.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg text-left">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Registration Details</div>
              <div className="space-y-1 text-sm">
                <div><span className="font-semibold">Team:</span> {formData.teamName}</div>
                <div><span className="font-semibold">Department:</span> {formData.department}</div>
                <div><span className="font-semibold">Email:</span> {formData.email}</div>
              </div>
            </div>
            <ModernButton onClick={() => window.location.hash = '/'} variant="secondary" className="w-full">
              Return to Homepage
            </ModernButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-sky-600 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase">
              Registration Open
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tight">
            Join The Championship
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
            Register your team for RoboRace 26 - Compete with India's best robotics talents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deadline</div>
                  <div className="text-sm font-semibold text-slate-900">Feb 15, 2026</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fee</div>
                  <div className="text-sm font-semibold text-slate-900">₹200 per team</div>
                </div>
              </div>
            </div>

            <div className="bg-sky-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-90 mb-2">PRIZE POOL</div>
                <div className="text-2xl font-black mb-2">₹15,000</div>
                <div className="text-xs opacity-90">Awards for top 3 teams</div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-emerald-500"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Team Information */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Team Name</label>
                  <input
                    required
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. BotMasters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Department</label>
                  <select
                    required
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm appearance-none"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Team Leader</label>
                  <input
                    required
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">College</label>
                  <input
                    required
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="University Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Location</label>
                  <input
                    required
                    name="cityState"
                    value={formData.cityState}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="City, State"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="contact@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</label>
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="+91 ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Robot Overview</label>
                <textarea
                  required
                  name="robotSpecs"
                  value={formData.robotSpecs}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Hardware specifications, motor rating, control mechanism, special features..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm resize-none"
                ></textarea>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-sky-600 uppercase tracking-widest">Registration Fee: ₹200</div>
                    <div className="text-sm text-slate-600">Upload payment receipt (JPG/PNG/PDF)</div>
                  </div>
                </div>
                <input 
                  type="file" 
                  className="w-full text-xs text-slate-500 p-3 bg-white border border-slate-200 rounded-lg"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </div>

              <div className="flex items-start space-x-4 mb-8 p-4 bg-slate-50 rounded-xl">
                <input
                  required
                  id="agreed"
                  name="agreedToRules"
                  type="checkbox"
                  checked={formData.agreedToRules}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 mt-1 flex-shrink-0"
                />
                <label htmlFor="agreed" className="text-sm text-slate-600 font-medium leading-relaxed">
                  I acknowledge that I have read and agree to all competition terms, guidelines, and safety protocols outlined in the official rulebook.
                </label>
              </div>

              <ModernButton type="submit" className="w-full text-base py-4">
                Submit Registration
              </ModernButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;