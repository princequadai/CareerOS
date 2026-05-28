import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import './HeroSection.css'

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${searchQuery}`)
    } else {
      navigate('/colleges')
    }
  }

  const popularSearches = ['B.Tech', 'MBBS', 'MBA', 'B.Sc', 'LLB', 'BBA']

  return (
    <section className="hero-section">
      <div className="hero-bg-circle-1" />
      <div className="hero-bg-circle-2" />

      <div className="hero-content">

        {/* Badge */}
        <div className="hero-badge">
          <MdSchool size={14} color="#2563eb" />
          <span>Bihar's #1 College Discovery Platform</span>
        </div>

        {/* Heading */}
        <h1 className="hero-title">
          Find Your Dream College
          <span className="hero-title-accent"> in Patna</span>
        </h1>

        {/* Subheading */}
        <p className="hero-subtitle">
          Explore 500+ colleges, compare fees, placements, and facilities.
          Make the right choice for your future career.
        </p>

        {/* Search Box */}
        <div className="hero-search-container">
          <div className="hero-search-wrapper">
            <div className="hero-search-input-group">
              <FiSearch className="hero-search-icon" />
              <input
                type="text"
                placeholder="Search colleges, courses, locations..."
                className="hero-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="hero-search-location">
              <FiMapPin className="hero-search-location-icon" />
              <span className="hero-search-location-text">Patna, Bihar</span>
            </div>
            <button className="hero-search-btn" onClick={handleSearch}>
              Search Colleges
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="hero-popular">
          <span className="hero-popular-label">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              className="hero-popular-btn"
              onClick={() => navigate(`/colleges?search=${term}`)}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="hero-stats">
          {[
            { number: '500+', label: 'Colleges Listed' },
            { number: '50K+', label: 'Students Helped' },
            { number: '200+', label: 'Courses Available' },
            { number: '4.8★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="hero-stat-item">
              <span className="hero-stat-number">
                {stat.number}
              </span>
              <span className="hero-stat-label">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HeroSection