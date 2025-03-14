import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaLightbulb, FaComments } from 'react-icons/fa';
import Button from '../reusables/Button';

const Feature = () => {
  const features = [
    {
      id: 1,
      title: "Project Submission",
      description: "Submit your open source projects to showcase to the community.",
      status: "implemented",
      icon: "💼"
    },
    {
      id: 2,
      title: "Proposal Voting System",
      description: "Vote for project proposals you'd like to see developed by the community.",
      status: "implemented",
      icon: "🗳️"
    },
    {
      id: 3,
      title: "Event Calendar Integration",
      description: "Keep track of upcoming community events, workshops, and hackathons.",
      status: "in-progress",
      icon: "📅"
    },
    {
      id: 4,
      title: "Community Blog Platform",
      description: "Read and contribute articles about open source development.",
      status: "implemented",
      icon: "📝"
    },
    {
      id: 5,
      title: "Developer Profiles",
      description: "Create a profile to showcase your skills and contributions.",
      status: "planned",
      icon: "👤"
    },
    {
      id: 6,
      title: "Project Analytics",
      description: "Detailed analytics for project owners to track engagement.",
      status: "planned",
      icon: "📊"
    }
  ];

  // GitHub Discussions categories for feature requests
  const discussionCategories = [
    {
      name: "Feature Requests",
      description: "Suggest new features for OpenOct",
      url: "https://github.com/Jivan052/OpenOct/discussions",
      icon: <FaLightbulb className="text-yellow-500" />
    },
    {
      name: "UI/UX Improvements",
      description: "Ideas to enhance the user interface and experience",
      url: "https://github.com/Jivan052/OpenOct/discussions",
      icon: <FaLightbulb className="text-blue-500" />
    },
    {
      name: "Integration Ideas",
      description: "Suggestions for integrating with other tools and platforms",
      url: "https://github.com/Jivan052/OpenOct/discussions",
      icon: <FaLightbulb className="text-green-500" />
    }
  ];

  // Get status badge styling based on status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'implemented':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Idea Showcase</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the features that make OpenOct great, and help shape its future by suggesting new ones.
        </p>
      </div>

      {/* GitHub Discussions CTA */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-xl p-8 mb-16 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Have a Feature Idea?</h2>
            <p className="text-lg opacity-90">
              We use GitHub Discussions to collect and prioritize feature requests from our community.
              Join the conversation and help shape the future of OpenOct!
            </p>
          </div>
          <a 
            href="https://github.com/Jivan052/OpenOct/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button className="py-3 px-6 bg-white text-primary-700 hover:bg-gray-100 transition-colors flex items-center gap-2 text-lg">
              <FaGithub className="text-xl" />
              Suggest on GitHub
            </Button>
          </a>
        </div>
      </div>

      {/* Current Features */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Current & Planned Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{feature.icon}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(feature.status)}`}>
                  {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Discussion Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Join the Discussion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discussionCategories.map((category, index) => (
            <a 
              key={index}
              href={category.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gray-100 rounded-full mr-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold">{category.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center text-primary-600 font-medium">
                <FaComments className="mr-2" />
                Join Discussion
                <FaExternalLinkAlt className="ml-1 text-sm" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Feature Request Process */}
      <div className="mt-16 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">How Feature Requests Work</h2>
        <ol className="list-decimal pl-5 space-y-3">
          <li className="text-gray-700">
            <span className="font-medium">Suggest</span> - Post your idea on GitHub Discussions with details about the problem it solves.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Discuss</span> - Community members and maintainers will discuss and refine the idea.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Upvote</span> - Popular ideas that align with our vision get prioritized.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Implement</span> - Features move to our roadmap and get developed by our team or community contributors.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Feature;