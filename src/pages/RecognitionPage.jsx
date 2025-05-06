import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaStar, FaMedal, FaCode, FaTools, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';

const Recognition = () => {
  const [loading, setLoading] = useState(true);
  const [awards, setAwards] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Sample data - Replace with Firebase fetch when ready
  const sampleAwards = {
    current: [
      {
        id: 'award1',
        title: 'Contributor of the Week',
        recipient: 'Sarah Johnson',
        description: 'For outstanding contributions to the documentation project and helping 12 new contributors get started.',
        date: 'May 1, 2025',
        imageUrl: 'https://i.pravatar.cc/300?img=1',
        icon: <FaStar className="text-yellow-500" />
      },
      {
        id: 'award2',
        title: 'Developer of the Month',
        recipient: 'Michael Chen',
        description: 'For implementing the new search feature that improved performance by 40% and fixing 7 critical bugs.',
        date: 'April 2025',
        imageUrl: 'https://i.pravatar.cc/300?img=3',
        icon: <FaCode className="text-blue-500" />
      },
      {
        id: 'award3',
        title: 'Quiz Champion',
        recipient: 'Alex Rodriguez',
        description: 'For achieving the highest score in our JavaScript Advanced Concepts quiz with a perfect score.',
        date: 'May 3, 2025',
        imageUrl: 'https://i.pravatar.cc/300?img=4',
        icon: <FaTrophy className="text-amber-500" />
      },
      {
        id: 'award4',
        title: 'Conflict Resolver of the Week',
        recipient: 'Priya Patel',
        description: 'For mediating and finding consensus in the API design discussion, leading to a better solution.',
        date: 'May 1, 2025',
        imageUrl: 'https://i.pravatar.cc/300?img=5',
        icon: <FaMedal className="text-purple-500" />
      },
      {
        id: 'award5',
        title: 'Maintainer of the Month',
        recipient: 'James Wilson',
        description: 'For exceptional project maintenance, reviewing 45 PRs, and mentoring 8 new contributors.',
        date: 'April 2025',
        imageUrl: 'https://i.pravatar.cc/300?img=7',
        icon: <FaTools className="text-green-500" />
      }
    ],
    past: [
      {
        id: 'past1',
        title: 'Contributor of the Week',
        recipient: 'Emma Davis',
        description: 'For implementing the new authentication system and writing comprehensive tests.',
        date: 'April 24, 2025',
        imageUrl: 'https://i.pravatar.cc/300?img=9',
        icon: <FaStar className="text-yellow-500" />
      },
      {
        id: 'past2',
        title: 'Developer of the Month',
        recipient: 'Daniel Kim',
        description: 'For leading the migration to the new frontend framework and training the team.',
        date: 'March 2025',
        imageUrl: 'https://i.pravatar.cc/300?img=11',
        icon: <FaCode className="text-blue-500" />
      },
      // Add more past awards as needed
    ]
  };

  // Simulate fetching from Firebase (replace with actual fetch)
  useEffect(() => {
    const fetchAwards = async () => {
      setLoading(true);
      try {
        // Uncomment when ready to fetch from Firebase
        // const awardsRef = collection(db, "recognition");
        // const awardsQuery = query(awardsRef, orderBy("date", "desc"));
        // const snapshot = await getDocs(awardsQuery);
        // const awardsList = snapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));
        
        // For now, use sample data
        setTimeout(() => {
          setAwards(sampleAwards);
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error("Error fetching awards:", error);
        toast.error("Failed to load recognition data");
        setLoading(false);
      }
    };
    
    fetchAwards();
  }, []);

  // Get the active awards list based on selected period
  const activeAwards = awards[selectedPeriod] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Recognition</h1>
          <p className="text-lg opacity-90 mb-6">
            Celebrating our amazing community members who go above and beyond 
            with their contributions, leadership, and support.
          </p>
          <div className="inline-flex bg-blue-700 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md ${selectedPeriod === 'current' 
                ? 'bg-white text-blue-600' 
                : 'text-white hover:bg-blue-800'}`}
              onClick={() => setSelectedPeriod('current')}
            >
              Current Awards
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedPeriod === 'past' 
                ? 'bg-white text-blue-600' 
                : 'text-white hover:bg-blue-800'}`}
              onClick={() => setSelectedPeriod('past')}
            >
              Past Awards
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow h-36 animate-pulse">
              <div className="p-6 flex">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 w-1/3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 w-2/3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Featured Award */}
      {!loading && activeAwards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:shrink-0 md:w-1/3 relative">
                <img 
                  className="h-72 w-full object-cover md:h-full" 
                  src={activeAwards[0].imageUrl} 
                  alt={activeAwards[0].recipient} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300?text=Photo+Not+Available';
                  }}
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-8 md:flex-1 md:flex md:flex-col md:justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      {activeAwards[0].icon || <FaTrophy className="text-blue-600 text-xl" />}
                    </div>
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                      {activeAwards[0].title}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{activeAwards[0].recipient}</h2>
                  <p className="mt-2 text-gray-600 mb-6">
                    {activeAwards[0].description}
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">{activeAwards[0].date}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Additional Awards */}
      {!loading && activeAwards.length > 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">More Recognitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {activeAwards.slice(1).map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow overflow-hidden flex"
                >
                  <div className="p-5 flex">
                    <div className="mr-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden">
                        <img 
                          src={award.imageUrl} 
                          alt={award.recipient} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300?text=Photo';
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <div className="p-1 bg-blue-50 rounded-full mr-2">
                          {award.icon || <FaTrophy className="text-blue-500" />}
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{award.title}</p>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">{award.recipient}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{award.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <FaCalendarAlt className="mr-1" />
                        {award.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      
      {/* No Awards Message */}
      {!loading && activeAwards.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No recognitions found</h3>
          <p className="text-gray-600">Check back soon for new community recognitions</p>
        </div>
      )}
      
      {/* Nomination Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Know someone deserving recognition?</h2>
            <p className="text-gray-600">
              Nominate outstanding community members for their contributions and achievements.
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/nominate'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Nominate Someone
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recognition;