
import React, { useState } from 'react';
import ModernButton from '../components/NeonButton';

const Registration: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    collegeName: '',
    cityState: '',
    email: '',
    phone: '',
    robotSpecs: '',
    agreedToRules: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-24 px-4 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full text-center p-12 rounded-2xl bg-white border border-slate-200 shadow-xl">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">CONFIRMED!</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Your registration request has been received. Our coordination team will review the details and contact you via email shortly.
          </p>
          <ModernButton onClick={() => window.location.hash = '/'} variant="secondary">
            Return Home
          </ModernButton>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Registration Form</h1>
          <p className="text-slate-500 font-medium">Join the championship roster</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}
            {[
              { label: 'Team Name', name: 'teamName', type: 'text', placeholder: 'e.g. BotMasters' },
              { label: 'Leader Name', name: 'leaderName', type: 'text', placeholder: 'Full Name' },
              { label: 'College', name: 'collegeName', type: 'text', placeholder: 'University Name' },
              { label: 'Location', name: 'cityState', type: 'text', placeholder: 'City, State' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'contact@email.com' },
              { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 ...' },
            ].map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
                <input
                  required
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleInputChange}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                />
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Robot Overview</label>
            <textarea
              required
              name="robotSpecs"
              value={formData.robotSpecs}
              onChange={handleInputChange}
              rows={3}
              placeholder="Hardware specs, motor rating, etc."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
            ></textarea>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Registration Fee (₹200)</p>
            <input type="file" className="text-xs text-slate-500 mx-auto" />
            <p className="mt-2 text-[10px] text-slate-400">Upload payment receipt (JPG/PNG)</p>
          </div>

          <div className="flex items-center space-x-3">
            <input
              required
              id="agreed"
              name="agreedToRules"
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="agreed" className="text-xs text-slate-500 font-medium">
              I acknowledge that I have read and agree to all competition terms.
            </label>
          </div>

          <ModernButton type="submit" className="w-full">
            Submit Registration
          </ModernButton>
        </form>
      </div>
    </div>
  );
};

export default Registration;
