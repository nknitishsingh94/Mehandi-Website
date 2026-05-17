import React from 'react';
import { Heart, Camera, MessageSquare, MapPin, Mail, Phone } from 'lucide-react';
import { SITE_DATA } from '../data';

const Footer = () => {
  return (
    <footer className="py-10" style={{ backgroundColor: '#1a1a1a', color: 'var(--white)', padding: '80px 0' }}>
      <div className="container">
        <div className="grid grid-cols-2 gap-12" style={{ alignItems: 'start' }}>
          
          {/* Left Column: Social & Contact Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xl font-serif font-bold mb-4" style={{ letterSpacing: '1px' }}>Connect with Us</h4>
            
            <div className="flex flex-col gap-4">
              <a 
                href={`https://instagram.com/${SITE_DATA.socials.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover-primary transition-all group"
                style={{ textDecoration: 'none', color: 'var(--white)' }}
              >
                <div style={{ 
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  padding: '10px',
                  borderRadius: '12px',
                  display: 'flex'
                }}>
                  <Camera size={20} />
                </div>
                <div className="flex flex-col">
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Instagram</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>@nargish_mehandi</span>
                </div>
              </a>

              <a 
                href={`https://wa.me/${SITE_DATA.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover-primary transition-all group"
                style={{ textDecoration: 'none', color: 'var(--white)' }}
              >
                <div style={{ 
                  background: '#25D366',
                  padding: '10px',
                  borderRadius: '12px',
                  display: 'flex'
                }}>
                  <MessageSquare size={20} />
                </div>
                <div className="flex flex-col">
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>WhatsApp</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Chat with Nargish</span>
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-3 mt-4" style={{ opacity: 0.8, fontSize: '0.9rem' }}>
              <div className="flex items-center gap-2"><Phone size={16} className="text-primary" /> {SITE_DATA.phone}</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-primary" /> {SITE_DATA.email}</div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {SITE_DATA.location}</div>
            </div>
          </div>

          {/* Right Column: Brand Info */}
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                <img src="/logo.png" alt="NF Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span className="text-3xl font-serif font-bold tracking-widest" style={{ color: 'var(--primary)' }}>{SITE_DATA.name.toUpperCase()}</span>
            </div>
            <p style={{ opacity: 0.7, maxWidth: '400px', lineHeight: '1.8' }}>
              Redefining mehandi artistry with elegance, passion, and tradition. 
              We bring the most exquisite bridal and party designs to your doorstep.
            </p>
            
            <div className="mt-10" style={{ opacity: 0.1, width: '100%', borderTop: '1px solid white' }}></div>
            
            <p className="mt-4" style={{ opacity: 0.4, fontSize: '0.85rem' }}>
              <a href="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>&copy;</a> {new Date().getFullYear()} {SITE_DATA.name}. All rights reserved.
              <br />
              <span style={{ letterSpacing: '1px' }}>CRAFTED WITH PRECISION</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
