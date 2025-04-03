import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
    registrationLink: "/register/hackathon"
  },
  {
    id: 2,
    title: "Workshop: Advanced React Patterns",
    date: "May 20, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Online Webinar",
    description: "Deep dive into advanced React patterns with industry experts. Learn performance optimization, state management, and custom hooks.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nJTIwd29ya3Nob3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    registrationLink: "/register/react-workshop"
  },
  {
    id: 3,
    title: "Tech Talks: Future of Open Source",
    date: "July 5, 2025",
    time: "5:00 PM - 7:00 PM",
    location: "HyperTech Convention Center",
    description: "Join leaders from top tech companies as they discuss the future of open source software and its impact on the industry.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMHRhbGt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    registrationLink: "/register/tech-talks"
  }
];

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ComingSoonWrapper>
        <ComingSoonText>Events are on the way...</ComingSoonText>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Join our community events to learn, collaborate, and grow. From workshops to hackathons, 
          there's something for everyone!
        </p>
      </ComingSoonWrapper>

{/* 
Future Usecase */}


      {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {upcomingEvents.map((event, index) => (
          <EventCardWrapper key={event.id} delay={`${0.2 * (index + 1)}s`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{event.title}</h3>
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
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Link 
                  to={event.registrationLink}
                  className="block w-full py-3 px-4 bg-primary-600 text-white text-center font-semibold rounded-md hover:bg-primary-700 transition-colors duration-300"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </EventCardWrapper>
        ))}
      </motion.div> */}

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-20 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Never Miss an Event</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter and be the first to know about upcoming events, workshops, and opportunities.
        </p>
        <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-primary-600 font-bold rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </motion.div>

      {/* Past Events Section */}
      {/* <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="text-sm text-gray-500 mb-2">December 10, 2024</div>
            <h3 className="text-xl font-bold mb-2">Code for Good Hackathon</h3>
            <p className="text-gray-600 mb-4">
              Over 200 participants created amazing projects to address social challenges. The winning team developed an accessible education platform.
            </p>
            <Link to="/past-events/hackathon-2024" className="text-primary-600 font-semibold hover:underline">
              View Highlights →
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="text-sm text-gray-500 mb-2">October 5, 2024</div>
            <h3 className="text-xl font-bold mb-2">Web3 Developer Conference</h3>
            <p className="text-gray-600 mb-4">
              Industry leaders shared insights on blockchain technology, decentralized applications, and the future of web development.
            </p>
            <Link to="/past-events/web3-conf-2024" className="text-primary-600 font-semibold hover:underline">
              View Highlights →
            </Link>
          </motion.div> */}
        {/* </div> */}
      {/* </div> */}




    </div>
  );
};

export default Events;