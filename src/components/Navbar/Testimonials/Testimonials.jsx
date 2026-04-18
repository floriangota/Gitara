import React, { useRef, useState, useEffect } from 'react'
import './Testimonials.css'
import right from '../../../assets/right.png'
import left from '../../../assets/left.png'
import user1 from '../../../assets/user1.webp'
import user2 from '../../../assets/user2.webp'
import user3 from '../../../assets/user3.webp'
import user4 from '../../../assets/user4.webp'

const Testimonials = () => {

    const slider = useRef();
    const tx = useRef(0);

    const slideForward = () => {
        if (tx.current > -50) {
            tx.current -= 25;
        } else {
            tx.current = 0;
        }
        slider.current.style.transform = `translateX(${tx.current}%)`;  // template literal
    }
    const slideBackward = () => {
        if (tx.current < 0) {
            tx.current += 25;
        } else {
            tx.current = -50;
        }
        slider.current.style.transform = `translateX(${tx.current}%)`;  // template literal
    }

    // ---- Student Reviews State (localStorage) ----
    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem('gitara-reviews');
        return saved ? JSON.parse(saved) : [];
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Form state for new/edit review
    const [reviewForm, setReviewForm] = useState({
        name: '',
        text: '',
        rating: 5
    });

    // ---- useEffect: save reviews to localStorage ----
    useEffect(() => {
        localStorage.setItem('gitara-reviews', JSON.stringify(reviews));
    }, [reviews]);

    // ---- onChange handler ----
    const handleReviewChange = (e) => {
        const { name, value } = e.target;  // destructuring
        setReviewForm((prev) => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));  // spread operator
    };

    // ---- ADD a review ----
    const addReview = (e) => {
        e.preventDefault();
        if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;

        if (editingId !== null) {
            // EDIT existing review (spread operator)
            setReviews((prev) =>
                prev.map((r) => r.id === editingId ? { ...r, ...reviewForm } : r)
            );
            setEditingId(null);
        } else {
            // ADD new review (spread operator)
            const newReview = {
                ...reviewForm,
                id: Date.now(),
                date: new Date().toLocaleDateString()
            };
            setReviews((prev) => [...prev, newReview]);
        }
        setReviewForm({ name: '', text: '', rating: 5 });
    };

    // ---- REMOVE a review ----
    const removeReview = (id) => {
        setReviews((prev) => prev.filter((r) => r.id !== id));  // filter()
    };

    // ---- Start EDITING a review ----
    const startEdit = (review) => {
        const { name, text, rating } = review;  // destructuring
        setEditingId(review.id);
        setReviewForm({ name, text, rating });
    };

    // ---- Cancel edit ----
    const cancelEdit = () => {
        setEditingId(null);
        setReviewForm({ name: '', text: '', rating: 5 });
    };

    // ---- FILTER reviews by search term ----
    const filteredReviews = reviews.filter((review) =>  // filter()
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ---- REDUCE: calculate average rating ----
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)  // reduce()
        : 0;

    // ---- Object CSS style ----
    const starStyle = {
        color: '#f0c040',
        fontSize: '16px',
        marginRight: '2px'
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'}`} style={starStyle}></i>
        ));
    };

    return (
        <div className='testimonials'>
            <img src={right} alt="" className='next-btn'
                onClick={slideForward} />
            <img src={left} alt="" className='back-btn'
                onClick={slideBackward} />
            <div className="slider">
                <ul ref={slider}>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user1} alt="" />
                                <div>
                                    <h3>Lorena Gashi</h3>
                                    <span>Gitara, USA</span>
                                </div>
                            </div>
                            <p>I want to express my heartfelt gratitude for the incredible education and support I received throughout my time at Gitara. The faculty's dedication, the vibrant community, and the commitment to academic excellence have shaped not only my knowledge but also my confidence and outlook on life.
                                I'm deeply proud to be part of the Gitara family and will always carry its values wherever I go.</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user2} alt="" />
                                <div>
                                    <h3>John Doe</h3>
                                    <span>Gitara, USA</span>
                                </div>
                            </div>
                            <p>"Words can hardly capture how thankful I am for my time with you. Gitara wasn't just a school—it was a home where I learned, struggled, grew, and found lifelong friends. Thank you for nurturing my potential and giving me the courage to chase
                                my dreams. I'll always look back on my Gitara years with warmth and pride."</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user3} alt="" />
                                <div>
                                    <h3>William Deep</h3>
                                    <span>Gitara, USA</span>
                                </div>
                            </div>
                            <p>"Thank you for being more than an institution of learning—for being a place that inspires transformation. My experiences at Gitara taught me resilience, compassion, and the power of knowledge to effect change. Every lecture, project, and conversation contributed
                                to who I am today. I will continue to embody the Gitara spirit wherever life takes me."</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user4} alt="" />
                                <div>
                                    <h3>Jane Smith</h3>
                                    <span>Gitara, USA</span>
                                </div>
                            </div>
                            <p>"Thank you for the outstanding learning environment you've created. The quality of instruction, mentorship, and research opportunities I experienced at Gitara University prepared me for both professional challenges and personal growth. I am especially grateful for the professors who encouraged
                                curiosity and critical thought, hallmarks of Gitara's reputation for excellence."</p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* ===== Student Reviews Section ===== */}
            <div className="reviews-section">
                <h3 className="reviews-title">Share Your Experience</h3>

                {/* Review statistics with reduce() */}
                {reviews.length > 0 && (
                    <div className="reviews-stats">
                        <span>{`${reviews.length} review${reviews.length !== 1 ? 's' : ''}`}</span>
                        <span className="stats-divider">•</span>
                        <span>Average: {renderStars(Math.round(averageRating))} {averageRating}/5</span>
                    </div>
                )}

                {/* Add / Edit review form */}
                <form className="review-form" onSubmit={addReview}>
                    <div className="review-form-row">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={reviewForm.name}
                            onChange={handleReviewChange}
                            required
                        />
                        <select name="rating" value={reviewForm.rating} onChange={handleReviewChange}>
                            <option value={5}>★★★★★ (5)</option>
                            <option value={4}>★★★★ (4)</option>
                            <option value={3}>★★★ (3)</option>
                            <option value={2}>★★ (2)</option>
                            <option value={1}>★ (1)</option>
                        </select>
                    </div>
                    <textarea
                        name="text"
                        placeholder="Write your review..."
                        rows="3"
                        value={reviewForm.text}
                        onChange={handleReviewChange}
                        required
                    ></textarea>
                    <div className="review-form-actions">
                        <button type="submit" className="btn dark-btn">
                            {/* Ternary: edit vs add mode */}
                            {editingId !== null ? 'Update Review' : 'Submit Review'}
                        </button>
                        {/* && conditional: show cancel only in edit mode */}
                        {editingId !== null && (
                            <button type="button" className="btn" onClick={cancelEdit}>Cancel</button>
                        )}
                    </div>
                </form>

                {/* Search / Filter */}
                {reviews.length > 0 && (
                    <div className="reviews-search">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}

                {/* Review cards - map() + conditional rendering */}
                <div className="reviews-list">
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (  // map()
                            <div key={review.id} className="review-card" style={{ animationDelay: '0.1s' }}>
                                <div className="review-header">
                                    <div>
                                        <h4>{review.name}</h4>
                                        <div className="review-stars">{renderStars(review.rating)}</div>
                                    </div>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                <p className="review-text">{review.text}</p>
                                <div className="review-actions">
                                    <button className="review-btn edit-btn" onClick={() => startEdit(review)}>
                                        <i className="bi bi-pencil-fill"></i> Edit
                                    </button>
                                    <button className="review-btn delete-btn" onClick={() => removeReview(review.id)}>
                                        <i className="bi bi-trash-fill"></i> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Conditional rendering: no reviews vs no search results
                        <div className="no-reviews">
                            {searchTerm
                                ? `No reviews found for "${searchTerm}"`  // template literal
                                : 'No reviews yet. Be the first to share your experience!'
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Testimonials
