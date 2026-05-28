import './StatsSection.css'

const stats = [
  { icon: '🏫', number: '500+', label: 'Colleges Listed', desc: 'Verified colleges across Patna' },
  { icon: '🎓', number: '50,000+', label: 'Students Helped', desc: 'Found their dream college' },
  { icon: '📋', number: '200+', label: 'Courses Available', desc: 'Across all streams' },
  { icon: '⭐', number: '4.8/5', label: 'Average Rating', desc: 'Trusted by students' },
]

const features = [
  { icon: '🔍', title: 'Smart College Search', desc: 'Search and filter colleges by course, fees, location, placement and more in seconds.', color: '#eff6ff', border: '#bfdbfe' },
  { icon: '⚖️', title: 'Side-by-Side Compare', desc: 'Compare up to 3 colleges at once — fees, facilities, placements, ratings all in one view.', color: '#f0fdf4', border: '#bbf7d0' },
  { icon: '🎯', title: 'Rank-Based Predictor', desc: 'Enter your exam rank or score and get personalized college recommendations instantly.', color: '#fffbeb', border: '#fde68a' },
  { icon: '💬', title: 'Real Student Reviews', desc: 'Read honest reviews from real students about campus life, placements, and faculty.', color: '#fdf4ff', border: '#e9d5ff' },
  { icon: '❤️', title: 'Save Favorites', desc: 'Shortlist your favourite colleges and come back to compare them anytime.', color: '#fff1f2', border: '#fecdd3' },
  { icon: '📩', title: 'Direct Enquiry', desc: 'Send your queries directly to colleges and get responses without any middleman.', color: '#f0fdfa', border: '#99f6e4' },
]

const StatsSection = () => {
  return (
    <>
      {/* Stats Bar */}
      <section className="stats-bar-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-icon">{stat.icon}</span>
                <div>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-desc">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="stats-container">
          <div className="features-header">
            <p className="features-subtitle">💡 Why CareerOS</p>
            <h2 className="features-title">Everything You Need to Choose Right</h2>
            <p className="features-desc">Powerful tools to help every student make a confident college decision</p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card" style={{
                background: feature.color,
                border: `1px solid ${feature.border}`,
              }}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-text">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default StatsSection