import './AboutPage.css'

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <div className="about-header-container">
          <h1 className="about-title">About CareerOS</h1>
          <p className="about-subtitle">Bihar's most trusted college discovery platform, built for students by students.</p>
        </div>
      </div>

      <div className="about-content-container">

        <div className="about-card">
          <h2 className="about-card-title">Our Mission</h2>
          <p className="about-card-text">
            CareerOS was founded with a simple mission — to help every student in Bihar find the right college without confusion, without middlemen, and without wasting time visiting 10 different websites.
          </p>
          <p className="about-card-text">
            We aggregate college data, placement statistics, fee structures, and student reviews in one place so you can make a confident, informed decision about your future.
          </p>
        </div>

        <div className="about-stats-grid">
          {[
            { number: '500+', label: 'Colleges Listed' },
            { number: '50,000+', label: 'Students Helped' },
            { number: '200+', label: 'Courses' },
            { number: '4.8★', label: 'Rating' },
          ].map(s => (
            <div key={s.label} className="about-stat-card">
              <h3 className="about-stat-number">{s.number}</h3>
              <p className="about-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="about-card">
          <h2 className="about-card-title">Our Team</h2>
          <p className="about-card-text">
            CareerOS was built as an OJT (On-the-Job Training) project by a passionate developer from Patna, Bihar. The platform is designed to eventually grow into a full-scale startup serving students across Bihar and beyond.
          </p>
        </div>

      </div>
    </div>
  )
}

export default AboutPage