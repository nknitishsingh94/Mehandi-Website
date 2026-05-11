import React from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '../data';

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: '#fffaf5' }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="about-image-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <img src="/mehandi_hero.png" alt="About Nargish" className="rounded-2xl shadow-2xl" style={{ width: '100%' }} />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
