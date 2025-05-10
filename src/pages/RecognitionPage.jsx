import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaTrophy, FaUserAlt, FaTools, FaCode, FaProjectDiagram, FaPuzzlePiece, 
  FaUsers, FaExternalLinkAlt, FaAward, FaStar, FaMedal, FaChevronRight } from 'react-icons/fa';

const RecognitionPage = () => {
  const [awards, setAwards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchRecognitions = async () => {
      setLoading(true);
      try {
        // Get all recognitions
        const recognitionsSnapshot = await getDocs(collection(db, "recognitions"));
        
        // Group by category
        const awardsByCategory = {};
        
        recognitionsSnapshot.forEach(doc => {
          const data = doc.data();
          awardsByCategory[data.category] = {
            id: doc.id,
            ...data
          };
        });
        
        setAwards(awardsByCategory);

        // Set first award as active for mobile view
        const firstAward = Object.keys(awardsByCategory)[0];
        if (firstAward && window.innerWidth < 768) {
          setActiveCategory(firstAward);
        }
      } catch (err) {
        console.error("Error fetching recognitions:", err);
        setError("Failed to load recognition data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecognitions();
  }, []);
  
  const recognitionCategories = [
    {
      id: 'contributor',
      title: 'Contributor of the Month',
      icon: <FaUserAlt className="text-yellow-800" />,
      color: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-yellow-800',
      description: 'Awarded to individuals who have made exceptional open-source contributions.'
    },
    {
      id: 'maintainer',
      title: 'Maintainer of the Month',
      icon: <FaTools className="text-blue-800" />,
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-800',
      description: 'Recognizes excellence in project maintenance and community support.'
    },
    {
      id: 'developer',
      title: 'Developer of the Month',
      icon: <FaCode className="text-green-800" />,
      color: 'bg-green-500',
      gradient: 'from-green-400 to-green-800',
      description: 'Celebrates exceptional technical skills and code quality.'
    },
    {
      id: 'project',
      title: 'Project of the Month',
      icon: <FaProjectDiagram className="text-purple-800" />,
      color: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-800',
      description: 'Showcases innovative and impactful open-source projects.'
    },
    {
      id: 'quiz',
      title: 'Quiz Conqueror of the Month',
      icon: <FaPuzzlePiece className="text-red-800" />,
      color: 'bg-red-500',
      gradient: 'from-red-400 to-red-800',
      description: 'Awarded to top performers in our monthly coding quizzes.'
    },
    {
      id: 'member',
      title: 'Club Member of the Month',
      icon: <FaUsers className="text-indigo-800" />,
      color: 'bg-indigo-500',
      gradient: 'from-indigo-400 to-indigo-800',
      description: 'Recognizes overall contribution and engagement within the community.'
    }
  ];

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    } catch (err) {
      return '';
    }
  };

  const AwardCard = ({ category, award, index }) => {
    const catDetails = recognitionCategories.find(cat => cat.id === category);
    
    if (!catDetails) return null;

    const isMobile = window.innerWidth < 768;
    const isActive = activeCategory === category;
    
    return (
      <motion.div 
        className={`bg-white rounded-lg overflow-hidden shadow-md transition-all ${
          isMobile && !isActive ? 'hidden' : ''
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      >
        <div className={`h-3 bg-gradient-to-r ${catDetails.gradient}`}></div>
        <div className="p-6">
          <div className="flex items-center mb-5">
            <div className={`p-3 rounded-full ${catDetails.color.replace('bg-', 'bg-opacity-20 text-')}`}>
              {catDetails.icon}
            </div>
            <h3 className="ml-3 font-bold text-lg text-gray-900">{catDetails.title}</h3>
          </div>
          
          {award ? (
            <div className="space-y-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {award.photoUrl ? (
                    <div className="relative">
                      <img 
                        src={award.photoUrl} 
                        alt={award.name} 
                        className="h-20 w-20 rounded-full object-cover border-2 border-gray-200 transition-transform hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(award.name)}&size=80&background=random`;
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                        <FaMedal className={`text-${catDetails.color.split('-')[1]}`} />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaUserAlt className="text-gray-400 text-2xl" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                        <FaMedal className={`text-${catDetails.color.split('-')[1]}`} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-xl">{award.name}</h4>
                  {award.tagline && (
                    <p className="text-sm text-gray-600">{award.tagline}</p>
                  )}
                  {award.updatedAt && (
                    <div className="flex items-center mt-1">
                      <FaAward className="text-xs text-gray-500 mr-1" />
                      <p className="text-xs text-gray-500">{formatDate(award.updatedAt)}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {award.description && (
                <div className="pt-2 pb-1">
                  <p className="text-gray-700 leading-relaxed">{award.description}</p>
                </div>
              )}
              
              {award.links && award.links.length > 0 && (
                <div className="pt-3 space-y-2">
                  <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Links</h5>
                  <div className="flex flex-wrap gap-2">
                    {award.links.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-800 transition-colors"
                      >
                        {link.label || `Link ${index + 1}`}
                        <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                <FaStar className="text-gray-300 text-xl" />
              </div>
              <p className="mt-3 text-gray-500">No recipient selected yet.</p>
              <p className="text-sm text-gray-400">Check back soon!</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // For mobile view toggle
  const CategoryPills = () => {
    return (
      <div className="md:hidden overflow-x-auto pb-2 mb-4">
        <div className="flex space-x-2 min-w-max">
          {recognitionCategories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap ${
                activeCategory === category.id 
                ? `bg-${category.color.split('-')[1]} text-white` 
                : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-1">{category.icon}</span>
              <span>{category.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <FaTrophy className="text-yellow-500 text-5xl" />
                <FaStar className="absolute -top-1 -right-1 text-yellow-400 text-sm" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Recognition Program</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the outstanding contributions and achievements within our open source community
          </p>
          
          <div className="mt-8">
            <a 
              href="https://github.com/OpenOct/hall-of-fame"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <FaTrophy className="mr-2" />
              View Past Recognition Recipients
              <FaChevronRight className="ml-2 text-xs" />
            </a>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-600 font-medium">Loading recognitions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-lg text-center max-w-md mx-auto shadow-sm">
            <div className="mb-3 text-red-500 text-2xl">
              <span role="img" aria-label="Error">⚠️</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Oops, something went wrong!</h3>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <CategoryPills />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recognitionCategories.map((category, index) => (
                <AwardCard 
                  key={category.id}
                  category={category.id}
                  award={awards[category.id]}
                  index={index}
                />
              ))}
            </div>
          </>
        )}

        <motion.div 
          className="text-center mt-16 py-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-600">
            Want to nominate someone for next month's recognition?
          </p>
          <a 
            href="mailto:nominations@openoct.org?subject=Award%20Nomination" 
            className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Submit your nomination
            <FaChevronRight className="ml-1 text-xs" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default RecognitionPage;