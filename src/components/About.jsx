import React from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '../data';

const About = () => {
  const { about } = SITE_DATA;
  
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="gallery-item"
            style={{ height: '500px' }}
          >
            <img src="/gallery1.png" alt="About Me" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-4">{about.title}</h2>
            <h3 className="text-primary font-serif text-2xl mb-4">{about.subtitle}</h3>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mb-4" style={{ color: 'var(--text-light)' }}>{p}</p>
            ))}
            <div className="flex gap-8" style={{ marginTop: '2rem' }}>
              {about.stats.map((stat, i) => (
                <div key={i}>
                  <h4 className="text-2xl font-bold text-primary">{stat.value}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{stat.label}</p>
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
