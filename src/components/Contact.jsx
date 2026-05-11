import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Share2, Globe } from 'lucide-react';
import { SITE_DATA } from '../data';

const Contact = () => {
  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Get In Touch</h2>
            <p className="mb-8" style={{ color: 'var(--text-light)', maxWidth: '500px' }}>
              Ready to add some magic to your celebration? Fill out the form or contact us 
              directly to book your session or inquire about pricing.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="btn btn-primary" style={{ padding: '10px', borderRadius: '12px' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p style={{ color: 'var(--text-light)' }}>{SITE_DATA.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="btn btn-primary" style={{ padding: '10px', borderRadius: '12px' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p style={{ color: 'var(--text-light)' }}>{SITE_DATA.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="btn btn-primary" style={{ padding: '10px', borderRadius: '12px' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p style={{ color: 'var(--text-light)' }}>{SITE_DATA.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={SITE_DATA.socials.instagram} className="text-primary hover-primary"><MessageSquare size={24} /></a>
              <a href={SITE_DATA.socials.facebook} className="text-primary hover-primary"><Share2 size={24} /></a>
              <a href={SITE_DATA.socials.twitter} className="text-primary hover-primary"><Globe size={24} /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-form"
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-input" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-input" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <label>Occasion Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea className="form-input" rows="4" placeholder="Tell us about your requirements..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
