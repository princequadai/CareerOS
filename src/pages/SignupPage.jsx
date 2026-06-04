import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import './SignupPage.css'

const roles = [
  { key: 'student', label: '🎓 Student', color: '#2563eb' },
  { key: 'college', label: '🏫 College', color: '#10b981' },
]

const SignupPage = () => {
  const navigate = useNavigate()
  const [activeRole, setActiveRole] = useState('student')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { signup } = useAuth()

  const roleColor = roles.find(r => r.key === activeRole)?.color || '#2563eb'

  const handleSignup = async () => {
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await signup(form.email, form.password, form.name, activeRole, form.phone)
      setSubmitted(true)
      setTimeout(() => {
        if (activeRole === 'student') navigate('/student/dashboard')
        else navigate('/college/dashboard')
      }, 2000)
    } catch (err) {
      console.error('Signup error:', err)
      const code = err.code
      if (code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.')
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.')
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email address format.')
      } else {
        setError(err.message || 'Signup failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sp-page">

      {/* Left Panel */}
      <div className="sp-left-panel" style={{ background: `linear-gradient(135deg, ${roleColor}ee, ${roleColor})` }}>
        <div className="sp-left-content">
          <div className="sp-logo-row">
            <MdSchool size={32} color="#fff" />
            <span className="sp-logo-text">CareerOS</span>
          </div>
          <h2 className="sp-hero-title">Join Bihar's Largest College Platform</h2>
          <p className="sp-hero-desc">
            Create your free account and start exploring the best colleges in Patna today.
          </p>
          <div className="sp-features-list">
            {['🆓 100% Free to join', '🔍 Access 500+ colleges', '💾 Save your favourites', '🎯 Get personalized suggestions'].map(f => (
              <div key={f} className="sp-feature-item">{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="sp-right-panel">
        <div className="sp-right-content">

          {/* Mobile Logo */}
          <div className="sp-mobile-logo-row">
            <div className="sp-mobile-logo-icon" style={{ background: roleColor }}>
              <MdSchool size={24} color="#fff" />
            </div>
            <span className="sp-mobile-logo-text">
              Career<span style={{ color: roleColor }}>OS</span>
            </span>
          </div>

          <div className="sp-welcome-section">
            <h1 className="sp-welcome-title">Create Account</h1>
            <p className="sp-welcome-subtitle">Join CareerOS for free today</p>
          </div>

          {/* Role Tabs */}
          <div className="sp-roles-row">
            {roles.map(role => (
              <button
                key={role.key}
                className="sp-role-btn"
                style={{
                  background: activeRole === role.key ? role.color : '#f1f5f9',
                  color: activeRole === role.key ? '#fff' : '#64748b',
                }}
                onClick={() => { setActiveRole(role.key); setError('') }}
              >
                {role.label}
              </button>
            ))}
          </div>

          {error && (
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.85rem',
              color: '#e11d48',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {error}
            </div>
          )}

          {submitted ? (
            <div className="sp-success-msg">
              <span className="sp-success-icon">🎉</span>
              <h3 className="sp-success-title">Account Created!</h3>
              <p className="sp-success-text">Redirecting to dashboard...</p>
            </div>
          ) : (
            <div className="sp-form">

              {[
                { label: activeRole === 'college' ? 'College Name' : 'Full Name', key: 'name', type: 'text', icon: FiUser, placeholder: activeRole === 'college' ? 'Enter college name' : 'Enter your full name' },
                { label: 'Email Address', key: 'email', type: 'email', icon: FiMail, placeholder: 'Enter your email' },
                { label: 'Phone Number', key: 'phone', type: 'tel', icon: FiPhone, placeholder: 'Enter phone number' },
              ].map(field => (
                <div key={field.key} className="sp-input-group">
                  <label className="sp-label">{field.label}</label>
                  <div className="sp-input-wrapper">
                    <field.icon size={16} color="#94a3b8" className="sp-input-icon" />
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="sp-input"
                      value={form[field.key]}
                      onChange={(e) => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    />
                  </div>
                </div>
              ))}

              <div className="sp-input-group">
                <label className="sp-label">Password</label>
                <div className="sp-input-wrapper">
                  <FiLock size={16} color="#94a3b8" className="sp-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min 6 chars)"
                    className="sp-input"
                    value={form.password}
                    onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  />
                  <button className="sp-icon-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              <button
                className="sp-submit-btn"
                style={{ background: roleColor }}
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? 'Creating account...' : `Create ${activeRole === 'college' ? 'College' : 'Student'} Account`}
              </button>

              <p className="sp-footer-text">
                Already have an account?{' '}
                <Link to="/login" className="sp-footer-link" style={{ color: roleColor }}>Login here</Link>
              </p>
              <Link to="/" className="sp-back-home">← Back to Home</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupPage