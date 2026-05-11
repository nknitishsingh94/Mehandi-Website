import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="navbar-wrapper">
      <nav className={`navbar ${scrolled ? 'nav-scrolled' : 'py-3'}`}>
        <div className="container flex justify-between items-center" style={{ padding: '0 30px' }}>
          <div className="flex items-center gap-2">
            <Heart className="text-primary" fill="currentColor" size={24} />
            <span className="text-2xl font-serif font-bold text-primary tracking-wider" style={{ fontSize: '1.2rem' }}>Royal Mehandi</span>
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
            <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="hidden-desktop"
              style={{ overflow: 'hidden', padding: '0 30px' }}
            >
              <div className="flex flex-col py-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-medium"
                    style={{ color: 'var(--text-dark)', fontSize: '1.1rem' }}
                  >
                    {link.name}
                  </a>
                ))}
                <a href="#contact" onClick={() => setIsOpen(false)} className="btn btn-primary w-full">Book Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
