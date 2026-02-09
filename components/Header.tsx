
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll(); // Check initial scroll
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rules', path: '/rules' },
    { name: 'Register', path: '/register' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Header is transparent ONLY on home page at the top
  const isTransparent = isHome && !scrolled;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-poppins ${isTransparent
      ? "bg-transparent"
      : "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <span className={`font-extrabold text-xl tracking-tighter transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'
              }`}>
              ROBORACE <span className="text-sky-500">26</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[12px] font-black transition-colors tracking-[0.2em] hover:text-sky-500 ${isActive(link.path)
                  ? 'text-sky-500'
                  : (isTransparent ? 'text-white/80' : 'text-slate-500')
                  }`}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}

            {/* Admin Access Button - Simplified to 'Admin' */}
            <Link
              to="/admin"
              className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all shadow-lg ${isTransparent
                ? 'bg-white text-slate-900 shadow-white/10 hover:bg-sky-50'
                : 'bg-sky-600 text-white shadow-sky-600/20 hover:bg-sky-700'
                }`}
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${isTransparent ? 'text-white' : 'text-slate-600'
                } hover:text-sky-500`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-semibold transition-colors ${isActive(link.path) ? 'text-sky-600 bg-slate-50' : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-xl text-sm font-black text-white bg-sky-600 uppercase tracking-widest text-center shadow-lg shadow-sky-600/20"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
