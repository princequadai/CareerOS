import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import './ContactPage.css'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSubmitted(true)
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="contact-header-container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="contact-content-container">
        <div className="contact-grid">

          {/* Contact Info */}
          <div className="contact-info-card">
            <h2 className="contact-card-title">Get in Touch</h2>
            <p className="contact-card-desc">Our team is here to help you find the right college. Reach out anytime!</p>
            {[
              { Icon: FiMapPin, label: 'Address', value: 'Patna, Bihar, India — 800001' },
              { Icon: FiPhone, label: 'Phone', value: '+91 98765 43210' },
              { Icon: FiMail, label: 'Email', value: 'hello@careeros.in' },
            ].map(item => (
              <div key={item.label} className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <item.Icon size={18} color="#2563eb" />
                </div>
                <div>
                  <p className="contact-info-label">{item.label}</p>
                  <p className="contact-info-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-msg">
                <span className="contact-success-icon">✅</span>
                <h3 className="contact-success-title">Message Sent!</h3>
                <p className="contact-success-text">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="contact-form">
                <h2 className="contact-card-title">Send a Message</h2>
                {[
                  { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Enter your name' },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'Enter your email' },
                  { label: 'Subject', key: 'subject', type: 'text', placeholder: 'What is this about?' },
                ].map(field => (
                  <div key={field.key} className="contact-input-group">
                    <label className="contact-label">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="contact-input"
                      value={form[field.key]}
                      onChange={(e) => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    />
                  </div>
                ))}
                <div className="contact-input-group">
                  <label className="contact-label">Message</label>
                  <textarea
                    placeholder="Write your message..."
                    className="contact-textarea"
                    value={form.message}
                    onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                  />
                </div>
                <button
                  className="contact-submit-btn"
                  onClick={handleSubmit}
                >
                  <FiSend size={16} /> Send Message
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactPage