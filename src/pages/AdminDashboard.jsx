import React, { useState, useEffect } from 'react';
import { Trash2, Plus, LogOut, X, Loader2 } from 'lucide-react';

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [designs, setDesigns] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const ADMIN_PASSWORD = 'nargish2026'; // Same as existing password

  useEffect(() => {
    const isLogged = sessionStorage.getItem('adminAuth');
    if (isLogged === 'true') {
      setIsAuthenticated(true);
      fetchDesigns();
    } else {
      setFetching(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      fetchDesigns();
      setError('');
    } else {
      setError('Incorrect Password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setDesigns([]);
  };

  const fetchDesigns = async () => {
    setFetching(true);
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/designs' : '/api/designs';
      const res = await fetch(apiUrl);
      const data = await res.json();
      setDesigns(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching designs:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleAddDesign = async (e) => {
    e.preventDefault();
    if (!newTitle || !newImage) {
      setError('Please provide both Title and Image URL');
      return;
    }
    
    setLoading(true);
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/designs' : '/api/designs';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, src: newImage })
      });
      
      if (res.ok) {
        setNewTitle('');
        setNewImage('');
        setError('');
        setShowAddModal(false);
        fetchDesigns();
      } else {
        setError('Failed to add design. Please check DB connection.');
      }
    } catch (err) {
      setError('Error adding design.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this design?')) return;
    
    try {
      const apiUrl = window.location.hostname === 'localhost' ? `http://localhost:5000/api/designs/${id}` : `/api/designs/${id}`;
      const res = await fetch(apiUrl, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setDesigns(designs.filter(design => design._id !== id));
      } else {
        const errorData = await res.json();
        alert(`Failed to delete: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Network error while deleting.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        {/* Inject CSS styling specifically for admin panels */}
        <style dangerouslySetInnerHTML={{__html: `
          .admin-login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0c0a09;
            padding: 20px;
            font-family: 'Inter', sans-serif;
          }
          .admin-login-box {
            background-color: #1c1917;
            padding: 40px;
            border-radius: 20px;
            border: 1px solid #2e2a24;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            text-align: center;
          }
          .admin-login-title {
            color: #d4af37;
            font-size: 2.2rem;
            margin-bottom: 8px;
            font-family: 'Playfair Display', serif;
            font-weight: bold;
          }
          .admin-login-subtitle {
            color: #a8a29e;
            font-size: 0.9rem;
            margin-bottom: 30px;
          }
          .admin-input-group {
            margin-bottom: 20px;
            text-align: left;
          }
          .admin-input-label {
            display: block;
            color: #d6d3d1;
            font-size: 0.85rem;
            margin-bottom: 6px;
            font-weight: 500;
          }
          .admin-input-field {
            width: 100%;
            background-color: #0c0a09;
            border: 1px solid #44403c;
            color: white;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
          }
          .admin-input-field:focus {
            outline: none;
            border-color: #d4af37;
            box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
          }
          .admin-btn-login {
            width: 100%;
            background: linear-gradient(135deg, #8b4513 0%, #d4af37 100%);
            color: white;
            font-weight: bold;
            padding: 14px;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            cursor: pointer;
            transition: opacity 0.2s ease;
            margin-top: 10px;
          }
          .admin-btn-login:hover {
            opacity: 0.9;
          }
          .admin-error-text {
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 10px;
          }
        `}} />
        
        <div className="admin-login-box">
          <h1 className="admin-login-title">Admin Login</h1>
          <p className="admin-login-subtitle">Manage Nargish Mehandi Designs</p>
          
          <form onSubmit={handleLogin}>
            <div className="admin-input-group">
              <label className="admin-input-label">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input-field"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && <p className="admin-error-text">{error}</p>}
            
            <button type="submit" className="admin-btn-login">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Inject complete dashboard styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .admin-dashboard {
          min-height: 100vh;
          background-color: #0c0a09;
          color: white;
          font-family: 'Inter', sans-serif;
        }
        .admin-nav {
          background-color: #1c1917;
          border-bottom: 1px solid #2e2a24;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .admin-nav-title {
          color: #d4af37;
          font-size: 1.6rem;
          font-family: 'Playfair Display', serif;
          font-weight: bold;
          margin: 0;
        }
        .admin-nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .admin-btn-add {
          background-color: #d4af37;
          color: #0c0a09;
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          transition: background-color 0.3s;
        }
        .admin-btn-add:hover {
          background-color: #c5a028;
        }
        .admin-btn-logout {
          background: none;
          border: none;
          color: #a8a29e;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          transition: color 0.3s;
        }
        .admin-btn-logout:hover {
          color: white;
        }
        .admin-gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .admin-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        .admin-gallery-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #2e2a24;
          background-color: #1c1917;
          aspect-ratio: 3/4;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .admin-gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .admin-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
          padding: 16px;
          pointer-events: none;
        }
        .admin-card-title {
          color: white;
          font-size: 0.95rem;
          font-weight: 500;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .admin-btn-delete {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          transition: transform 0.2s, background-color 0.2s;
          z-index: 10;
        }
        .admin-btn-delete:hover {
          background-color: #dc2626;
          transform: scale(1.1);
        }
        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
        }
        .admin-modal {
          background-color: #1c1917;
          border: 1px solid #2e2a24;
          padding: 30px;
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          animation: adminFadeIn 0.3s ease;
        }
        @keyframes adminFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .admin-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #a8a29e;
          cursor: pointer;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-modal-close:hover {
          color: white;
        }
        .admin-modal-title {
          font-size: 1.6rem;
          color: #d4af37;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
          margin-top: 0;
        }
        .admin-btn-submit {
          width: 100%;
          background: linear-gradient(135deg, #8b4513 0%, #d4af37 100%);
          color: white;
          font-weight: bold;
          padding: 14px;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          transition: opacity 0.2s ease;
          margin-top: 15px;
        }
        .admin-btn-submit:hover {
          opacity: 0.9;
        }
        .admin-no-designs {
          text-align: center;
          color: #a8a29e;
          padding: 100px 20px;
          font-size: 1.1rem;
        }
        .admin-loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          color: #d4af37;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .admin-nav-title {
            font-size: 1.2rem;
          }
          .admin-btn-add {
            padding: 8px 14px;
            font-size: 0.85rem;
          }
          .admin-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .admin-btn-delete {
            width: 32px;
            height: 32px;
            top: 8px;
            right: 8px;
          }
        }
      `}} />

      {/* Admin Navbar */}
      <nav className="admin-nav">
        <h1 className="admin-nav-title">Admin Dashboard</h1>
        
        <div className="admin-nav-actions">
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-btn-add"
          >
            <Plus size={18} />
            <span>Add More Design</span>
          </button>

          <button 
            onClick={handleLogout}
            className="admin-btn-logout"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Gallery Area */}
      <div className="admin-gallery-container">
        {fetching ? (
          <div className="admin-loading-spinner">
            <Loader2 className="animate-spin" size={40} />
            <p>Loading Designs...</p>
          </div>
        ) : designs.length === 0 ? (
          <div className="admin-no-designs">
            <p>No designs uploaded yet. Click "Add More Design" to upload your first masterpiece!</p>
          </div>
        ) : (
          <div className="admin-gallery-grid">
            {designs.map(design => (
              <div key={design._id} className="admin-gallery-card">
                <img 
                  src={design.src} 
                  alt={design.title} 
                  className="admin-gallery-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1590075865003-e48277faa558?w=500'; // Fallback
                  }}
                />
                <div className="admin-card-overlay">
                  <h3 className="admin-card-title">{design.title}</h3>
                </div>
                {/* Delete Button - Prominent red button */}
                <button 
                  onClick={() => handleDelete(design._id)}
                  className="admin-btn-delete"
                  title="Delete Design"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Design Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            {/* Close Button */}
            <button 
              onClick={() => { setShowAddModal(false); setError(''); }}
              className="admin-modal-close"
            >
              <X size={20} />
            </button>

            <h2 className="admin-modal-title">Add New Design</h2>
            
            <form onSubmit={handleAddDesign}>
              <div className="admin-input-group">
                <label className="admin-input-label">Design Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="admin-input-field"
                  placeholder="e.g. Elegant Bridal Mehandi"
                  required
                />
              </div>
              
              <div className="admin-input-group">
                <label className="admin-input-label">Image URL</label>
                <input 
                  type="text" 
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="admin-input-field"
                  placeholder="Paste direct image link here..."
                  required
                />
                <p style={{ fontSize: '0.75rem', color: '#a8a29e', marginTop: '6px' }}>
                  Tip: Upload to <strong>imgbb.com</strong> and paste the "Direct Link".
                </p>
              </div>

              {error && <p className="admin-error-text">{error}</p>}
              
              <button 
                type="submit"
                disabled={loading}
                className="admin-btn-submit"
              >
                {loading ? 'Saving...' : 'Save Design'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
