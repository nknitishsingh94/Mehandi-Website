import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { SITE_DATA } from '../data';

const iconMap = {
  Heart: <Heart className="text-primary" size={32} />,
  Sparkles: <Sparkles className="text-primary" size={32} />,
  Star: <Star className="text-primary" size={32} />
};

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif font-bold mb-2">Our Special Services</h2>
          <p className="text-light" style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            We offer a wide range of Mehandi services tailored to your specific needs and preferences.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {SITE_DATA.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex justify-center mb-4">{iconMap[service.icon] || <Star className="text-primary" size={32} />}</div>
              <h3 className="text-2xl font-serif font-bold mb-2">{service.title}</h3>
              <p style={{ color: 'var(--text-light)' }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
