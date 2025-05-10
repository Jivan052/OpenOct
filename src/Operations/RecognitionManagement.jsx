import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes, FaTrash, FaEdit, FaLink, FaUserAlt, FaTools, FaCode, FaProjectDiagram, FaPuzzlePiece, FaUsers } from 'react-icons/fa';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const RecognitionManagement = () => {
  const [user] = useAuthState(auth);
  const [recognitions, setRecognitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecognition, setCurrentRecognition] = useState(null);
  
  const [formData, setFormData] = useState({
    category: 'contributor',
    name: '',
    tagline: '',
    description: '',
    photoUrl: '',
    links: [{ label: '', url: '' }]
  });

  const categories = [
    { id: 'contributor', label: 'Contributor of the Month', icon: <FaUserAlt className="text-yellow-500" /> },
    { id: 'maintainer', label: 'Maintainer of the Month', icon: <FaTools className="text-blue-500" /> },
    { id: 'developer', label: 'Developer of the Month', icon: <FaCode className="text-green-500" /> },
    { id: 'project', label: 'Project of the Month', icon: <FaProjectDiagram className="text-purple-500" /> },
    { id: 'quiz', label: 'Quiz Conqueror of the Month', icon: <FaPuzzlePiece className="text-red-500" /> },
    { id: 'member', label: 'Club Member of the Month', icon: <FaUsers className="text-indigo-500" /> }
  ];

  useEffect(() => {
    fetchRecognitions();
  }, []);

  const fetchRecognitions = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "recognitions"));
      const recognitionsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setRecognitions(recognitionsList);
    } catch (error) {
      console.error("Error fetching recognitions:", error);
      toast.error("Failed to load recognitions");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      links: updatedLinks
    });
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { label: '', url: '' }]
    });
  };

  const removeLink = (index) => {
    const updatedLinks = [...formData.links];
    updatedLinks.splice(index, 1);
    setFormData({
      ...formData,
      links: updatedLinks
    });
  };

  const resetForm = () => {
    setFormData({
      category: 'contributor',
      name: '',
      tagline: '',
      description: '',
      photoUrl: '',
      links: [{ label: '', url: '' }]
    });
    setIsEditing(false);
    setCurrentRecognition(null);
  };

  const openModal = (recognition = null) => {
    if (recognition) {
      setIsEditing(true);
      setCurrentRecognition(recognition);
      setFormData({
        category: recognition.category,
        name: recognition.name,
        tagline: recognition.tagline || '',
        description: recognition.description || '',
        photoUrl: recognition.photoUrl || '',
        links: recognition.links?.length ? recognition.links : [{ label: '', url: '' }]
      });
    } else {
      resetForm();
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in as an admin");
      return;
    }
    
    try {
      // Filter out empty links
      const filteredLinks = formData.links.filter(link => link.url.trim() !== '');
      
      const recognitionData = {
        category: formData.category,
        name: formData.name.trim(),
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        photoUrl: formData.photoUrl.trim(),
        links: filteredLinks,
        updatedBy: user.displayName || user.email,
        updatedAt: serverTimestamp()
      };
      
      // Check if an award for this category already exists
      const existingAwardIndex = recognitions.findIndex(
        r => r.category === formData.category && r.id !== (currentRecognition?.id || '')
      );
      
      if (existingAwardIndex >= 0 && !isEditing) {
        const confirmReplace = window.confirm(
          `An award for "${categories.find(c => c.id === formData.category)?.label}" already exists. Do you want to replace it?`
        );
        
        if (!confirmReplace) return;
        
        // Delete the existing award
        await deleteDoc(doc(db, "recognitions", recognitions[existingAwardIndex].id));
      }
      
      if (isEditing && currentRecognition) {
        // Update existing recognition
        await updateDoc(doc(db, "recognitions", currentRecognition.id), recognitionData);
        toast.success("Recognition updated successfully");
      } else {
        // Create new recognition
        recognitionData.createdBy = user.displayName || user.email;
        recognitionData.createdAt = serverTimestamp();
        
        await addDoc(collection(db, "recognitions"), recognitionData);
        toast.success("Recognition created successfully");
      }
      
      closeModal();
      fetchRecognitions();
      
    } catch (error) {
      console.error("Error saving recognition:", error);
      toast.error("Failed to save recognition");
    }
  };

  const deleteRecognition = async (recognitionId) => {
    if (!window.confirm("Are you sure you want to delete this recognition? This action cannot be undone.")) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, "recognitions", recognitionId));
      
      // Update local state
      setRecognitions(recognitions.filter(recognition => recognition.id !== recognitionId));
      toast.success("Recognition deleted successfully");
    } catch (error) {
      console.error("Error deleting recognition:", error);
      toast.error("Failed to delete recognition");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recognition Management</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Recognition
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading recognitions...</p>
        </div>
      ) : recognitions.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <FaUsers className="mx-auto text-gray-300 text-4xl mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No Recognitions Added Yet</h3>
          <p className="text-gray-500 mb-4">Start by adding recognition for outstanding community members!</p>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add First Recognition
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {categories.map(category => {
            const award = recognitions.find(r => r.category === category.id);
            
            return (
              <div key={category.id} className="border rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b">
                  <div className="flex items-center">
                    {category.icon}
                    <h3 className="ml-2 font-medium text-gray-800">{category.label}</h3>
                  </div>
                  
                  {award ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(award)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteRecognition(award.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        resetForm();
                        setFormData(prev => ({ ...prev, category: category.id }));
                        openModal();
                      }}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                    >
                      Assign
                    </button>
                  )}
                </div>
                
                {award ? (
                  <div className="p-4">
                    <div className="flex items-center">
                      {award.photoUrl ? (
                        <img 
                          src={award.photoUrl} 
                          alt={award.name} 
                          className="h-12 w-12 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(award.name)}&size=32&background=random`;
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUserAlt className="text-gray-400" />
                        </div>
                      )}
                      <div className="ml-3">
                        <div className="font-medium">{award.name}</div>
                        {award.tagline && (
                          <div className="text-sm text-gray-500">{award.tagline}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No recipient selected for this category yet
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Modal for creating/editing recognitions */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                {isEditing 
                  ? `Edit ${categories.find(c => c.id === formData.category)?.label}` 
                  : `Add ${categories.find(c => c.id === formData.category)?.label}`}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Award Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jane Smith"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                      Tagline/Title <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="tagline"
                      name="tagline"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.tagline}
                      onChange={handleChange}
                      placeholder="e.g. Full Stack Developer at Company X"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Photo URL <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="photoUrl"
                      name="photoUrl"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.photoUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Explain why this person/project deserves recognition..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Related Links <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    
                    {formData.links.map((link, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <FaLink className="text-gray-400 mr-2" />
                        <div className="grid grid-cols-3 gap-2 flex-grow">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                            className="col-span-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Label"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                            className="col-span-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                        {formData.links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLink(index)}
                            className="ml-2 p-1 text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addLink}
                      className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add Link
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isEditing ? 'Update Recognition' : 'Create Recognition'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RecognitionManagement;