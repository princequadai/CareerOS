import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiEdit, FiMessageSquare, FiSettings, FiLogOut, FiBell, FiX, FiMenu, FiCheck, FiTrash2 } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import './CollegeDashboard.css'

const navItems = [
  { icon: FiHome, label: 'Dashboard', key: 'dashboard' },
  { icon: FiEdit, label: 'Edit Profile', key: 'profile' },
  { icon: FiMessageSquare, label: 'Enquiries', key: 'enquiries' },
  { icon: FiSettings, label: 'Settings', key: 'settings' },
]

const dummyEnquiries = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', phone: '9876543210', course: 'B.Tech CSE', message: 'What is the fee structure for B.Tech?', date: '15 May 2025', status: 'Pending' },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', course: 'MBA', message: 'Is hostel available for girls?', date: '14 May 2025', status: 'Replied' },
  { id: 3, name: 'Amit Sharma', email: 'amit@example.com', phone: '9876543212', course: 'BCA', message: 'What are the admission requirements?', date: '13 May 2025', status: 'Pending' },
  { id: 4, name: 'Neha Gupta', email: 'neha@example.com', phone: '9876543213', course: 'B.Sc', message: 'When does the next batch start?', date: '12 May 2025', status: 'Replied' },
]

const CollegeDashboard = () => {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [enquiries, setEnquiries] = useState(dummyEnquiries)
  const [profileForm, setProfileForm] = useState({
    name: 'MIT Patna', email: 'college@careeros.in', phone: '+91 98765 43210',
    location: 'Mithapur, Patna', affiliation: 'AKTU', established: '2008',
    description: 'MIT Patna is a top engineering and management institution in Bihar.',
  })
  const accent = '#10b981'
  const pendingCount = enquiries.filter(e => e.status === 'Pending').length
  const repliedCount = enquiries.filter(e => e.status === 'Replied').length

  const markReplied = (id) => setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'Replied' } : e))
  const deleteEnquiry = (id) => setEnquiries(prev => prev.filter(e => e.id !== id))

  return (
    <div className="cd-layout">

      {sidebarOpen && <div className="cd-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`cd-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="cd-sidebar-header">
          <div className="cd-logo-container">
            <MdSchool size={24} color={accent} />
            <span className="cd-logo-text">CareerOS</span>
          </div>
          <button className="cd-close-btn" onClick={() => setSidebarOpen(false)}><FiX size={18} /></button>
        </div>

        <div className="cd-user-card">
          <div className="cd-user-avatar">MP</div>
          <div>
            <p className="cd-user-name">MIT Patna</p>
            <p className="cd-user-role">College Account</p>
          </div>
        </div>

        <nav className="cd-nav">
          {navItems.map(item => (
            <button key={item.key} 
              className={`cd-nav-btn ${activeNav === item.key ? 'active' : 'inactive'}`}
              onClick={() => { setActiveNav(item.key); setSidebarOpen(false) }}>
              <item.icon size={18} />
              {item.label}
              {item.key === 'enquiries' && pendingCount > 0 && (
                <span className="cd-badge">{pendingCount}</span>
              )}
            </button>
          ))}
        </nav>
        <button className="cd-logout-btn" onClick={() => navigate('/')}>
          <FiLogOut size={18} /> Logout
        </button>
      </aside>

      <main className="cd-main">

        <div className="cd-topbar">
          <div className="cd-topbar-left">
            <button className="cd-menu-btn" onClick={() => setSidebarOpen(true)}><FiMenu size={20} /></button>
            <div>
              <h1 className="cd-topbar-title">
                {activeNav === 'dashboard' ? 'College Dashboard' : activeNav === 'profile' ? 'Edit Profile' : activeNav === 'enquiries' ? 'Enquiries' : 'Settings'}
              </h1>
              <p className="cd-topbar-subtitle">Welcome, MIT Patna! 🏫</p>
            </div>
          </div>
          <div className="cd-topbar-right">
            <button className="cd-bell-btn">
              <FiBell size={18} />
              {pendingCount > 0 && <span className="cd-bell-indicator" />}
            </button>
            <div className="cd-topbar-avatar">MP</div>
          </div>
        </div>

        {activeNav === 'dashboard' && (
          <div className="cd-content-area">
            <div className="cd-stats-grid">
              {[
                { icon: '👀', label: 'Profile Views', value: '1,240', color: '#eff6ff', border: '#bfdbfe' },
                { icon: '📩', label: 'Enquiries', value: enquiries.length, color: '#f0fdf4', border: '#bbf7d0' },
                { icon: '⏳', label: 'Pending', value: pendingCount, color: '#fffbeb', border: '#fde68a' },
                { icon: '✅', label: 'Replied', value: repliedCount, color: '#fdf4ff', border: '#e9d5ff' },
              ].map(stat => (
                <div key={stat.label} className="cd-stat-card" style={{ background: stat.color, border: `1px solid ${stat.border}` }}>
                  <span className="cd-stat-icon">{stat.icon}</span>
                  <div>
                    <p className="cd-stat-value">{stat.value}</p>
                    <p className="cd-stat-label">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cd-section-card">
              <div className="cd-section-header">
                <h2 className="cd-section-title">College Profile</h2>
                <button className="cd-section-btn" onClick={() => setActiveNav('profile')}>Edit</button>
              </div>
              <div className="cd-profile-card">
                <div className="cd-profile-icon">
                  <MdSchool size={28} color={accent} />
                </div>
                <div className="cd-profile-info">
                  <h3 className="cd-profile-name">MIT Patna</h3>
                  <p className="cd-profile-details">📍 Mithapur, Patna • 🏛️ AKTU</p>
                  <div className="cd-profile-tags">
                    {['B.Tech', 'M.Tech', 'MBA', 'BCA', 'MCA'].map(c => (
                      <span key={c} className="cd-tag">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="cd-section-card">
              <div className="cd-section-header">
                <h2 className="cd-section-title">Recent Enquiries</h2>
                <button className="cd-section-btn" onClick={() => setActiveNav('enquiries')}>View All</button>
              </div>
              <div className="cd-list-container">
                {enquiries.slice(0, 3).map(enq => (
                  <div key={enq.id} className="cd-list-item">
                    <div className="cd-avatar-sm">{enq.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="cd-list-item-content">
                      <div className="cd-list-item-header">
                        <p className="cd-list-item-name">{enq.name}</p>
                        <span className={`cd-status ${enq.status === 'Replied' ? 'cd-status-replied' : 'cd-status-pending'}`}>{enq.status}</span>
                      </div>
                      <p className="cd-list-item-course">📚 {enq.course}</p>
                      <p className="cd-list-item-message">"{enq.message}"</p>
                    </div>
                    {enq.status === 'Pending' && (
                      <button className="cd-action-btn-approve" onClick={() => markReplied(enq.id)}>
                        <FiCheck size={12} /> Reply
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeNav === 'profile' && (
          <div className="cd-content-area">
            <div className="cd-section-card">
              <h2 className="cd-section-title" style={{ marginBottom: '16px' }}>Edit College Information</h2>
              <div className="cd-form">
                {Object.entries(profileForm).map(([key, val]) => (
                  <div key={key} className="cd-input-group">
                    <label className="cd-label">{key}</label>
                    {key === 'description'
                      ? <textarea className="cd-input cd-textarea" value={val} onChange={e => setProfileForm(p => ({ ...p, [key]: e.target.value }))} />
                      : <input className="cd-input" value={val} onChange={e => setProfileForm(p => ({ ...p, [key]: e.target.value }))} />
                    }
                  </div>
                ))}
                <button className="cd-save-btn">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {activeNav === 'enquiries' && (
          <div className="cd-content-area">
            <div className="cd-section-card">
              <div className="cd-section-header" style={{ marginBottom: '14px' }}>
                <h2 className="cd-section-title">All Enquiries ({enquiries.length})</h2>
                <div className="cd-filter-group">
                  <span className="cd-filter-badge-pending">⏳ {pendingCount}</span>
                  <span className="cd-filter-badge-replied">✅ {repliedCount}</span>
                </div>
              </div>
              <div className="cd-list-container">
                {enquiries.map(enq => (
                  <div key={enq.id} className="cd-enq-list-item">
                    <div className="cd-avatar-sm">{enq.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="cd-list-item-content">
                      <div className="cd-list-item-header">
                        <p className="cd-list-item-name">{enq.name}</p>
                        <span className={`cd-status ${enq.status === 'Replied' ? 'cd-status-replied' : 'cd-status-pending'}`}>{enq.status}</span>
                      </div>
                      <p className="cd-enq-details">📧 {enq.email} • 📞 {enq.phone}</p>
                      <p className="cd-enq-details">📚 {enq.course} • 📅 {enq.date}</p>
                      <p className="cd-enq-message">"{enq.message}"</p>
                      <div className="cd-enq-actions">
                        {enq.status === 'Pending' && (
                          <button className="cd-enq-approve-btn" onClick={() => markReplied(enq.id)}>
                            <FiCheck size={13} /> Mark Replied
                          </button>
                        )}
                        <button className="cd-action-btn-danger" onClick={() => deleteEnquiry(enq.id)}>
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeNav === 'settings' && (
          <div className="cd-content-area">
            <div className="cd-section-card">
              <h2 className="cd-section-title" style={{ marginBottom: '16px' }}>Account Settings</h2>
              <div className="cd-form">
                {[{ label: 'College Email', value: 'college@careeros.in' }, { label: 'Contact Phone', value: '+91 98765 43210' }, { label: 'Password', value: '••••••••' }].map(f => (
                  <div key={f.label} className="cd-input-group">
                    <label className="cd-label">{f.label}</label>
                    <input className="cd-input" defaultValue={f.value} />
                  </div>
                ))}
                <button className="cd-save-btn">Update Settings</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default CollegeDashboard