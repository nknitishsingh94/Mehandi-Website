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
  const [isAuth, setIsAuth] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [tempPass, setTempPass] = useState('');

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

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (tempPass === ADMIN_PASSWORD) {
      setIsAuth(true);
      setShowAdminLogin(false);
      setTempPass('');
      setIsModalOpen(true); // Open the add design modal immediately
    } else {
      alert("Wrong password! Try: nargish2026");
    }
  };

  const handleAddDesign = async (e) => {
    e.preventDefault();
    
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
        setIsModalOpen(false);
        fetchDesigns();
      } else {
        throw new Error('Failed to save design');
      }
    } catch (err) {
      console.error("Error saving design:", err);
      alert("Could not connect to server.");
    }
  };

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="flex justify-between items-center mb-8" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div className="text-left flex items-center gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">Our Masterpieces</h2>
              <p style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
                A curated collection of our finest works.
              </p>
            </div>
            {/* Admin Login Trigger */}
            {!isAuth && (
              <button 
                onClick={() => {
                  setShowAdminLogin(true);
                }} 
                className="flex items-center justify-center"
                style={{ 
                  background: 'var(--white)', 
                  border: '1px solid var(--primary)', 
                  borderRadius: '50%', 
                  width: '35px', 
                  height: '35px', 
                  cursor: 'pointer',
                  color: 'var(--primary)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 10
                }}
                title="Admin Login"
              >
                <Lock size={16} />
              </button>
            )}
          </div>

          {isAuth && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary flex items-center gap-2"
              style={{ whiteSpace: 'nowrap' }}
            >
              <Plus size={20} /> Add Design
            </button>
          )}
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
              <div key={index} className="gallery-item">
                <img src={img.src} alt={img.title} />
                <div className="gallery-overlay">
                  <h4 className="text-white font-serif text-2xl" style={{ fontSize: '1.2rem' }}>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Login Modal (Simple) */}
      {showAdminLogin && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '350px', position: 'relative' }}>
            <h3 className="text-xl font-bold mb-4">Admin Login</h3>
            <form onSubmit={handleAdminLogin}>
              <input 
                type="password" 
                className="form-input mb-4" 
                placeholder="Password" 
                value={tempPass} 
                onChange={(e) => setTempPass(e.target.value)} 
                autoFocus
              />
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
            <button onClick={() => setShowAdminLogin(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
          </div>
        </div>
      )}

      {/* Add Design Modal (Simple) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '450px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold">Add New Design</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddDesign}>
              <div className="form-group mb-6" style={{ background: '#f8f8f8', padding: '15px', borderRadius: '12px', border: '1px solid #eee' }}>
                <p className="text-sm opacity-60 mb-2">Admin mode is active</p>
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
                  <img src={newDesign.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                <ImageIcon size={18} /> Add to Gallery
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
