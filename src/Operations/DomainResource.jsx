import React, { useState } from 'react';
import { FaPlus, FaGlobe } from 'react-icons/fa';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";

const DomainResource = ({ user }) => {
  const [showDomainForm, setShowDomainForm] = useState(false);
  const [domainFormData, setDomainFormData] = useState({
    domain: '',
    title: '',
    description: '',
    type: '',
    url: '',
    featured: false
  });
  
  const navigate = useNavigate();
  
  // Handler for form input changes
  const handleDomainFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDomainFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Submit new domain resource
  const handleDomainSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in as an admin");
      return;
    }
    
    try {
      const toastId = toast.loading('Adding new resource...');
      
      await addDoc(collection(db, "domainResources"), {
        ...domainFormData,
        addedBy: user.email,
        createdAt: new Date()
      });
      
      toast.success('Resource added successfully!', { id: toastId });
      setShowDomainForm(false);
      setDomainFormData({
        domain: '',
        title: '',
        description: '',
        type: '',
        url: '',
        featured: false
      });
      
    } catch (error) {
      toast.error('Failed to add resource');
      console.error('Error adding resource: ', error);
    }
  };
  
  // View domain resources
  const viewDomainResources = () => {
    navigate('/opendomain');
  };

  return (
    <>
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-medium mb-2">Domain Resources Management <span className="font-medium text-green-600 text-sm">(Open for all authorized contributors)</span></h3>
        <p className="text-gray-600 mb-4">
          Add or manage learning resources that appear on the Domain Resources page.
        </p>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowDomainForm(true)} 
            className='px-6 py-2 bg-primary-100 text-black rounded-lg hover:bg-blue-300 flex items-center'
          >
             
            <IoMdAddCircle class="text-500 mr-2"/>
            Add
          </button>
          <button 
            onClick={viewDomainResources} 
            className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center"
          >
            <FaGlobe className="mr-2" />
            View Resources Page
          </button>
        </div>
      </div>
      
      {/* Resource Add/Edit Modal */}
      {showDomainForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Resource</h2>
                <button 
                  onClick={() => setShowDomainForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleDomainSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domain Category*
                  </label>
                  <select
                    name="domain"
                    value={domainFormData.domain}
                    onChange={handleDomainFormChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a domain</option>
                    <option value="webdev">Web Development</option>
                    <option value="datascience">Data Science</option>
                    <option value="softwaredev">Software Development</option>
                    <option value="systemdesign">System Design</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="ai">AI & Machine Learning</option>
                    <option value="database">Database Systems</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resource Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={domainFormData.title}
                    onChange={handleDomainFormChange}
                    required
                    placeholder="e.g., MDN Web Docs"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    value={domainFormData.description}
                    onChange={handleDomainFormChange}
                    required
                    placeholder="Brief description of the resource"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resource Type*
                  </label>
                  <select
                    name="type"
                    value={domainFormData.type}
                    onChange={handleDomainFormChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a type</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Course">Course</option>
                    <option value="Book">Book</option>
                    <option value="Video">Video</option>
                    <option value="Blog">Blog</option>
                    <option value="Tool">Tool</option>
                    <option value="Resource">Resource</option>
                    <option value="Challenge">Challenge</option>
                    <option value="Interactive">Interactive</option>
                    <option value="Guide">Guide</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL*
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={domainFormData.url}
                    onChange={handleDomainFormChange}
                    required
                    placeholder="https://example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={domainFormData.featured}
                      onChange={handleDomainFormChange}
                      className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                      Mark as featured resource
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Featured resources are highlighted and shown at the top of their category.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDomainForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DomainResource;