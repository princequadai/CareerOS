import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

const roles = [
  { key: 'student', label: '🎓 Student', color: '#2563eb' },
  { key: 'college', label: '🏫 College', color: '#10b981' },
  { key: 'admin', label: '🛡️ Admin', color: '#f59e0b' },
]

const dummyCredentials = {
  student: { email: 'student@careeros.in', password: 'student123' },
  college: { email: 'college@careeros.in', password: 'college123' },
  admin: { email: 'admin@careeros.in', password: 'admin123' },
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeRole, setActiveRole] = useState(searchParams.get('role') || 'student')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const handleLogin = () => {
    setError('')
    const creds = dummyCredentials[activeRole]
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (form.email !== creds.email || form.password !== creds.password) { setError('Invalid email or password. Use the hint below.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const nameMap = {
        student: 'Rahul Kumar',
        college: 'MIT Patna',
        admin: 'Admin User'
      }
      login(form.email, activeRole, nameMap[activeRole])
      
      const redirect = searchParams.get('redirect')
      if (activeRole === 'student') {
        if (redirect === 'predictor') {
          navigate('/student/dashboard', { state: { activeTab: 'predictor' } })
        } else {
          navigate('/student/dashboard')
        }
      }
      else if (activeRole === 'college') navigate('/college/dashboard')
      else navigate('/admin/dashboard')
    }, 1000)
  }

  const fillDemo = () => {
    setForm({ email: dummyCredentials[activeRole].email, password: dummyCredentials[activeRole].password })
    setError('')
  }

  const roleColor = roles.find(r => r.key === activeRole)?.color || '#2563eb'

  return (
    <div className="lp-page">

      {/* Left Panel */}
      <div className="lp-left-panel" style={{ background: `linear-gradient(135deg, ${roleColor}ee, ${roleColor})` }}>
        <div className="lp-left-content">
          <div className="lp-logo-row">
            <MdSchool size={32} color="#fff" />
            <span className="lp-logo-text">CareerOS</span>
          </div>
          <h2 className="lp-hero-title">
            Bihar's #1 College Discovery Platform
          </h2>
          <p className="lp-hero-desc">
            Find, compare and apply to the best colleges in Patna.
          </p>
          <div className="lp-features-list">
            {['🔍 Search 500+ colleges', '⚖️ Compare fees & placements', '🎯 Rank-based predictions', '❤️ Save your favourites'].map(f => (
              <div key={f} className="lp-feature-item">{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lp-right-panel">
        <div className="lp-right-content">

          {/* Mobile Logo */}
          <div className="lp-mobile-logo-row">
            <div className="lp-mobile-logo-icon" style={{ background: roleColor }}>
              <MdSchool size={24} color="#fff" />
            </div>
            <span className="lp-mobile-logo-text">
              Career<span style={{ color: roleColor }}>OS</span>
            </span>
          </div>

          <div className="lp-welcome-section">
            <h1 className="lp-welcome-title">Welcome Back!</h1>
            <p className="lp-welcome-subtitle">Login to your CareerOS account</p>
          </div>

          {/* Role Tabs */}
          <div className="lp-roles-row">
            {roles.map(role => (
              <button
                key={role.key}
                className="lp-role-btn"
                style={{
                  background: activeRole === role.key ? role.color : '#f1f5f9',
                  color: activeRole === role.key ? '#fff' : '#64748b',
                  boxShadow: activeRole === role.key ? `0 4px 12px ${role.color}44` : 'none',
                }}
                onClick={() => { setActiveRole(role.key); setError(''); setForm({ email: '', password: '' }) }}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Demo Hint */}
          <div className="lp-demo-hint">
            <span className="lp-demo-email">
              <strong>{dummyCredentials[activeRole].email}</strong>
            </span>
            <button className="lp-demo-btn" onClick={fillDemo}>
              Auto Fill
            </button>
          </div>

          {error && (
            <div className="lp-error-msg">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="lp-form">
            <div className="lp-input-group">
              <label className="lp-label">Email Address</label>
              <div className="lp-input-wrapper">
                <FiMail size={16} color="#94a3b8" className="lp-input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="lp-input"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="lp-input-group">
              <label className="lp-label">Password</label>
              <div className="lp-input-wrapper">
                <FiLock size={16} color="#94a3b8" className="lp-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="lp-input"
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button className="lp-icon-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="lp-forgot-pwd">
              <a href="#" className="lp-forgot-link">Forgot password?</a>
            </div>

            <button
              className="lp-submit-btn"
              style={{ background: roleColor }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : `Login as ${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}`}
            </button>

            <div className="lp-divider-row">
              <div className="lp-divider-line" />
              <span className="lp-divider-text">or</span>
              <div className="lp-divider-line" />
            </div>

            <p className="lp-footer-text">
              Don't have an account?{' '}
              <Link to="/signup" className="lp-footer-link" style={{ color: roleColor }}>Create Account</Link>
            </p>

            <Link to="/" className="lp-back-home">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage