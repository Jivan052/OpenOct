import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaCodeCompare } from 'react-icons/fa6';
import Button from '../reusables/Button';
import Gittip from '../reusables/Gittip';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MobileMenuContainer = styled.div`
  animation: ${fadeIn} 0.3s ease-out forwards;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 12px 12px;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Detect scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: "/project", label: "Projects" },
    { to: "/proposals", label: "Proposals" },
    { to: "/blog", label: "Blogs" },
    { to: "/events", label: "Events" },
    { to: "/feature", label: "Idea" },
    { to: "/recognition", label: "Recognition" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <FaCodeCompare className="text-2xl" />
            <span className="text-2xl">OpenOct</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {navLinks.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 ${
                  isActive(link.to) 
                    ? 'text-primary-700 font-medium border-b-2 border-primary-500'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link to="https://github.com/OpenOct-Guild" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-200">
              <Gittip />
            </Link>

            <div className="ml-2">
              <Button as={Link} to="/submit">
                Submit Project
              </Button>
            </div>

            <Link to="/login" className="px-4 py-2 text-primary-700 hover:text-primary-800 font-medium">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 focus:outline-none transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <MobileMenuContainer className="md:hidden bg-white py-3 px-2">
            <div className="flex flex-col rounded-xl overflow-hidden divide-y divide-gray-100">
              {navLinks.map(link => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                    isActive(link.to) ? 'text-primary-600 font-medium bg-gray-50' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link to="/login" className="px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors">
                Admin Login
              </Link>
              
              <div className="px-4 py-3">
                <Button as={Link} to="/submit" className="w-full">
                  Submit Project
                </Button>
              </div>
              
              <Link 
                to="https://github.com/OpenOct-Guild" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
              >
                <span className="mr-2">GitHub</span>
                <Gittip />
              </Link>
            </div>
          </MobileMenuContainer>
        )}
      </div>
    </nav>
  );
};

export default Navbar;