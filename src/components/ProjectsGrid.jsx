import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaChevronDown } from 'react-icons/fa';
import { collection, getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function ProjectsGrid() {
  const [user] = useAuthState(auth);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Pagination state
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const projectsPerPage = 3; // Changed to 3 instead of 6
  
  // Fetch initial projects from Firebase
  useEffect(() => {
    const fetchInitialProjects = async () => {
      setLoading(true);
      setHasMore(true);
      setLastVisible(null);
      
      try {
        const projectsRef = collection(db, "projects");
        const projectsQuery = query(
          projectsRef, 
          orderBy("createdAt", "desc"),
          limit(projectsPerPage)
        );
        
        const snapshot = await getDocs(projectsQuery);
        
        // Set the last document for pagination
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setLastVisible(lastDoc);
        
        // Check if there are more results
        setHasMore(snapshot.docs.length === projectsPerPage);
        
        const projectsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert timestamps to JS dates if needed
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
        }));
        
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialProjects();
  }, []);

  // Load more projects function
  const loadMoreProjects = async () => {
    if (!lastVisible || loadingMore) return;
    
    setLoadingMore(true);
    
    try {
      const projectsRef = collection(db, "projects");
      const projectsQuery = query(
        projectsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(projectsPerPage)
      );
      
      const snapshot = await getDocs(projectsQuery);
      
      // Update the last document for pagination
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastDoc);
      
      // Check if there are more results
      setHasMore(snapshot.docs.length === projectsPerPage);
      
      const newProjects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
      }));
      
      // Append new projects to existing ones
      setProjects(prevProjects => [...prevProjects, ...newProjects]);
      
    } catch (error) {
      console.error("Error loading more projects:", error);
      toast.error("Failed to load more projects");
    } finally {
      setLoadingMore(false);
    }
  };

  // Reset projects when filter changes
  useEffect(() => {
    if (filter !== 'all' || searchTerm) {
      // Filter locally when search or category filter is applied
      const results = projects.filter(project => {
        const matchesFilter = filter === 'all' || project.category === filter;
        const matchesSearch = !searchTerm || 
                             project.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.techStack?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearch;
      });
      setFilteredProjects(results);
    } else {
      // When no filters are applied, show all loaded projects
      setFilteredProjects(projects);
    }
  }, [filter, searchTerm, projects]);

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-gray-800 rounded-xl text-white p-8 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Showcase</h1>
          <p className="text-lg opacity-90 mb-8">
            Discover amazing open source projects built by our community members.
            Feel free to explore, contribute, or get inspired to build your own.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col md:flex-row gap-6">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by name, description, or tech..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <span className="text-gray-700 mr-2">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === category 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow h-80 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Projects Grid */}
      {!loading && filteredProjects.length > 0 ? (
        <>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Load More Button */}
          {hasMore && filter === 'all' && !searchTerm && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMoreProjects}
                disabled={loadingMore}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center mx-auto"
              >
                {loadingMore ? (
                  <>
                    <span className="mr-2">Loading...</span>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                  Load more
                    <FaChevronDown className="ml-2" />
                  </>
                )}
              </button>
            </div>
          )}
          
          {/* End message when no more projects */}
          {!hasMore && filter === 'all' && !searchTerm && projects.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-gray-500">You've reached the end of the projects list.</p>
            </div>
          )}
        </>
      ) : !loading && (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {setFilter('all'); setSearchTerm('');}}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectsGrid;