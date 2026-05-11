import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SITE_DATA } from '../data';

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: '#fffaf5' }}>
      <div className="container">
        <div className="grid grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="about-image-container">
              <img src="/mehandi_hero.png" alt="About Nargish" className="rounded-2xl shadow-2xl" style={{ width: '100%' }} />
              {/* Logo Badge Overlay */}
              <div style={{ 
                position: 'absolute', 
                bottom: '-20px', 
                right: '-20px', 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                backgroundColor: 'white',
                padding: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="/logo.png" alt="NF Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block" style={{ fontSize: '0.9rem' }}>Since 2010</span>
            <h2 className="text-5xl font-serif font-bold mb-6">{SITE_DATA.about.title}</h2>
            
            {SITE_DATA.about.paragraphs.map((p, i) => (
              <p key={i} className="mb-6" style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                {p}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-4 mt-8">
              {SITE_DATA.about.stats.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #f0f0f0' }}>
                  <h3 className="text-3xl font-serif font-bold text-primary mb-1">{stat.value}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Signature Logo Decorative */}
            <div className="mt-10 flex items-center gap-4">
              <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.3 }}></div>
              <img src="/logo.png" alt="Signature" style={{ width: '40px', opacity: 0.6 }} />
              <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--primary)', opacity: 0.3 }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
