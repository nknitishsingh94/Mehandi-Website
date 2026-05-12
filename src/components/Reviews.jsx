import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Send, User, Loader2, CheckCircle } from 'lucide-react';

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
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-creme)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4">Client Stories</h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Hear from our lovely brides and clients about their experience with Nargish Mehandi Art.
          </p>
        </div>

        {fetching ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.length > 0 ? reviews.map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white shadow-sm border border-orange-50 relative"
              >
                <Quote className="absolute top-4 right-6 opacity-5 text-primary" size={60} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill={idx < r.rating ? "var(--secondary)" : "none"} color="var(--secondary)" />
                  ))}
                </div>
                <p className="mb-6 italic" style={{ color: 'var(--text-dark)', lineHeight: '1.7' }}>"{r.message}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <h4 className="font-bold">{r.name}</h4>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-10 opacity-50">No reviews yet. Be the first to share your experience!</div>
            )}
          </div>
        )}

        <div className="text-center">
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)} 
              className="btn btn-primary"
            >
              Write a Review
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto p-8 rounded-3xl bg-white shadow-2xl border border-orange-100"
            >
              <h3 className="text-2xl font-bold mb-6">Your Experience</h3>
              <form onSubmit={handleSubmit} className="text-left">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="E.g. Priya Singh"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <select 
                    className="form-input"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  >
                    <option value="5">5 Stars (Excellent)</option>
                    <option value="4">4 Stars (Great)</option>
                    <option value="3">3 Stars (Good)</option>
                    <option value="2">2 Stars (Average)</option>
                    <option value="1">1 Star (Poor)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    className="form-input" 
                    rows="3" 
                    placeholder="How was the Mehandi design and service?"
                    value={newReview.message}
                    onChange={(e) => setNewReview({...newReview, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary flex-1 flex items-center justify-center gap-2" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />} Submit Review
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 p-4 rounded-full bg-green-600 text-white flex items-center gap-2 shadow-2xl z-50"
          >
            <CheckCircle size={20} /> Thank you for your beautiful review!
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
