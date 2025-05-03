import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaShareAlt, FaChevronDown, FaArrowRight, FaExternalLinkAlt,
  FaCode, FaDatabase, FaLaptopCode, FaServer, FaRobot, FaMobile, FaChartBar, FaCloud
} from 'react-icons/fa';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';

// Domain categories with their icons and colors
const domainCategories = [
  {
    id: 'webdev',
    title: 'Web Development',
    icon: <FaLaptopCode className="text-blue-500" />,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'datascience',
    title: 'Data Science',
    icon: <FaChartBar className="text-green-500" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'softwaredev',
    title: 'Software Development',
    icon: <FaCode className="text-rose-500" />,
    color: 'from-rose-500 to-red-500'
  },
  {
    id: 'systemdesign',
    title: 'System Design',
    icon: <FaServer className="text-purple-500" />,
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    icon: <FaCloud className="text-cyan-500" />,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: <FaMobile className="text-amber-500" />,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: <FaRobot className="text-fuchsia-500" />,
    color: 'from-fuchsia-500 to-pink-500'
  },
  {
    id: 'database',
    title: 'Database Systems',
    icon: <FaDatabase className="text-yellow-500" />,
    color: 'from-yellow-500 to-amber-500'
  }
];

const OpenDomain = () => {
  const [activeDomain, setActiveDomain] = useState(domainCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState({});
  const [filteredResources, setFilteredResources] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  
  // Fetch resources from Firebase
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const resourcesRef = collection(db, "domainResources");
        const snapshot = await getDocs(resourcesRef);
        
        const fetchedResources = {};
        
        // Organize resources by domain
        domainCategories.forEach(domain => {
          fetchedResources[domain.id] = [];
        });
        
        snapshot.forEach(doc => {
          const data = doc.data();
          if (fetchedResources[data.domain]) {
            fetchedResources[data.domain].push({
              id: doc.id,
              ...data
            });
          }
        });
        
        // Sort each domain's resources to show featured first
        Object.keys(fetchedResources).forEach(domain => {
          fetchedResources[domain] = fetchedResources[domain].sort((a, b) => {
            // Featured resources first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // Then by creation date (newest first)
            return b.createdAt?.toDate?.() - a.createdAt?.toDate?.() || 0;
          });
        });
        
        setResources(fetchedResources);
        setFilteredResources(fetchedResources[activeDomain] || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Failed to load domain resources");
      } finally {
        setLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  // Filter resources based on search query and active domain
  useEffect(() => {
    if (!resources[activeDomain]) {
      setFilteredResources([]);
      return;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredResources(
        resources[activeDomain].filter(resource => 
          resource.title?.toLowerCase().includes(query) || 
          resource.description?.toLowerCase().includes(query) ||
          resource.type?.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredResources(resources[activeDomain] || []);
    }
    
    // Reset display count when domain or search changes
    setDisplayCount(6);
  }, [activeDomain, searchQuery, resources]);
  
  // Resources to display (limited by displayCount)
  const displayedResources = filteredResources.slice(0, displayCount);
  const hasMoreToLoad = displayCount < filteredResources.length;
  
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
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Learning Resources by Domain
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Discover curated resources for various tech domains
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
          <div className="relative w-full max-w-md mx-auto">
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
        
        {/* Domain Navigation */}
        <div className="flex justify-center overflow-x-auto scrollbar-hide mb-8">
          <div className="flex space-x-1 md:space-x-2 py-2">
            {domainCategories.map((domain) => (
              <motion.button
                key={domain.id}
                className={`px-3 py-2 rounded-lg transition-all flex items-center text-sm ${
                  activeDomain === domain.id 
                    ? `bg-gradient-to-r ${domain.color} text-white shadow-sm`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                onClick={() => setActiveDomain(domain.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="mr-2">{domain.icon}</span>
                {domain.title}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg h-40 animate-pulse"
              >
                <div className="h-full w-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
              <>
                <motion.div 
                  key={activeDomain + searchQuery}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {displayedResources.map((resource, index) => {
                    const domain = domainCategories.find(d => d.id === activeDomain);
                    return (
                      <motion.div
                        key={`${activeDomain}-${resource.id || index}`}
                        className="relative group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-white p-4 rounded-lg hover:shadow-md transition-shadow block h-40 flex flex-col justify-between overflow-hidden ${
                            resource.featured ? 'border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className={`absolute right-0 top-0 w-0 h-0 border-t-[40px] border-t-gray-100 border-l-[40px] border-l-transparent ${resource.featured ? 'block' : 'hidden'}`}></div>
                          
                          <div>
                            <span className="text-xs font-medium py-1 px-2 rounded-full bg-gray-100 text-gray-600 inline-block mb-2">
                              {resource.type}
                            </span>
                            <h3 className="font-medium text-gray-900 pr-5">{resource.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-blue-500 flex items-center">
                              Visit resource
                              <FaExternalLinkAlt className="ml-1 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </span>
                            {resource.featured && (
                              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
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
                    );
                  })}
                </motion.div>
                
                {/* Load More Button */}
                {hasMoreToLoad && (
                  <div className="mt-8 text-center">
                    <motion.button
                      className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg inline-flex items-center"
                      onClick={() => setDisplayCount(prev => prev + 6)}
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
              </>
            ) : (
              // Empty state
              <div className="text-center py-12 bg-white rounded-lg">
                <FaSearch className="mx-auto text-gray-300 text-4xl mb-2" />
                <p className="text-gray-500">No resources found in this domain.</p>
                {user && (
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm mb-3">
                      As an admin, you can add resources to this domain.
                    </p>
                    <a 
                      href="/profile" 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <FaPlus className="mr-2" />
                      Add Resource
                    </a>
                  </div>
                )}
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OpenDomain;