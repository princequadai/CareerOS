import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiSearch, 
  FiBarChart2, 
  FiMessageSquare, 
  FiClock, 
  FiUsers, 
  FiLayers, 
  FiStar, 
  FiCompass, 
  FiTrendingUp, 
  FiSmile, 
  FiBookOpen, 
  FiMapPin 
} from 'react-icons/fi'
import colleges from '../data/colleges.json'
import './AboutPage.css'

// CountUp Utility Component
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState('0')

  useEffect(() => {
    // Parse target number (e.g. "500+" -> 500, "50,000+" -> 50000, "4.8★" -> 48)
    const isFloat = end.includes('.')
    const rawNumber = end.replace(/[^0-9]/g, '')
    const target = isFloat ? parseFloat(end) : parseInt(rawNumber)
    
    if (isNaN(target)) {
      setCount(end)
      return
    }

    const suffix = end.replace(/[0-9,.]/g, '') // e.g. "+" or "★"
    const hasComma = end.includes(',')
    
    const startTime = performance.now()

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const easedProgress = progress * (2 - progress) // outQuad ease
      
      let currentVal = easedProgress * target
      
      let displayCount
      if (isFloat) {
        displayCount = currentVal.toFixed(1)
      } else {
        const rounded = Math.floor(currentVal)
        displayCount = hasComma ? rounded.toLocaleString() : rounded.toString()
      }

      setCount(displayCount + suffix)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [end, duration])

  return <span>{count}</span>
}

// Intersecting Stat Card Component
const StatCard = ({ number, label, icon: Icon }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    
    const currentRef = cardRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <div className="about-stat-card" ref={cardRef}>
      <div className="about-stat-icon-wrapper">
        <Icon size={24} className="about-stat-icon" />
      </div>
      <h3 className="about-stat-number">
        {isVisible ? <CountUp end={number} /> : '0'}
      </h3>
      <p className="about-stat-label">{label}</p>
    </div>
  )
}

