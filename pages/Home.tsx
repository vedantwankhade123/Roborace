
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModernButton from '../components/NeonButton';
import { EVENT_NAME, TAGLINE, VENUE, PRIZES, COORDINATORS, ORGANIZER, SCHEDULE } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 bg-slate-50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 font-bold text-[10px] tracking-[0.2em] mb-6 border border-sky-200 uppercase">
            National Level Engineering Competition
          </div>
          
          <div className="mb-4">
            <span className="text-sky-600 font-extrabold text-sm md:text-base tracking-[0.3em] uppercase block mb-2">
              Engineer. Race. Conquer.
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-tight tracking-tighter">
              ROBORACE<br/>
              <span className="text-sky-600">2026</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-2xl mx-auto">
            {TAGLINE}
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 text-slate-500 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm">
              <span className="text-sky-600 font-bold">VENUE:</span>
              <span className="font-semibold">{VENUE}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ModernButton onClick={() => navigate('/register')} className="w-full sm:w-auto">
              Register Now
            </ModernButton>
            <ModernButton variant="outline" onClick={() => navigate('/rules')} className="w-full sm:w-auto">
              View Guidelines
            </ModernButton>
          </div>
        </div>
      </section>

      {/* About Section - ENHANCED with Track Image */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-1">
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 tracking-tight leading-none">
                INNOVATION IN <span className="text-sky-600">MOTION</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed max-w-2xl">
                <p>
                  RoboRace 26 is a premier robotics competition that bridges academia and advanced engineering. Organized by the <span className="text-sky-600 font-bold underline decoration-sky-200 decoration-4 underline-offset-4">{ORGANIZER}</span>, we aim to inspire future technologists.
                </p>
                <p>
                  The competition focuses on precision engineering, rapid problem solving, and real-time control. Join hundreds of students across India in this technical pursuit.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-12 mt-12">
                <div className="group">
                  <div className="text-5xl font-black text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">50+</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Expected Teams</div>
                </div>
                <div className="group">
                  <div className="text-5xl font-black text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">₹15K</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Prize Pool</div>
                </div>
              </div>
            </div>
            
            <div className="relative order-2">
              <div className="aspect-video lg:aspect-[4/3] overflow-hidden rounded-3xl soft-shadow border border-slate-100 bg-slate-100 relative group">
                <img 
                  src="robo race.png" 
                  alt="Official Robo Race Track" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-50 hidden md:block animate-bounce-slow">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-sky-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-sky-600/30">
                    🏎️
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Racing Arena</div>
                    <div className="text-slate-900 font-extrabold text-lg leading-tight">Professional<br/>Obstacle Track</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Pool Section - ENHANCED */}
      <section className="py-24 bg-slate-900 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white uppercase tracking-tight">CHAMPIONSHIP AWARDS</h2>
            <div className="w-24 h-1 bg-sky-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* 2nd Prize */}
            <div className="p-8 rounded-3xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-center order-2 md:order-1 transition-all hover:border-slate-500 group">
              <div className="text-6xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">🥈</div>
              <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">RUNNER UP</h3>
              <div className="text-4xl font-black text-white">{PRIZES[1].amount}</div>
              <div className="mt-4 text-[10px] font-bold text-sky-400 tracking-widest uppercase">Silver Trophy & Certificate</div>
            </div>

            {/* 1st Prize */}
            <div className="p-12 rounded-3xl bg-sky-600/10 backdrop-blur-md border-2 border-sky-500 text-center order-1 md:order-2 transform md:scale-110 shadow-2xl shadow-sky-500/20 relative group overflow-hidden">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-black px-4 py-1 rounded-full tracking-widest uppercase z-20">
                Winner
              </div>
              <div className="relative z-10">
                <div className="text-7xl mb-6 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">🥇</div>
                <h3 className="text-base font-bold text-sky-400 mb-2 uppercase tracking-[0.2em]">GRAND CHAMPION</h3>
                <div className="text-5xl font-black text-white mb-4">{PRIZES[0].amount}</div>
                <div className="text-xs font-bold text-sky-300 tracking-widest uppercase">Golden Trophy + Excellence Certificate</div>
              </div>
            </div>

            {/* 3rd Prize */}
            <div className="p-8 rounded-3xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-center order-3 transition-all hover:border-slate-500 group">
              <div className="text-6xl mb-4 opacity-80 group-hover:opacity-100 transition-all duration-500">🥉</div>
              <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">SECOND RUNNER UP</h3>
              <div className="text-4xl font-black text-white">{PRIZES[2].amount}</div>
              <div className="mt-4 text-[10px] font-bold text-sky-400 tracking-widest uppercase">Bronze Trophy & Certificate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center text-slate-900 uppercase tracking-tight">TIMELINE</h2>
          <div className="space-y-6">
            {SCHEDULE.map((item, idx) => (
              <div key={idx} className="flex items-center p-6 rounded-xl border border-slate-100 bg-slate-50 hover:border-sky-200 transition-colors group cursor-default">
                <div className="w-12 h-12 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="ml-6 flex-grow">
                  <div className="font-bold text-slate-900 text-sm">{item.event}</div>
                  <div className="text-slate-500 text-sm font-medium">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">COORDINATORS</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Reach out for any queries or technical support</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COORDINATORS.map((person, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm hover:border-sky-300 transition-all hover:-translate-y-1">
                <h3 className="font-bold text-slate-900 text-lg mb-2">{person.name}</h3>
                <div className="text-sky-600 font-bold text-sm mb-4 tracking-wide uppercase">{person.role}</div>
                <div className="flex items-center justify-center space-x-2 text-slate-600 bg-slate-50 py-2.5 rounded-xl border border-slate-100 group cursor-pointer hover:bg-sky-50 transition-colors">
                  <svg className="h-4 w-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-bold text-sm">{person.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
