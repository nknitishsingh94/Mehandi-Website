import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_DATA } from '../data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div className="navbar-wrapper">
        <nav className={`navbar ${scrolled ? 'nav-scrolled' : 'py-3'}`}>
          <div className="container flex justify-between items-center" style={{ padding: '0 30px' }}>
            <div className="flex items-center gap-2">
              <Heart className="text-primary" fill="currentColor" size={24} />
              <span className="text-2xl font-serif font-bold text-primary tracking-wider" style={{ fontSize: '1.2rem' }}>{SITE_DATA.name}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden-mobile flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-dark font-medium"
                  style={{ color: 'var(--text-dark)', transition: 'color 0.3s', fontSize: '0.95rem' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-dark)'}
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="btn btn-primary" style={{ padding: '8px 25px', fontSize: '0.9rem' }}>Book Now</a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="hidden-desktop">
              <button onClick={() => setIsOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="mobile-overlay"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-sidebar"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <Heart className="text-primary" fill="currentColor" size={20} />
                  <span className="font-serif font-bold text-primary" style={{ fontSize: '1.1rem' }}>{SITE_DATA.name}</span>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dark)', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-medium"
                    style={{ color: 'var(--text-dark)', fontSize: '1.2rem', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  onClick={() => setIsOpen(false)} 
                  className="btn btn-primary btn-sm" 
                  style={{ marginTop: '20px', alignSelf: 'flex-start' }}
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
