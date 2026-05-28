# Make All Components Responsive

Currently, most components in the CareerOS project use inline styles combined with a JavaScript `useWindowWidth` hook to conditionally render UI based on whether `isMobile` is true or false.

While this works for simple mobile/desktop toggles, it lacks the flexibility needed for intermediate devices like tablets and small laptops. It can also cause layout flickering upon window resizing.

To make the *entire* application mobile and device-friendly, we need to transition away from inline styling towards dedicated CSS files using standard CSS Media Queries (`@media`).

## Proposed Changes

Because the application contains dozens of files, I propose tackling this in **Phases** to ensure stability and maintainability. For each component, we will create a dedicated `.css` file and remove the rigid inline JavaScript styles.

### Phase 1: Home Page Components
Refactor all elements rendered on the main landing page.
- `src/components/home/HeroSection.jsx`
- `src/components/home/FeaturedColleges.jsx`
- `src/components/home/PopularCourses.jsx`
- `src/components/home/StatsSection.jsx`
- `src/components/home/Testimonials.jsx`

### Phase 2: College Discovery Flow
Refactor the core pages where students search and view colleges.
- `src/pages/CollegeListingPage.jsx`
- `src/pages/CollegeDetailsPage.jsx`
- `src/pages/CompareCollegesPage.jsx`

### Phase 3: Authentication & Info Pages
Refactor informational and authentication pages.
- `src/pages/LoginPage.jsx`
- `src/pages/SignupPage.jsx`
- `src/pages/AboutPage.jsx`
- `src/pages/ContactPage.jsx`

### Phase 4: Dashboards
Refactor the complex admin, college, and student dashboards to ensure tables and grids are scrollable/responsive.
- `src/pages/StudentDashboard.jsx`
- `src/pages/CollegeDashboard.jsx`
- `src/pages/AdminDashboard.jsx`

---

> [!IMPORTANT]
> ## User Review Required
> Refactoring the entire application is a large operation. I highly recommend we proceed **Phase by Phase** (starting with Phase 1). Does this phased approach sound good to you?

> [!TIP]
> ## Open Questions
> 1. To handle CSS, I plan to create a corresponding standard CSS file for each component (e.g., `HeroSection.css` next to `HeroSection.jsx`). Are you comfortable with this, or would you prefer using **CSS Modules** (`HeroSection.module.css`) to automatically prevent any potential CSS class name collisions? 
> 2. Should we proceed with Phase 1 immediately?

## Verification Plan

### Manual Verification
- After each phase, you can run the local development server (`npm run dev`) and resize your browser window, or open Chrome DevTools and toggle "Device Toolbar" to test various screen sizes (Mobile, Tablet, Laptop, Desktop).
- Ensure no layout breaks, text overflow, or horizontal scrolling occurs unexpectedly.
