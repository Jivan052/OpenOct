import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaExternalLinkAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ComingSoonWrapper = styled.div`
  animation: ${fadeIn} 1s ease-out forwards;
  text-align: center;
  padding: 2rem;
  margin-bottom: 4rem;
`;

const ComingSoonText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #2470a2 0%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const EventCardWrapper = styled.div`
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
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
    }
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
    }
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
    }
  },
  {
    id: 4,
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
    }
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
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 6,
    title: "Web3 Developer Conference",
    date: "October 5, 2024",
    description: "Industry leaders shared insights on blockchain technology, decentralized applications, and the future of web development.",
    link: "/past-events/web3-conf-2024",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
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

// Enhanced AddToCalendar component with beautiful effects
const AddToCalendar = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleGoogleCalendar = () => {
    window.open(generateGoogleCalendarUrl(event), '_blank');
    setIsOpen(false);
    toast.success("Added to Google Calendar!", {
      icon: '📅',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };
  
  const handleAppleCalendar = () => {
    generateIcsFile(event);
    setIsOpen(false);
    toast.success("Added to Apple Calendar!", {
      icon: '📆',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };
  
  const handleOutlookCalendar = () => {
    generateIcsFile(event);
    setIsOpen(false);
    toast.success("Added to Outlook Calendar!", {
      icon: '📅',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };
  
  const handleDownloadIcs = () => {
    generateIcsFile(event);
    setIsOpen(false);
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
    <div className="relative inline-block text-left group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm py-2.5 px-4 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaCalendarPlus className="text-lg transition-transform duration-300 group-hover:rotate-12" />
        <span>Add to Calendar</span>
        <FaChevronDown className={`transform transition-all duration-300 ${isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="absolute right-0 mt-3 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
          >
            <div className="py-2 divide-y divide-gray-100">
              <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-primary-100">
                <h3 className="text-primary-800 font-medium">Add "{event.title}" to:</h3>
              </div>
              
              <div>
                <button
                  onClick={handleGoogleCalendar}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 transition-colors duration-150"
                >
                  <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-red-100 text-red-500 transition-transform duration-300 hover:scale-110">
                    <FaGoogle className="text-xl" />
                  </span>
                  <span className="font-medium">Google Calendar</span>
                </button>
                
                <button
                  onClick={handleAppleCalendar}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 transition-colors duration-150"
                >
                  <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-300 hover:scale-110">
                    <FaApple className="text-xl" />
                  </span>
                  <span className="font-medium">Apple Calendar</span>
                </button>
                
                <button
                  onClick={handleOutlookCalendar}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 transition-colors duration-150"
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
                  className="flex items-center w-full px-4 py-3 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors duration-150"
                >
                  <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-primary-200 text-primary-700 animate-pulse">
                    <FaDownload />
                  </span>
                  Download .ics File
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Global Notification Component
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
          className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
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

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(upcomingEvents);
  const [hasNotified, setHasNotified] = useState(false);
  
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
    
    return () => {
      // Clean up function
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Global Reminder Button */}
      <GlobalEventReminder />
      
      <ComingSoonWrapper>
        <ComingSoonText>Events are on the way...</ComingSoonText>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Join our community events to learn, collaborate, and grow. From workshops to hackathons, 
          there's something for everyone!
        </p>
      </ComingSoonWrapper>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
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
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto py-1 md:py-0">
            <span className="flex items-center text-gray-600 pr-2">
              <FaFilter className="mr-2" />
            </span>
            
            <button
              className={`whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All Events
            </button>
            
            <button
              className={`whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeFilter === 'hackathon' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('hackathon')}
            >
              Hackathons
            </button>
            
            <button
              className={`whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeFilter === 'workshop' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('workshop')}
            >
              Workshops
            </button>
            
            <button
              className={`whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeFilter === 'techtalk' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('techtalk')}
            >
              Tech Talks
            </button>
          </div>
        </div>
      </motion.div>

      {/* Featured Event (first event) */}
      {filteredEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-xl shadow-xl group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-md">
                <FaStar className="mr-1" /> Featured Event
              </span>
            </div>
            
            <div className="md:flex bg-white">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src={filteredEvents[0].image} 
                  alt={filteredEvents[0].title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary-600 transition-colors">{filteredEvents[0].title}</h2>
                
                <div className="flex items-center mb-2 text-gray-600">
                  <FaCalendarAlt className="mr-2 text-primary-600" />
                  <span>{filteredEvents[0].date}</span>
                </div>
                
                <div className="flex items-center mb-2 text-gray-600">
                  <FaClock className="mr-2 text-primary-600" />
                  <span>{filteredEvents[0].time}</span>
                </div>
                
                <div className="flex items-center mb-4 text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-primary-600" />
                  <span>{filteredEvents[0].location}</span>
                </div>
                
                <p className="text-gray-600 mb-6">{filteredEvents[0].description}</p>
                
                <div className="flex flex-wrap gap-3">
                  {filteredEvents[0].eventLink && (
                    <a 
                      href={filteredEvents[0].eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2.5 bg-gray-700 text-white font-medium rounded-lg shadow hover:shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Learn More <FaExternalLinkAlt className="ml-2 text-xs" />
                    </a>
                  )}
                  
                  <AddToCalendar event={filteredEvents[0]} />
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {filteredEvents.slice(1).map((event, index) => (
          <EventCardWrapper key={`${event.id}-${index}`} delay={`${0.2 * (index + 1)}s`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    event.eventType === 'hackathon' ? 'bg-purple-100 text-purple-800' :
                    event.eventType === 'workshop' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaCalendarAlt className="mr-2 text-primary-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaClock className="mr-2 text-primary-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center mb-4 text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-primary-600" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">{event.description}</p>
                
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
                  
                  <div className="flex justify-center">
                    <AddToCalendar event={event} />
                  </div>
                </div>
              </div>
            </div>
          </EventCardWrapper>
        ))}
      </motion.div>

      {/* Event Notifications Signup */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-20 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center shadow-xl"
      >
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
            className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-inner"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-primary-600 font-bold rounded-md hover:bg-gray-100 transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Get Notified
          </button>
        </form>
      </motion.div>

      {/* Past Events Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Past Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + (index * 0.2), duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 overflow-hidden rounded-lg">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-32 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="text-sm text-gray-500 mb-2">{event.date}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  <Link to={event.link} className="text-primary-600 font-semibold hover:underline flex items-center group">
                    View Highlights <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;