import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiHeart, FiSearch, FiBarChart2, FiSettings, FiLogOut, FiBell, FiX, FiMenu } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import { LuHeart, LuSearch, LuMailOpen, LuScale, LuTarget, LuMapPin, LuStar, LuTrendingUp } from 'react-icons/lu'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import colleges from '../data/colleges.json'
import './StudentDashboard.css'

const navItems = [
  { icon: FiHome, label: 'Dashboard', key: 'dashboard' },
  { icon: FiHeart, label: 'Saved', key: 'saved' },
  { icon: FiSearch, label: 'Find', key: 'find' },
  { icon: FiBarChart2, label: 'Compare', key: 'compare' },
  { icon: LuTarget, label: 'Rank Predictor', key: 'predictor' },
  { icon: FiSettings, label: 'Settings', key: 'settings' },
]

const CUTOFFS = {
  jee: [
    { collegeId: 4, course: 'B.Tech CSE', cutoff: 45000 },
    { collegeId: 4, course: 'B.Tech ECE', cutoff: 65000 },
    { collegeId: 4, course: 'BCA', cutoff: 85000 },
  ],
  neet: [
    { collegeId: 3, course: 'MBBS', cutoff: 12000 },
    { collegeId: 3, course: 'BDS', cutoff: 22000 },
  ],
  bcece: [
    { collegeId: 1, course: 'B.Sc Physics', cutoff: 2500 },
    { collegeId: 1, course: 'B.Sc Chemistry', cutoff: 3500 },
    { collegeId: 2, course: 'B.Sc Computer Science', cutoff: 5000 },
  ],
  clat: [
    { collegeId: 6, course: 'LLB', cutoff: 1500 },
    { collegeId: 6, course: 'LLM', cutoff: 800 },
  ],
  cat: [
    { collegeId: 4, course: 'MBA', cutoff: 5000 },
    { collegeId: 5, course: 'MBA', cutoff: 9000 },
    { collegeId: 5, course: 'BBA', cutoff: 12000 },
  ],
}

const StudentDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const [activeNav, setActiveNav] = useState(() => {
    return location.state?.activeTab || 'dashboard'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { favorites: savedColleges, removeFavorite, toggleFavorite } = useFavorites()

  const [exam, setExam] = useState('jee')
  const [rank, setRank] = useState('')
  const [predictions, setPredictions] = useState([])
  const [hasPredicted, setHasPredicted] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login?role=student')
    }
  }, [user, navigate])

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveNav(location.state.activeTab)
    }
  }, [location.state])

  const saved = colleges.filter(c => savedColleges.includes(c.id))
  const removeSaved = (id) => removeFavorite(id)

  const handlePredict = () => {
    if (!rank || Number(rank) <= 0) return
    const userRank = Number(rank)
    const examCutoffs = CUTOFFS[exam] || []
    
    const results = examCutoffs.map(item => {
      let chance = 'Low'
      if (userRank <= item.cutoff * 0.8) chance = 'High'
      else if (userRank <= item.cutoff * 1.1) chance = 'Medium'
      
      return {
        ...item,
        chance
      }
    }).filter(Boolean)
    
    const chanceOrder = { High: 0, Medium: 1, Low: 2 }
    results.sort((a, b) => chanceOrder[a.chance] - chanceOrder[b.chance])
    
    setPredictions(results)
    setHasPredicted(true)
  }


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
          <div className="sd-user-avatar">{user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'RK'}</div>
          <div>
            <p className="sd-user-name">{user?.name || 'Rahul Kumar'}</p>
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

        <button className="sd-logout-btn" onClick={() => { logout(); navigate('/') }}>
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
                {activeNav === 'predictor' && 'Rank Predictor'}
                {activeNav === 'settings' && 'Settings'}
              </h1>
              <p className="sd-topbar-subtitle">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Rahul'}! 👋</p>
            </div>
          </div>
          <div className="sd-topbar-right">
            <button className="sd-bell-btn"><FiBell size={18} /></button>
            <div className="sd-topbar-avatar">{user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'RK'}</div>
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
                  { icon: LuTarget, iconColor: '#ef4444', label: 'Rank Predictor', desc: 'Find by rank', action: () => setActiveNav('predictor') },
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

        {activeNav === 'predictor' && (
          <div className="sd-content-area">
            <div className="sd-section-card">
              <h2 className="sd-section-title" style={{ marginBottom: '16px' }}>Rank-Based College Predictor</h2>
              <p style={{ textAlign: 'left', marginBottom: '24px', color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Enter your entrance exam score or rank to discover colleges where you have a strong chance of admission.
              </p>
              
              <div className="sd-predictor-form">
                <div className="sd-input-group" style={{ margin: 0 }}>
                  <label className="sd-label">Select Entrance Exam</label>
                  <select 
                    className="sd-input" 
                    value={exam} 
                    onChange={(e) => { setExam(e.target.value); setPredictions([]); setHasPredicted(false); }}
                    style={{ width: '100%', background: '#fff' }}
                  >
                    <option value="jee">JEE Main / Bihar UGEAC (Engineering)</option>
                    <option value="neet">NEET UG (Medical)</option>
                    <option value="bcece">BCECE (Bihar Science Entrance)</option>
                    <option value="clat">CLAT (Law Entrance)</option>
                    <option value="cat">CAT / CMAT (Management / MBA)</option>
                  </select>
                </div>
                
                <div className="sd-input-group" style={{ margin: 0 }}>
                  <label className="sd-label">Enter Your General/Category Rank</label>
                  <input 
                    type="number" 
                    className="sd-input" 
                    placeholder="e.g. 25000"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    className="sd-primary-btn" 
                    onClick={handlePredict}
                    style={{ width: '100%', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}
                  >
                    🎯 Predict Colleges
                  </button>
                </div>
              </div>

              {predictions.length > 0 ? (
                <div style={{ marginTop: '32px' }}>
                  <h3 className="sd-section-title" style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Predicted College Courses ({predictions.length})</h3>
                  <div className="sd-predictions-grid">
                    {predictions.map(pred => {
                      const college = colleges.find(c => c.id === pred.collegeId)
                      if (!college) return null
                      
                      let badgeColor = '#ef4444'
                      let badgeBg = '#fff1f2'
                      let badgeBorder = '#fecdd3'
                      if (pred.chance === 'High') {
                        badgeColor = '#10b981'
                        badgeBg = '#f0fdf4'
                        badgeBorder = '#bbf7d0'
                      } else if (pred.chance === 'Medium') {
                        badgeColor = '#f59e0b'
                        badgeBg = '#fffbeb'
                        badgeBorder = '#fde68a'
                      }

                      const isSaved = savedColleges.includes(college.id)

                      return (
                        <div key={`${pred.collegeId}-${pred.course}`} className="sd-pred-card">
                          <div className="sd-pred-img-wrapper">
                            <img src={college.image} alt={college.name} className="sd-pred-img" />
                            <div className="sd-pred-chance-badge" style={{ background: badgeBg, color: badgeColor, borderColor: badgeBorder }}>
                              {pred.chance} Chance
                            </div>
                            <div className="sd-pred-type-badge">
                              {college.type}
                            </div>
                          </div>
                          
                          <div className="sd-pred-card-body">
                            <div>
                              <h4 className="sd-pred-course">{pred.course}</h4>
                              <p className="sd-pred-college-name">{college.name}</p>
                              
                              <div className="sd-pred-stats-box">
                                <div className="sd-pred-stat">
                                  <p className="sd-pred-stat-lbl">Target Cutoff</p>
                                  <p className="sd-pred-stat-val">{pred.cutoff.toLocaleString()}</p>
                                </div>
                                <div className="sd-pred-stat">
                                  <p className="sd-pred-stat-lbl">Your Rank</p>
                                  <p className="sd-pred-stat-val" style={{ color: '#2563eb' }}>{Number(rank).toLocaleString()}</p>
                                </div>
                              </div>
                            </div>

                            <div className="sd-pred-actions-row">
                              <button 
                                className="sd-primary-btn sd-pred-btn" 
                                onClick={() => navigate(`/colleges/${college.id}`)}
                              >
                                View Details
                              </button>
                              <button 
                                className={isSaved ? "sd-action-btn-danger sd-pred-btn-fav" : "sd-action-btn-primary sd-pred-btn-fav"} 
                                onClick={() => {
                                  if (isSaved) removeSaved(college.id);
                                  else toggleFavorite(college.id);
                                }}
                              >
                                {isSaved ? 'Remove Saved' : 'Save College'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                hasPredicted && (
                  <div className="sd-empty-state" style={{ padding: '40px 20px', marginTop: '24px' }}>
                    <span className="sd-empty-icon" style={{ fontSize: '2.5rem' }}>😔</span>
                    <p className="sd-empty-text">No college courses found matching your rank.</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px' }}>Try entering a lower rank or selecting another exam stream.</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {activeNav === 'settings' && (
          <div className="sd-content-area">
            <div className="sd-section-card">
              <div className="sd-settings-header">
                <div className="sd-settings-avatar">{user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'RK'}</div>
                <div>
                  <h2 className="sd-settings-name">{user?.name || 'Rahul Kumar'}</h2>
                  <p className="sd-settings-email">{user?.email || 'student@careeros.in'}</p>
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