import { Link } from 'react-router-dom';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

const LandingPage = () => {
  const latestProjects = [
    {
      id: 1,
      title: "Project Management Tool",
      description: "A collaborative tool for managing software projects",
      image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Modern e-commerce solution with real-time updates",
      image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
      tech: ["Next.js", "Express", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media metrics",
      image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
      tech: ["Vue.js", "Python", "Django"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl pl-4">
            <h1 className="text-5xl font-bold mb-6">
              Showcase Your Amazing Projects
            </h1>
            <p className="text-xl mb-8">
              Connect, collaborate, and share your work with the community
            </p>
            <Link
              to="/submit"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Submit Your Project
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Projects</h2>
            <Link 
              to="/project" 
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/project`}
                    className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                  >
                    Learn More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Work?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community and showcase your projects to the world
          </p>
          <Link
            to="/proposals"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;