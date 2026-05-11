import React from 'react';
import { Heart } from 'lucide-react';

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
        <div className="border-t py-3" style={{ opacity: 0.3, marginTop: '2rem' }}></div>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Royal Mehandi. All rights reserved. Designed with Love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
