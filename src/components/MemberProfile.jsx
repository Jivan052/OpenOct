import { useParams } from 'react-router-dom';
import { useState } from 'react';

function MemberProfile() {
  const { id } = useParams();
  const [member] = useState({
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate about building great software and contributing to open source projects.',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    contact: {
      email: 'john@example.com',
      github: 'johndoe',
      linkedin: 'johndoe'
    },
    projects: [
      {
        id: 1,
        title: 'Project Showcase Platform',
        description: 'A platform for showcasing club member projects',
        role: 'Lead Developer'
      }
    ]
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full mr-6"></div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
            <p className="text-gray-600">{member.title}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-600">{member.bio}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span>{' '}
              <a href={`mailto:${member.contact.email}`} className="text-primary-600">
                {member.contact.email}
              </a>
            </p>
            <p>
              <span className="font-medium">GitHub:</span>{' '}
              <a
                href={`https://github.com/${member.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600"
              >
                @{member.contact.github}
              </a>
            </p>
            <p>
              <span className="font-medium">LinkedIn:</span>{' '}
              <a
                href={`https://linkedin.com/in/${member.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600"
              >
                {member.contact.linkedin}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid gap-6">
          {member.projects.map((project) => (
            <div key={project.id} className="card p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <p className="text-sm text-gray-500">Role: {project.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;