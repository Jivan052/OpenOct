import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  // Format contributors to display in a cleaner way
  const formatContributors = (contributors) => {
    if (!contributors || contributors.length === 0) return "Unknown";
    
    if (contributors.length === 1) {
      return contributors[0];
    } else if (contributors.length <= 2) {
      return contributors.join(' & ');
    } else {
      return `${contributors[0]}, ${contributors[1]} & ${contributors.length - 2} more`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
        
        {/* Tech Stack Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <motion.span 
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700"
              whileHover={{ 
                backgroundColor: "#e0f2fe", 
                color: "#0369a1",
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <motion.a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="mr-2" />
            GitHub
          </motion.a>
          <motion.a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt className="mr-2" />
            Demo
          </motion.a>
        </div>

        {/* Simplified Contributors Section without hover effects */}
        <div className="flex items-center text-sm text-gray-600">
          <div className="bg-blue-50 p-1.5 rounded-full mr-2">
            <FaUsers className="text-blue-600" />
          </div>
          <div className="flex flex-wrap items-center">
            <span className="mr-1 font-medium"></span>
            {project.contributors && project.contributors.map((contributor, index) => (
              <span key={index} className="inline-flex items-center">
                <span className="bg-blue-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium mr-1 mb-1">
                  {contributor}
                </span>
                {index < project.contributors.length - 1 && index < 2 && (
                  <span className="mr-1">{index === project.contributors.length - 2 ? ' ' : ','}</span>
                )}
              </span>
            ))}
            {project.contributors && project.contributors.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium mb-1">
                +{project.contributors.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;