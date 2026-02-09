import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModernButton from '../components/NeonButton';
import { EVENT_NAME, TAGLINE, VENUE, PRIZES, COORDINATORS, ORGANIZER, SCHEDULE } from '../constants';
import { ClipboardList, Flag, Zap, Trophy } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Map icon strings (emojis) to Lucide components if needed, or just hardcode if the index is known
  // For simplicity and better control, I'll use a mapping or just reference them in the loop
  const getIcon = (itemEvent: string) => {
    switch (itemEvent) {
      case "Registration Deadline": return <ClipboardList className="w-6 h-6" />;
      case "Race Day Reporting": return <Flag className="w-6 h-6" />;
      case "Competition Start": return <Zap className="w-6 h-6" />;
      case "Result Announcement": return <Trophy className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div className="">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-slate-900">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Assets/videohero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 font-bold text-[10px] tracking-[0.2em] mb-6 border border-sky-200 uppercase">
            National Level Engineering Competition
          </div>

          <div className="mb-4">
            <span className="text-white font-extrabold text-sm md:text-base tracking-[0.3em] uppercase block mb-2">
              Engineer. Race. Conquer.
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
              ROBORACE<br />
              <span className="text-sky-400">2026</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 font-medium mb-10 max-w-2xl mx-auto px-4">
            {TAGLINE}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 px-4">
            <div className="flex items-center space-x-2 text-white bg-slate-800 px-4 sm:px-5 py-2.5 rounded-full border border-slate-700 shadow-lg text-sm sm:text-base">
              <span className="text-sky-400 font-bold">VENUE:</span>
              <span className="font-semibold">{VENUE}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <ModernButton onClick={() => navigate('/register')} className="w-full sm:w-auto max-w-xs">
              Register Now
            </ModernButton>
            <ModernButton variant="outline" className="w-full sm:w-auto max-w-xs bg-white/10 border-white/30 text-white hover:bg-white/20">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-slate-900 tracking-tight leading-none">
                INNOVATION IN <span className="text-sky-600">MOTION</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                <p>
                  RoboRace 26 is a premier robotics competition that bridges academia and advanced engineering. Organized by the <span className="text-sky-600 font-bold underline decoration-sky-200 decoration-4 underline-offset-4">{ORGANIZER}</span>, we aim to inspire future technologists.
                </p>
                <p>
                  The competition focuses on precision engineering, rapid problem solving, and real-time control. Join hundreds of students across India in this technical pursuit.
                </p>
              </div>

              <div className="flex flex-wrap gap-8 sm:gap-12 mt-12 justify-center lg:justify-start">
                <div className="group text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">50+</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Expected Teams</div>
                </div>
                <div className="group text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">₹15K</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Prize Pool</div>
                </div>
              </div>
            </div>

            <div className="relative order-2">
              <div className="aspect-video lg:aspect-[4/3] overflow-hidden rounded-3xl soft-shadow border border-slate-100 bg-slate-100 relative group">
                <img
                  src="/Assets/robo race.png"
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
                    <div className="text-slate-900 font-extrabold text-lg leading-tight">Professional<br />Obstacle Track</div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-white uppercase tracking-tight">CHAMPIONSHIP AWARDS</h2>
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

      {/* Schedule Section - Horizontal Timeline */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-black text-[10px] tracking-[0.3em] mb-4 border border-slate-100 uppercase">
              Mission Roadmap
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Competition <span className="text-sky-600">Timeline</span></h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {SCHEDULE.map((item, idx) => (
                <div key={idx} className="relative group/main">

                  {/* Content Card - Single Row Layout */}
                  <div className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative group/card cursor-default h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 group-hover/card:bg-sky-600 group-hover/card:text-white transition-all duration-500 shadow-sm mb-6">
                      {getIcon(item.event)}
                    </div>

                    <div className="text-sky-600 font-black text-[10px] tracking-widest uppercase mb-3">
                      {item.time}
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                      {item.event}
                    </h3>
                    <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-[200px]">
                      Precision execution and technical verification in progress for the championship roadmap.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">COORDINATORS</h2>
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