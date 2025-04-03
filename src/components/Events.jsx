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
];

// Past events data
const pastEvents = [
  {
    id: 4,
    title: "Code for Good Hackathon",
    date: "December 10, 2024",
    description: "Over 200 participants created amazing projects to address social challenges. The winning team developed an accessible education platform.",
    link: "/past-events/hackathon-2024",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 5,
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

// AddToCalendar component
const AddToCalendar = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleGoogleCalendar = () => {
    window.open(generateGoogleCalendarUrl(event), '_blank');
    setIsOpen(false);
  };
  
  const handleAppleCalendar = () => {
    generateIcsFile(event);
    setIsOpen(false);
  };
  
  const handleOutlookCalendar = () => {
    generateIcsFile(event);
    setIsOpen(false);
  };
  
  const handleDownloadIcs = () => {
    generateIcsFile(event);
    setIsOpen(false);
  };
  
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-600 py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <FaCalendarPlus />
        <span>Add to Calendar</span>
        <FaChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          >
            <div className="py-1">
              <button
                onClick={handleGoogleCalendar}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaGoogle className="mr-3 text-red-500" />
                Google Calendar
              </button>
              <button
                onClick={handleAppleCalendar}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaApple className="mr-3 text-gray-700" />
                Apple Calendar
              </button>
              <button
                onClick={handleOutlookCalendar}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaMicrosoft className="mr-3 text-blue-500" />
                Outlook Calendar
              </button>
              <button
                onClick={handleDownloadIcs}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaDownload className="mr-3 text-gray-500" />
                Download .ics File
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Set Reminder component
const SetReminder = ({ event }) => {
  const [showModal, setShowModal] = useState(false);
  const [reminderTime, setReminderTime] = useState('1day');
  const [email, setEmail] = useState('');
  
  const handleSetReminder = async (e) => {
    e.preventDefault();
    
    // Request notification permission
    const hasPermission = await requestNotificationPermission();
    
    if (hasPermission) {
      // Store in localStorage for demo purposes
      const reminders = JSON.parse(localStorage.getItem('eventReminders') || '[]');
      const newReminder = {
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.startDate.toString(),
        reminderTime,
        email,
        createdAt: new Date().toString()
      };
      
      reminders.push(newReminder);
      localStorage.setItem('eventReminders', JSON.stringify(reminders));
      
      // Calculate notification time based on reminder setting
      const eventTime = new Date(event.startDate).getTime();
      let notificationTime;
      
      switch(reminderTime) {
        case '1hour':
          notificationTime = eventTime - (60 * 60 * 1000);
          break;
        case '3hours':
          notificationTime = eventTime - (3 * 60 * 60 * 1000);
          break;
        case '1day':
          notificationTime = eventTime - (24 * 60 * 60 * 1000);
          break;
        case '3days':
          notificationTime = eventTime - (3 * 24 * 60 * 60 * 1000);
          break;
        case '1week':
          notificationTime = eventTime - (7 * 24 * 60 * 60 * 1000);
          break;
        default:
          notificationTime = eventTime - (24 * 60 * 60 * 1000); // Default to 1 day
      }
      
      // Schedule notification
      const now = Date.now();
      if (notificationTime > now) {
        // For demo, we'll just show a toast notification
        // In a real app, this would schedule a push notification via the service worker
        setTimeout(() => {
          showNotification(
            `Reminder: ${event.title}`, 
            {
              body: `Your event is coming up ${getReminderText()}!`,
              icon: '/logo192.png',
              badge: '/badge.png',
              data: { eventId: event.id },
              requireInteraction: true
            }
          );
        }, notificationTime - now);
      }
      
      toast.success(`Reminder set for ${event.title}! We'll remind you ${getReminderText()}.`);
    } else {
      toast.error('Permission denied. We need notification permission to send you reminders.');
    }
    
    setShowModal(false);
  };
  
  const getReminderText = () => {
    switch(reminderTime) {
      case '1hour': return '1 hour before the event';
      case '3hours': return '3 hours before the event';
      case '1day': return '1 day before the event';
      case '3days': return '3 days before the event';
      case '1week': return '1 week before the event';
      default: return 'before the event';
    }
  };
  
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 text-sm text-gray-600 py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <FaBell />
        <span>Set Reminder</span>
      </button>
      
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
              <h3 className="text-xl font-bold mb-4">Set Reminder for {event.title}</h3>
              
              <form onSubmit={handleSetReminder}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Remind me:
                  </label>
                  <select
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="1hour">1 hour before</option>
                    <option value="3hours">3 hours before</option>
                    <option value="1day">1 day before</option>
                    <option value="3days">3 days before</option>
                    <option value="1week">1 week before</option>
                  </select>
                </div>
                
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
                    Set Reminder
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

// Global Notification/Reminder Component
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
    
    // Function to check for reminders
    const checkReminders = () => {
      const reminders = JSON.parse(localStorage.getItem('eventReminders') || '[]');
      const now = new Date();
      
      reminders.forEach(reminder => {
        const eventDate = new Date(reminder.eventDate);
        let reminderTime;
        
        switch(reminder.reminderTime) {
          case '1hour':
            reminderTime = new Date(eventDate.getTime() - (60 * 60 * 1000));
            break;
          case '3hours':
            reminderTime = new Date(eventDate.getTime() - (3 * 60 * 60 * 1000));
            break;
          case '1day':
            reminderTime = new Date(eventDate.getTime() - (24 * 60 * 60 * 1000));
            break;
          case '3days':
            reminderTime = new Date(eventDate.getTime() - (3 * 24 * 60 * 60 * 1000));
            break;
          case '1week':
            reminderTime = new Date(eventDate.getTime() - (7 * 24 * 60 * 60 * 1000));
            break;
          default:
            reminderTime = new Date(eventDate.getTime() - (24 * 60 * 60 * 1000));
        }
        
        // If it's time for the reminder and notification permission is granted
        const timeDiff = Math.abs(reminderTime.getTime() - now.getTime());
        if (timeDiff < (60 * 1000) && Notification.permission === 'granted') { // Within a minute
          showNotification(
            `Reminder: ${reminder.eventTitle}`,
            {
              body: `Your event is coming up soon!`,
              icon: '/logo192.png',
              badge: '/badge.png',
              requireInteraction: true
            }
          );
        }
      });
    };
    
    // Check for reminders every minute
    const reminderInterval = setInterval(checkReminders, 60 * 1000);
    
    return () => {
      clearInterval(reminderInterval);
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
              <FaFilter className="mr-2" /> Filter:
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
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                <FaStar className="mr-1" /> Featured Event
              </span>
            </div>
            
            <div className="md:flex bg-white">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={filteredEvents[0].image} 
                  alt={filteredEvents[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{filteredEvents[0].title}</h2>
                
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
                      className="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors flex items-center"
                    >
                      Learn More <FaExternalLinkAlt className="ml-2 text-xs" />
                    </a>
                  )}
                  
                  <AddToCalendar event={filteredEvents[0]} />
                  
                  <SetReminder event={filteredEvents[0]} />
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
          <EventCardWrapper key={event.id} delay={`${0.2 * (index + 1)}s`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
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
                <h3 className="text-xl font-bold mb-3 text-gray-800">{event.title}</h3>
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
                      className="block w-full py-2 px-4 bg-primary-600 text-white text-center font-semibold rounded-md hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
                    >
                      Learn More <FaExternalLinkAlt className="ml-2 text-xs" />
                    </a>
                  )}
                  
                  <div className="flex gap-2">
                    <AddToCalendar event={event} />
                    <SetReminder event={event} />
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
        className="mt-20 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Never Miss an Event</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Subscribe to receive notifications about new events and get reminders for upcoming hackathons, workshops, and tech talks.
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
            className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-primary-600 font-bold rounded-md hover:bg-gray-100 transition-colors duration-300"
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
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="text-sm text-gray-500 mb-2">{event.date}</div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  <Link to={event.link} className="text-primary-600 font-semibold hover:underline flex items-center">
                    View Highlights <span className="ml-1">→</span>
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