import React, { useState } from 'react';
import { FaPlus, FaLink } from 'react-icons/fa';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";

const LinkResourceManagement = ({ user }) => {
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkFormData, setLinkFormData] = useState({
    category: '',
    title: '',
    description: '',
    url: ''
  });
  
  const navigate = useNavigate();
  
  // Categories for open source links
  const linkCategories = [
    { id: 'programs', name: 'Programs' },
    { id: 'learning', name: 'Learn' },
    { id: 'tools', name: 'Tools' },
    { id: 'communities', name: 'Communities' }
  ];
  
  // Handler for form input changes
  const handleLinkFormChange = (e) => {
    const { name, value } = e.target;
    setLinkFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Submit new open source link
  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in as an admin");
      return;
    }
    
    try {
      const toastId = toast.loading('Adding new link resource...');
      
      await addDoc(collection(db, "linkResources"), {
        ...linkFormData,
        addedBy: user.email,
        createdAt: new Date()
      });
      
      toast.success('Link resource added successfully!', { id: toastId });
      setShowLinkForm(false);
      setLinkFormData({
        category: '',
        title: '',
        description: '',
        url: ''
      });
      
    } catch (error) {
      toast.error('Failed to add link resource');
      console.error('Error adding link resource: ', error);
    }
  };
  
  // View links page
  const viewLinksPage = () => {
    navigate('/links');
  };

return (
    <>
        <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-medium mb-2">Open Source Links Management <span className="font-medium text-red-600 text-sm">(Only OS Club Core members)</span></h3> 
            <p className="text-gray-600 mb-4">
                Add or manage open source links displayed on the resources page.
            </p>
            <div className="flex flex-wrap gap-3">
                <button 
                    onClick={() => setShowLinkForm(true)} 
                    className='px-6 py-2 bg-primary-100 text-black rounded-lg hover:bg-blue-300 flex items-center'
          >
             
                        <IoMdAddCircle class="text-500 mr-2"/>
                         Add
                 </button>
                <button 
                    onClick={viewLinksPage} 
                    className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center"
                >
                    <FaLink className="mr-2" />
                    View Links Page
                </button>
            </div>
        </div>
        
        {/* Link Resource Add Modal */}
        {showLinkForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Link Resource</h2>
                            <button 
                                onClick={() => setShowLinkForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <form onSubmit={handleLinkSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category*
                                </label>
                                <select
                                    name="category"
                                    value={linkFormData.category}
                                    onChange={handleLinkFormChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select a category</option>
                                    {linkCategories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Resource Title*
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={linkFormData.title}
                                    onChange={handleLinkFormChange}
                                    required
                                    placeholder="e.g., GitHub"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description*
                                </label>
                                <textarea
                                    name="description"
                                    value={linkFormData.description}
                                    onChange={handleLinkFormChange}
                                    required
                                    placeholder="Brief description of the link resource"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">
                                    Keep descriptions concise and clear, ideally under 100 characters.
                                </p>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    URL*
                                </label>
                                <input
                                    type="url"
                                    name="url"
                                    value={linkFormData.url}
                                    onChange={handleLinkFormChange}
                                    required
                                    placeholder="https://example.com"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowLinkForm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Add Link
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

export default LinkResourceManagement;