import HeroSection from '../components/home/HeroSection'
import FeaturedColleges from '../components/home/FeaturedColleges'
import PopularCourses from '../components/home/PopularCourses'
import StatsSection from '../components/home/StatsSection'
import Testimonials from '../components/home/Testimonials'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedColleges />
      <PopularCourses />
      <StatsSection />
      <Testimonials />
    </div>
  )
}

export default HomePage