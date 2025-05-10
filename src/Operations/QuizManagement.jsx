import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes, FaTrash, FaEdit, FaExternalLinkAlt, FaCalendarAlt, FaClock, FaQuestionCircle } from 'react-icons/fa';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const QuizManagement = () => {
  const [user] = useAuthState(auth);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    totalPoints: 100,
    questionCount: 10,
    platform: 'Google Forms',
    joinLink: '',
    scheduleDate: new Date().toISOString().split('T')[0],
    scheduleTime: '12:00',
    registrationDeadline: new Date().toISOString().split('T')[0],
    deadlineTime: '12:00',
    resourceLinks: [''],
    solutionLink: '',
    isActive: true
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const quizzesQuery = query(
        collection(db, "quizzes"),
        orderBy("scheduleDate", "desc")
      );
      
      const snapshot = await getDocs(quizzesQuery);
      const quizzesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        scheduleDate: doc.data().scheduleDate?.toDate() || new Date(),
        registrationDeadline: doc.data().registrationDeadline?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      setQuizzes(quizzesList);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Failed to load quizzes");
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

  const handleResourceLinkChange = (index, value) => {
    const updatedLinks = [...formData.resourceLinks];
    updatedLinks[index] = value;
    setFormData({
      ...formData,
      resourceLinks: updatedLinks
    });
  };

  const addResourceLink = () => {
    setFormData({
      ...formData,
      resourceLinks: [...formData.resourceLinks, '']
    });
  };

  const removeResourceLink = (index) => {
    const updatedLinks = [...formData.resourceLinks];
    updatedLinks.splice(index, 1);
    setFormData({
      ...formData,
      resourceLinks: updatedLinks
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: 60,
      totalPoints: 100,
      questionCount: 10,
      platform: 'Google Forms',
      joinLink: '',
      scheduleDate: new Date().toISOString().split('T')[0],
      scheduleTime: '12:00',
      registrationDeadline: new Date().toISOString().split('T')[0],
      deadlineTime: '12:00',
      resourceLinks: [''],
      solutionLink: '',
      isActive: true
    });
    setIsEditing(false);
    setCurrentQuiz(null);
  };

  const openModal = (quiz = null) => {
    if (quiz) {
      setIsEditing(true);
      setCurrentQuiz(quiz);
      
      // Convert date objects to string format for form inputs
      const scheduleDate = quiz.scheduleDate.toISOString().split('T')[0];
      const scheduleTime = quiz.scheduleDate.toTimeString().substring(0, 5);
      const registrationDeadline = quiz.registrationDeadline.toISOString().split('T')[0];
      const deadlineTime = quiz.registrationDeadline.toTimeString().substring(0, 5);
      
      setFormData({
        name: quiz.name,
        description: quiz.description || '',
        duration: quiz.duration || 60,
        totalPoints: quiz.totalPoints || 100,
        questionCount: quiz.questionCount || 10,
        platform: quiz.platform || 'Google Forms',
        joinLink: quiz.joinLink || '',
        scheduleDate,
        scheduleTime,
        registrationDeadline,
        deadlineTime,
        resourceLinks: quiz.resourceLinks?.length ? quiz.resourceLinks : [''],
        solutionLink: quiz.solutionLink || '',
        isActive: quiz.isActive !== undefined ? quiz.isActive : true
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
      // Combine date and time
      const scheduleDateTime = new Date(formData.scheduleDate);
      const [hours, minutes] = formData.scheduleTime.split(':');
      scheduleDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
      
      const deadlineDateTime = new Date(formData.registrationDeadline);
      const [dHours, dMinutes] = formData.deadlineTime.split(':');
      deadlineDateTime.setHours(parseInt(dHours), parseInt(dMinutes), 0);
      
      // Filter out empty resource links
      const filteredResourceLinks = formData.resourceLinks.filter(link => link.trim() !== '');
      
      // Determine if this quiz is in the past
      const isPast = scheduleDateTime < new Date();
      
      const quizData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        duration: Number(formData.duration),
        totalPoints: Number(formData.totalPoints),
        questionCount: Number(formData.questionCount),
        platform: formData.platform,
        joinLink: formData.joinLink.trim(),
        scheduleDate: Timestamp.fromDate(scheduleDateTime),
        registrationDeadline: Timestamp.fromDate(deadlineDateTime),
        resourceLinks: filteredResourceLinks,
        solutionLink: formData.solutionLink.trim(),
        status: isPast ? 'past' : scheduleDateTime > new Date() ? 'upcoming' : 'active',
        isActive: formData.isActive,
        updatedBy: user.displayName || user.email.split('@')[0],
        updatedAt: serverTimestamp()
      };
      
      if (isEditing && currentQuiz) {
        // Update existing quiz
        await updateDoc(doc(db, "quizzes", currentQuiz.id), quizData);
        toast.success("Quiz updated successfully");
      } else {
        // Create new quiz
        quizData.createdBy = user.displayName || user.email.split('@')[0];
        quizData.createdAt = serverTimestamp();
        
        await addDoc(collection(db, "quizzes"), quizData);
        toast.success("Quiz created successfully");
      }
      
      closeModal();
      fetchQuizzes();
      
    } catch (error) {
      console.error("Error saving quiz:", error);
      toast.error("Failed to save quiz");
    }
  };

  const deleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, "quizzes", quizId));
      
      // Update local state
      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
      toast.success("Quiz deleted successfully");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Determine if a quiz is past
  const isPastQuiz = (scheduleDate) => {
    return new Date(scheduleDate) < new Date();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Quiz Management</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          Create Quiz
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading quizzes...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* All Quizzes Table */}
          {quizzes.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FaCalendarAlt className="mx-auto text-gray-300 text-4xl mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No Quizzes Created Yet</h3>
              <p className="text-gray-500 mb-4">Create your first quiz to engage the community!</p>
              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Your First Quiz
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quizzes.map(quiz => {
                    const past = isPastQuiz(quiz.scheduleDate);
                    
                    return (
                      <tr key={quiz.id} className={`hover:bg-gray-50 ${past ? 'bg-gray-50' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{quiz.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(quiz.scheduleDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {quiz.platform}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            past 
                              ? 'bg-gray-100 text-gray-800'
                              : quiz.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {past ? 'Past' : quiz.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openModal(quiz)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteQuiz(quiz.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Modal for creating/editing quizzes */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Quiz Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. JavaScript Fundamentals Quiz"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="A short description of what this quiz covers"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
                      Platform*
                    </label>
                    <select
                      id="platform"
                      name="platform"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.platform}
                      onChange={handleChange}
                    >
                      <option value="Google Forms">Google Forms</option>
                      <option value="Quizizz">Quizizz</option>
                      <option value="Kahoot">Kahoot</option>
                      <option value="CodinGame">CodinGame</option>
                      <option value="HackerRank">HackerRank</option>
                      <option value="LeetCode">LeetCode</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="joinLink" className="block text-sm font-medium text-gray-700 mb-1">
                      Join Link*
                    </label>
                    <input
                      type="url"
                      id="joinLink"
                      name="joinLink"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.joinLink}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule Date*
                    </label>
                    <input
                      type="date"
                      id="scheduleDate"
                      name="scheduleDate"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.scheduleDate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule Time*
                    </label>
                    <input
                      type="time"
                      id="scheduleTime"
                      name="scheduleTime"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.scheduleTime}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Deadline Date
                    </label>
                    <input
                      type="date"
                      id="registrationDeadline"
                      name="registrationDeadline"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.registrationDeadline}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deadlineTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Deadline Time
                    </label>
                    <input
                      type="time"
                      id="deadlineTime"
                      name="deadlineTime"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.deadlineTime}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)*
                    </label>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      required
                      min="1"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="totalPoints" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Points
                    </label>
                    <input
                      type="number"
                      id="totalPoints"
                      name="totalPoints"
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.totalPoints}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      id="questionCount"
                      name="questionCount"
                      min="1"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.questionCount}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="solutionLink" className="block text-sm font-medium text-gray-700 mb-1">
                      Solution Link <span className="text-gray-500 text-xs">(for past quizzes)</span>
                    </label>
                    <input
                      type="url"
                      id="solutionLink"
                      name="solutionLink"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.solutionLink}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          id="isActive"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="isActive" className="font-medium text-gray-700">
                          Active
                        </label>
                        <p className="text-gray-500">Mark this quiz as active and visible to users</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Resource Links */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resource Links <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    
                    {formData.resourceLinks.map((link, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="url"
                          value={link}
                          onChange={(e) => handleResourceLinkChange(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
                          placeholder={`Resource ${index + 1} URL`}
                        />
                        {formData.resourceLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResourceLink(index)}
                            className="p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addResourceLink}
                      className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      + Add Resource Link
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
                    {isEditing ? 'Update Quiz' : 'Create Quiz'}
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

export default QuizManagement;