// Student themed graduation SVG component
const GraduationIllustration = () => (
  <svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="about-hero-svg">
    <defs>
      <linearGradient id="svgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <filter id="svgShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
      </filter>
    </defs>
    {/* Floating backdrop decoration */}
    <circle cx="100" cy="150" r="30" fill="#eff6ff" opacity="0.6" />
    <rect x="400" y="80" width="40" height="40" rx="8" fill="#f3e8ff" transform="rotate(15 400 80)" opacity="0.8" />
    <polygon points="350,380 370,410 330,410" fill="#fef3c7" opacity="0.7" />

    {/* Laptop / Book base */}
    <rect x="80" y="340" width="340" height="30" rx="10" fill="#cbd5e1" filter="url(#svgShadow)" />
    
    {/* Stacked books */}
    <rect x="120" y="300" width="100" height="40" rx="6" fill="#3b82f6" />
    <line x1="140" y1="320" x2="200" y2="320" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
    <rect x="230" y="280" width="120" height="60" rx="6" fill="#a855f7" />
    <line x1="250" y1="310" x2="330" y2="310" stroke="#f3e8ff" strokeWidth="4" strokeLinecap="round" />
    <rect x="250" y="250" width="80" height="30" rx="4" fill="#10b981" />

    {/* Graduation Cap */}
    <path d="M 250,110 L 390,150 L 250,190 L 110,150 Z" fill="url(#svgGrad)" filter="url(#svgShadow)" />
    <rect x="225" y="170" width="50" height="45" fill="#1e3a8a" />
    <path d="M 225,215 C 225,225 275,225 275,215 Z" fill="#1e3a8a" />
    
    {/* Cap Tassel */}
    <path d="M 320,155 L 340,210 L 348,210 L 325,155 Z" fill="#f59e0b" />
    <circle cx="344" cy="214" r="6" fill="#f59e0b" />

    {/* Glowing checkmark badge in center */}
    <circle cx="250" cy="260" r="40" fill="#ffffff" filter="url(#svgShadow)" />
    <path d="M 235,260 L 245,270 L 268,248" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const AboutPage = () => {
  // Show first 3 colleges as standard listings on the about page
  const displayedColleges = colleges.filter(c => c.featured || c.approved).slice(0, 3)

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-header">
        <div className="about-hero-shape about-hero-shape-1"></div>
        <div className="about-hero-shape about-hero-shape-2"></div>
        <div className="about-hero-grid">
          <div className="about-hero-text">
            <h1 className="about-title">About CareerOS</h1>
            <p className="about-subtitle">
              Bihar's most trusted college discovery platform, custom built for students to choose their paths without friction.
            </p>
            <div className="about-hero-ctas">
              <Link to="/colleges" className="about-btn-primary">Explore Colleges</Link>
              <Link to="/compare" className="about-btn-secondary">Compare Colleges</Link>
            </div>
          </div>
          <div className="about-hero-illustration">
            <GraduationIllustration />
          </div>
        </div>
      </section>

      <div className="about-content-container">
        {/* Converted Mission Feature Section */}
        <section className="about-mission-section">
          <div className="about-section-header-center">
            <h2 className="about-section-title-center">Our Core Mission</h2>
            <p className="about-section-subtitle-center">
              We eliminate intermediaries and make the college discovery journey entirely direct, transparent, and objective.
            </p>
          </div>
          <div className="about-feature-grid">
            {[
              {
                icon: FiSearch,
                title: 'Find the Right College',
                text: 'Search through updated listings of colleges in Bihar complete with affiliations and fee metrics.'
              },
              {
                icon: FiBarChart2,
                title: 'Compare Colleges',
                text: 'Weigh infrastructure details, courses, and placements side-by-side to find your match.'
              },
              {
                icon: FiMessageSquare,
                title: 'Read Student Reviews',
                text: 'Access genuine feedback and ratings directly from verified alumni and active students.'
              },
              {
                icon: FiClock,
                title: 'Save Time',
                text: 'Research from anywhere in Bihar instead of traveling to multiple offices for inquiries.'
              }
            ].map((item, idx) => (
              <div key={idx} className="about-feature-card">
                <div className="about-feature-icon-wrapper">
                  <item.icon size={22} className="about-feature-icon" />
                </div>
                <h3 className="about-feature-title">{item.title}</h3>
                <p className="about-feature-text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="about-stats-section">
          <div className="about-stats-grid">
            {[
              { number: '500+', label: 'Colleges Listed', icon: FiBookOpen },
              { number: '50,000+', label: 'Students Helped', icon: FiUsers },
              { number: '200+', label: 'Courses Offered', icon: FiLayers },
              { number: '4.8★', label: 'Average Rating', icon: FiStar },
            ].map(s => (
              <StatCard key={s.label} number={s.number} label={s.label} icon={s.icon} />
            ))}
          </div>
        </section>

        {/* Why CareerOS Section */}
        <section className="about-why-section">
          <div className="about-section-header-center">
            <h2 className="about-section-title-center">Why Students Choose CareerOS</h2>
            <p className="about-section-subtitle-center">
              A comprehensive portal designed to solve specific challenges faced by students in the region.
            </p>
          </div>
          <div className="about-feature-grid">
            {[
              {
                icon: FiCompass,
                title: 'Smart College Search',
                text: 'Tailor-made filters designed for regional streams, budgets, district maps, and scores.'
              },
              {
                icon: FiBarChart2,
                title: 'College Comparison',
                text: 'Compare infrastructure ratings, courses, fees, and libraries in a single parallel dashboard.'
              },
              {
                icon: FiTrendingUp,
                title: 'Placement Insights',
                text: 'Authentic metrics detailing average salary packages, recruiting companies, and top hires.'
              },
              {
                icon: FiSmile,
                title: 'Student Reviews',
                text: 'Honest reports on classroom environments, hostel conditions, and exam schedules.'
              }
            ].map((item, idx) => (
              <div key={idx} className="about-feature-card">
                <div className="about-feature-icon-wrapper secondary-theme">
                  <item.icon size={22} className="about-feature-icon" />
                </div>
                <h3 className="about-feature-title">{item.title}</h3>
                <p className="about-feature-text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="about-testimonials-section">
          <div className="about-section-header-center">
            <h2 className="about-section-title-center">What Our Students Say</h2>
            <p className="about-section-subtitle-center">
              Real stories from students across Bihar who navigated their admissions with CareerOS.
            </p>
          </div>
          <div className="about-testimonials-grid">
            {[
              {
                name: 'Amit Raj',
                role: 'B.Tech Student, Patna',
                text: 'CareerOS saved me so much hassle. I could easily compare MIT Patna with other regional options and choose the perfect fit.',
                initials: 'AR'
              },
              {
                name: 'Preeti Kumari',
                role: 'MBA Candidate, Gaya',
                text: 'The placement insights are incredibly helpful. The detailed list of recruiters and packages made me decide with confidence.',
                initials: 'PK'
              },
              {
                name: 'Vikash Kumar',
                role: 'B.Sc Graduate, Muzaffarpur',
                text: 'Finding genuine reviews was difficult until I used CareerOS. It provides authentic feedback that helps you pick real options.',
                initials: 'VK'
              }
            ].map((t, idx) => (
              <div key={idx} className="about-testimonial-card">
                <div className="about-rating">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={15} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <p className="about-testimonial-text">"{t.text}"</p>
                <div className="about-testimonial-author">
                  <div className="about-testimonial-avatar">{t.initials}</div>
                  <div>
                    <h4 className="about-testimonial-name">{t.name}</h4>
                    <p className="about-testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colleges Grid Section */}
        <section className="about-colleges-section">
          <div className="about-section-header-center">
            <h2 className="about-section-title-center">Colleges Available on CareerOS</h2>
            <p className="about-section-subtitle-center">
              Explore some of Bihar\'s top featured institutions currently listing details on our platform.
            </p>
          </div>
          <div className="about-colleges-grid">
            {displayedColleges.map((college) => (
              <div key={college.id} className="about-college-card">
                <div className="about-college-image-wrapper">
                  <img src={college.image} alt={college.name} className="about-college-image" />
                  <span className="about-college-badge">{college.type}</span>
                </div>
                <div className="about-college-content">
                  <h3 className="about-college-name">{college.name}</h3>
                  <div className="about-college-meta">
                    <span className="about-college-location">
                      <FiMapPin size={13} style={{ marginRight: '4px' }} />
                      {college.location}
                    </span>
                    <span className="about-college-rating">
                      <FiStar size={13} fill="#f59e0b" stroke="#f59e0b" style={{ marginRight: '4px' }} />
                      {college.rating} ({college.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="about-college-courses">
                    {college.courses.map((course, i) => (
                      <span key={i} className="about-college-course-tag">{course}</span>
                    ))}
                  </div>
                  <Link to={`/colleges/${college.id}`} className="about-college-link">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="about-cta-banner">
        <div className="about-cta-content">
          <h2 className="about-cta-title">Ready to Find Your Perfect College?</h2>
          <p className="about-cta-description">
            Join thousands of students who have discovered their academic futures. Use our advanced search and comparison dashboard today.
          </p>
          <div className="about-cta-buttons">
            <Link to="/colleges" className="about-cta-btn-primary">Explore Colleges</Link>
            <Link to="/compare" className="about-cta-btn-secondary">Compare Colleges</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage