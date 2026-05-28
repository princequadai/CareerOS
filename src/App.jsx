import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CollegeListingPage from './pages/CollegeListingPage'
import CollegeDetailsPage from './pages/CollegeDetailsPage'
import CompareCollegesPage from './pages/CompareCollegesPage'
import FavoritesPage from './pages/FavoritesPage'
import StudentDashboard from './pages/StudentDashboard'
import CollegeDashboard from './pages/CollegeDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/colleges" element={<CollegeListingPage />} />
        <Route path="/colleges/:id" element={<CollegeDetailsPage />} />
        <Route path="/compare" element={<CompareCollegesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/college/dashboard" element={<CollegeDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App