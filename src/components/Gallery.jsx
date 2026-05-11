import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon, CheckCircle, Loader2, Lock } from 'lucide-react';
import { SITE_DATA } from '../data';

const API_URL = '/api';
const ADMIN_PASSWORD = 'nargish2026'; // Default password
const Gallery = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDesign, setNewDesign] = useState({ src: '', title: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authPassword, setAuthPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const fetchDesigns = async () => {
    try {
      const response = await fetch(`${API_URL}/designs`);
      const data = await response.json();
      
      // Safety check: ensure data is an array
      const dynamicItems = Array.isArray(data) ? data : [];
      setItems([...SITE_DATA.gallery, ...dynamicItems]);
    } catch (err) {
      console.error("Error fetching designs:", err);
      setItems(SITE_DATA.gallery); // Fallback to static data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleAddDesign = async (e) => {
    e.preventDefault();
    
    // Check Admin Password
    if (authPassword !== ADMIN_PASSWORD) {
      alert("Invalid Admin Password! Only the owner can add designs.");
      return;
    }

    if (!newDesign.src || !newDesign.title) {
      alert("Please fill in both title and image URL!");
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/designs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDesign)
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setNewDesign({ src: '', title: '' });
        setAuthPassword('');
        setIsModalOpen(false);
        fetchDesigns();
      } else {
        throw new Error('Failed to save design');
      }
    } catch (err) {
      console.error("Error saving design:", err);
      alert("Could not connect to server. Ensure your backend is running.");
    }
  };

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="flex justify-between items-center mb-8" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div className="text-left">
            <h2 className="text-4xl font-serif font-bold mb-2">Our Masterpieces</h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
              A curated collection of our finest works. (Owner can add new designs below)
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary flex items-center gap-2"
            style={{ whiteSpace: 'nowrap' }}
          >
            <Plus size={20} /> Add Design
          </button>
        </div>

        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl flex items-center gap-2"
            style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}
          >
            <CheckCircle size={20} /> Design added successfully!
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {items.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                viewport={{ once: true }}
                className="gallery-item"
              >
                <img src={img.src} alt={img.title} />
                <div className="gallery-overlay">
                  <h4 className="text-white font-serif text-2xl" style={{ fontSize: '1.2rem' }}>{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
              style={{ maxWidth: '450px' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold">Add New Design</h3>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddDesign}>
                <div className="form-group mb-6" style={{ background: '#f8f8f8', padding: '15px', borderRadius: '12px', border: '1px solid #eee' }}>
                  <label className="flex items-center gap-2 mb-2"><Lock size={16} /> Admin Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Enter admin password to unlock"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Design Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Bridal Floral Design"
                    value={newDesign.title}
                    onChange={(e) => setNewDesign({...newDesign, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Paste image link here..."
                    value={newDesign.src}
                    onChange={(e) => setNewDesign({...newDesign, src: e.target.value})}
                    required
                  />
                </div>
                
                {newDesign.src && (
                  <div className="mb-6" style={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid #eee', height: '120px' }}>
                    <img 
                      src={newDesign.src} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      alt="Preview"
                      onError={(e) => e.target.style.display = 'none'} 
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                  <ImageIcon size={18} /> Add to Gallery
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
