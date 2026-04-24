import { useState } from "react";

export default function ReviewForm({ recipeId, addReview }) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!user.trim() || !comment.trim() || rating === 0) return;
    addReview(recipeId, { user: user.trim(), comment: comment.trim(), rating });
    setUser(""); setComment(""); setRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div>
      <div className="review-form-title">Leave a Review</div>
      {submitted && <p style={{ color: "var(--green)", fontWeight: 600, marginBottom: 12 }}>✓ Review submitted!</p>}
      <div className="form-group">
        <label>Your Name</label>
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="e.g. HomeChef" />
      </div>
      <div className="form-group">
        <label>Rating</label>
        <div className="star-select">
          {[1,2,3,4,5].map((s) => (
            <button key={s} className="star-btn"
              onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
              onClick={() => setRating(s)}
            >
              {s <= (hover || rating) ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Comment</label>
        <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts…" />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Submit Review</button>
    </div>
  );
}
