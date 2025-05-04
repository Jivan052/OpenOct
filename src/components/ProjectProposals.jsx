import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, getDocs, updateDoc, arrayUnion, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaGithub, FaSearch, FaFilter, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { BiSolidUpvote } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';

function ProjectProposals() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [proposals, setProposals] = useState([]);
  const [votedProposals, setVotedProposals] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Get all unique skills from proposals
  const allSkills = [...new Set(proposals.flatMap(p => 
    p.skills?.split(',').map(skill => skill.trim()) || []
  ))];
  
  // Generate a unique device ID using fingerprinting
  const getDeviceId = () => {
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      new Date().getTimezoneOffset()
    ].join('|');
    
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'device_' + Math.abs(hash).toString(16);
  };

  const deviceId = getDeviceId();

  useEffect(() => {
    const q = query(collection(db, "proposals"), orderBy("upvotes", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const proposalsData = [];
      const userVotes = {};
      
      querySnapshot.forEach((doc) => {
        const proposal = { ...doc.data(), id: doc.id };
        proposalsData.push(proposal);
        
        if (proposal.voters && proposal.voters.includes(deviceId)) {
          userVotes[proposal.id] = true;
        }
      });
      
      setProposals(proposalsData);
      setVotedProposals(userVotes);
    });

    return () => unsubscribe();
  }, [deviceId]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const createdAt = new Date();
      const expirationDate = new Date(createdAt);
      expirationDate.setDate(expirationDate.getDate() + 14); // Extend to 14 days

      await addDoc(collection(db, "proposals"), { 
        ...data, 
        createdAt, 
        expirationDate, 
        upvotes: 0, 
        downvotes: 0,
        voters: []
      });
      
      toast.success('Proposal submitted successfully!');
      reset();
      setShowForm(false); // Hide form after successful submission
    } catch (error) {
      toast.error('Failed to submit proposal');
      console.error('Error saving data: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (id, type) => {
    if (votedProposals[id]) {
      toast.error('You have already voted on this proposal');
      return;
    }

    try {
      const proposalRef = doc(db, "proposals", id);
      const proposal = proposals.find(p => p.id === id);
      
      await updateDoc(proposalRef, {
        upvotes: type === 'upvote' ? proposal.upvotes + 1 : proposal.upvotes,
        downvotes: type === 'downvote' ? proposal.downvotes + 1 : proposal.downvotes,
        voters: arrayUnion(deviceId)
      });
      
      setVotedProposals(prev => ({
        ...prev,
        [id]: true
      }));
      
      toast.success('Vote recorded!');
    } catch (error) {
      toast.error('Failed to update vote');
      console.error('Error updating vote: ', error);
    }
  };

  // Auto-delete expired proposals
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const q = query(collection(db, "proposals"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const proposal = doc.data();
        if (proposal.expirationDate.toDate() < now) {
          await deleteDoc(doc.ref);
        }
      });
    }, 24 * 60 * 60 * 1000); // Check once a day

    return () => clearInterval(interval);
  }, []);

  // Filter proposals based on search term and skill filter
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = searchTerm === '' || 
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = skillFilter === '' || 
      proposal.skills?.toLowerCase().includes(skillFilter.toLowerCase());
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-gray-800 rounded-xl text-white p-8 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Proposals</h1>
          <p className="text-lg opacity-90 mb-8">
            Browse community project ideas or submit your own. Vote for proposals you find interesting to help them gain visibility.
          </p>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            {showForm ? 'Hide Form' : 'Submit Your Proposal'}
          </button>
        </div>
      </div>

      {/* Submission Form (conditionally displayed) */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-12 bg-white rounded-xl shadow-lg"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Submit Your Project Proposal</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close form"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="A short, descriptive title for your project"
                    {...register('title', { required: 'Title is required' })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaExclamationCircle className="mr-1" /> {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe your project idea, its goals, and why it would be valuable"
                    rows="5"
                    {...register('description', { required: 'Description is required' })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaExclamationCircle className="mr-1" /> {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Skills
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g. React, Node.js, Firebase"
                      {...register('skills', { required: 'Skills are required' })}
                    />
                    {errors.skills && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FaExclamationCircle className="mr-1" /> {errors.skills.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://github.com/username/repository"
                      {...register('repoUrl', { required: 'GitHub URL is required' })}
                    />
                    {errors.repoUrl && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FaExclamationCircle className="mr-1" /> {errors.repoUrl.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author(s)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your name (or names separated by commas)"
                    {...register('Author', { required: 'Authors are required' })}
                  />
                  {errors.Author && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaExclamationCircle className="mr-1" /> {errors.Author.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)} 
                    className="px-6 py-3 mr-4 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Proposal'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search proposals..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative md:w-64">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
          >
            <option value="">Filter by skill</option>
            {allSkills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Proposal Cards */}
      {filteredProposals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProposals.map((proposal) => (
            <motion.div 
              key={proposal.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-2 flex-1">{proposal.title}</h3>
                  <div 
                    className={`flex items-center px-3 py-1 rounded-full text-sm ${
                      votedProposals[proposal.id]
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <BiSolidUpvote className="mr-1" />
                    <span>{proposal.upvotes}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-2 mb-4 line-clamp-3">{proposal.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {proposal.skills?.split(',').map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">By: {proposal.Author}</div>
                  
                  <div className="flex items-center space-x-3">
                    <a 
                      href={proposal.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-primary-600 text-xl" 
                      aria-label="GitHub Repository"
                    >
                      <FaGithub />
                    </a>
                    
                    <button 
                      onClick={() => handleVote(proposal.id, 'upvote')} 
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        votedProposals[proposal.id] 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                      }`}
                      disabled={votedProposals[proposal.id]}
                      aria-label="Upvote"
                    >
                      <BiSolidUpvote className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-lg">No proposals match your criteria</p>
          <button 
            onClick={() => {setSearchTerm(''); setSkillFilter('');}}
            className="mt-4 px-4 py-2 text-primary-600 hover:text-primary-800"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* Info Section */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-3">About Project Proposals</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Proposals are active for 14 days to gauge community interest</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Each device can only upvote a proposal once</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Popular proposals may be featured on the OpenOct homepage</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>We encourage you to create a GitHub repository with more details about your project</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectProposals;