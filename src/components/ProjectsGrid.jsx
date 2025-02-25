import { useState } from 'react';
import ProjectCard from './ProjectCard';

function ProjectsGrid() {
  const [filter, setFilter] = useState('all');
  
  // Placeholder projects data - will be replaced with Supabase data
  const projects = [
    {
      id: 1,
      title: 'Example Project',
      description: 'A sample project to demonstrate the layout',
      techStack: ['React', 'Tailwind', 'MongoDB'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
      contributors: ['Jivan Jamdar', 'Jane Smith'],
    },
    {
      id: 1,
      title: 'Example Project',
      description: 'A sample project to demonstrate the layout',
      techStack: ['React', 'Tailwind', 'MongoDB'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
      contributors: ['Jivan Jamdar', 'Jane Smith'],
    },
    {
      id: 1,
      title: 'Example Project',
      description: 'A sample project to demonstrate the layout',
      techStack: ['React', 'Tailwind', 'MongoDB'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
      contributors: ['Jivan Jamdar', 'Jane Smith'],
    },
    {
      id: 1,
      title: 'Example Project',
      description: 'A sample project to demonstrate the layout',
      techStack: ['React', 'Tailwind', 'MongoDB'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
      contributors: ['Jivan Jamdar', 'Jane Smith'],
    },
    {
      id: 1,
      title: 'Example Project',
      description: 'A sample project to demonstrate the layout',
      techStack: ['React', 'Tailwind', 'MongoDB'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
      contributors: ['Jivan Jamdar', 'Jane Smith'],
    },
    {
      id: 1,
      title: 'Example Project',
      description: 'A sample project to demonstrate the layout',
      techStack: ['React', 'Tailwind', 'MongoDB'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
      contributors: ['Jivan Jamdar', 'Jane Smith'],
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