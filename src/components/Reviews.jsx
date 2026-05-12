import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Send, User, Loader2, CheckCircle, ShieldCheck, MessageCirclePlus } from 'lucide-react';

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
      setReviews(data);
    } catch (err) {
      console.error(err);
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
    <section className="section-padding" style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Background Decorative Elements */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139, 69, 19, 0.05) 0%, transparent 70%)', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', borderRadius: '50%' }}></div>

      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-primary font-bold tracking-widest uppercase mb-2 block" style={{ fontSize: '0.8rem' }}>Testimonials</span>
            <h2 className="text-5xl font-serif font-bold">What Our Brides Say</h2>
            <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--secondary)', marginTop: '15px', borderRadius: '2px' }}></div>
          </div>
          <button 
            onClick={() => setShowForm(true)} 
            className="btn btn-primary flex items-center gap-2"
            style={{ borderRadius: '15px', padding: '15px 30px' }}
          >
            <MessageCirclePlus size={20} /> Share Your Experience
          </button>
        </div>

        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.length > 0 ? reviews.map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="review-card p-10 rounded-[40px] bg-white relative group"
                style={{ 
                  boxShadow: '0 15px 45px rgba(0,0,0,0.04)', 
                  border: '1px solid #f8f8f8',
                  transition: 'all 0.4s ease'
                }}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} fill={idx < r.rating ? "var(--secondary)" : "none"} color="var(--secondary)" />
                  ))}
                  <span className="ml-2 text-xs font-bold opacity-30">{r.rating}.0</span>
                </div>

                <Quote className="text-primary opacity-10 mb-4" size={40} />
                
                <p className="text-lg mb-8 italic" style={{ color: 'var(--text-dark)', lineHeight: '1.8', minHeight: '100px' }}>
                  {r.message}
                </p>

                <div className="flex items-center justify-between border-t pt-6 border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg" style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FEE2E2 100%)', color: 'var(--primary)' }}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{r.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-tighter text-green-600 font-bold">
                        <ShieldCheck size={12} /> Verified Client
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                <p className="text-xl opacity-30 font-serif italic">No stories shared yet. Be the first bride to write!</p>
              </div>
            )}
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="relative bg-white w-full max-w-lg p-10 rounded-[40px] shadow-2xl"
              >
                <h3 className="text-3xl font-serif font-bold mb-2">Share the Love</h3>
                <p className="text-sm text-gray-400 mb-8">Your feedback helps us grow and serve more brides.</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <label className="text-xs font-bold uppercase mb-2 block">Name</label>
                      <input 
                        type="text" className="form-input" placeholder="Your Name"
                        value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-xs font-bold uppercase mb-2 block">Rating</label>
                      <select 
                        className="form-input"
                        value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                      >
                        <option value="5">⭐⭐⭐⭐⭐ 5/5</option>
                        <option value="4">⭐⭐⭐⭐ 4/5</option>
                        <option value="3">⭐⭐⭐ 3/5</option>
                        <option value="2">⭐⭐ 2/5</option>
                        <option value="1">⭐ 1/5</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group mb-8">
                    <label className="text-xs font-bold uppercase mb-2 block">Message</label>
                    <textarea 
                      className="form-input" rows="4" placeholder="Describe your experience..."
                      value={newReview.message} onChange={(e) => setNewReview({...newReview, message: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="btn btn-primary flex-1 py-4 flex items-center justify-center gap-2" disabled={loading}>
                      {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />} Post Review
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline py-4">Cancel</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-10 right-10 p-5 rounded-2xl bg-gray-900 text-white flex items-center gap-4 shadow-2xl z-[3000]"
          >
            <div className="bg-green-500 p-2 rounded-full"><CheckCircle size={24} /></div>
            <div>
              <p className="font-bold">Review Published!</p>
              <p className="text-xs opacity-60">Thank you for your feedback.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
