import React from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '../data';

const Hero = () => {
  const { hero } = SITE_DATA;
  
  return (
    <section id="home" className="hero-section" style={{ backgroundImage: `url('/mehandi_hero.png')` }}>
      <div className="hero-overlay"></div>
      <div className="container relative z-50">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ maxWidth: '600px' }}
        >
          <h1 className="text-white text-5xl font-bold mb-4">
            {hero.title.split(hero.highlight)[0]}
            <span className="text-primary" style={{ color: 'var(--secondary)' }}>{hero.highlight}</span>
          </h1>
          <p className="text-white text-2xl mb-8" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            {hero.description}
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="btn btn-primary">Book an Appointment</a>
            <a href="#gallery" className="btn btn-outline" style={{ borderColor: 'var(--white)', color: 'var(--white)' }}>View Gallery</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
