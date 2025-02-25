// Author: Jivan Jamdar ( @Jivan052 )
// Date: 25-07-2021

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectSubmission from './components/ProjectSubmission';
import ProjectProposals from './components/ProjectProposals';
import MemberProfile from './components/MemberProfile';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import BlogList from './components/BlogList';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import FeedbackForm from './components/Feedback';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feedback" element={<FeedbackForm />} />  
          <Route path="/login" element={<AuthPage />} />
           <Route path="/profile" element={<ProfilePage />} />
            <Route path="/submit" element={<ProjectSubmission />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/project" element={<ProjectsGrid />} />
            <Route path="/proposals" element={<ProjectProposals />} />
            <Route path="/profile/:id" element={<MemberProfile />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;