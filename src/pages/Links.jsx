import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaCalendarAlt, FaBook, FaSearch,
  FaArrowRight, FaExternalLinkAlt, FaChevronDown, FaShareAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { collection, getDocs  } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';

const resourceCategories = [
  {
    id: 'programs',
    title: 'Programs',
    icon: <FaCalendarAlt className="text-rose-500" />,
    color: 'from-rose-500 to-red-500',
  },
  {
    id: 'learning',
    title: 'Learn',
    icon: <FaBook className="text-emerald-500" />,
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: <FaLaptopCode className="text-blue-500" />,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'communities',
    title: 'Communities',
    icon: <FaCode className="text-violet-500" />,
    color: 'from-violet-500 to-purple-500',
  }
];

const Links = () => {
  const [user] = useAuthState(auth);
  const [activeCategory, setActiveCategory] = useState(resourceCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState([]); 
  const [allResources, setAllResources] = useState({});
  const [displayCount, setDisplayCount] = useState(4); // Initially show 4 items
  const [loading, setLoading] = useState(true);
  
  // Fetch resources from Firebase
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const resourcesRef = collection(db, "linkResources");
        const snapshot = await getDocs(resourcesRef);
        
        // Initialize categories in allResources object
        const fetchedResources = {};
        resourceCategories.forEach(category => {
          fetchedResources[category.id] = [];
        });
        
        // Organize resources by category
        snapshot.forEach(doc => {
          const data = doc.data();
          if (fetchedResources[data.category]) {
            fetchedResources[data.category].push({
              id: doc.id,
              ...data
            });
          }
        });
        
        setAllResources(fetchedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  // Filter resources based on search query and active category
  useEffect(() => {
    if (!allResources[activeCategory]) {
      setFilteredResources([]);
      return;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredResources(
        allResources[activeCategory].filter(resource => 
          resource.title.toLowerCase().includes(query) || 
          resource.description.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredResources(allResources[activeCategory] || []);
    }
    
    // Reset display count when category or search changes
    setDisplayCount(4);
  }, [activeCategory, searchQuery, allResources]);
  
  // Share a resource
  const shareResource = async (e, resource) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.description,
          url: resource.url
        });
      } catch (error) {
        console.error('Error sharing resource:', error);
        navigator.clipboard.writeText(resource.url);
        toast.success('URL copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(resource.url);
      toast.success('URL copied to clipboard!');
    }
  };
  
  // Resources to display (limited by displayCount)
  const displayedResources = filteredResources.slice(0, displayCount);
  const hasMoreToLoad = displayCount < filteredResources.length;
  
  return (
    
    <div className="min-h-screen bg-gray-50 py-8">
         <div className="mb-10">
              <h2 className="text-xl font-bold mb-4">Daily InfoCard</h2>
                 <InfoCard />
                        </div>
      <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <motion.h1 
              className="text-2xl font-bold text-center text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Open Source Resources
            </motion.h1>
            
            <motion.p
              className="text-gray-600 text-center max-w-2xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Explore a curated collection of tools, platforms, and educational resources to help you contribute to open source projects. 
              Find opportunities for learning, collaboration, and professional growth in the world of open source.
            </motion.p>
            
            {/* Admin message if logged in */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-blue-50 text-blue-800 p-3 rounded-lg inline-block mb-4"
              >
                <p className="text-sm">
                  You're logged in as an admin. To add new resources, visit your <a href="/profile" className="font-medium underline">admin dashboard</a>.
                </p>
              </motion.div>
            )}
            
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        
          {/* Icon-Based Category Navigation */}
          <div className="flex justify-center overflow-x-auto scrollbar-hide mb-8">
            <div className="flex space-x-2">
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
          </div>
        
          {/* Search Results Count */}
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-500 text-center">
              Found {filteredResources.length} resources matching "{searchQuery}"
              {filteredResources.length === 0 && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        
          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm h-36 animate-pulse">
                  <div className="h-full w-full bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Resources Grid */}
              {filteredResources.length > 0 ? (
                <motion.div 
                  key={activeCategory + searchQuery}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {displayedResources.map((resource, index) => (
                    <motion.div
                      key={`${resource.id || index}`}
                      className="relative group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow block h-36 flex flex-col justify-between overflow-hidden"
                      >
                        <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${resourceCategories.find(cat => cat.id === activeCategory).color}`}></div>
                        
                        <div>
                          <h3 className="font-medium text-gray-900 pr-5">{resource.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-blue-500">Visit resource</span>
                          <FaExternalLinkAlt className="text-gray-300 text-xs group-hover:text-blue-500 transition-colors" />
                        </div>
                      </a>
                      
                      {/* Share Button */}
                      <button
                        onClick={(e) => shareResource(e, resource)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                        aria-label="Share resource"
                      >
                        <FaShareAlt className="text-gray-500 text-xs" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Empty State */
                <div className="text-center py-10 bg-white rounded-lg">
                  <FaSearch className="mx-auto text-gray-300 text-4xl mb-2" />
                  <p className="text-gray-500">No resources found.</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {searchQuery ? 'Try a different search term.' : 
                     `No resources available in the ${resourceCategories.find(cat => cat.id === activeCategory).title} category yet.`}
                  </p>
                </div>
              )}
            </>
          )}
        
          {/* Load More Button */}
          {hasMoreToLoad && (
            <div className="mt-6 text-center">
              <motion.button
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg inline-flex items-center"
                onClick={() => setDisplayCount(prev => prev + 4)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Load more resources
                <FaChevronDown className="ml-2 text-xs" />
              </motion.button>
              <p className="text-xs text-gray-500 mt-1">
                Showing {displayCount} of {filteredResources.length} resources
              </p>
            </div>
          )}
        
          {/* Link to Blog */}
          <div className="mt-10 text-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Read related articles on our resources
              <FaArrowRight className="ml-2 text-xs" />
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Links;