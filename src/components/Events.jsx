import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaCalendarPlus, 
  FaBell, 
  FaFilter,
  FaSearch,
  FaStar,
  FaGoogle,
  FaApple,
  FaMicrosoft,
  FaDownload,
  FaChevronDown,
  FaExternalLinkAlt,
  FaLightbulb,
  FaUsers,
  FaLaptopCode,
  FaMobileAlt,
  FaChevronRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  min-height: 100vh;
`;

const EventHeader = styled.div`
  background: linear-gradient(120deg, #1e293b, #0f172a);
  padding: 4rem 0 8rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233b82f6' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.5;
  }
`;

const ContentSection = styled.div`
  margin-top: -5rem;
  position: relative;
  z-index: 10;
`;

const EventCardWrapper = styled.div`
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  position: relative;
  z-index: 1;
  
  &.active {
    z-index: 50;
  }
  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  
  ${props => {
    if (props.type === 'hackathon') {
      return `
        background-color: rgba(168, 85, 247, 0.15);
        color: #9333ea;
      `;
    } else if (props.type === 'workshop') {
      return `
        background-color: rgba(59, 130, 246, 0.15);
        color: #2563eb;
      `;
    } else if (props.type === 'techtalk') {
      return `
        background-color: rgba(16, 185, 129, 0.15);
        color: #059669;
      `;
    }
    return `
      background-color: rgba(75, 85, 99, 0.15);
      color: #4b5563;
    `;
  }}
`;

const ShimmerButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #6366f1, #3b82f6);
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Sample upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "Hackathon: Build for Change",
    date: "June 15-16, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Virtual",
    description: "A 48-hour hackathon focused on building solutions for social good. Join teams from around the world to create impactful projects.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    eventLink: "https://example.com/hackathon",
    eventType: "hackathon",
    startDate: new Date(2025, 5, 15, 10, 0), // June 15, 2025, 10:00 AM
    endDate: new Date(2025, 5, 16, 18, 0),   // June 16, 2025, 6:00 PM
    locationDetail: {
      type: "virtual",
      link: "https://zoom.us/j/123456789"
    },
    icon: <FaLaptopCode />,
    organizer: "Tech for Good Foundation",
    attendees: 842,
    featured: true
  },
  {
    id: 2,
    title: "Workshop: Advanced React Patterns",
    date: "May 20, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Online Webinar",
    description: "Deep dive into advanced React patterns with industry experts. Learn performance optimization, state management, and custom hooks.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nJTIwd29ya3Nob3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    eventLink: "https://example.com/react-workshop",
    eventType: "workshop",
    startDate: new Date(2025, 4, 20, 14, 0), // May 20, 2025, 2:00 PM
    endDate: new Date(2025, 4, 20, 16, 0),   // May 20, 2025, 4:00 PM
    locationDetail: {
      type: "virtual",
      link: "https://webinar.tech/advanced-react"
    },
    icon: <FaLightbulb />,
    organizer: "ReactMasters Community",
    attendees: 356,
    featured: false
  },
  {
    id: 3,
    title: "Tech Talks: Future of Open Source",
    date: "July 5, 2025",
    time: "5:00 PM - 7:00 PM",
    location: "HyperTech Convention Center",
    description: "Join leaders from top tech companies as they discuss the future of open source software and its impact on the industry.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMHRhbGt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    eventLink: "https://example.com/tech-talks",
    eventType: "techtalk",
    startDate: new Date(2025, 6, 5, 17, 0),  // July 5, 2025, 5:00 PM
    endDate: new Date(2025, 6, 5, 19, 0),    // July 5, 2025, 7:00 PM
    locationDetail: {
      type: "physical",
      address: "123 Tech Blvd, San Francisco, CA 94107"
    },
    icon: <FaUsers />,
    organizer: "Open Source Alliance",
    attendees: 215,
    featured: false
  },
  {
    id: 4,
    title: "Mobile Dev Summit: Cross-Platform Solutions",
    date: "August 12, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Virtual Conference",
    description: "Explore the latest in cross-platform mobile development with sessions on React Native, Flutter, and native integration strategies.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=60",
    eventLink: "https://example.com/mobile-summit",
    eventType: "workshop",
    startDate: new Date(2025, 7, 12, 9, 0), 
    endDate: new Date(2025, 7, 12, 16, 0),
    locationDetail: {
      type: "virtual",
      link: "https://conf.tech/mobile-summit"
    },
    icon: <FaMobileAlt />,
    organizer: "MobileTech Association",
    attendees: 523,
    featured: false
  },
];

// Past events data
const pastEvents = [
  {
    id: 5,
    title: "Code for Good Hackathon",
    date: "December 10, 2024",
    description: "Over 200 participants created amazing projects to address social challenges. The winning team developed an accessible education platform.",
    link: "/past-events/hackathon-2024",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    eventType: "hackathon",
    highlights: [
      "24 teams participated over 48 hours",
      "Projects focused on accessibility and education",
      "Over $10,000 in prizes awarded"
    ]
  },
  {
    id: 6,
    title: "Web3 Developer Conference",
    date: "October 5, 2024",
    description: "Industry leaders shared insights on blockchain technology, decentralized applications, and the future of web development.",
    link: "/past-events/web3-conf-2024",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    eventType: "techtalk",
    highlights: [
      "15 speakers from leading tech companies",
      "Panel discussion on the future of Web3",
      "Hands-on workshop on smart contract development"
    ]
  }
];

// Register service worker for notifications
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/notification-sw.js');
      console.log('ServiceWorker registered successfully:', registration.scope);
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
      return null;
    }
  } else {
    console.warn('Push notifications not supported in this browser');
    return null;
  }
};

// Request notification permission
const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    toast.error('This browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};

// Show a notification
const showNotification = (title, options = {}) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }
  
  // If service worker is active, use it for the notification
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, options);
    });
  } else {
    // Fallback to regular notification
    new Notification(title, options);
  }
};

// Calendar utility functions
const generateGoogleCalendarUrl = (event) => {
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  const startDate = formatDate(event.startDate);
  const endDate = formatDate(event.endDate);
  
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(
    event.locationDetail.type === 'virtual' 
      ? 'Virtual Event' 
      : event.locationDetail.address || ''
  );
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
};

const generateIcsFile = (event) => {
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, -1);
  };
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DTSTART:${formatDate(event.startDate)}Z`,
    `DTEND:${formatDate(event.endDate)}Z`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.locationDetail.type === 'virtual' ? 'Virtual Event' : event.locationDetail.address || ''}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.title.replace(/\s+/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Enhanced AddToCalendar component with improved stability for all card positions
const AddToCalendar = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const wrapperRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({});
  
  // Find and mark parent EventCardWrapper as active
  useEffect(() => {
    if (isOpen) {
      let parent = buttonRef.current?.parentElement;
      while (parent) {
        if (parent.classList.contains('event-card-wrapper')) {
          parent.classList.add('active');
          wrapperRef.current = parent;
          break;
        }
        parent = parent.parentElement;
      }
      
      // Force body to handle the dropdown
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 100);
    } else if (wrapperRef.current) {
      wrapperRef.current.classList.remove('active');
    }
  }, [isOpen]);
  
  // Position dropdown function with improved logic
  const positionDropdown = () => {
    if (!buttonRef.current) return null;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    const dropdownHeight = 300; 
    const dropdownWidth = 280;  
    
    let top, left;
    
    // Position vertically with more space
    const spaceBelow = viewportHeight - buttonRect.bottom;
    if (spaceBelow < dropdownHeight + 20 && buttonRect.top > dropdownHeight + 20) {
      // Position above button with more margin
      top = window.scrollY + buttonRect.top - dropdownHeight - 15;
    } else {
      // Position below button with more margin
      top = window.scrollY + buttonRect.bottom + 15;
    }
    
    // Center horizontally relative to button
    left = window.scrollX + buttonRect.left + (buttonRect.width / 2) - (dropdownWidth / 2);
    
    // Keep dropdown within viewport horizontally with more margin
    if (left + dropdownWidth > viewportWidth - 20) {
      left = viewportWidth - dropdownWidth - 20;
    }
    if (left < 20) {
      left = 20;
    }
    
    return { top, left };
  };

  // Handle button click with stronger event handling
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  // Update position when dropdown opens or window resizes with improved timing
  useEffect(() => {
    if (isOpen) {
      const updatePosition = () => {
        const newPosition = positionDropdown();
        if (newPosition) {
          setDropdownPosition(newPosition);
        }
      };
      
      // Initial position with increased delay for reliable rendering
      updatePosition();
      setTimeout(updatePosition, 50);
      setTimeout(updatePosition, 150);
      
      // Update position when window resizes or scrolls
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      // Close dropdown when clicking outside with improved detection
      const handleClickOutside = (e) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target) && 
            dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside, { capture: true });
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
        document.removeEventListener('mousedown', handleClickOutside, { capture: true });
      };
    }
  }, [isOpen]);
  
  // Prevent closing when interacting with dropdown content
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };
  












  
  // Calendar actions with stopPropagation
  const handleGoogleCalendar = (e) => {
    e.stopPropagation();
    window.open(generateGoogleCalendarUrl(event), '_blank');
    setTimeout(() => setIsOpen(false), 300); // Slight delay before closing
    toast.success("Added to Google Calendar!", {
      icon: '📅',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };
  
  const handleAppleCalendar = (e) => {
    e.stopPropagation();
    generateIcsFile(event);
    setTimeout(() => setIsOpen(false), 300);
    toast.success("Added to Apple Calendar!", {
      icon: '📆',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };
  
  const handleOutlookCalendar = (e) => {
    e.stopPropagation();
    generateIcsFile(event);
    setTimeout(() => setIsOpen(false), 300);
    toast.success("Added to Outlook Calendar!", {
      icon: '📅',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };
  
  const handleDownloadIcs = (e) => {
    e.stopPropagation();
    generateIcsFile(event);
    setTimeout(() => setIsOpen(false), 300);
    toast.success("Calendar file downloaded!", {
      icon: '💾',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };
  
  return (
    <>
      <div className="inline-block text-left" onClick={(e) => e.stopPropagation()}>
        <button
          ref={buttonRef}
          onClick={handleToggle}
          className="flex items-center gap-2 text-sm py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FaCalendarPlus className="text-lg transition-transform duration-300 group-hover:rotate-12" />
          <span>Add to Calendar</span>
          <FaChevronDown className={`transform transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {isOpen && createPortal(
        <>
          {/* Semi-transparent backdrop to prevent accidental closing */}
          <div 
            className="fixed inset-0" 
            style={{ backgroundColor: 'rgba(0,0,0,0.01)', zIndex: 9999 }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Actual dropdown */}
          <div 
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: dropdownPosition.top || '50%',
              left: dropdownPosition.left || '50%',
              transform: dropdownPosition.top ? 'none' : 'translate(-50%, -50%)',
              zIndex: 10000,
              filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.1)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
            }}
            className="dropdown-portal"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="w-[280px] rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
            >
              <div className="py-2 divide-y divide-gray-100">
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="text-blue-800 font-medium truncate">Add "{event.title}" to:</h3>
                </div>
                
                <div>
                  <button
                    onClick={handleGoogleCalendar}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-red-100 text-red-500 transition-transform duration-300 hover:scale-110">
                      <FaGoogle className="text-xl" />
                    </span>
                    <span className="font-medium">Google Calendar</span>
                  </button>
                  
                  <button
                    onClick={handleAppleCalendar}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-300 hover:scale-110">
                      <FaApple className="text-xl" />
                    </span>
                    <span className="font-medium">Apple Calendar</span>
                  </button>
                  
                  <button
                    onClick={handleOutlookCalendar}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 transition-transform duration-300 hover:scale-110">
                      <FaMicrosoft className="text-lg" />
                    </span>
                    <span className="font-medium">Outlook Calendar</span>
                  </button>
                </div>
                
                <div>
                  <button
                    onClick={handleDownloadIcs}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 animate-pulse">
                      <FaDownload />
                    </span>
                    Download .ics File
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

// Global notification component
const GlobalEventReminder = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Request notification permission
    const hasPermission = await requestNotificationPermission();
    
    if (hasPermission) {
      // Store subscription in localStorage
      const subscriptions = JSON.parse(localStorage.getItem('eventSubscriptions') || '[]');
      
      // Check if email already exists
      if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('eventSubscriptions', JSON.stringify(subscriptions));
        
        showNotification(
          'Event Notifications Enabled', 
          { 
            body: "You'll now receive notifications about new events!",
            icon: '/logo192.png'
          }
        );
        
        toast.success("You'll now receive notifications about new events!");
      } else {
        toast.success("You're already subscribed to event notifications.");
      }
    } else {
      toast.error('Permission denied. We need notification permission to send you updates about new events.');
    }
    
    setShowModal(false);
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          title="Get notified about new events"
        >
          <FaBell className="text-xl" />
        </button>
      </div>
      
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4">Stay Updated with New Events</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to get notified whenever new events are added. We'll send you notifications about upcoming hackathons, workshops, and tech talks.
              </p>
              
              <form onSubmit={handleSubscribe}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email address:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Main Events component
const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(upcomingEvents);
  const [hasNotified, setHasNotified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Register service worker
    const initServiceWorker = async () => {
      await registerServiceWorker();
    };
    
    initServiceWorker();
    
    // Check for new events and show notification
    const checkForNewEvents = () => {
      const lastVisit = localStorage.getItem('lastEventVisit');
      const now = new Date().toISOString();
      
      if (!lastVisit || (new Date(now) - new Date(lastVisit)) > (24 * 60 * 60 * 1000)) {
        // Check if we have permission to show notifications
        if (Notification.permission === 'granted') {
          setTimeout(() => {
            if (!hasNotified) {
              showNotification(
                'New Events Available!', 
                {
                  body: "Check out our latest events. Don't miss the opportunity to participate!",
                  icon: '/logo192.png',
                  badge: '/badge.png',
                  data: { url: '/events' },
                  requireInteraction: true
                }
              );
              setHasNotified(true);
            }
          }, 3000);
        } else {
          // Show toast instead
          setTimeout(() => {
            if (!hasNotified) {
              toast.success(
                <div>
                  <strong>New events are available!</strong>
                  <p className="text-sm">Don't miss our upcoming events.</p>
                </div>,
                { duration: 5000 }
              );
              setHasNotified(true);
            }
          }, 3000);
        }
      }
      
      // Update last visit time
      localStorage.setItem('lastEventVisit', now);
    };
    
    checkForNewEvents();
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [hasNotified]);
  
  // Filter events based on search term and active filter
  useEffect(() => {
    let results = upcomingEvents;
    
    // Apply type filter
    if (activeFilter !== 'all') {
      results = results.filter(event => event.eventType === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(event => 
        event.title.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      );
    }
    
    setFilteredEvents(results);
  }, [activeFilter, searchTerm]);
  // Get featured event
  const featuredEvent = filteredEvents.find(event => event.featured) || filteredEvents[0];
  const otherEvents = filteredEvents.filter(event => event !== featuredEvent);

  return (
    <PageWrapper>
      {/* Global Reminder Button */}
      <GlobalEventReminder />
      
      {/* Header Section */}
      <EventHeader>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Upcoming <span className="text-blue-400">Events</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-2xl mx-auto text-xl text-blue-200"
            >
              Join our community events to learn, collaborate, and grow together
            </motion.p>
          </div>
        </div>
      </EventHeader>
      
      <ContentSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto py-1 md:py-0">
                <span className="flex items-center text-gray-600 pr-2">
                  <FaFilter className="mr-2" />
                  <span className="hidden sm:inline">Filter:</span>
                </span>
                
                <button
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Events
                </button>
                
                <button
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'hackathon' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveFilter('hackathon')}
                >
                  Hackathons
                </button>
                
                <button
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'workshop' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveFilter('workshop')}
                >
                  Workshops
                </button>
                
                <button
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'techtalk' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveFilter('techtalk')}
                >
                  Tech Talks
                </button>
              </div>
            </div>
          </motion.div>

          {/* Featured Event */}
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-md">
                    <FaStar className="mr-1" /> Featured Event
                  </span>
                </div>
                
                <div className="md:flex">
                  <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={featuredEvent.image} 
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <CategoryBadge type={featuredEvent.eventType}>
                        {featuredEvent.eventType.charAt(0).toUpperCase() + featuredEvent.eventType.slice(1)}
                      </CategoryBadge>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 p-6 md:p-8">
                    <div className="flex items-center mb-2 text-gray-500 text-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-blue-100 text-blue-600">
                        {featuredEvent.icon}
                      </span>
                      <span>Organized by {featuredEvent.organizer}</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">{featuredEvent.title}</h2>
                    
                    <div className="flex items-center mb-2 text-gray-600">
                      <FaCalendarAlt className="mr-2 text-blue-600" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    
                    <div className="flex items-center mb-2 text-gray-600">
                      <FaClock className="mr-2 text-blue-600" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    
                    <div className="flex items-center mb-4 text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{featuredEvent.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaUsers className="text-blue-500" />
                        <span>{featuredEvent.attendees} attending</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {featuredEvent.eventLink && (
                          <a 
                            href={featuredEvent.eventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2.5 bg-gray-700 text-white font-medium rounded-lg shadow hover:shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-0.5"
                          >
                            Learn More <FaExternalLinkAlt className="ml-2 text-xs" />
                          </a>
                        )}
                        
                        <AddToCalendar event={featuredEvent} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Upcoming Events */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {otherEvents.map((event, index) => (
              <EventCardWrapper 
                key={`${event.id}-${index}`} 
                delay={`${0.2 * (index + 1)}s`} 
                className="event-card-wrapper"
                style={{ position: 'relative' }} // Ensure proper stacking context
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <CategoryBadge type={event.eventType}>
                        {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                      </CategoryBadge>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white font-medium flex items-center">
                      <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs">
                        <FaUsers className="text-blue-300" /> {event.attendees} attending
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center mb-2 text-gray-500 text-xs">
                      <span className="inline-block mr-2">
                        {event.icon}
                      </span>
                      <span>{event.organizer}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                    
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                      <FaCalendarAlt className="mr-2 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                      <FaClock className="mr-2 text-blue-600" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center mb-4 text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">{event.description}</p>
                    
                    <div className="mt-auto space-y-3">
                      {event.eventLink && (
                        <a 
                          href={event.eventLink}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full py-2.5 px-4 bg-gray-700 text-white text-center font-semibold rounded-lg hover:bg-gray-800 shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-0.5"
                        >
                          Learn More <FaExternalLinkAlt className="ml-2 text-xs" />
                        </a>
                      )}
                      
                      {/* Make sure AddToCalendar has a distinct container to capture clicks */}
                      <div className="flex justify-center relative" style={{ zIndex: 5 }}>
                        <AddToCalendar event={event} />
                      </div>
                    </div>
                  </div>
                </div>
              </EventCardWrapper>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center shadow-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: `url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")`}}></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Never Miss an Event</h2>
              <p className="mb-6 max-w-xl mx-auto">
                Subscribe to receive notifications about new events and upcoming hackathons, workshops, and tech talks.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                
                // Request notification permission
                const hasPermission = await requestNotificationPermission();
                
                if (hasPermission) {
                  const subscriptions = JSON.parse(localStorage.getItem('eventSubscriptions') || '[]');
                  
                  if (!subscriptions.includes(email)) {
                    subscriptions.push(email);
                    localStorage.setItem('eventSubscriptions', JSON.stringify(subscriptions));
                    
                    showNotification(
                      'Event Notifications Enabled', 
                      { 
                        body: "You'll now receive notifications about new events!",
                        icon: '/logo192.png'
                      }
                    );
                    
                    toast.success("You'll now receive notifications about new events!");
                  } else {
                    toast.success("You're already subscribed to event notifications.");
                  }
                } else {
                  toast.error('Permission denied. We need notification permission to send you updates about new events.');
                }
                
                e.target.email.value = '';
              }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-inner"
                  required
                />
                <ShimmerButton type="submit">
                  Get Notified
                </ShimmerButton>
              </form>
            </div>
          </motion.div>

          {/* Past Events Section */}
          <div className="mt-24 mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Past Events
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + (index * 0.2), duration: 0.6 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <CategoryBadge type={event.eventType}>
                          {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                        </CategoryBadge>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-6">
                      <div className="text-sm text-gray-500 mb-2">{event.date}</div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{event.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Highlights:</h4>
                        <ul className="space-y-1">
                          {event.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <FaChevronRight className="mt-1 mr-2 text-blue-500 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link to={event.link} className="text-blue-600 font-semibold hover:text-blue-800 flex items-center group mt-4">
                        View Event Recap <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>
    </PageWrapper>
  );
};

export default Events;