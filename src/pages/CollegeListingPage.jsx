import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter, FiGrid, FiList, FiX, FiHeart, FiMapPin, FiStar } from 'react-icons/fi'
import { MdSchool, MdWorkOutline } from 'react-icons/md'
import { useFavorites } from '../context/FavoritesContext'
import colleges from '../data/colleges.json'
import './CollegeListingPage.css'

const CollegeListingPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const { favorites, toggleFavorite } = useFavorites()
  const [viewMode, setViewMode] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    minFees: '',
    maxFees: '',
    hostel: false,
    minRating: '',
    course: '',
  })

  const courseOptions = ['B.Tech', 'MBBS', 'MBA', 'B.Sc', 'LLB', 'BBA', 'B.A', 'B.Com', 'BCA']

  const filteredColleges = colleges.filter(college => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = !filters.type || college.type === filters.type
    const matchesHostel = !filters.hostel || college.facilities.hostel === true
    const matchesRating = !filters.minRating || college.rating >= parseFloat(filters.minRating)
    const matchesCourse = !filters.course || college.courses.some(c =>
      c.toLowerCase().includes(filters.course.toLowerCase())
    )
    const matchesMinFees = !filters.minFees || college.fees.min >= parseInt(filters.minFees)
    const matchesMaxFees = !filters.maxFees || college.fees.min <= parseInt(filters.maxFees)

    return matchesSearch && matchesType && matchesHostel && matchesRating && matchesCourse && matchesMinFees && matchesMaxFees
  })

  const clearFilters = () => {
    setFilters({ type: '', minFees: '', maxFees: '', hostel: false, minRating: '', course: '' })
    setSearchQuery('')
  }


  const activeFilterCount = Object.values(filters).filter(v => v !== '' && v !== false).length

  return (
    <div className="cl-page">

      {/* Page Header */}
      <div className="cl-page-header">
        <div className="cl-header-container">
          <div>
            <h1 className="cl-page-title">Colleges in Patna, Bihar</h1>
            <p className="cl-page-subtitle">
              Showing <strong>{filteredColleges.length}</strong> colleges
              {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
            </p>
          </div>

          {/* Search + Controls */}
          <div className="cl-header-controls">
            <div className="cl-search-bar">
              <FiSearch size={18} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search colleges..."
                className="cl-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="cl-clear-btn" onClick={() => setSearchQuery('')}>
                  <FiX size={16} />
                </button>
              )}
            </div>

            <button
              className="cl-filter-toggle"
              style={{ background: sidebarOpen ? '#2563eb' : '#f1f5f9', color: sidebarOpen ? '#fff' : '#475569' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiFilter size={16} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <div className="cl-view-toggle">
              <button
                className="cl-view-btn"
                style={{ background: viewMode === 'grid' ? '#2563eb' : 'transparent', color: viewMode === 'grid' ? '#fff' : '#64748b' }}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid size={16} />
              </button>
              <button
                className="cl-view-btn"
                style={{ background: viewMode === 'list' ? '#2563eb' : 'transparent', color: viewMode === 'list' ? '#fff' : '#64748b' }}
                onClick={() => setViewMode('list')}
              >
                <FiList size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="cl-main-container">
        <div className={`cl-content-row ${!sidebarOpen ? 'sidebar-closed' : ''}`}>

          {/* Sidebar Overlay on Mobile */}
          {sidebarOpen && (
            <div className="cl-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="cl-sidebar">
              <div className="cl-sidebar-header">
                <h3 className="cl-sidebar-title">Filters</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {activeFilterCount > 0 && (
                    <button className="cl-clear-all-btn" onClick={clearFilters}>
                      Clear All
                    </button>
                  )}
                  <button className="cl-sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* College Type */}
              <div className="cl-filter-group">
                <label className="cl-filter-label">College Type</label>
                <div className="cl-radio-group">
                  {['', 'Government', 'Private'].map(type => (
                    <label key={type} className="cl-radio-label">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={filters.type === type}
                        onChange={() => setFilters(prev => ({ ...prev, type }))}
                        className="cl-radio"
                      />
                      {type || 'All Types'}
                    </label>
                  ))}
                </div>
              </div>

              {/* Course Filter */}
              <div className="cl-filter-group">
                <label className="cl-filter-label">Course</label>
                <select
                  className="cl-select"
                  value={filters.course}
                  onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
                >
                  <option value="">All Courses</option>
                  {courseOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Fees Range */}
              <div className="cl-filter-group">
                <label className="cl-filter-label">Fees Range (₹/year)</label>
                <div className="cl-fees-row">
                  <input
                    type="number"
                    placeholder="Min"
                    className="cl-fees-input"
                    value={filters.minFees}
                    onChange={(e) => setFilters(prev => ({ ...prev, minFees: e.target.value }))}
                  />
                  <span className="cl-fees-dash">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="cl-fees-input"
                    value={filters.maxFees}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxFees: e.target.value }))}
                  />
                </div>
              </div>

              {/* Min Rating */}
              <div className="cl-filter-group">
                <label className="cl-filter-label">Minimum Rating</label>
                <select
                  className="cl-select"
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: e.target.value }))}
                >
                  <option value="">Any Rating</option>
                  <option value="3">3★ and above</option>
                  <option value="3.5">3.5★ and above</option>
                  <option value="4">4★ and above</option>
                  <option value="4.5">4.5★ and above</option>
                </select>
              </div>

              {/* Hostel */}
              <div className="cl-filter-group">
                <label className="cl-checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.hostel}
                    onChange={(e) => setFilters(prev => ({ ...prev, hostel: e.target.checked }))}
                    className="cl-checkbox"
                  />
                  Hostel Available
                </label>
              </div>

            </aside>
          )}

          {/* College Cards */}
          <div className="cl-results-container">
            {filteredColleges.length === 0 ? (
              <div className="cl-no-results">
                <span className="cl-no-results-icon">🔍</span>
                <h3 className="cl-no-results-title">No colleges found</h3>
                <p className="cl-no-results-text">Try adjusting your search or filters</p>
                <button className="cl-reset-btn" onClick={clearFilters}>Reset All Filters</button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "cl-grid" : "cl-list"}>
                {filteredColleges.map(college => (
                  <div
                    key={college.id}
                    className={viewMode === 'grid' ? "cl-card" : "cl-list-card"}
                  >
                    {/* Image */}
                    <div className={viewMode === 'grid' ? "cl-image-wrapper" : "cl-list-image-wrapper"}>
                      <img 
                        src={college.image} 
                        alt={college.name} 
                        className="cl-image clickable-image" 
                        onClick={() => navigate(`/colleges/${college.id}`)}
                      />
                      <div className="cl-type-badge">{college.type}</div>
                      <button
                        className="cl-favorite-btn"
                        style={{
                          background: favorites.includes(college.id) ? '#ef4444' : 'rgba(255,255,255,0.9)',
                          color: favorites.includes(college.id) ? '#fff' : '#64748b',
                        }}
                        onClick={() => toggleFavorite(college.id)}
                      >
                        <FiHeart size={15} fill={favorites.includes(college.id) ? '#fff' : 'none'} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="cl-card-content">
                      <div className="cl-rating-row">
                        <div className="cl-stars">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} size={12} fill={i < Math.floor(college.rating) ? '#f59e0b' : 'none'} color={i < Math.floor(college.rating) ? '#f59e0b' : '#cbd5e1'} />
                          ))}
                          <span className="cl-rating-text">{college.rating}</span>
                        </div>
                        <span className="cl-review-text">({college.totalReviews})</span>
                      </div>

                      <h3 className="cl-college-name">{college.name}</h3>

                      <div className="cl-location-row">
                        <FiMapPin size={12} color="#64748b" />
                        <span className="cl-location-text">{college.location}</span>
                      </div>

                      <div className="cl-courses-row">
                        {college.courses.slice(0, 3).map(course => (
                          <span key={course} className="cl-course-tag">{course}</span>
                        ))}
                        {college.courses.length > 3 && (
                          <span className="cl-course-tag">+{college.courses.length - 3}</span>
                        )}
                      </div>

                      <div className="cl-divider" />

                      <div className="cl-stats-row">
                        <div className="cl-stat">
                          <MdSchool size={14} color="#2563eb" />
                          <div>
                            <p className="cl-stat-value">₹{college.fees.min.toLocaleString()}/yr</p>
                            <p className="cl-stat-label">Min Fees</p>
                          </div>
                        </div>
                        <div className="cl-stat-divider" />
                        <div className="cl-stat">
                          <MdWorkOutline size={14} color="#10b981" />
                          <div>
                            <p className="cl-stat-value">{college.placement.percentage}%</p>
                            <p className="cl-stat-label">Placement</p>
                          </div>
                        </div>
                        <div className="cl-stat-divider" />
                        <div className="cl-stat">
                          <FiStar size={14} color="#f59e0b" />
                          <div>
                            <p className="cl-stat-value">{college.placement.averagePackage}</p>
                            <p className="cl-stat-label">Avg Package</p>
                          </div>
                        </div>
                      </div>

                      <div className="cl-btn-row">
                        <button className="cl-details-btn" onClick={() => navigate(`/colleges/${college.id}`)}>
                          View Details
                        </button>
                        <button className="cl-compare-btn" onClick={() => navigate('/compare', { state: { compareIds: [college.id] } })}>
                          Compare
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CollegeListingPage