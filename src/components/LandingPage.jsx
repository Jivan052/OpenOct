import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const LandingPage = () => {
  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      title: "Showcase Amazing Projects",
      description: "Connect, collaborate, and share your work with the community",
      buttonText: "Submit Your Project",
      buttonLink: "/submit",
      bgClass: "from-primary-600 to-primary-800"
    },
    {
      id: 2,
      title: "Join Our Upcoming Events",
      description: "Participate in hackathons, webinars, and coding challenges",
      buttonText: "View Events",
      buttonLink: "/events",
      bgClass: "from-blue-600 to-purple-700"
    },
    {
      id: 3,
      title: "Learn and Grow Together",
      description: "Access resources, tutorials, and mentorship opportunities",
      buttonText: "Explore Resources",
      buttonLink: "/blog",
      bgClass: "from-teal-500 to-emerald-700"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselSlides.length;

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); 
    
    return () => clearTimeout(timer);
  }, [currentSlide, totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

    const latestProjects = [
      {
        id: 1,
        title: "Pencraft",
        description: "PenCraft is a platform where users can share their stories and ideas with the world.",
        image: "https://ik.imagekit.io/Jivan/1.png?updatedAt=1741976642250",
        tech: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS']
      },
      {
        id: 2,
        title: "DSA Hub",
        description: "DSA Hub is a comprehensive platform designed to help you master data structures and algorithms.",
        image: "https://ik.imagekit.io/Jivan/2.png?updatedAt=1741976642141",
        tech: ['HTML', 'CSS', 'JavaScript']
      },
      {
        id: 3,
        title: "Playit",
        description: "Playit is a modern web music player built with love and passion for music.",
        image: "https://ik.imagekit.io/Jivan/3.png?updatedAt=1741976642257",
        tech: ['HTML', 'CSS', 'JavaScript']
      }
    ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <div className={`bg-gradient-to-r ${carouselSlides[currentSlide].bgClass} text-white rounded-lg relative`}>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl pl-4">
            <h1 className="text-5xl font-bold mb-6 transition-opacity duration-300">
              {carouselSlides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8 transition-opacity duration-300">
              {carouselSlides[currentSlide].description}
            </p>
            <Link
              to={carouselSlides[currentSlide].buttonLink}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {carouselSlides[currentSlide].buttonText}
            </Link>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute left-0 right-0 bottom-4 flex justify-center space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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
          <h2 className="text-3xl font-bold mb-4">Wanna to propose something new!</h2>
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