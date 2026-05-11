import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Share2, Globe, Send, Loader2, CheckCircle, Camera } from 'lucide-react';
import { SITE_DATA } from '../data';

const API_URL = 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', date: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error('Failed to send inquiry');
      }
    } catch (err) {
      console.error("Contact Error:", err);
      alert("Could not send your inquiry. Please try again or contact via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

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
              <a href={`https://instagram.com/${SITE_DATA.socials.instagram.replace('@','')}`} className="text-primary hover-primary"><MessageSquare size={24} /></a>
              <a href={`https://wa.me/${SITE_DATA.phone.replace(/[^0-9]/g,'')}`} className="text-primary hover-primary"><Share2 size={24} /></a>
              <a href="#" className="text-primary hover-primary"><Globe size={24} /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-form"
          >
            {success ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={60} style={{ color: '#166534' }} />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p style={{ color: 'var(--text-light)' }}>We will get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} className="btn btn-outline mt-6">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Occasion Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea 
                    className="form-input" 
                    rows="4" 
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
