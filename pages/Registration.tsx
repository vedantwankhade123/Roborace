import React, { useState } from 'react';
import ModernButton from '../components/NeonButton';
import { DEPARTMENTS } from '../constants';
import roboBg from '../Assets/robobg.png';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../lib/cloudinary';

const Registration: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  // LIVE Google Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmM0rRSItbEvOiR2Z0j3ZyhsKFoZKmTbOLCKA1DC_NlyZTOJlVmrz3IUFc8RFP1PIMWg/exec";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds 5MB. Please upload a smaller image.');
        e.target.value = ''; // Clear the file input
        return;
      }
      setReceiptFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!receiptFile) {
        alert("Please upload the transaction receipt.");
        setIsSubmitting(false);
        return;
      }

      // 1. Upload to Cloudinary
      const receiptUrl = await uploadToCloudinary(receiptFile);

      // 2. Save to Firestore
      const registrationData = {
        ...formData,
        receiptUrl,
        submittedAt: new Date().toISOString(),
        status: 'pending' // Initial status for admins to process
      };

      await addDoc(collection(db, 'registrations'), registrationData);

      setIsSubmitted(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please check your connection and configuration.");
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-24 px-4 bg-gradient-to-br from-slate-50 to-sky-50 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="max-w-xl w-full text-center p-12 rounded-[40px] bg-white border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-600"></div>
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-5xl shadow-lg rotate-3">
            ✓
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Registration Successful!</h1>
          <p className="text-slate-500 mb-10 leading-relaxed font-medium">
            Your registration request for RoboRace 26 has been logged. Our coordination team will verify your technical specs and payment receipt and contact you within 24 hours.
          </p>
          <div className="space-y-6">
            <div className="p-8 bg-slate-50 rounded-3xl text-left border border-slate-100">
              <div className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] mb-4">Registration Summary</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold text-xs uppercase uppercase">Team</span> <span className="text-slate-900 font-extrabold">{formData.teamName}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold text-xs uppercase">Field</span> <span className="text-slate-900 font-extrabold">{formData.department}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold text-xs uppercase">Contact</span> <span className="text-slate-900 font-extrabold">{formData.email}</span></div>
              </div>
            </div>
            <ModernButton
              onClick={() => {
                setIsSubmitted(false);
                setReceiptFile(null);
                setFormData({
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
              }}
              variant="outline"
              className="w-full"
            >
              Register Another Team
            </ModernButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

      {/* Header Section */}
      <div className="w-full py-20 text-center bg-slate-900 border-b border-slate-800 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
          <img
            src={roboBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 blur-[2px]"></div>
        </div>

        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-white">
          <div className="inline-block mb-6">
            <span className="bg-sky-600 text-white text-[10px] font-black px-5 py-2 rounded-full tracking-[0.2em] uppercase shadow-lg shadow-sky-600/20">
              Championship Portal
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">
            FILL THE <span className="text-sky-400">FORM</span>
          </h1>
          <p className="text-slate-300 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Register your team for RoboRace 26. Join the ranks of the most innovative robotics engineers in the nation.
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-0 max-w-[1920px] mx-auto items-start">
          {/* Info Side Panel */}
          <div className="xl:col-span-1 border-b xl:border-b-0 xl:border-r border-slate-100 h-full">
            <div className="p-8 xl:p-16 xl:sticky xl:top-32">
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Mission Intel</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">Complete the form to formalize your team's entry into the racing arena.</p>
                </div>

                <div className="space-y-6">
                  <div className="group bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-sky-200 transition-all duration-300">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm group-hover:scale-110 transition-transform">
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Entry Closure</div>
                        <div className="text-lg font-black text-slate-900 tracking-tight">Feb 15, 2026</div>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-sky-200 transition-all duration-300">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0-2.08.402-2.599-1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Enlistment Fee</div>
                        <div className="text-lg font-black text-slate-900 tracking-tight">₹200 / Team</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-transparent"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-4">Total Prize Pool</div>
                      <div className="text-5xl font-black mb-2 tracking-tighter">₹15,000</div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Victory Awaits</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="xl:col-span-3 p-8 xl:p-16 relative">
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto relative z-10">
              <div className="space-y-16">
                {/* Section: Basic Intel */}
                <div className="space-y-10">
                  <div className="flex items-center space-x-6 border-b border-slate-100 pb-4">
                    <div className="text-4xl font-black text-slate-200 select-none">01</div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Team Fundamentals</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] ml-1">Team Name</label>
                      <input
                        required
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="e.g. CyberSpeed"
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.1)] transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] ml-1">Academic Department</label>
                      <select
                        required
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] ml-1">Team Captain</label>
                      <input
                        required
                        name="leaderName"
                        value={formData.leaderName}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Lead Pilot Name"
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] ml-1">Organization / College</label>
                      <input
                        required
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Official Institution Name"
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Contact & Tech */}
                <div className="space-y-10">
                  <div className="flex items-center space-x-6 border-b border-slate-100 pb-4">
                    <div className="text-4xl font-black text-slate-200 select-none">02</div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Communication & Tech</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] ml-1">Email</label>
                      <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="official@team.com"
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] ml-1">Mobile Number</label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel"
                        placeholder="+91 ...."
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.1em] ml-1">Project Specifications</label>
                    <textarea
                      required
                      name="robotSpecs"
                      value={formData.robotSpecs}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Detail motor ratings, chassis material, control protocol (RF/BT), and battery specs..."
                      className="w-full bg-white border-2 border-slate-200 rounded-[32px] px-8 py-6 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-500 transition-all min-h-[160px] resize-none leading-relaxed placeholder:text-slate-300"
                    ></textarea>
                  </div>
                </div>

                {/* Section: Payment QR */}
                <div className="space-y-10 pt-6">
                  <div className="flex items-center space-x-6 border-b border-slate-100 pb-4">
                    <div className="text-4xl font-black text-slate-200 select-none">03</div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Transaction Proof</h2>
                  </div>

                  <div className="bg-slate-50 rounded-[40px] p-10 lg:p-16 border border-slate-100 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

                    <div className="shrink-0 relative group">
                      <div className="absolute -inset-4 bg-transparent rounded-[40px] transition-transform group-hover:scale-105"></div>
                      <div className="relative w-56 h-56 bg-slate-900 rounded-3xl p-4 flex items-center justify-center border-2 border-slate-700 overflow-hidden shadow-2xl shadow-sky-600/20">
                        <img
                          src="/Assets/Payment QR.jpeg"
                          alt="Payment QR Code"
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ROBORACE26_PAYMENT';
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-xl">
                        Official QR
                      </div>
                    </div>

                    <div className="flex-grow space-y-8 w-full">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">Scan & Pay ₹200</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">
                          Scan the QR code to complete your team's enlistment fee. Ensure the transaction note includes your **Team Name**.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Upload Transaction Receipt</label>
                        <div className="relative group cursor-pointer">
                          <input
                            required
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className={`w-full bg-white border-2 border-dashed rounded-3xl p-8 text-center transition-all ${receiptFile ? 'border-emerald-400 bg-emerald-50/30' : 'border-slate-300 hover:border-sky-400'
                            }`}>
                            {receiptFile ? (
                              <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-emerald-900 font-bold text-sm">{receiptFile.name}</p>
                                  <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-1">Receipt Captured</p>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter hover:text-sky-600 transition-colors">Click to change</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors">
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                  </svg>
                                </div>
                                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase group-hover:text-sky-600 transition-colors">Upload Payment Receipt</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <div className="flex items-start space-x-6 mb-12 group cursor-pointer p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-colors hover:bg-white hover:border-sky-100 shadow-sm">
                    <div className="relative flex items-center h-5">
                      <input
                        required
                        id="agreed"
                        name="agreedToRules"
                        type="checkbox"
                        checked={formData.agreedToRules}
                        onChange={handleInputChange}
                        className="w-7 h-7 rounded-xl border-2 border-slate-300 text-sky-600 focus:ring-sky-500 transition-all cursor-pointer shadow-sm"
                      />
                    </div>
                    <label htmlFor="agreed" className="text-sm text-slate-600 font-bold leading-relaxed cursor-pointer group-hover:text-slate-900 transition-colors uppercase tracking-tight">
                      We confirm that our team has rigorously reviewed all technical mandates and safety protocols outlined in the competition guidelines.
                    </label>
                  </div>

                  <div className="flex justify-center">
                    <ModernButton
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full max-w-md py-5 text-base font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'shadow-sky-600/20'}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center space-x-3">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Transmitting Data...</span>
                        </span>
                      ) : (
                        'Submit Registration'
                      )}
                    </ModernButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;