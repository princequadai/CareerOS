import { useNavigate } from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="nf-page">
      <div className="nf-content">
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Page Not Found</h2>
        <p className="nf-subtitle">The page you're looking for doesn't exist or has been moved.</p>
        <div className="nf-btn-row">
          <button className="nf-primary-btn" onClick={() => navigate('/')}>Go to Home</button>
          <button className="nf-secondary-btn" onClick={() => navigate('/colleges')}>Browse Colleges</button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage