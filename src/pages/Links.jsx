import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaLaptopCode, FaCalendarAlt, FaBook, 
  FaArrowRight, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Simplified resource categories with fewer items
const resourceCategories = [
  {
    id: 'programs',
    title: 'Programs',
    icon: <FaCalendarAlt className="text-rose-500" />,
    color: 'from-rose-500 to-red-500',
    resources: [
      {
        title: 'Google Summer of Code',
        description: 'Student developers coding for open source organizations',
        url: 'https://summerofcode.withgoogle.com/',
      },
      {
        title: 'Outreachy',
        description: 'Internships for people subject to systemic bias in tech',
        url: 'https://www.outreachy.org/',
      },
      {
        title: 'Hacktoberfest',
        description: 'Month-long celebration of open source contributions',
        url: 'https://hacktoberfest.digitalocean.com/',
      },
      {
        title: 'MLH Fellowship',
        description: 'Remote internship alternative for aspiring technologists',
        url: 'https://fellowship.mlh.io/',
      }
    ]
  },
  {
    id: 'learning',
    title: 'Learn',
    icon: <FaBook className="text-emerald-500" />,
    color: 'from-emerald-500 to-green-500',
    resources: [
      {
        title: 'First Contributions',
        description: 'Make your first open source contribution in 5 minutes',
        url: 'https://firstcontributions.github.io/',
      },
      {
        title: 'Open Source Guides',
        description: 'Community guides for running and contributing to projects',
        url: 'https://opensource.guide/',
      },
      {
        title: 'freeCodeCamp',
        description: 'Learn to code with free curriculum and projects',
        url: 'https://www.freecodecamp.org/',
      },
      {
        title: 'The Odin Project',
        description: 'Full stack curriculum to become a web developer',
        url: 'https://www.theodinproject.com/',
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: <FaLaptopCode className="text-blue-500" />,
    color: 'from-blue-500 to-indigo-500',
    resources: [
      {
        title: 'GitHub',
        description: 'Platform for collaborative software development',
        url: 'https://github.com',
      },
      {
        title: 'GitLab',
        description: 'Complete DevOps platform for the entire software lifecycle',
        url: 'https://gitlab.com',
      },
      {
        title: 'Good First Issue',
        description: 'Find beginner-friendly issues to work on',
        url: 'https://goodfirstissue.dev/',
      },
      {
        title: 'Up For Grabs',
        description: 'Projects with tasks specifically for new contributors',
        url: 'https://up-for-grabs.net/',
      }
    ]
  },
  {
    id: 'communities',
    title: 'Communities',
    icon: <FaCode className="text-violet-500" />,
    color: 'from-violet-500 to-purple-500',
    resources: [
      {
        title: 'Open Source Initiative',
        description: 'Organization dedicated to promoting open source',
        url: 'https://opensource.org/',
      },
      {
        title: 'The Linux Foundation',
        description: 'Supports sustainable open source ecosystems',
        url: 'https://www.linuxfoundation.org/',
      },
      {
        title: 'Mozilla Foundation',
        description: 'Champions for a healthy internet and web resources',
        url: 'https://foundation.mozilla.org/',
      },
      {
        title: 'Apache Software Foundation',
        description: 'Community of over 350 open source projects',
        url: 'https://www.apache.org/',
      }
    ]
  }
];

const Links = () => {
  const [activeCategory, setActiveCategory] = useState(resourceCategories[0].id);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Minimal Header */}
        <motion.h1 
          className="text-2xl font-bold text-center text-gray-900 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Open Source Resources
        </motion.h1>
        
        {/* Icon-Based Category Navigation */}
        <div className="flex justify-center mb-8">
          {resourceCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`p-3 mx-2 rounded-lg transition-all flex flex-col items-center ${
                activeCategory === category.id 
                  ? `bg-gray-100 shadow-sm -translate-y-1`
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`text-xl p-2 rounded-full ${
                activeCategory === category.id ? 'bg-gradient-to-r ' + category.color + ' text-white' : 'bg-gray-100'
              }`}>
                {category.icon}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                activeCategory === category.id ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {category.title}
              </span>
            </motion.button>
          ))}
        </div>
        
        {/* Resources Cards in Grid */}
        {resourceCategories.map((category) => (
          activeCategory === category.id && (
            <motion.div 
              key={category.id}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {category.resources.map((resource, index) => (
                <motion.a
                  key={`${category.id}-${index}`}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow group relative h-36 flex flex-col justify-between overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${category.color}`}></div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 pr-5">{resource.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-blue-500">Visit resource</span>
                    <FaExternalLinkAlt className="text-gray-300 text-xs group-hover:text-blue-500 transition-colors" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )
        ))}
        
        {/* Simple Link to Blog */}
        <div className="mt-10 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read related articles on our blog
            <FaArrowRight className="ml-2 text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Links;