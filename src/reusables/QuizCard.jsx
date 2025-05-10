import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaQuestionCircle, FaTrophy, FaExternalLinkAlt } from 'react-icons/fa';

const QuizCard = ({ quiz, isPast = false }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = new Date(quiz.scheduleDate?.toDate()) > new Date();

  return (
    <motion.div 
      className={`border rounded-lg overflow-hidden shadow-sm ${
        isPast ? 'bg-gray-50' : 'bg-white'
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card Header */}
      <div className={`px-4 py-3 border-b ${
        isPast ? 'bg-gray-100' : 'bg-blue-50'
      }`}>
        <h3 className="font-semibold text-lg text-gray-800">{quiz.name}</h3>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {quiz.description && (
          <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
        )}
        
        {/* Quiz Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <span className="text-gray-700">
              {formatDate(quiz.scheduleDate?.toDate())}
            </span>
          </div>
          
          {quiz.duration && (
            <div className="flex items-center text-sm">
              <FaClock className="text-gray-400 mr-2" />
              <span className="text-gray-700">{quiz.duration} minutes</span>
            </div>
          )}
          
          {quiz.questionCount && (
            <div className="flex items-center text-sm">
              <FaQuestionCircle className="text-gray-400 mr-2" />
              <span className="text-gray-700">{quiz.questionCount} questions</span>
            </div>
          )}
          
          {quiz.totalPoints && (
            <div className="flex items-center text-sm">
              <FaTrophy className="text-gray-400 mr-2" />
              <span className="text-gray-700">{quiz.totalPoints} points</span>
            </div>
          )}
        </div>
        
        {/* Platform Badge */}
        {quiz.platform && (
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {quiz.platform}
            </span>
          </div>
        )}
        
        {/* Action Button */}
        <div className="mt-4">
          {isPast ? (
            quiz.solutionLink ? (
              <a 
                href={quiz.solutionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded"
              >
                View Solutions
                <FaExternalLinkAlt className="ml-1 text-xs" />
              </a>
            ) : (
              <div className="text-center text-sm text-gray-500">
                Solutions not available
              </div>
            )
          ) : (
            <a 
              href={quiz.joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-full font-medium py-2 px-4 rounded ${
                isUpcoming
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={isUpcoming}
            >
              {isUpcoming ? 'Coming Soon' : 'Join Quiz'}
              <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
          )}
        </div>
        
        {/* Resource Links */}
        {quiz.resourceLinks && quiz.resourceLinks.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Resources</h4>
            <ul className="space-y-1">
              {quiz.resourceLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                  >
                    Resource {index + 1}
                    <FaExternalLinkAlt className="ml-1 text-xs" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizCard;