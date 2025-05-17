import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTimes, FaRegLightbulb, FaExternalLinkAlt } from 'react-icons/fa';

const LatestFeaturesPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // Show the popup button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasBeenShown(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      id: 1,
      title: "Beginner's Guide",
      description: "Complete roadmap for open source beginners with step-by-step guidance.",
      badge: "NEW",
      badgeColor: "bg-green-500",
      link: "/beginners-guide",
      icon: <FaRegLightbulb className="text-yellow-500" />
    },
    {
      id: 2,
      title: "Propose something new!",
      description: "Propose new features or improvements to our platform and get recognized.",
      badge: "UPDATED",
      badgeColor: "bg-blue-500",
      link: "/proposals",
      icon: <FaExternalLinkAlt className="text-blue-500" />
    },
    {
      id: 3,
      title: "Project Showcase",
      description: "Showcase your projects and get feedback from the community.",
      badge: "UPDATED",
      badgeColor: "bg-purple-500",
      link: "/project",
      icon: <FaExternalLinkAlt className="text-purple-500" />
    }
  ];

  return (
    <>
      {/* Floating button to open popup - good vibe from Jivan to mobile! */}
      <button
        className={`fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 text-white px-2 sm:px-4 py-3 sm:py-5 rounded-l-lg shadow-xl z-50 transition-all duration-300 hover:from-primary-700 hover:via-primary-700 hover:to-primary-800 border-l-2 border-t-2 border-b-2 border-gray-300 ${
          isOpen ? 'opacity-0 pointer-events-none translate-x-full' : 
          hasBeenShown ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Show latest features"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="absolute -top-1 -left-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-500 animate-ping"></span>
          <span className="absolute -top-1 -left-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-500"></span>
          <FaRegLightbulb className="text-white-600 text-xl sm:text-3xl mb-1" />
        </div>
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Popup panel */}
      <div 
        className={`fixed top-0 bottom-0 right-0 w-full sm:w-4/5 md:w-3/5 lg:max-w-md bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex justify-between items-center border-b border-gray-200 p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
            <FaRegLightbulb className="text-yellow-500 mr-2" /> Latest Features & Updates
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close popup"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-4 sm:space-y-6">
            {features.map(feature => (
              <div key={feature.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-start mb-2 sm:mb-3">
                  <div className="flex items-center gap-2 mb-1 sm:mb-0">
                    {feature.icon}
                    <h3 className="font-semibold text-base sm:text-lg">{feature.title}</h3>
                  </div>
                  <span className={`text-xs font-bold text-white px-2 py-1 rounded-full ${feature.badgeColor} mt-1 sm:mt-0`}>
                    {feature.badge}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium" 
                  onClick={() => setIsOpen(false)}
                >
                  Explore Feature <FaArrowRight className="text-xs" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-100">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">Coming Soon</h3>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2 ml-2">
              <li>Advanced Open sourced project</li>
              <li>Open source contribution activities</li>
              <li>New resources & guides</li>
            </ul>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              Stay tuned for more exciting features!
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-3 sm:p-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-2 text-center text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default LatestFeaturesPopup;