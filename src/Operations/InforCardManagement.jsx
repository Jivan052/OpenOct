import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes, FaTrash, FaStar, FaRegStar, FaCalendarAlt, FaEdit, FaEye } from 'react-icons/fa';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import ReactMarkdown from 'react-markdown';

const InfoCardManager = () => {
  const [user] = useAuthState(auth);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    resourceUrl: '',
    category: 'general',
    publishDate: new Date().toISOString().split('T')[0],
    featured: false,
  });
  
  const categories = [
    { value: 'general', label: 'General' },
    { value: 'git', label: 'Git & GitHub' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'backend', label: 'Backend' },
    { value: 'devops', label: 'DevOps' },
    { value: 'career', label: 'Career Growth' },
    { value: 'ui', label: 'UI/UX' }
  ];

  useEffect(() => {
    fetchCards();
  }, []);
  
  const fetchCards = async () => {
    setLoading(true);
    try {
      const cardsQuery = query(
        collection(db, "infoCards"),
        orderBy("publishDate", "desc")
      );
      
      const snapshot = await getDocs(cardsQuery);
      const cardsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishDate: doc.data().publishDate?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      setCards(cardsList);
    } catch (error) {
      console.error("Error fetching info cards:", error);
      toast.error("Failed to load info cards");
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      resourceUrl: '',
      category: 'general',
      publishDate: new Date().toISOString().split('T')[0],
      featured: false
    });
    setIsEditing(false);
    setCurrentCard(null);
    setPreviewMode(false);
  };
  
  const openModal = (card = null) => {
    if (card) {
      setIsEditing(true);
      setCurrentCard(card);
      setFormData({
        title: card.title,
        content: card.content,
        resourceUrl: card.resourceUrl || '',
        category: card.category || 'general',
        publishDate: card.publishDate.toISOString().split('T')[0],
        featured: card.featured || false
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
      const cardData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        resourceUrl: formData.resourceUrl.trim(),
        category: formData.category,
        publishDate: new Date(formData.publishDate),
        featured: formData.featured,
        authorName: user.displayName || user.email.split('@')[0],
        authorAvatar: user.photoURL || '',
        viewCount: isEditing ? currentCard.viewCount : 0
      };
      
      if (isEditing && currentCard) {
        // Update existing card
        await updateDoc(doc(db, "infoCards", currentCard.id), {
          ...cardData,
          updatedAt: serverTimestamp()
        });
        
        toast.success("InfoCard updated successfully");
      } else {
        // Create new card
        await addDoc(collection(db, "infoCards"), {
          ...cardData,
          createdAt: serverTimestamp()
        });
        
        toast.success("InfoCard created successfully");
      }
      
      closeModal();
      fetchCards();
      
    } catch (error) {
      console.error("Error saving info card:", error);
      toast.error("Failed to save info card");
    }
  };
  
  const toggleFeatured = async (card) => {
    try {
      await updateDoc(doc(db, "infoCards", card.id), {
        featured: !card.featured
      });
      
      // Update local state
      setCards(cards.map(c => {
        if (c.id === card.id) {
          return { ...c, featured: !c.featured };
        }
        return c;
      }));
      
      toast.success(`Card ${card.featured ? 'unfeatured' : 'featured'} successfully`);
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("Failed to update card");
    }
  };
  
  const deleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this InfoCard? This action cannot be undone.")) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, "infoCards", cardId));
      
      // Update local state
      setCards(cards.filter(card => card.id !== cardId));
      toast.success("InfoCard deleted successfully");
    } catch (error) {
      console.error("Error deleting info card:", error);
      toast.error("Failed to delete info card");
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">InfoCard Management</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          Create InfoCard
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading InfoCards...</p>
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaCalendarAlt className="mx-auto text-gray-300 text-4xl mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No InfoCards Created Yet</h3>
          <p className="text-gray-500 mb-6">Start by creating your first daily knowledge snippet!</p>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Your First InfoCard
          </button>
        </div>
      ) : (
        <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publish Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <FaEye className="inline mr-1" /> Views
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cards.map(card => (
                <tr key={card.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {card.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs mr-2 px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                      <span className="font-medium text-gray-900 truncate max-w-xs">
                        {card.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {card.category || 'general'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.publishDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.viewCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(card)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => toggleFeatured(card)}
                      className={`${card.featured ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600 mr-4`}
                    >
                      {card.featured ? <FaStar /> : <FaRegStar />}
                    </button>
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal for creating/editing InfoCards */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                {isEditing ? 'Edit InfoCard' : 'Create New InfoCard'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    previewMode 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {previewMode ? 'Edit Content' : 'Preview'}
                </button>
              </div>
              
              {previewMode ? (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h1 className="text-xl font-bold mb-4">{formData.title || 'Untitled Card'}</h1>
                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {formData.content || '*No content provided*'}
                    </ReactMarkdown>
                  </div>
                  {formData.resourceUrl && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a 
                        href={formData.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        Learn more
                        <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title*
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Understanding Git Rebasing"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content* <span className="text-gray-500 text-xs">(Markdown supported)</span>
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        required
                        rows="8"
                        className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Explain the concept in a clear, concise way. Use markdown for formatting."
                      ></textarea>
                      <div className="text-xs text-gray-500 mt-1">
                        <span className="font-medium">Tip:</span> Keep it brief and focused on one concept. Aim for 2-3 paragraphs maximum.
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="resourceUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        Resource URL <span className="text-gray-500 text-xs">(optional)</span>
                      </label>
                      <input
                        type="url"
                        id="resourceUrl"
                        name="resourceUrl"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.resourceUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/detailed-article"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Link to a resource where users can learn more about this topic
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category*
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
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Publish Date*
                        </label>
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          <input
                            type="date"
                            id="publishDate"
                            name="publishDate"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.publishDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          name="featured"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={formData.featured}
                          onChange={handleChange}
                        />
                        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                          Feature this InfoCard
                        </label>
                      </div>
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
                      {isEditing ? 'Update InfoCard' : 'Create InfoCard'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InfoCardManager;