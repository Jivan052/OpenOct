import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  // Format the date if it exists
  const formattedDate = blog.date ? new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <a 
        href={blog.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block h-full"
        aria-label={`Read article: ${blog.title}`}
      >
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
          <div className="relative overflow-hidden">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-52 object-cover transition-transform duration-700 hover:scale-110" 
              loading="lazy"
            />
            {blog.featured && (
              <div className="absolute top-3 right-3">
                <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-bold">
                  Featured
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-end p-4">
              <span className="text-white flex items-center gap-1 text-sm font-medium">
                Read Article <FaExternalLinkAlt className="ml-1" />
              </span>
            </div>
          </div>
          
          <div className="p-5 flex-grow flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                {blog.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <FaCalendar className="mr-1" />
                {formattedDate}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800 hover:text-primary-600 transition-colors">
              {blog.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{blog.excerpt}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {blog.author.avatar ? (
                  <img 
                    src={blog.author.avatar} 
                    alt={blog.author.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-50"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                    {blog.author.name?.charAt(0) || "?"}
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-700 block leading-tight">{blog.author.name}</span>
                  {blog.author.role && (
                    <span className="text-xs text-gray-500">{blog.author.role}</span>
                  )}
                </div>
              </div>
              
              {blog.platform && (
                <div className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  {blog.platform}
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default BlogCard;