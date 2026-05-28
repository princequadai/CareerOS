import { Link } from 'react-router-dom'
import { MdSchool } from 'react-icons/md'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top Section */}
        <div className="footer-top">

          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <MdSchool size={26} color="#60a5fa" />
              <span className="footer-brand-text">
                Career<span className="footer-brand-accent">OS</span>
              </span>
            </div>
            <p className="footer-brand-desc">
              Bihar's most trusted college discovery platform. Helping students find their perfect college in Patna and beyond.
            </p>
            <div className="footer-socials">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="footer-social-link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links-list">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Colleges', to: '/colleges' },
                { label: 'Compare Colleges', to: '/compare' },
                { label: 'Saved Colleges', to: '/favorites' },
                { label: 'About Us', to: '/about' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="footer-column">
            <h4 className="footer-column-title">Popular Courses</h4>
            <ul className="footer-links-list">
              {['B.Tech / M.Tech', 'MBBS / BDS', 'MBA / BBA', 'B.Sc / M.Sc', 'LLB / LLM'].map(course => (
                <li key={course}>
                  <Link to="/colleges" className="footer-link">
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column footer-contact">
            <h4 className="footer-column-title">Contact Us</h4>
            <ul className="footer-contact-list">
              {[
                { Icon: FiMapPin, text: 'Patna, Bihar, India' },
                { Icon: FiPhone, text: '+91 98765 43210' },
                { Icon: FiMail, text: 'hello@careeros.in' },
              ].map(({ Icon, text }) => (
                <li key={text} className="footer-contact-item">
                  <Icon size={14} className="footer-contact-icon" />
                  <span className="footer-contact-text">{text}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="footer-contact-btn">
              Send Enquiry
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 CareerOS. All rights reserved. Made with ❤️ in Patna, Bihar.
          </p>
          <div className="footer-legal">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
              <a key={item} href="#" className="footer-legal-link">
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer