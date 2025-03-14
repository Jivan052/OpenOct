import { useState } from 'react';
import ProjectCard from './ProjectCard';

function ProjectsGrid() {
  const [filter, setFilter] = useState('all');
  
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
    },

  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Project Showcase</h1>
        
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === 'web' ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter('web')}
          >
            Web
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsGrid;