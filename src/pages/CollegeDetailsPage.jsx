import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiMapPin, FiStar, FiHeart, FiPhone, FiMail, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi'
import { MdSchool, MdWorkOutline, MdApartment } from 'react-icons/md'
import { useFavorites } from '../context/FavoritesContext'
import { submitEnquiry } from '../utils/db'
import colleges from '../data/colleges.json'
import './CollegeDetailsPage.css'

const tabs = ['Overview', 'Courses & Fees', 'Placements', 'Facilities', 'Enquiry']

const CollegeDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(id)
  const [enquiry, setEnquiry] = useState({ name: '', email: '', phone: '', course: '', message: '' })

  const [submitted, setSubmitted] = useState(false)
  const [enquiryLoading, setEnquiryLoading] = useState(false)

  const college = colleges.find(c => c.id === parseInt(id))

  if (!college) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h2>College not found</h2>
      <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', marginTop: '16px', fontFamily: 'Poppins, sans-serif' }} onClick={() => navigate('/colleges')}>Back to Colleges</button>
    </div>
  )

  const handleEnquiry = async () => {
    if (!enquiry.name || !enquiry.email || !enquiry.phone) return

    setEnquiryLoading(true)
    try {
      await submitEnquiry(college.id, {
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        course: enquiry.course,
        message: enquiry.message,
        collegeName: college.name
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit enquiry:', err)
      alert('Failed to submit enquiry. Please try again.')
    } finally {
      setEnquiryLoading(false)
    }
  }

  return (
    <div className="cd-page">

      {/* Back Button */}
      <div className="cd-back-bar">
        <div className="cd-back-container">
          <button className="cd-back-btn" onClick={() => navigate('/colleges')}>
            <FiArrowLeft size={16} /> Back to Colleges
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="cd-hero-wrapper">
        <img src={college.image} alt={college.name} className="cd-hero-img" />
        <div className="cd-hero-overlay" />
        <div className="cd-hero-content-wrapper">
          <div className="cd-hero-container">
            <div className="cd-hero-row">
              <div className="cd-hero-left">
                <div className="cd-hero-badge">{college.type}</div>
                <h1 className="cd-hero-title">{college.name}</h1>
                <div className="cd-hero-meta-row">
                  {[{ icon: FiMapPin, text: college.location }, { icon: MdApartment, text: college.affiliation }, { icon: MdSchool, text: `Est. ${college.established}` }].map(({ icon: Icon, text }) => (
                    <span key={text} className="cd-hero-meta-item">
                      <Icon size={13} />{text}
                    </span>
                  ))}
                </div>
                <div className="cd-hero-rating-row">
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: i < Math.floor(college.rating) ? '#f59e0b' : '#94a3b8', fontSize: '16px' }}>★</span>)}
                  <span className="cd-hero-rating-val">{college.rating}</span>
                  <span className="cd-hero-reviews">({college.totalReviews})</span>
                </div>
              </div>
              <div className="cd-hero-actions">
                <button 
                  className="cd-hero-fav-btn"
                  style={{ background: favorite ? '#ef4444' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }} 
                  onClick={() => toggleFavorite(college.id)}
                >
                  <FiHeart size={16} fill={favorite ? '#fff' : 'none'} />
                  <span className="cd-fav-text">{favorite ? 'Saved' : 'Save'}</span>
                </button>
                <button className="cd-hero-compare-btn" onClick={() => navigate('/compare', { state: { compareIds: [college.id] } })}>
                  Compare
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="cd-stats-bar">
        <div className="cd-stats-container">
          <div className="cd-stats-grid">
            {[
              { icon: '💰', label: 'Min Fees', value: `₹${college.fees.min.toLocaleString()}/yr` },
              { icon: '📈', label: 'Placement', value: `${college.placement.percentage}%` },
              { icon: '💼', label: 'Avg Package', value: college.placement.averagePackage },
              { icon: '🏆', label: 'Highest', value: college.placement.highestPackage },
              { icon: '📚', label: 'Courses', value: `${college.courses.length}` },
              { icon: '🏠', label: 'Hostel', value: college.facilities.hostel ? 'Yes' : 'No' },
            ].map(stat => (
              <div key={stat.label} className="cd-stat-item">
                <span className="cd-stat-icon">{stat.icon}</span>
                <p className="cd-stat-val">{stat.value}</p>
                <p className="cd-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="cd-main-wrapper">
        <div className="cd-main-layout">

          {/* Left — Tabs */}
          <div className="cd-left-col">

            {/* Tab Nav */}
            <div className="cd-tabs-nav">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className="cd-tab-btn"
                  style={{
                    borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                    color: activeTab === tab ? '#2563eb' : '#64748b',
                    fontWeight: activeTab === tab ? '600' : '400',
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="cd-tab-content">

              {activeTab === 'Overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 className="cd-section-title">About {college.name}</h2>
                  <p className="cd-text">{college.description}</p>
                  <p className="cd-text">
                    Located in {college.location}, this {college.type.toLowerCase()} institution was established in {college.established} and is affiliated to {college.affiliation}.
                  </p>
                  <h3 className="cd-subsection-title">Courses Offered</h3>
                  <div className="cd-courses-grid">
                    {college.courses.map(course => (
                      <div key={course} className="cd-course-item">
                        <MdSchool size={16} color="#2563eb" />
                        <span className="cd-course-name">{course}</span>
                      </div>
                    ))}
                  </div>
                  <h3 className="cd-subsection-title">Top Recruiters</h3>
                  <div className="cd-tags-row">
                    {college.placement.topRecruiters.map(r => (
                      <span key={r} className="cd-tag">{r}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Courses & Fees' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 className="cd-section-title">Courses & Fee Structure</h2>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                      <thead>
                        <tr style={{ background: '#f1f5f9' }}>
                          {['Course', 'Duration', 'Min Fees', 'Max Fees'].map(h => (
                            <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: '600', color: '#374151', fontFamily: 'Poppins, sans-serif', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {college.courses.map((course, i) => (
                          <tr key={course} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                            <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#475569', fontFamily: 'Poppins, sans-serif', borderBottom: '1px solid #e2e8f0' }}>{course}</td>
                            <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#475569', fontFamily: 'Poppins, sans-serif', borderBottom: '1px solid #e2e8f0' }}>{course.startsWith('M') || course.startsWith('Ph') ? '2-3 Yrs' : '3-4 Yrs'}</td>
                            <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#475569', fontFamily: 'Poppins, sans-serif', borderBottom: '1px solid #e2e8f0' }}>₹{college.fees.min.toLocaleString()}</td>
                            <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#475569', fontFamily: 'Poppins, sans-serif', borderBottom: '1px solid #e2e8f0' }}>₹{college.fees.max.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'Placements' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 className="cd-section-title">Placement Statistics</h2>
                  <div className="cd-placement-grid">
                    {[
                      { label: 'Placement Rate', value: `${college.placement.percentage}%`, color: '#10b981' },
                      { label: 'Average Package', value: college.placement.averagePackage, color: '#2563eb' },
                      { label: 'Highest Package', value: college.placement.highestPackage, color: '#f59e0b' },
                    ].map(p => (
                      <div key={p.label} className="cd-placement-card" style={{ borderTop: `4px solid ${p.color}` }}>
                        <p className="cd-placement-val" style={{ color: p.color }}>{p.value}</p>
                        <p className="cd-placement-label">{p.label}</p>
                      </div>
                    ))}
                  </div>
                  <h3 className="cd-subsection-title">Top Recruiters</h3>
                  <div className="cd-tags-row">
                    {college.placement.topRecruiters.map(r => (
                      <span key={r} className="cd-tag">{r}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Facilities' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 className="cd-section-title">Campus Facilities</h2>
                  <div className="cd-facilities-grid">
                    {Object.entries(college.facilities).map(([key, value]) => (
                      <div key={key} className="cd-facility-item" style={{ border: `1px solid ${value ? '#bbf7d0' : '#fecdd3'}`, background: value ? '#f0fdf4' : '#fff1f2' }}>
                        <span style={{ color: value ? '#10b981' : '#ef4444', flexShrink: 0 }}>{value ? <FiCheck size={16} /> : <FiX size={16} />}</span>
                        <span className="cd-facility-name">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Enquiry' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 className="cd-section-title">Send an Enquiry</h2>
                  {submitted ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                      <span style={{ fontSize: '3rem' }}>✅</span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#065f46', fontFamily: 'Poppins, sans-serif', margin: '12px 0 6px' }}>Enquiry Submitted!</h3>
                      <p style={{ fontSize: '0.9rem', color: '#047857', fontFamily: 'Poppins, sans-serif', margin: 0 }}>The college team will contact you within 24 hours.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter your full name' },
                        { label: 'Email Address', key: 'email', type: 'email', placeholder: 'Enter your email' },
                        { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
                        { label: 'Course Interested In', key: 'course', type: 'text', placeholder: 'e.g. B.Tech CSE' },
                      ].map(field => (
                        <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151', fontFamily: 'Poppins, sans-serif' }}>{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', color: '#1e293b', outline: 'none' }}
                            value={enquiry[field.key]}
                            onChange={(e) => setEnquiry(prev => ({ ...prev, [field.key]: e.target.value }))}
                          />
                        </div>
                      ))}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151', fontFamily: 'Poppins, sans-serif' }}>Message (Optional)</label>
                        <textarea
                          placeholder="Any specific questions..."
                          style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', color: '#1e293b', outline: 'none', minHeight: '100px', resize: 'vertical' }}
                          value={enquiry.message}
                          onChange={(e) => setEnquiry(prev => ({ ...prev, message: e.target.value }))}
                        />
                      </div>
                      <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '0.95rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif', cursor: 'pointer' }} onClick={handleEnquiry}>
                        Submit Enquiry
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Right Sidebar */}
          <div className="cd-right-sidebar">
            <div className="cd-info-card">
              <h3 className="cd-info-title">College Info</h3>
              {[
                { label: 'Type', value: college.type },
                { label: 'Established', value: college.established },
                { label: 'Affiliation', value: college.affiliation },
                { label: 'Location', value: college.district },
                { label: 'Rating', value: `${college.rating} / 5` },
                { label: 'Reviews', value: college.totalReviews },
              ].map(item => (
                <div key={item.label} className="cd-info-row">
                  <span className="cd-info-label">{item.label}</span>
                  <span className="cd-info-val">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="cd-contact-card">
              <h3 className="cd-contact-title">Contact College</h3>
              <div className="cd-contact-row">
                <FiPhone size={15} color="#2563eb" />
                <span className="cd-contact-text">+91 98765 43210</span>
              </div>
              <div className="cd-contact-row">
                <FiMail size={15} color="#2563eb" />
                <span className="cd-contact-text">info@college.edu.in</span>
              </div>
              <button className="cd-contact-btn" onClick={() => setActiveTab('Enquiry')}>
                Send Enquiry
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CollegeDetailsPage