import React from 'react';

function ProjectCard({ project }) {
  const { title, description, techStack, demoUrl, githubUrl, image, contributors } = project;

  return (
    <div className="card">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4 mb-4">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            GitHub
          </a>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-2">Contributors:</h4>
          <div className="flex flex-wrap gap-2">
            {contributors.map((contributor) => (
              <span
                key={contributor}
                className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {contributor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;