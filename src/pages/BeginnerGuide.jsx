import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBook, FaCode, FaRoad, FaGithub, FaQuestion, FaTools, 
  FaLightbulb, FaSearch, FaArrowRight
} from 'react-icons/fa';

const BeginnerGuide = () => {
  const [activeTab, setActiveTab] = useState('roadmap');

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-gray-800 text-white rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Open Source for Beginners</h1>
            <p className="text-xl opacity-90 mb-8">
              Your guided pathway into the world of open source development. Discover resources,
              projects, and step-by-step guidance to help you make your first contribution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#roadmap" 
                onClick={() => setActiveTab('roadmap')}
                className="px-6 py-3 bg-white text-primary-700 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-md"
              >
                <FaRoad className="inline mr-2" />
                Start Your Journey
              </a>
              <a 
                href="https://github.com/firstcontributions/first-contributions"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-700 hover:bg-primary-800 font-medium rounded-lg transition-colors border border-blue-500"
              >
                <FaGithub className="inline mr-2" />
                Make Your First Contribution
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-1 scrollbar-hide">
            <button
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'roadmap' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('roadmap')}
            >
              <FaRoad className="mr-2" />
              Learning Roadmap
            </button>
            <button
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'projects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              <FaCode className="mr-2" />
              Beginner-Friendly Projects
            </button>
            <button
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('resources')}
            >
              <FaBook className="mr-2" />
              Learning Resources
            </button>
            <button
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'faq' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              <FaQuestion className="mr-2" />
              FAQ
            </button>
            <button
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'tools' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('tools')}
            >
              <FaTools className="mr-2" />
              Tools & Setup
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'roadmap' && <LearningRoadmap />}
        {activeTab === 'projects' && <BeginnerProjects />}
        {activeTab === 'resources' && <LearningResources />}
        {activeTab === 'faq' && <FrequentlyAskedQuestions />}
        {activeTab === 'tools' && <DeveloperTools />}
      </div>
    </div>
  );
};

// Learning Roadmap Component
const LearningRoadmap = () => {
  const roadmapSteps = [
    {
      step: 1,
      title: 'Learn the Basics',
      description: 'Familiarize yourself with version control (Git) and basic programming concepts.',
      resources: [
        { 
          title: 'Git & GitHub Crash Course',
          url: 'https://www.freecodecamp.org/news/git-and-github-for-beginners/'
        },
        { 
          title: 'GitHub Learning Lab',
          url: 'https://skills.github.com/'
        },
        { 
          title: 'Git Handbook',
          url: 'https://guides.github.com/introduction/git-handbook/'
        }
      ],
      color: 'bg-blue-500'
    },
    {
      step: 2,
      title: 'Understand Open Source',
      description: 'Learn about open source licenses, contribution guidelines, and community expectations.',
      resources: [
        { 
          title: 'Open Source Guide',
          url: 'https://opensource.guide/'
        },
        { 
          title: 'Choose a License',
          url: 'https://choosealicense.com/'
        },
        {
          title: 'Open Source Etiquette',
          url: 'https://www.contribution-guide.org/'
        }
      ],
      color: 'bg-green-500'
    },
    {
      step: 3,
      title: 'Find Your First Project',
      description: 'Discover beginner-friendly projects and issues you can work on.',
      resources: [
        { 
          title: 'First Contributions',
          url: 'https://github.com/firstcontributions/first-contributions'
        },
        { 
          title: 'Good First Issues',
          url: 'https://goodfirstissues.com/'
        },
        { 
          title: 'Up For Grabs',
          url: 'https://up-for-grabs.net/'
        }
      ],
      color: 'bg-yellow-500'
    },
    {
      step: 4,
      title: 'Make Your First Contribution',
      description: 'Fork a repository, clone it, make changes, and create your first pull request.',
      resources: [
        { 
          title: 'How to Create a Pull Request',
          url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request'
        },
        { 
          title: 'Hacktoberfest Starter Project',
          url: 'https://github.com/MunGell/awesome-for-beginners'
        }
      ],
      color: 'bg-purple-500'
    },
    {
      step: 5,
      title: 'Join Communities',
      description: 'Connect with other developers and find mentorship opportunities.',
      resources: [
        { 
          title: 'CodeTriage',
          url: 'https://www.codetriage.com/'
        },
        { 
          title: 'DEV Community',
          url: 'https://dev.to/'
        },
        { 
          title: 'Open Source Friday',
          url: 'https://opensourcefriday.com/'
        }
      ],
      color: 'bg-pink-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Roadmap</h2>
      <p className="text-lg text-gray-700 mb-8">
        Follow this step-by-step roadmap to start your open source journey. Each step includes 
        curated resources to help you progress from beginner to contributor.
      </p>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-8 w-1 bg-blue-100"></div>
        
        <div className="space-y-12">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`absolute left-4 -ml-1 mt-2 w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white font-bold shadow-md`}>
                {step.step}
              </div>
              
              <div className="ml-20 p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-700">{step.description}</p>
                
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-sm text-gray-600 uppercase tracking-wider">Recommended Resources:</h4>
                  <ul className="space-y-2">
                    {step.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                        >
                          <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs">
                            {idx + 1}
                          </span>
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Beginner Projects Component
const BeginnerProjects = () => {
  const beginnerProjects = [
    {
      name: 'First Contributions',
      description: 'A project to help beginners contribute to open source. Make your first contribution in less than 5 minutes.',
      tags: ['beginner', 'first-contribution', 'tutorial'],
      url: 'https://github.com/firstcontributions/first-contributions',
      difficulty: 'Very Easy',
      language: 'Multiple'
    },
    {
      name: 'EddieHub Hacktoberfest',
      description: 'Collection of beginner-friendly open source projects for Hacktoberfest and beyond.',
      tags: ['hacktoberfest', 'beginner', 'community'],
      url: 'https://github.com/EddieHubCommunity/hacktoberfest-practice',
      difficulty: 'Easy',
      language: 'Markdown'
    },
    {
      name: 'Good First Issue',
      description: 'A list of beginner-friendly projects grouped by languages, with detailed issue guides.',
      tags: ['issue-finder', 'beginner', 'multiple-languages'],
      url: 'https://goodfirstissue.dev/',
      difficulty: 'Easy',
      language: 'Multiple'
    },
    {
      name: 'FreeCodeCamp',
      description: 'Open source codebase and curriculum for learning to code. Very beginner-friendly with good documentation.',
      tags: ['educational', 'javascript', 'community'],
      url: 'https://github.com/freeCodeCamp/freeCodeCamp',
      difficulty: 'Easy-Medium',
      language: 'JavaScript'
    },
    {
      name: 'TwilioQuest',
      description: 'An educational game designed to teach programmers how to contribute to open source projects.',
      tags: ['game', 'educational', 'interactive'],
      url: 'https://github.com/TwilioQuest/twilioquest-open-source',
      difficulty: 'Easy',
      language: 'JavaScript'
    },
    {
      name: 'Awesome Lists',
      description: 'Various "awesome" lists cataloging resources for specific topics. Good contribution opportunities for organizing resources.',
      tags: ['documentation', 'resources', 'collection'],
      url: 'https://github.com/sindresorhus/awesome',
      difficulty: 'Easy',
      language: 'Markdown'
    },
    {
      name: 'AppSmith',
      description: 'A platform for building internal tools with a drag-and-drop UI. Great first issues and mentorship.',
      tags: ['UI', 'internal-tools', 'javascript'],
      url: 'https://github.com/appsmithorg/appsmith',
      difficulty: 'Easy-Medium',
      language: 'JavaScript/TypeScript'
    },
    {
      name: 'Contribute to Open Source',
      description: 'A repository dedicated to helping beginners contribute to open source projects.',
      tags: ['beginner', 'guide', 'tutorial'],
      url: 'https://github.com/danthareja/contribute-to-open-source',
      difficulty: 'Very Easy',
      language: 'JavaScript'
    },
    {
      name: 'Open Sauced',
      description: 'Helps you find your next open source contribution with a delightful interface.',
      tags: ['contribution-finder', 'dashboard', 'react'],
      url: 'https://github.com/open-sauced/open-sauced',
      difficulty: 'Easy-Medium',
      language: 'JavaScript/TypeScript'
    },
    {
      name: 'Public APIs',
      description: 'A collective list of free APIs for use in software and web development.',
      tags: ['API', 'resources', 'documentation'],
      url: 'https://github.com/public-apis/public-apis',
      difficulty: 'Easy',
      language: 'Markdown'
    },
    {
      name: 'Simple Icons',
      description: 'SVG icons for popular brands. Good for design-oriented contributors.',
      tags: ['design', 'icons', 'svg'],
      url: 'https://github.com/simple-icons/simple-icons',
      difficulty: 'Easy',
      language: 'SVG/JavaScript'
    },
    {
      name: 'Forem',
      description: 'The source code for the forem community platform. Great introduction to Rails.',
      tags: ['community', 'rails', 'web-app'],
      url: 'https://github.com/forem/forem',
      difficulty: 'Medium',
      language: 'Ruby'
    }
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique languages and sort them
  const languages = ['all', ...new Set(beginnerProjects.map(project => project.language))].sort();

  // Filter projects based on selections
  const filteredProjects = beginnerProjects.filter(project => {
    const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty.toLowerCase().includes(selectedDifficulty.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || project.language === selectedLanguage;
    const matchesSearch = !searchTerm || 
                         project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesDifficulty && matchesLanguage && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Beginner-Friendly Projects</h2>
      <p className="text-lg text-gray-700 mb-8">
        Find the perfect project to start your open source journey. These projects are specifically 
        chosen for their welcoming communities, good documentation, and beginner-friendly issues.
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Difficulties</option>
            <option value="very easy">Very Easy</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
          </select>
          
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map(language => (
              <option key={language} value={language}>
                {language === 'all' ? 'All Languages' : language}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="block text-sm text-gray-500">Difficulty:</span>
                    <span className={`text-sm font-medium ${
                      project.difficulty.toLowerCase().includes('easy') ? 'text-green-600' : 
                      project.difficulty.toLowerCase().includes('medium') ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">Language:</span>
                    <span className="text-sm font-medium text-gray-900">{project.language}</span>
                  </div>
                </div>
              </div>
              
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 text-center py-3 text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
              >
                <FaGithub className="inline mr-2" />
                View Project
              </a>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaSearch className="text-gray-300 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No projects found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters</p>
          <button 
            onClick={() => {
              setSelectedDifficulty('all');
              setSelectedLanguage('all');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Learning Resources Component
const LearningResources = () => {
  const resourceCategories = [
    {
      title: 'Git & GitHub',
      resources: [
        {
          title: 'GitHub Learning Lab',
          description: 'Interactive courses to learn Git and GitHub directly within GitHub.',
          url: 'https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources'
        },
        {
          title: 'Pro Git Book',
          description: 'The entire Pro Git book, written by Scott Chacon and Ben Straub.',
          url: 'https://git-scm.com/book/en/v2'
        },
        {
          title: 'Oh My Git!',
          description: 'An open source game for learning Git interactively.',
          url: 'https://ohmygit.org/'
        },
        {
          title: 'GitHub Skills',
          description: 'Guided learning paths for GitHub features.',
          url: 'https://skills.github.com/'
        }
      ]
    },
    {
      title: 'Open Source Guides',
      resources: [
        {
          title: 'Open Source Guides',
          description: 'Collection of resources for individuals and communities about open source.',
          url: 'https://opensource.guide/'
        },
        {
          title: 'How to Contribute to Open Source',
          description: 'A comprehensive guide for beginners.',
          url: 'https://opensource.guide/how-to-contribute/'
        },
        {
          title: 'Open Source Etiquette',
          description: 'Learn about the norms and expectations in open source communities.',
          url: 'https://www.contribution-guide.org/'
        },
        {
          title: 'The Open Source Way',
          description: 'A guidebook for creating and nurturing open source communities.',
          url: 'https://www.theopensourceway.org/'
        }
      ]
    },
    {
      title: 'Finding Opportunities',
      resources: [
        {
          title: 'Good First Issues',
          description: 'Find beginner-friendly issues in open source projects.',
          url: 'https://goodfirstissues.com/'
        },
        {
          title: 'Up For Grabs',
          description: 'List of projects which have curated tasks for new contributors.',
          url: 'https://up-for-grabs.net/'
        },
        {
          title: 'First Timers Only',
          description: 'Issues specifically designed for first-time contributors.',
          url: 'https://www.firsttimersonly.com/'
        },
        {
          title: 'CodeTriage',
          description: 'Help out your favorite open source projects and become a better developer.',
          url: 'https://www.codetriage.com/'
        }
      ]
    },
    {
      title: 'Online Courses',
      resources: [
        {
          title: 'How to Contribute to an Open Source Project on GitHub',
          description: 'A free Egghead.io course on making open source contributions.',
          url: 'https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github'
        },
        {
          title: 'Introduction to Open Source',
          description: 'The Linux Foundation\'s free introduction to open source course.',
          url: 'https://training.linuxfoundation.org/training/introduction-to-open-source/'
        },
      ]
    },
    {
      title: 'Communities',
      resources: [
        {
          title: 'GitHub Community Forum',
          description: 'Discuss, ask and answer questions about GitHub.',
          url: 'https://github.community/'
        },
        {
          title: 'EddieHub',
          description: 'Supportive community for open source newcomers.',
          url: 'https://www.eddiehub.org/'
        },
        {
          title: 'Dev.to',
          description: 'A community for sharing and discovering great ideas.',
          url: 'https://dev.to/t/opensource'
        },
        {
          title: 'CodeNewbie',
          description: 'Community for people learning to code and those who support them.',
          url: 'https://www.codenewbie.org/'
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Resources</h2>
      <p className="text-lg text-gray-700 mb-8">
        Enhance your skills and knowledge with these hand-picked resources for learning about 
        open source and improving your development skills.
      </p>

      <div className="space-y-10">
        {resourceCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaLightbulb className="text-yellow-500 mr-2" />
              {category.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.resources.map((resource, idx) => (
                <a 
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
                >
                  <h4 className="font-medium text-blue-700 mb-2">{resource.title}</h4>
                  <p className="text-gray-600 text-sm flex-grow">{resource.description}</p>
                  <div className="text-blue-600 text-sm mt-3 flex items-center">
                    Visit resource
                    <FaArrowRight className="ml-1 text-xs" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Frequently Asked Questions Component
const FrequentlyAskedQuestions = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);
  
  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };
  
  const faqs = [
    {
      question: "What is open source?",
      answer: "Open source refers to software whose source code is available for anyone to view, use, modify, and distribute. It's built and maintained collaboratively by a community of developers, typically coordinated over the internet. Open source projects range from small utilities to major platforms like Linux, WordPress, and Firefox."
    },
    {
      question: "Why should I contribute to open source?",
      answer: "Contributing to open source projects offers numerous benefits: you can improve your coding skills, build your portfolio, gain real-world experience, connect with potential mentors, expand your professional network, and give back to the community. It's also a great way to practice collaboration and build your reputation in the tech industry."
    },
    {
      question: "Do I need to be an expert programmer to contribute?",
      answer: "Absolutely not! Open source projects need all kinds of contributions, not just code. You can contribute by improving documentation, fixing typos, writing tutorials, designing UI elements, translating content, reporting bugs, or helping with community support. Many projects specifically label issues as 'good first issues' or 'beginner-friendly' to help newcomers get started."
    },
    {
      question: "How do I find a project to contribute to?",
      answer: "Look for projects related to technologies you're interested in or tools you already use. Websites like goodfirstissue.dev, up-for-grabs.net, and firstcontributions.github.io list beginner-friendly issues. You can also browse GitHub repositories with tags like 'help-wanted' or 'good-first-issue'. Start with smaller contributions to build confidence before tackling larger issues."
    },
    {
      question: "What is a pull request?",
      answer: "A pull request (PR) is a way to suggest changes to a repository. When you submit a PR, you're proposing your changes and requesting that the project maintainers review, approve, and merge your contribution into their project. Pull requests allow for discussion and review of code changes before they're implemented."
    },
    {
      question: "What if my pull request isn't accepted?",
      answer: "Don't get discouraged! There are many reasons a PR might not be accepted: it might not align with the project's goals, need additional work, or the maintainers might be busy. Take any feedback constructively, make improvements if possible, and remember that the experience is valuable regardless. Every developer faces rejection sometimes—it's part of the learning process."
    },
    {
      question: "How should I communicate with project maintainers?",
      answer: "Be respectful, clear, and concise. Read the project's contribution guidelines before engaging. When opening issues or PRs, provide detailed information about what you're proposing or what problem you're solving. Be patient—many maintainers work on open source in their free time. Accept feedback graciously and respond to questions promptly."
    },
    {
      question: "What are GitHub stars and forks?",
      answer: "GitHub stars are like bookmarks or likes—users star repositories they find interesting or want to keep track of. The number of stars can indicate a project's popularity. Forks are copies of repositories that you can modify without affecting the original project. When you contribute to a project, you typically fork it, make changes in your fork, then submit a pull request to the original repository."
    },
    {
      question: "What does 'upstream' mean in Git?",
      answer: "In Git, 'upstream' typically refers to the original repository that you forked from. When you clone your fork to your local machine, your fork is usually called 'origin', while the original repository is called 'upstream'. Keeping your fork synchronized with the upstream repository helps you stay up-to-date with the latest changes from the main project."
    },
    {
      question: "How can I stay motivated while contributing?",
      answer: "Set realistic goals and celebrate small wins. Join communities like dev.to, GitHub discussions, or project-specific forums to connect with other contributors. Find projects you genuinely care about. Consider participating in programs like Hacktoberfest or Google Summer of Code. Remember that everyone starts somewhere, and consistent small contributions add up over time."
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <p className="text-lg text-gray-700 mb-8">
        Common questions and answers to help you start your open source journey with confidence.
      </p>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200"
          >
            <button
              className="w-full text-left px-6 py-4 flex items-center justify-between font-medium text-gray-900"
              onClick={() => toggleQuestion(index)}
            >
              {faq.question}
              <span className={`transform transition-transform ${openQuestionIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>
              </span>
            </button>
            
            {openQuestionIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Developer Tools Component
const DeveloperTools = () => {
  const devTools = [
    {
      name: "Git",
      description: "Distributed version control system essential for open source contribution",
      url: "https://git-scm.com/",
      category: "Version Control",
      icon: "🔄"
    },
    {
      name: "GitHub Desktop",
      description: "Simplified Git workflow with a visual interface",
      url: "https://desktop.github.com/",
      category: "Version Control",
      icon: "💻"
    },
    {
      name: "GitKraken",
      description: "Visual Git client with intuitive UI and powerful features",
      url: "https://www.gitkraken.com/",
      category: "Version Control",
      icon: "🦑"
    },
    {
      name: "Visual Studio Code",
      description: "Popular, feature-rich code editor with Git integration",
      url: "https://code.visualstudio.com/",
      category: "Code Editor",
      icon: "📝"
    },
    {
      name: "GitLens",
      description: "VS Code extension that enhances Git capabilities",
      url: "https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens",
      category: "Extension",
      icon: "🔍"
    },
    {
      name: "GitHub CLI",
      description: "Command-line tool for GitHub, bringing pull requests and issues to your terminal",
      url: "https://cli.github.com/",
      category: "CLI Tool",
      icon: "⌨️"
    },
    {
      name: "Pull Request GitHub Extension",
      description: "Browser extension to enhance PR reviews on GitHub",
      url: "https://github.com/sindresorhus/refined-github",
      category: "Extension",
      icon: "🌐"
    },
    {
      name: "Conventional Commits",
      description: "Specification for adding human and machine-readable meaning to commit messages",
      url: "https://www.conventionalcommits.org/",
      category: "Standard",
      icon: "📋"
    },
    {
      name: "Commitizen",
      description: "CLI wizard for formatting commit messages",
      url: "http://commitizen.github.io/cz-cli/",
      category: "CLI Tool",
      icon: "🧙"
    },
    {
      name: "Sourcetree",
      description: "Free Git GUI client for Windows and Mac",
      url: "https://www.sourcetreeapp.com/",
      category: "Version Control",
      icon: "🌳"
    },
    {
      name: "WakaTime",
      description: "Track your coding time and activity across projects",
      url: "https://wakatime.com/",
      category: "Productivity",
      icon: "⏱️"
    },
    {
      name: "GitHub Codespaces",
      description: "Cloud development environment integrated with GitHub",
      url: "https://github.com/features/codespaces",
      category: "Development Environment",
      icon: "☁️"
    },
    {
      name: "Prettier",
      description: "Opinionated code formatter to enforce consistent style",
      url: "https://prettier.io/",
      category: "Code Quality",
      icon: "✨"
    },
    {
      name: "ESLint",
      description: "Tool for identifying and reporting on patterns in JavaScript",
      url: "https://eslint.org/",
      category: "Code Quality",
      icon: "🔍"
    },
    {
      name: "GitHub Actions",
      description: "Automate workflows directly from your GitHub repository",
      url: "https://github.com/features/actions",
      category: "CI/CD",
      icon: "🔄"
    }
  ];

  // Group tools by category
  const toolsByCategory = devTools.reduce((acc, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Developer Tools & Setup</h2>
      <p className="text-lg text-gray-700 mb-8">
        Essential tools and software to streamline your open source contribution workflow.
        These tools will help you work more efficiently and follow best practices.
      </p>
      
      {Object.entries(toolsByCategory).map(([category, tools]) => (
        <div key={category} className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-start"
              >
                <span className="text-2xl mr-3">{tool.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{tool.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium text-blue-800 mb-3">Setting Up Your Development Environment</h3>
        <p className="text-blue-700 mb-4">
          Follow these steps to set up a standard development environment for open source contributions:
        </p>
        
        <ol className="list-decimal list-inside space-y-3 text-blue-800">
          <li className="pl-2">
            <span className="font-medium">Install Git:</span> 
            <span className="text-blue-700"> Download and install Git from <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="underline">git-scm.com</a></span>
          </li>
          <li className="pl-2">
            <span className="font-medium">Create a GitHub account:</span> 
            <span className="text-blue-700"> Sign up at <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="underline">github.com</a></span>
          </li>
          <li className="pl-2">
            <span className="font-medium">Set up SSH keys:</span> 
            <span className="text-blue-700"> For secure GitHub authentication. <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh" target="_blank" rel="noopener noreferrer" className="underline">Learn how</a></span>
          </li>
          <li className="pl-2">
            <span className="font-medium">Install a code editor:</span> 
            <span className="text-blue-700"> VS Code, Sublime Text, or Atom are popular choices</span>
          </li>
          <li className="pl-2">
            <span className="font-medium">Configure Git globally:</span> 
            <span className="text-blue-700"> Set your name and email in Git configuration</span>
          </li>
          <li className="pl-2">
            <span className="font-medium">Install language-specific tools:</span> 
            <span className="text-blue-700"> Based on projects you're interested in</span>
          </li>
          <li className="pl-2">
            <span className="font-medium">Learn basic Git commands:</span> 
            <span className="text-blue-700"> clone, branch, commit, push, pull</span>
          </li>
        </ol>
      </div>
    </motion.div>
  );
};

export default BeginnerGuide;