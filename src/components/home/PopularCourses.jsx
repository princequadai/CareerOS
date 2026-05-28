import { useNavigate } from 'react-router-dom'
import './PopularCourses.css'

const courses = [
  { icon: '💻', name: 'B.Tech / M.Tech', colleges: 45, color: '#eff6ff', border: '#bfdbfe', iconBg: '#dbeafe' },
  { icon: '🏥', name: 'MBBS / BDS', colleges: 12, color: '#f0fdf4', border: '#bbf7d0', iconBg: '#dcfce7' },
  { icon: '💼', name: 'MBA / BBA', colleges: 38, color: '#fffbeb', border: '#fde68a', iconBg: '#fef3c7' },
  { icon: '⚗️', name: 'B.Sc / M.Sc', colleges: 52, color: '#fdf4ff', border: '#e9d5ff', iconBg: '#f3e8ff' },
  { icon: '⚖️', name: 'LLB / LLM', colleges: 8, color: '#fff1f2', border: '#fecdd3', iconBg: '#ffe4e6' },
  { icon: '🎨', name: 'BCA / MCA', colleges: 29, color: '#f0fdfa', border: '#99f6e4', iconBg: '#ccfbf1' },
  { icon: '📚', name: 'B.A / M.A', colleges: 41, color: '#fff7ed', border: '#fed7aa', iconBg: '#ffedd5' },
  { icon: '🏗️', name: 'B.Arch', colleges: 6, color: '#f8fafc', border: '#cbd5e1', iconBg: '#f1f5f9' },
]

const PopularCourses = () => {
  const navigate = useNavigate()

  return (
    <section className="popular-section">
      <div className="popular-container">

        <div className="popular-header">
          <p className="popular-subtitle">📚 Explore by Stream</p>
          <h2 className="popular-title">Popular Courses in Patna</h2>
          <p className="popular-desc">Find colleges based on your preferred course and stream</p>
        </div>

        <div className="popular-grid">
          {courses.map((course) => (
            <div
              key={course.name}
              className="popular-card"
              style={{
                background: course.color,
                border: `1px solid ${course.border}`,
              }}
              onClick={() => navigate(`/colleges?search=${course.name}`)}
            >
              <div 
                className="pc-icon-wrapper"
                style={{ background: course.iconBg }}
              >
                <span className="pc-icon">{course.icon}</span>
              </div>
              <div className="pc-content">
                <h3 className="pc-name">{course.name}</h3>
                <p className="pc-count">{course.colleges} Colleges</p>
              </div>
              <span className="pc-arrow">→</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PopularCourses