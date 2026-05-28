import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiHeart, FiUser, FiChevronDown } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <MdSchool size={26} color="#2563eb" />
          <span className="navbar-logo-text">Career<span className="navbar-logo-accent">OS</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
          <li><Link to="/colleges" className="navbar-link">Colleges</Link></li>
          <li><Link to="/compare" className="navbar-link">Compare</Link></li>
          <li><Link to="/about" className="navbar-link">About</Link></li>
          <li><Link to="/contact" className="navbar-link">Contact</Link></li>
        </ul>

        {/* Right Side */}
        <div className="navbar-right">

          {/* Heart icon — desktop only */}
          <Link to="/favorites" className="navbar-icon-btn">
            <FiHeart size={20} />
          </Link>

          {/* Login Dropdown — desktop only */}
          <div className="navbar-dropdown-wrapper">
            <button
              className="navbar-login-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FiUser size={16} />
              Login
              <FiChevronDown size={14} />
            </button>

            {dropdownOpen && (
              <div className="navbar-dropdown">
                <button className="navbar-dropdown-item" onClick={() => { navigate('/login?role=student'); setDropdownOpen(false) }}>
                  🎓 Student Login
                </button>
                <button className="navbar-dropdown-item" onClick={() => { navigate('/login?role=college'); setDropdownOpen(false) }}>
                  🏫 College Login
                </button>
                <button className="navbar-dropdown-item" onClick={() => { navigate('/login?role=admin'); setDropdownOpen(false) }}>
                  🛡️ Admin Login
                </button>
                <div className="navbar-dropdown-divider" />
                <button className="navbar-dropdown-signup" onClick={() => { navigate('/signup'); setDropdownOpen(false) }}>
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="navbar-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <Link to="/colleges" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>🏫 Colleges</Link>
          <Link to="/compare" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>⚖️ Compare</Link>
          <Link to="/favorites" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>❤️ Favorites</Link>
          <Link to="/about" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>ℹ️ About</Link>
          <Link to="/contact" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>📞 Contact</Link>
          <div className="navbar-mobile-divider" />
          <Link to="/login?role=student" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>🎓 Student Login</Link>
          <Link to="/login?role=college" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>🏫 College Login</Link>
          <Link to="/login?role=admin" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>🛡️ Admin Login</Link>
          <Link to="/signup" className="navbar-mobile-signup" onClick={() => setMenuOpen(false)}>✨ Create Free Account</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar