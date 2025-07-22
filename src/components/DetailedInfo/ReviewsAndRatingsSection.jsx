import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./ReviewsAndRatingsSection.module.css";

export default function ReviewsAndRatingsSection({ info }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleSubmit = () => {
    if (newComment.trim() !== "") {
      const newEntry = {
        text: newComment,
        stars: rating || 0,
      };
      setComments([newEntry, ...comments]);
      setNewComment("");
      setRating(0);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Reviews & Ratings</h2>
      <div>Average Rating: </div>
      <div>{info.ratings.imdbRating}</div>

      <div className={styles.inputSection}>
        <textarea
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className={styles.textarea}
        />

        <div className={styles.stars}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={starValue}
                size={24}
                className={styles.star}
                color={
                  starValue <= (hover || rating) ? "#f9ab00" : "#444"
                }
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>

      <div className={styles.commentSection}>
        <h3>User Comments</h3>
        {comments.length === 0 && <p className={styles.noComments}>No comments yet.</p>}
        {comments.map((comment, idx) => (
          <div key={idx} className={styles.commentCard}>
            <div className={styles.commentStars}>
              {[...Array(comment.stars)].map((_, i) => (
                <FaStar key={i} size={16} color="#f9ab00" />
              ))}
            </div>
            <p className={styles.commentText}>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
