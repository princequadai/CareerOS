import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiHeart, FiUser, FiChevronDown } from 'react-icons/fi'
import { MdSchool } from 'react-icons/md'
import { useFavorites } from '../../context/FavoritesContext'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { favorites } = useFavorites()
  const { user, logout } = useAuth()
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
          <Link to="/favorites" className="navbar-icon-btn navbar-heart-btn" title="Saved Colleges">
            <FiHeart size={20} fill={favorites.length > 0 ? '#ef4444' : 'none'} color={favorites.length > 0 ? '#ef4444' : 'currentColor'} />
            {favorites.length > 0 && <span className="navbar-heart-badge">{favorites.length}</span>}
          </Link>


          {/* Login Dropdown — desktop only */}
          {user ? (
            <div className="navbar-dropdown-wrapper">
              <button
                className="navbar-profile-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="navbar-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                <span className="navbar-profile-name">{user.name}</span>
                <FiChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div className="navbar-dropdown">
                  <div className="navbar-dropdown-header">
                    <p className="navbar-user-email">{user.email}</p>
                    <span className="navbar-user-role-badge">{user.role}</span>
                  </div>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item" onClick={() => { navigate(`/${user.role}/dashboard`); setDropdownOpen(false) }}>
                    💻 Dashboard
                  </button>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item navbar-logout-dropdown" onClick={() => { logout(); navigate('/'); setDropdownOpen(false) }}>
                    🔒 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
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
          )}

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
          <Link to="/favorites" className="navbar-mobile-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setMenuOpen(false)}>
            <span>❤️ Favorites</span>
            {favorites.length > 0 && <span className="navbar-mobile-badge">{favorites.length}</span>}
          </Link>
          <Link to="/about" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>ℹ️ About</Link>
          <Link to="/contact" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>📞 Contact</Link>
          <div className="navbar-mobile-divider" />
          
          {user ? (
            <>
              <div className="navbar-mobile-user-info">
                <div className="navbar-mobile-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <p className="navbar-mobile-user-name">{user.name}</p>
                  <p className="navbar-mobile-user-email">{user.email}</p>
                </div>
              </div>
              <Link to={`/${user.role}/dashboard`} className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>💻 Dashboard</Link>
              <button className="navbar-mobile-link navbar-mobile-logout" onClick={() => { logout(); navigate('/'); setMenuOpen(false) }}>
                🔒 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login?role=student" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>🎓 Student Login</Link>
              <Link to="/login?role=college" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>🏫 College Login</Link>
              <Link to="/login?role=admin" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>🛡️ Admin Login</Link>
              <Link to="/signup" className="navbar-mobile-signup" onClick={() => setMenuOpen(false)}>✨ Create Free Account</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar