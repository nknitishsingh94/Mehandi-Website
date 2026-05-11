import React from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '../data';

const Hero = () => {
  return (
    <section id="home" className="hero-section" style={{ backgroundImage: 'url(/mehandi_hero.png)', backgroundColor: '#000' }}>
      <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)' }}></div>
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '2px solid var(--primary)', 
              marginBottom: '2rem',
              boxShadow: '0 0 20px rgba(139, 69, 19, 0.4)'
            }}
          >
            <img src="/logo.png" alt="NF Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-7xl font-serif font-bold mb-6 leading-tight"
          >
            {SITE_DATA.hero.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white mb-10 text-xl opacity-90 leading-relaxed"
            style={{ maxWidth: '600px' }}
          >
            {SITE_DATA.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4"
          >
            <a href="#contact" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Book an Appointment</a>
            <a href="#gallery" className="btn btn-outline" style={{ padding: '15px 40px', fontSize: '1.1rem', color: '#fff', borderColor: '#fff' }}>View Gallery</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
