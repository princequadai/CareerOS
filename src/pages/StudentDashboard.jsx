import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiHeart, FiSearch, FiBarChart2, FiSettings, FiLogOut, FiBell, FiX, FiMenu } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import { LuHeart, LuSearch, LuMailOpen, LuScale, LuTarget, LuMapPin, LuStar, LuTrendingUp } from 'react-icons/lu'
import { useFavorites } from '../context/FavoritesContext'
import colleges from '../data/colleges.json'
import './StudentDashboard.css'

const navItems = [
  { icon: FiHome, label: 'Dashboard', key: 'dashboard' },
  { icon: FiHeart, label: 'Saved', key: 'saved' },
  { icon: FiSearch, label: 'Find', key: 'find' },
  { icon: FiBarChart2, label: 'Compare', key: 'compare' },
  { icon: FiSettings, label: 'Settings', key: 'settings' },
]

const StudentDashboard = () => {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { favorites: savedColleges, removeFavorite } = useFavorites()

  const saved = colleges.filter(c => savedColleges.includes(c.id))
  const removeSaved = (id) => removeFavorite(id)


  return (
    <div className="sd-layout">

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="sd-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sd-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sd-sidebar-header">
          <div className="sd-logo-container">
            <MdSchool size={24} color="#2563eb" />
            <span className="sd-logo-text">CareerOS</span>
          </div>
          <button className="sd-close-btn" onClick={() => setSidebarOpen(false)}>
            <FiX size={18} />
          </button>
        </div>

        <div className="sd-user-card">
          <div className="sd-user-avatar">RK</div>
          <div>
            <p className="sd-user-name">Rahul Kumar</p>
            <p className="sd-user-role">Student</p>
          </div>
        </div>

        <nav className="sd-nav">
          {navItems.map(item => (
            <button key={item.key}
              className={`sd-nav-btn ${activeNav === item.key ? 'active' : 'inactive'}`}
              onClick={() => {
                setActiveNav(item.key)
                setSidebarOpen(false)
                if (item.key === 'find') navigate('/colleges')
                if (item.key === 'compare') navigate('/compare')
              }}>
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="sd-logout-btn" onClick={() => navigate('/')}>
          <FiLogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="sd-main">

        {/* Top Bar */}
        <div className="sd-topbar">
          <div className="sd-topbar-left">
            <button className="sd-menu-btn" onClick={() => setSidebarOpen(true)}>
              <FiMenu size={20} />
            </button>
            <div>
              <h1 className="sd-topbar-title">
                {activeNav === 'dashboard' && 'My Dashboard'}
                {activeNav === 'saved' && 'Saved Colleges'}
                {activeNav === 'settings' && 'Settings'}
              </h1>
              <p className="sd-topbar-subtitle">Welcome back, Rahul! 👋</p>
            </div>
          </div>
          <div className="sd-topbar-right">
            <button className="sd-bell-btn"><FiBell size={18} /></button>
            <div className="sd-topbar-avatar">RK</div>
          </div>
        </div>

        {/* Dashboard */}
        {activeNav === 'dashboard' && (
          <div className="sd-content-area">

            {/* Stat Cards */}
            <div className="sd-stats-grid">
              {[
                { icon: LuHeart, iconColor: '#ef4444', label: 'Saved Colleges', value: savedColleges.length, color: '#fff1f2', border: '#fecdd3' },
                { icon: LuSearch, iconColor: '#3b82f6', label: 'Viewed', value: 12, color: '#eff6ff', border: '#bfdbfe' },
                { icon: LuMailOpen, iconColor: '#10b981', label: 'Enquiries', value: 3, color: '#f0fdf4', border: '#bbf7d0' },
                { icon: LuScale, iconColor: '#f59e0b', label: 'Comparisons', value: 5, color: '#fffbeb', border: '#fde68a' },
              ].map(stat => (
                <div key={stat.label} className="sd-stat-card" style={{ background: stat.color, borderColor: stat.border }}>
                  <span className="sd-stat-icon" style={{ display: 'flex', color: stat.iconColor }}>
                    <stat.icon size={26} />
                  </span>
                  <div>
                    <p className="sd-stat-value">{stat.value}</p>
                    <p className="sd-stat-label">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved Colleges */}
            <div className="sd-section-card">
              <div className="sd-section-header">
                <h2 className="sd-section-title">Saved Colleges</h2>
                <button className="sd-section-btn" onClick={() => setActiveNav('saved')}>See All</button>
              </div>
              {saved.length === 0 ? (
                <div className="sd-empty-state">
                  <span className="sd-empty-icon" style={{ display: 'inline-flex', color: '#ef4444' }}>
                    <LuHeart size={36} />
                  </span>
                  <p className="sd-empty-text">No saved colleges yet</p>
                  <button className="sd-primary-btn" onClick={() => navigate('/colleges')}>Explore Colleges</button>
                </div>
              ) : (
                <div className="sd-list-container">
                  {saved.map(college => (
                    <div key={college.id} className="sd-list-item">
                      <img 
                        src={college.image} 
                        alt={college.name} 
                        className="sd-list-item-img clickable-image" 
                        onClick={() => navigate(`/colleges/${college.id}`)}
                      />
                      <div className="sd-list-item-content">
                        <h3 className="sd-list-item-title">{college.name}</h3>
                        <p className="sd-list-item-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <LuMapPin size={12} /> {college.location}
                        </p>
                        <div className="sd-list-item-tags">
                          <span className="sd-tag">{college.type}</span>
                          <span className="sd-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#f59e0b' }}>
                            <LuStar size={11} fill="#f59e0b" /> {college.rating}
                          </span>
                        </div>
                      </div>
                      <div className="sd-list-item-actions">
                        <button className="sd-action-btn-primary" onClick={() => navigate(`/colleges/${college.id}`)}>View</button>
                        <button className="sd-action-btn-danger" onClick={() => removeSaved(college.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="sd-section-card">
              <h2 className="sd-section-title" style={{ marginBottom: '14px' }}>Quick Actions</h2>
              <div className="sd-quick-actions-grid">
                {[
                  { icon: LuSearch, iconColor: '#3b82f6', label: 'Search Colleges', desc: 'Find colleges', action: () => navigate('/colleges') },
                  { icon: LuScale, iconColor: '#f59e0b', label: 'Compare', desc: 'Compare colleges', action: () => navigate('/compare') },
                  { icon: LuTarget, iconColor: '#ef4444', label: 'Rank Predictor', desc: 'Find by rank', action: () => navigate('/colleges') },
                  { icon: LuMailOpen, iconColor: '#10b981', label: 'Send Enquiry', desc: 'Contact colleges', action: () => navigate('/colleges') },
                ].map(action => (
                  <button key={action.label} className="sd-quick-action-card" onClick={action.action}>
                    <span className="sd-quick-action-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px', color: action.iconColor }}>
                      <action.icon size={24} />
                    </span>
                    <p className="sd-quick-action-title">{action.label}</p>
                    <p className="sd-quick-action-desc">{action.desc}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeNav === 'saved' && (
          <div className="sd-content-area">
            <div className="sd-section-card">
              {saved.length === 0 ? (
                <div className="sd-empty-state" style={{ padding: '40px 20px' }}>
                  <span className="sd-empty-icon" style={{ display: 'inline-flex', color: '#ef4444' }}>
                    <LuHeart size={44} />
                  </span>
                  <p className="sd-empty-text">No saved colleges yet</p>
                  <button className="sd-primary-btn" onClick={() => navigate('/colleges')}>Explore Colleges</button>
                </div>
              ) : (
                <div className="sd-list-container">
                  {saved.map(college => (
                    <div key={college.id} className="sd-list-item">
                      <img 
                        src={college.image} 
                        alt={college.name} 
                        className="sd-list-item-img clickable-image" 
                        style={{ width: '70px', height: '54px' }} 
                        onClick={() => navigate(`/colleges/${college.id}`)}
                      />
                      <div className="sd-list-item-content">
                        <h3 className="sd-list-item-title">{college.name}</h3>
                        <p className="sd-list-item-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <LuMapPin size={12} /> {college.location}
                        </p>
                        <div className="sd-list-item-tags">
                          <span className="sd-tag">{college.type}</span>
                          <span className="sd-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#f59e0b' }}>
                            <LuStar size={11} fill="#f59e0b" /> {college.rating}
                          </span>
                          <span className="sd-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#10b981' }}>
                            <LuTrendingUp size={11} /> {college.placement.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="sd-list-item-actions">
                        <button className="sd-action-btn-primary" onClick={() => navigate(`/colleges/${college.id}`)}>View</button>
                        <button className="sd-action-btn-danger" onClick={() => removeSaved(college.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeNav === 'settings' && (
          <div className="sd-content-area">
            <div className="sd-section-card">
              <div className="sd-settings-header">
                <div className="sd-settings-avatar">RK</div>
                <div>
                  <h2 className="sd-settings-name">Rahul Kumar</h2>
                  <p className="sd-settings-email">student@careeros.in</p>
                </div>
              </div>
              <div className="sd-form">
                {[
                  { label: 'Full Name', value: 'Rahul Kumar' },
                  { label: 'Email', value: 'student@careeros.in' },
                  { label: 'Phone', value: '+91 98765 43210' },
                  { label: 'City', value: 'Patna, Bihar' },
                ].map(field => (
                  <div key={field.label} className="sd-input-group">
                    <label className="sd-label">{field.label}</label>
                    <input className="sd-input" defaultValue={field.value} />
                  </div>
                ))}
                <button className="sd-save-btn">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        <footer className="dashboard-footer">
          <p>© {new Date().getFullYear()} CareerOS. All rights reserved.</p>
          <div className="dashboard-footer-links">
            <a href="/about" className="dashboard-footer-link">About</a>
            <a href="/contact" className="dashboard-footer-link">Support</a>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default StudentDashboard