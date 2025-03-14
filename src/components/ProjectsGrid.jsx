import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';

function ProjectsGrid() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Placeholder projects data - will be replaced with Supabase data
  const projects = [
    {
      id: 1,
      title: 'Pencraft',
      description: 'PenCraft is a platform where users can share their stories and ideas with the world.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com/OpenOct-Guild/PenCraft',
      image: 'https://ik.imagekit.io/Jivan/1.png?updatedAt=1741976642250',
      contributors: ['OpenOct Guid org'],
      category: 'web'
    },
    {
      id: 2,
      title: 'DSA Hub',
      description: 'DSA Hub is a comprehensive platform designed to help you master data structures and algorithms.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      demoUrl: 'https://dsa-hub-07.netlify.app/',
      githubUrl: 'https://github.com/OpenOct-Guild/DSA-Hub',
      image: 'https://ik.imagekit.io/Jivan/2.png?updatedAt=1741976642141',
      contributors: ['OpenOct Guid org'],
      category: 'education'
    },
    {
      id: 3,
      title: 'Playit',
      description: 'Playit is a modern web music player built with love and passion for music.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      demoUrl: 'https://playit01.netlify.app/',
      githubUrl: 'https://github.com/OpenOct-Guild/Playit',
      image: 'https://ik.imagekit.io/Jivan/3.png?updatedAt=1741976642257',
      contributors: ['OpenOct Guid org'],
      category: 'entertainment'
    },

  ];

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Filter projects based on category and search term
  useEffect(() => {
    const results = projects.filter(project => {
      const matchesFilter = filter === 'all' || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
    setFilteredProjects(results);
  }, [filter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl text-white p-8 mb-12">
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
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
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
      ) : (
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

      {/* CTA Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Have a project to showcase?</h2>
            <p className="text-gray-600">Submit your open source project and share it with our community.</p>
          </div>
          <button
            onClick={() => window.location.href = '/submit'}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg"
          >
            Submit Your Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectsGrid;