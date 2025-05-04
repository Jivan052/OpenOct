import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe, FaTags, FaUserFriends, FaTimes, FaImage } from 'react-icons/fa';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';

const ProjectSubmissionModal = ({ isOpen, onClose, user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    demoUrl: '',
    category: 'web',
    contributors: '',
    imageUrl: ''
  });
  
  // Available project categories
  const projectCategories = [
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'ai', label: 'AI/Machine Learning' },
    { value: 'education', label: 'Educational' },
    { value: 'tools', label: 'Developer Tools' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'other', label: 'Other' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in as an admin to submit projects");
      return;
    }
    
    if (!formData.imageUrl) {
      toast.error("Please provide an image URL");
      return;
    }
    
    setIsSubmitting(true);
    const toastId = toast.loading('Submitting your project...');
    
    try {
      // Format form data for database
      const projectData = {
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack.split(',').map(tech => tech.trim()),
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
        image: formData.imageUrl,
        category: formData.category,
        contributors: formData.contributors.split(',').map(contributor => contributor.trim()),
        createdAt: serverTimestamp(),
        addedBy: user.email
      };
      
      // Add project to Firestore
      await addDoc(collection(db, "projects"), projectData);
      
      toast.success('Project submitted successfully!', { id: toastId });
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        demoUrl: '',
        category: 'web',
        contributors: '',
        imageUrl: ''
      });
      
      setIsSubmitting(false);
      onClose();
      
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error('Failed to submit project', { id: toastId });
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Project</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Image URL */}
            <div className="mb-6">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Project Image URL*
              </label>
              <div className="flex items-center">
                <FaImage className="text-gray-400 mr-2" />
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/project-image.jpg"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Provide a direct URL to an image (JPEG, PNG, or GIF). For best results, use an image with a 16:9 aspect ratio.
              </p>
              
              {/* Image preview */}
              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <div className="relative h-48 w-full bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={formData.imageUrl} 
                      alt="Project preview" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the project"
              ></textarea>
            </div>

            {/* Tech Stack */}
            <div className="mb-4">
              <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">
                Tech Stack* <span className="text-xs text-gray-500">(comma separated)</span>
              </label>
              <div className="flex items-center">
                <FaTags className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, etc."
                />
              </div>
            </div>

            {/* Contributors */}
            <div className="mb-4">
              <label htmlFor="contributors" className="block text-sm font-medium text-gray-700 mb-1">
                Contributors <span className="text-xs text-gray-500">(comma separated)</span>
              </label>
              <div className="flex items-center">
                <FaUserFriends className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="contributors"
                  name="contributors"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.contributors}
                  onChange={handleChange}
                  placeholder="Your name, Contributor name, etc."
                />
              </div>
            </div>

            {/* GitHub URL */}
            <div className="mb-4">
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub URL*
              </label>
              <div className="flex items-center">
                <FaGithub className="text-gray-400 mr-2" />
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            {/* Demo URL */}
            <div className="mb-4">
              <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Demo URL
              </label>
              <div className="flex items-center">
                <FaGlobe className="text-gray-400 mr-2" />
                <input
                  type="url"
                  id="demoUrl"
                  name="demoUrl"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  placeholder="https://your-demo-site.com"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Project Category*
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.category}
                onChange={handleChange}
              >
                {projectCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectSubmissionModal;