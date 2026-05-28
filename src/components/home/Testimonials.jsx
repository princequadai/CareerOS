import { useNavigate } from 'react-router-dom'
import './Testimonials.css'

const testimonials = [
  { id: 1, name: 'Rahul Kumar', course: 'B.Tech CSE — MIT Patna', avatar: 'RK', color: '#2563eb', rating: 5, text: 'CareerOS helped me compare 10+ engineering colleges in Patna in just one sitting. The placement data and fee comparison saved me so much time. I found my perfect college within a week!' },
  { id: 2, name: 'Priya Singh', course: 'MBBS — Nalanda Medical College', avatar: 'PS', color: '#10b981', rating: 5, text: 'As a NEET aspirant, I was confused about which medical college to choose. CareerOS showed me cutoffs, fees, and hostel facilities all in one place. Highly recommend!' },
  { id: 3, name: 'Amit Sharma', course: 'MBA — Gyan Bharati Institute', avatar: 'AS', color: '#f59e0b', rating: 4, text: 'The rank predictor feature is amazing! I entered my CAT percentile and it suggested the best MBA colleges for me in Patna. The platform feels like a real professional product.' },
  { id: 4, name: 'Neha Gupta', course: 'B.Sc — Patna Science College', avatar: 'NG', color: '#8b5cf6', rating: 5, text: 'I loved how I could filter colleges by hostel availability and fees range. Found Patna Science College through CareerOS and I am so happy with my decision!' },
  { id: 5, name: 'Vikash Yadav', course: 'LLB — Patna Law College', avatar: 'VY', color: '#ef4444', rating: 5, text: 'CareerOS is the best college finder for Bihar students. The college details page has everything — courses, faculty, facilities, placements. No need to visit 10 different websites!' },
  { id: 6, name: 'Sana Parveen', course: "B.A — Patna Women's College", avatar: 'SP', color: '#ec4899', rating: 4, text: "As a girl from a small town, I was nervous about choosing a college. CareerOS helped me find the best women's colleges in Patna with hostel and safety information." },
]

const Testimonials = () => {
  const navigate = useNavigate()

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        <div className="testimonials-header">
          <p className="testimonials-subtitle">💬 Student Stories</p>
          <h2 className="testimonials-title">What Students Say About Us</h2>
          <p className="testimonials-desc">Real experiences from students who found their college through CareerOS</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-quote-icon">"</div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < t.rating ? '#f59e0b' : '#e2e8f0', fontSize: '14px' }}>★</span>
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div 
                  className="testimonial-avatar"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-course">{t.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="cta-banner">
          <div>
            <h3 className="cta-title">Ready to Find Your Dream College?</h3>
            <p className="cta-desc">Join 50,000+ students who found their perfect college through CareerOS</p>
          </div>
          <div className="cta-actions">
            <a href="/colleges" className="cta-btn-primary">Explore Colleges</a>
            <a href="/signup" className="cta-btn-outline">Create Free Account</a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonials