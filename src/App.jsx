// Author: Jivan Jamdar ( @Jivan052 )
// Date: 25-07-2021

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Loader from './reusables/Loader';
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
import Events from './components/Events';
import Feature from './components/Feature';
import Links from './pages/Links';
import OpenDomain from './pages/OpenDomain';
import RecognitionPage from './pages/RecognitionPage';
import QuizPage from './pages/QuizPage';
import BeginnerGuide from './pages/BeginnerGuide';

function App() {
  // timer state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // time stimulate
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 sec

    return () => clearTimeout(timer); // timer cleanup
  }, []);

  // If loading, show loader instead of the app
  if (isLoading) {
    return (
      <LoaderContainer>
        <LoaderWrapper>
          <Loader />
          <LoadingText>OpenOct</LoadingText>
          <LoadingSubText>Loading amazing experiences...</LoadingSubText>
        </LoaderWrapper>
      </LoaderContainer>
    );
  }

  // Once loaded, render the app normally
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
            <Route path="/events" element={<Events />} />
            <Route path="/feature" element={<Feature />} />
            <Route path="/links" element={<Links />} />
            <Route path="/opendomain" element={<OpenDomain />} />
            <Route path="/recognition" element={<RecognitionPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/beginners-guide" element={<BeginnerGuide />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  animation: ${fadeIn} 0.5s ease-in;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoadingText = styled.h1`
  margin-top: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #3182ce, #63b3ed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoadingSubText = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #4b5563;
  animation: ${pulse} 2s infinite;
`;

export default App;