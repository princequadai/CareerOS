import { useNavigate } from 'react-router-dom'
import { FiHeart, FiMapPin, FiStar, FiTrash2, FiArrowLeft, FiGrid, FiCompass } from 'react-icons/fi'
import { MdSchool, MdWorkOutline, MdCompareArrows } from 'react-icons/md'
import { LuScale } from 'react-icons/lu'
import { useFavorites } from '../context/FavoritesContext'
import colleges from '../data/colleges.json'
import './FavoritesPage.css'

const FavoritesPage = () => {
  const navigate = useNavigate()
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites()

  // Filter the colleges that are currently favorited
  const favoritedColleges = colleges.filter((c) => favorites.includes(c.id))

  const handleRemove = (e, id) => {
    e.stopPropagation()
    removeFavorite(id)
  }

  return (
    <div className="fav-page">
      {/* Premium Hero Banner */}
      <div className="fav-hero">
        <div className="fav-hero-overlay" />
        <div className="fav-hero-content">
          <button className="fav-back-btn" onClick={() => navigate('/colleges')}>
            <FiArrowLeft size={16} /> Back to Listings
          </button>
          <h1 className="fav-title">My Shortlisted Colleges</h1>
          <p className="fav-subtitle">
            Manage, compare, and connect with your saved educational institutions in Bihar.
          </p>
        </div>
      </div>

      <div className="fav-container">
        {/* Actions Bar */}
        {favoritedColleges.length > 0 && (
          <div className="fav-actions-bar">
            <div className="fav-count-badge">
              <span>❤️</span> <strong>{favoritedColleges.length}</strong> {favoritedColleges.length === 1 ? 'College' : 'Colleges'} Saved
            </div>
            <div className="fav-actions-group">
              <button 
                className="fav-btn-compare" 
                onClick={() => navigate('/compare')}
                title="Compare saved colleges side-by-side"
              >
                <LuScale size={16} />
                Compare Saved
              </button>
              <button 
                className="fav-btn-clear" 
                onClick={clearAllFavorites}
                title="Remove all colleges from shortlist"
              >
                <FiTrash2 size={15} />
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Saved Colleges List */}
        {favoritedColleges.length === 0 ? (
          <div className="fav-empty-card">
            <div className="fav-empty-icon-wrapper">
              <FiHeart className="fav-empty-icon-heart" size={54} />
            </div>
            <h2 className="fav-empty-title">Your shortlist is empty</h2>
            <p className="fav-empty-desc">
              Explore Bihar's top government and private colleges, shortlist your favorites, and compare them to find your perfect match.
            </p>
            <button className="fav-explore-btn" onClick={() => navigate('/colleges')}>
              <FiCompass size={18} />
              Explore Colleges
            </button>
          </div>
        ) : (
          <div className="fav-grid">
            {favoritedColleges.map((college) => (
              <div 
                key={college.id} 
                className="fav-card"
                onClick={() => navigate(`/colleges/${college.id}`)}
              >
                {/* College Image Section */}
                <div className="fav-card-image-wrapper">
                  <img src={college.image} alt={college.name} className="fav-card-img" />
                  <div className="fav-card-badge">{college.type}</div>
                  
                  {/* Floating Remove Button */}
                  <button 
                    className="fav-card-fav-btn active"
                    onClick={(e) => handleRemove(e, college.id)}
                    title="Remove from Saved"
                  >
                    <FiHeart size={16} fill="#fff" color="#ef4444" />
                  </button>
                </div>

                {/* College Info Section */}
                <div className="fav-card-content">
                  <div className="fav-card-rating">
                    <div className="fav-stars">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          size={12} 
                          fill={i < Math.floor(college.rating) ? '#f59e0b' : 'none'} 
                          color={i < Math.floor(college.rating) ? '#f59e0b' : '#cbd5e1'} 
                        />
                      ))}
                    </div>
                    <span className="fav-rating-val">{college.rating}</span>
                    <span className="fav-rating-reviews">({college.totalReviews} reviews)</span>
                  </div>

                  <h3 className="fav-card-title">{college.name}</h3>

                  <div className="fav-card-location">
                    <FiMapPin size={12} />
                    <span>{college.location}</span>
                  </div>

                  <div className="fav-card-divider" />

                  {/* Highlights Grid */}
                  <div className="fav-card-stats">
                    <div className="fav-stat-col">
                      <MdSchool size={14} className="fav-stat-icon-fees" />
                      <div>
                        <p className="fav-stat-val">₹{college.fees.min.toLocaleString()}/yr</p>
                        <p className="fav-stat-label">Min Fees</p>
                      </div>
                    </div>
                    <div className="fav-stat-col">
                      <MdWorkOutline size={14} className="fav-stat-icon-placement" />
                      <div>
                        <p className="fav-stat-val">{college.placement.percentage}%</p>
                        <p className="fav-stat-label">Placement</p>
                      </div>
                    </div>
                  </div>

                  <div className="fav-card-divider" />

                  {/* Actions Row */}
                  <div className="fav-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="fav-btn-view"
                      onClick={() => navigate(`/colleges/${college.id}`)}
                    >
                      View Details
                    </button>
                    <button 
                      className="fav-btn-card-compare"
                      onClick={() => navigate('/compare')}
                    >
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
  )
}

export default FavoritesPage