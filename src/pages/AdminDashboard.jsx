import React, { useState, useEffect } from 'react';
import { Trash2, Plus, LogOut, Image as ImageIcon } from 'lucide-react';
import { BASE_URL } from '../data'; // Assuming BASE_URL is in data.js, let's check it later. If not, I'll use '/api'.

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [designs, setDesigns] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const ADMIN_PASSWORD = 'nargishmehandi'; // Hardcoded for simple security

  useEffect(() => {
    // Check if logged in from sessionStorage
    const isLogged = sessionStorage.getItem('adminAuth');
    if (isLogged === 'true') {
      setIsAuthenticated(true);
      fetchDesigns();
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
    try {
      // Use relative path for Vercel, or full URL in dev
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/designs' : '/api/designs';
      const res = await fetch(apiUrl);
      const data = await res.json();
      setDesigns(data);
    } catch (err) {
      console.error('Error fetching designs:', err);
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
        fetchDesigns(); // Refresh list
      } else {
        setError('Failed to add design.');
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
        alert('Failed to delete design.');
      }
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-zinc-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-500 mb-2">Admin Login</h1>
            <p className="text-zinc-400">Owner access only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-zinc-300 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Admin Navbar */}
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-amber-500">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Add New Form */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="text-amber-500" />
              Add New Design
            </h2>
            
            <form onSubmit={handleAddDesign} className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Design Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                  placeholder="e.g., Bridal Mehndi"
                />
              </div>
              
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                  placeholder="https://..."
                />
                <p className="text-xs text-zinc-500 mt-1">Paste the image link here.</p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                {loading ? 'Adding...' : 'Save Design'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Gallery Manager */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ImageIcon className="text-amber-500" />
              Manage Gallery
            </h2>
            
            {designs.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">No designs found. Add one!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {designs.map(design => (
                  <div key={design._id} className="group relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                    <img 
                      src={design.src} 
                      alt={design.title} 
                      className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h3 className="font-medium text-white truncate">{design.title}</h3>
                    </div>
                    <button 
                      onClick={() => handleDelete(design._id)}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Design"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
