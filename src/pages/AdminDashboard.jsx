import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiUsers, FiBook, FiMessageSquare, FiLogOut, FiBell, FiCheck, FiX, FiEye, FiTrash2, FiMenu } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import colleges from '../data/colleges.json'
import './AdminDashboard.css'

const navItems = [
  { icon: FiHome, label: 'Dashboard', key: 'dashboard' },
  { icon: FiBook, label: 'Colleges', key: 'colleges' },
  { icon: FiUsers, label: 'Students', key: 'students' },
  { icon: FiMessageSquare, label: 'Enquiries', key: 'enquiries' },
]

const dummyStudents = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', city: 'Patna', joined: '12 May 2025', saved: 2 },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', city: 'Patna', joined: '10 May 2025', saved: 5 },
  { id: 3, name: 'Amit Sharma', email: 'amit@example.com', city: 'Muzaffarpur', joined: '08 May 2025', saved: 3 },
  { id: 4, name: 'Neha Gupta', email: 'neha@example.com', city: 'Gaya', joined: '05 May 2025', saved: 1 },
]

const dummyEnquiries = [
  { id: 1, student: 'Rahul Kumar', college: 'MIT Patna', course: 'B.Tech CSE', date: '15 May 2025', status: 'Pending' },
  { id: 2, student: 'Priya Singh', college: 'Nalanda Medical', course: 'MBBS', date: '14 May 2025', status: 'Replied' },
  { id: 3, student: 'Amit Sharma', college: 'Patna Science', course: 'B.Sc', date: '13 May 2025', status: 'Pending' },
  { id: 4, student: 'Neha Gupta', college: 'Patna Law College', course: 'LLB', date: '12 May 2025', status: 'Replied' },
]

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collegeList, setCollegeList] = useState(colleges)
  const accent = '#f59e0b'

  const approvedCount = collegeList.filter(c => c.approved).length
  const pendingCount = collegeList.filter(c => !c.approved).length

  return (
    <div className="ad-layout">

      {sidebarOpen && <div className="ad-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`ad-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="ad-sidebar-header">
          <div className="ad-logo-container">
            <MdSchool size={24} color={accent} />
            <span className="ad-logo-text">CareerOS</span>
          </div>
          <button className="ad-close-btn" onClick={() => setSidebarOpen(false)}><FiX size={18} /></button>
        </div>

        <div className="ad-user-card">
          <div className="ad-user-avatar">AD</div>
          <div>
            <p className="ad-user-name">Admin User</p>
            <p className="ad-user-role">Super Admin</p>
          </div>
        </div>

        <nav className="ad-nav">
          {navItems.map(item => (
            <button key={item.key} 
              className={`ad-nav-btn ${activeNav === item.key ? 'active' : 'inactive'}`}
              onClick={() => { setActiveNav(item.key); setSidebarOpen(false) }}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <button className="ad-logout-btn" onClick={() => navigate('/')}>
          <FiLogOut size={18} /> Logout
        </button>
      </aside>

      <main className="ad-main">

        <div className="ad-topbar">
          <div className="ad-topbar-left">
            <button className="ad-menu-btn" onClick={() => setSidebarOpen(true)}><FiMenu size={20} /></button>
            <div>
              <h1 className="ad-topbar-title">
                {activeNav === 'dashboard' ? 'Admin Dashboard' : activeNav === 'colleges' ? 'Colleges' : activeNav === 'students' ? 'Students' : 'Enquiries'}
              </h1>
              <p className="ad-topbar-subtitle">Welcome, Admin! 🛡️</p>
            </div>
          </div>
          <div className="ad-topbar-right">
            <button className="ad-bell-btn"><FiBell size={18} /></button>
            <div className="ad-topbar-avatar">AD</div>
          </div>
        </div>

        {activeNav === 'dashboard' && (
          <div className="ad-content-area">
            <div className="ad-stats-grid">
              {[
                { icon: '🏫', label: 'Total Colleges', value: collegeList.length, color: '#eff6ff', border: '#bfdbfe' },
                { icon: '✅', label: 'Approved', value: approvedCount, color: '#f0fdf4', border: '#bbf7d0' },
                { icon: '⏳', label: 'Pending', value: pendingCount, color: '#fffbeb', border: '#fde68a' },
                { icon: '🎓', label: 'Students', value: dummyStudents.length, color: '#fdf4ff', border: '#e9d5ff' },
                { icon: '📩', label: 'Enquiries', value: dummyEnquiries.length, color: '#fff1f2', border: '#fecdd3' },
                { icon: '⭐', label: 'Avg Rating', value: '4.2', color: '#f0fdfa', border: '#99f6e4' },
              ].map(stat => (
                <div key={stat.label} className="ad-stat-card" style={{ background: stat.color, border: `1px solid ${stat.border}` }}>
                  <span className="ad-stat-icon">{stat.icon}</span>
                  <div>
                    <p className="ad-stat-value">{stat.value}</p>
                    <p className="ad-stat-label">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ad-section-card">
              <div className="ad-section-header">
                <h2 className="ad-section-title">Recent Colleges</h2>
                <button className="ad-section-btn" onClick={() => setActiveNav('colleges')}>Manage All</button>
              </div>
              <div className="ad-list-container">
                {collegeList.slice(0, 4).map(college => (
                  <div key={college.id} className="ad-list-item">
                    <div className="ad-list-item-content">
                      <p className="ad-list-item-title">{college.name}</p>
                      <div className="ad-list-item-tags">
                        <span className={`ad-tag ${college.type === 'Government' ? 'ad-tag-gov' : 'ad-tag-pvt'}`}>{college.type}</span>
                        <span className={`ad-tag ${college.approved ? 'ad-tag-approved' : 'ad-tag-pending'}`}>{college.approved ? '✅ Approved' : '⏳ Pending'}</span>
                      </div>
                    </div>
                    <div className="ad-list-item-actions">
                      <button className="ad-action-btn-view" onClick={() => navigate(`/colleges/${college.id}`)}><FiEye size={14} /></button>
                      <button className="ad-action-btn-danger" onClick={() => setCollegeList(prev => prev.filter(c => c.id !== college.id))}><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ad-section-card">
              <h2 className="ad-section-title">Recent Enquiries</h2>
              <div className="ad-list-container">
                {dummyEnquiries.map(enq => (
                  <div key={enq.id} className="ad-list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <div className="ad-enquiry-header">
                      <p className="ad-enquiry-student">{enq.student}</p>
                      <span className={`ad-enquiry-status ${enq.status === 'Replied' ? 'ad-status-replied' : 'ad-status-pending'}`}>{enq.status}</span>
                    </div>
                    <p className="ad-list-item-subtitle">{enq.college} • {enq.course} • {enq.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeNav === 'colleges' && (
          <div className="ad-content-area">
            <div className="ad-section-card">
              <h2 className="ad-section-title">All Colleges ({collegeList.length})</h2>
              <div className="ad-list-container">
                {collegeList.map(college => (
                  <div key={college.id} className="ad-list-item">
                    <div className="ad-list-item-content">
                      <p className="ad-list-item-title ad-list-item-title-large">{college.name}</p>
                      <div className="ad-list-item-tags">
                        <span className={`ad-tag ${college.type === 'Government' ? 'ad-tag-gov' : 'ad-tag-pvt'}`}>{college.type}</span>
                        <span className={`ad-tag ${college.approved ? 'ad-tag-approved' : 'ad-tag-pending'}`}>{college.approved ? '✅ Approved' : '⏳ Pending'}</span>
                        <span className="ad-tag-rating">⭐ {college.rating}</span>
                      </div>
                    </div>
                    <div className="ad-list-item-actions">
                      <button className="ad-action-btn-view" onClick={() => navigate(`/colleges/${college.id}`)}><FiEye size={14} /></button>
                      {!college.approved && <button className="ad-action-btn-approve" onClick={() => setCollegeList(prev => prev.map(c => c.id === college.id ? { ...c, approved: true } : c))}><FiCheck size={14} /></button>}
                      <button className="ad-action-btn-danger" onClick={() => setCollegeList(prev => prev.filter(c => c.id !== college.id))}><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeNav === 'students' && (
          <div className="ad-content-area">
            <div className="ad-section-card">
              <h2 className="ad-section-title">All Students ({dummyStudents.length})</h2>
              <div className="ad-list-container">
                {dummyStudents.map(student => (
                  <div key={student.id} className="ad-list-item">
                    <div className="ad-student-avatar">{student.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="ad-list-item-content">
                      <p className="ad-list-item-title">{student.name}</p>
                      <p className="ad-student-details">{student.email} • {student.city}</p>
                    </div>
                    <button className="ad-action-btn-danger"><FiTrash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeNav === 'enquiries' && (
          <div className="ad-content-area">
            <div className="ad-section-card">
              <h2 className="ad-section-title">All Enquiries ({dummyEnquiries.length})</h2>
              <div className="ad-list-container">
                {dummyEnquiries.map(enq => (
                  <div key={enq.id} className="ad-list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <div className="ad-enquiry-header">
                      <p className="ad-enquiry-student">{enq.student}</p>
                      <span className={`ad-enquiry-status ${enq.status === 'Replied' ? 'ad-status-replied' : 'ad-status-pending'}`}>{enq.status}</span>
                    </div>
                    <p className="ad-enq-details">{enq.college} • {enq.course}</p>
                    <p className="ad-enq-date">{enq.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default AdminDashboard