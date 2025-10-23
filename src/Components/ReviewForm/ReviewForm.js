import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: ''
  });
  const [reviews, setReviews] = useState({}); // Track which doctors are reviewed

  useEffect(() => {
    // Load doctors from local JSON
    fetch(`${process.env.PUBLIC_URL}/doctors.json`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load doctors');
        return res.json();
      })
      .then(data => setDoctors(data))
      .catch(err => console.error('Error loading doctors:', err));
  }, []);

  const handleGiveReview = (doctorName) => {
    setSelectedDoctor(doctorName);
    setFormData({ name: '', review: '', rating: '' });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, review, rating } = formData;
    if (!name || !review || !rating) {
      alert('Please fill out all fields.');
      return;
    }

    setReviews(prev => ({ ...prev, [selectedDoctor]: true }));

    console.log('Review submitted:', {
      doctor: selectedDoctor,
      name,
      review,
      rating
    });

    setShowForm(false);
    setSelectedDoctor(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="review-form-container">
      <h2>Doctor Reviews</h2>

      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Specialty</th>
            <th>Review Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.name}>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>{reviews[doctor.name] ? '✅' : '❌'}</td>
              <td>
                {reviews[doctor.name] ? (
                  <button disabled>Review Already Given</button>
                ) : (
                  <button onClick={() => handleGiveReview(doctor.name)}>
                    Give Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="review-form-modal" onClick={closeForm}>
          <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
            <div className="review-form-popup">
              <h3>Give Review for {selectedDoctor}</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Review:</label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Rating (1–5):</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <button type="submit">Submit Review</button>
                  <button type="button" onClick={closeForm} style={{ marginLeft: '10px' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
