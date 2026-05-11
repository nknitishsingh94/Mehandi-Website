import React from 'react';
import { Heart, Camera, MessageSquare } from 'lucide-react';
import { SITE_DATA } from '../data';

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: 'var(--text-dark)', color: 'var(--white)' }}>
      <div className="container text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="text-primary" fill="currentColor" size={20} />
          <span className="text-2xl font-serif font-bold tracking-wider">Royal Mehandi</span>
        </div>
        <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto 2rem' }}>
          Bringing the ancient art of Mehandi to your doorstep with modern elegance and tradition.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href={`https://instagram.com/${SITE_DATA.socials.instagram.replace('@', '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover-primary transition-all"
            style={{ color: 'var(--white)', opacity: 0.8 }}
          >
            <Camera size={24} />
            <span>Instagram</span>
          </a>
          <a 
            href={`https://wa.me/${SITE_DATA.phone.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover-primary transition-all"
            style={{ color: 'var(--white)', opacity: 0.8 }}
          >
            <MessageSquare size={24} />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="border-t py-3" style={{ opacity: 0.1, marginTop: '2rem' }}></div>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Royal Mehandi. All rights reserved. Designed with Love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
