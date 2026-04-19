import React, { useState, useContext } from 'react'
import './Contact.css'
import bluee from '../../../assets/bluee.png'
import emailjs from '@emailjs/browser'
import { ThemeContext } from '../../../ThemeContext'

const Contact = () => {
  const { darkMode } = useContext(ThemeContext);

  // ---- Controlled component state (useState) ----
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  // ---- Validation errors state ----
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState('');
  const [resultType, setResultType] = useState('');
  const [loading, setLoading] = useState(false);

  // ---- onChange event handler ----
  const handleChange = (e) => {
    const { name, value } = e.target;  // destructuring
    setFormData((prev) => ({ ...prev, [name]: value }));  // spread operator

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;  // destructuring + spread
        return rest;
      });
    }
  };

  // ---- Validation function ----
  const validate = () => {
    const newErrors = {};
    const { name, email, message } = formData;  // destructuring

    // Name: not empty, min 3 characters
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Email: not empty, valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email (e.g. example@email.com)';
    }

    // Message: not empty, min 10 characters
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = `Message must be at least 10 characters (currently ${message.trim().length})`;  // template literal
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- onSubmit event handler ----
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setResult('');

    // EmailJS template params (spread operator)
    const templateParams = { ...formData };

    try {
      const response = await emailjs.send(
        'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY'     // Replace with your EmailJS public key
      );

      if (response.status === 200) {
        setResult('Form submitted successfully!');
        setResultType('success');
        // Reset form after success
        setFormData({ name: '', phone: '', email: '', message: '' });
        setErrors({});
      }
    } catch (error) {
      console.log('Error', error);
      setResult('Something went wrong. Please try again.');
      setResultType('error');
    } finally {
      setLoading(false);
    }
  };

  // ---- Object CSS style ----
  const contactInfoStyle = {
    fontSize: '14px',
    gap: '10px'
  };

  return (
    <div className='contact'>
      <div className='contact-col'>
        <h3>Send us a message <img src={bluee} alt="" /></h3>
        <p>Feel free to reach out through contact form or find our contact information below.
          Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our university community.</p>
        <ul style={contactInfoStyle}>
          <li><i className="bi bi-envelope-fill"></i> Contact @gitara.dev </li>
          <li><i className="bi bi-telephone-outbound-fill"></i> +383 000 000 </li>
          <li><i className="bi bi-geo-fill"></i> 77 Cambridge<br /> United States</li>
        </ul>
      </div>
      <div className='contact-col'>
        <form onSubmit={onSubmit}>
          <label>Your name</label>
          <input type="text" name='name' placeholder='Enter your name'
            value={formData.name} onChange={handleChange} />
          {/* Conditional rendering with && operator */}
          {errors.name && <span className="error-msg" style={{ color: 'red' }}>{errors.name}</span>}

          <label>Phone Number</label>
          <input type="tel" name='phone' placeholder='Enter your phone number'
            value={formData.phone} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name='email' placeholder='Enter your email'
            value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error-msg" style={{ color: 'red' }}>{errors.email}</span>}

          <label>Write your message here</label>
          <textarea name="message" rows="6" placeholder='Write your message here'
            value={formData.message} onChange={handleChange}></textarea>
          {errors.message && <span className="error-msg" style={{ color: 'red' }}>{errors.message}</span>}

          <button type='submit' className='btn dark-btn' disabled={loading}>
            {/* Ternary conditional rendering: loader vs content */}
            {loading ? (
              <span className="loader-container">
                <span className="spinner"></span> Sending...
              </span>
            ) : (
              <>Submit now!! <i className="bi bi-arrow-right"></i></>
            )}
          </button>
        </form>
        {/* Conditional rendering: success vs error message */}
        {result && (
          <span className={resultType === 'success' ? 'success-msg' : 'error-result'}>
            {result}
          </span>
        )}
      </div>

    </div>
  )
}

export default Contact
