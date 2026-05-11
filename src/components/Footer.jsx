import React from 'react';
import { Heart, Camera, MessageSquare } from 'lucide-react';
import { SITE_DATA } from '../data';

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: 'var(--text-dark)', color: 'var(--white)', padding: '60px 0' }}>
      <div className="container text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="text-primary" fill="currentColor" size={20} />
          <span className="text-2xl font-serif font-bold tracking-wider">{SITE_DATA.name}</span>
        </div>
        <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto 2rem' }}>
          Bringing the ancient art of Mehandi to your doorstep with modern elegance and tradition.
        </p>

        {/* Social Links with Colors and Spacing */}
        <div className="flex justify-center gap-10 mb-8" style={{ marginTop: '30px' }}>
          <a 
            href={`https://instagram.com/${SITE_DATA.socials.instagram.replace('@', '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover-scale transition-all"
            style={{ color: 'var(--white)', textDecoration: 'none' }}
          >
            <div style={{ 
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              padding: '12px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 5px 15px rgba(220, 39, 67, 0.3)'
            }}>
              <Camera size={28} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '500', marginTop: '5px' }}>Instagram</span>
          </a>

          <a 
            href={`https://wa.me/${SITE_DATA.phone.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover-scale transition-all"
            style={{ color: 'var(--white)', textDecoration: 'none' }}
          >
            <div style={{ 
              background: '#25D366',
              padding: '12px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 5px 15px rgba(37, 211, 102, 0.3)'
            }}>
              <MessageSquare size={28} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '500', marginTop: '5px' }}>WhatsApp</span>
          </a>
        </div>

        <div className="border-t py-3" style={{ opacity: 0.1, marginTop: '3rem' }}></div>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} {SITE_DATA.name}. All rights reserved. Designed with Love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
