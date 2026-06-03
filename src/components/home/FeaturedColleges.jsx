import { useNavigate } from 'react-router-dom'
import { FiHeart, FiMapPin, FiStar, FiArrowRight } from 'react-icons/fi'
import { MdSchool, MdWorkOutline } from 'react-icons/md'
import { useFavorites } from '../../context/FavoritesContext'
import colleges from '../../data/colleges.json'
import './FeaturedColleges.css'

const FeaturedColleges = () => {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()

  const featured = colleges.filter((c) => c.featured).slice(0, 3)


  return (
    <section className="featured-section">
      <div className="featured-container">

        {/* Header */}
        <div className="featured-header">
          <div>
            <p className="featured-subtitle">
              ⭐ Hand Picked For You
            </p>
            <h2 className="featured-title">
              Featured Colleges in Patna
            </h2>
            <p className="featured-desc">
              Top rated colleges selected by our education experts
            </p>
          </div>
          <button
            className="featured-view-all"
            onClick={() => navigate('/colleges')}
          >
            View All <FiArrowRight size={15} />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="featured-grid">
          {featured.map((college) => (
            <div key={college.id} className="featured-card">

              {/* Image */}
              <div className="fc-image-wrapper">
                <img src={college.image} alt={college.name} className="fc-image" />
                <div className="fc-badge">
                  {college.type}
                </div>
                <button
                  className="fc-fav-btn"
                  style={{
                    background: favorites.includes(college.id) ? '#ef4444' : 'rgba(255,255,255,0.9)',
                    color: favorites.includes(college.id) ? '#fff' : '#64748b',
                  }}
                  onClick={() => toggleFavorite(college.id)}
                >
                  <FiHeart size={16} fill={favorites.includes(college.id) ? '#fff' : 'none'} />
                </button>
              </div>

              {/* Content */}
              <div className="fc-content">

                <div className="fc-rating-row">
                  <div className="fc-stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={12} fill={i < Math.floor(college.rating) ? '#f59e0b' : 'none'} color={i < Math.floor(college.rating) ? '#f59e0b' : '#cbd5e1'} />
                    ))}
                    <span className="fc-rating-val">{college.rating}</span>
                  </div>
                  <span className="fc-reviews">({college.totalReviews} reviews)</span>
                </div>

                <h3 className="fc-name">{college.name}</h3>

                <div className="fc-location-row">
                  <FiMapPin size={12} color="#64748b" />
                  <span className="fc-location-text">{college.location}</span>
                </div>

                <div className="fc-courses-row">
                  {college.courses.slice(0, 3).map((course) => (
                    <span key={course} className="fc-course-pill">{course}</span>
                  ))}
                  {college.courses.length > 3 && (
                    <span className="fc-course-pill">+{college.courses.length - 3}</span>
                  )}
                </div>

                <div className="fc-divider" />

                <div className="fc-stats-row">
                  {[
                    { icon: <MdSchool size={14} color="#2563eb" />, value: `₹${college.fees.min.toLocaleString()}/yr`, label: 'Min Fees' },
                    { icon: <MdWorkOutline size={14} color="#10b981" />, value: `${college.placement.percentage}%`, label: 'Placement' },
                    { icon: <FiStar size={14} color="#f59e0b" />, value: college.placement.averagePackage, label: 'Avg Package' },
                  ].map((s, i) => (
                    <div key={i} className="fc-stat-col">
                      {i > 0 && <div className="fc-stat-separator" />}
                      {s.icon}
                      <div>
                        <p className="fc-stat-val">{s.value}</p>
                        <p className="fc-stat-label">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="fc-actions">
                  <button
                    className="fc-btn-primary"
                    onClick={() => navigate(`/colleges/${college.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="fc-btn-outline"
                    onClick={() => navigate('/compare')}
                  >
                    Compare
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturedColleges