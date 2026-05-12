import React, { useState, useEffect } from 'react';
import { Star, Quote, Send, User, Loader2, CheckCircle, ShieldCheck, MessageCirclePlus, X } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', message: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        setSuccess(true);
        setNewReview({ name: '', message: '', rating: 5 });
        setShowForm(false);
        fetchReviews();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      alert("Error saving review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding" style={{ backgroundColor: '#fff', position: 'relative' }}>
      <div className="container">
        <div className="flex flex-col items-center text-center mb-16 gap-6">
          <div className="text-center">
            <h2 className="text-5xl font-serif font-bold" style={{ margin: 0 }}>What Our Brides Say</h2>
          </div>
          <div className="w-full flex justify-center">
            <button 
              onClick={() => setShowForm(true)} 
              className="btn btn-primary flex items-center justify-center gap-2"
              style={{ 
                borderRadius: '15px', 
                padding: '12px 25px', 
                width: 'auto', 
                display: 'inline-flex' 
              }}
            >
              <MessageCirclePlus size={20} /> Share Your Experience
            </button>
          </div>
        </div>

        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.length > 0 ? reviews.map((r, i) => (
              <div 
                key={i}
                className="review-card p-6 rounded-[25px] bg-white relative"
                style={{ 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
                  border: '1px solid #f0f0f0',
                  textAlign: 'left'
                }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={12} fill={idx < r.rating ? "var(--secondary)" : "none"} color="var(--secondary)" />
                  ))}
                </div>

                <Quote className="text-primary opacity-10 mb-2" size={30} />
                
                <p className="text-md mb-6 italic" style={{ color: 'var(--text-dark)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {r.message}
                </p>

                <div className="flex items-center gap-3 border-t pt-4 border-gray-50">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: '#FFF8F0', color: 'var(--primary)' }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{r.name}</h4>
                    <div className="flex items-center gap-1 text-[9px] uppercase tracking-tighter text-green-600 font-bold">
                      <ShieldCheck size={10} /> Verified
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                <p className="text-xl opacity-30 font-serif italic">No stories shared yet. Be the first bride to write!</p>
              </div>
            )}
          </div>
        )}

        {/* Review Form Modal (Small & Elegant) */}
        {showForm && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '25px', width: '400px', maxWidth: '95%', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
              <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={20} /></button>
              
              <h3 className="text-2xl font-serif font-bold mb-1">Share Love</h3>
              <p className="text-xs text-gray-400 mb-6">Your feedback means a lot!</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="text-[10px] font-bold uppercase mb-1 block opacity-50">Full Name</label>
                  <input 
                    type="text" className="form-input" style={{ padding: '10px' }} placeholder="Your Name"
                    value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group mb-4">
                  <label className="text-[10px] font-bold uppercase mb-1 block opacity-50">Your Rating</label>
                  <select 
                    className="form-input" style={{ padding: '10px' }}
                    value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                    <option value="4">⭐⭐⭐⭐ (Great)</option>
                    <option value="3">⭐⭐⭐ (Good)</option>
                    <option value="2">⭐⭐ (Average)</option>
                    <option value="1">⭐ (Poor)</option>
                  </select>
                </div>
                
                <div className="form-group mb-6">
                  <label className="text-[10px] font-bold uppercase mb-1 block opacity-50">Review Message</label>
                  <textarea 
                    className="form-input" rows="3" style={{ padding: '10px' }} placeholder="Tell us what you liked..."
                    value={newReview.message} onChange={(e) => setNewReview({...newReview, message: e.target.value})}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full py-3 flex items-center justify-center gap-2" style={{ borderRadius: '12px' }} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={16} />} Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        {success && (
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#111', color: 'white', padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', zIndex: 10001, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <div style={{ backgroundColor: '#22c55e', padding: '5px', borderRadius: '50%' }}><CheckCircle size={20} /></div>
            <div>
              <p style={{ fontWeight: 'bold' }}>Review Published!</p>
              <p style={{ fontSize: '12px', opacity: 0.6 }}>Thank you for your feedback.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
