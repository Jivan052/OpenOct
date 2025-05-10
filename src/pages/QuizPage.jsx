import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaChevronDown, FaChevronUp, FaPuzzlePiece, FaHistory } from 'react-icons/fa';
import QuizCard from '../reusables/QuizCard';

const QuizPage = () => {
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const [pastQuizzes, setPastQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllPast, setShowAllPast] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const quizzesQuery = query(
          collection(db, "quizzes"),
          orderBy("scheduleDate", "desc")
        );
        
        const snapshot = await getDocs(quizzesQuery);
        
        const now = new Date();
        const active = [];
        const past = [];
        
        snapshot.forEach(doc => {
          const quiz = {
            id: doc.id,
            ...doc.data(),
            scheduleDate: doc.data().scheduleDate,
            registrationDeadline: doc.data().registrationDeadline,
          };
          
          // Check if this is a past quiz
          if (quiz.scheduleDate.toDate() < now) {
            past.push(quiz);
          } else {
            active.push(quiz);
          }
        });
        
        // Sort active quizzes by nearest date
        active.sort((a, b) => a.scheduleDate.toDate() - b.scheduleDate.toDate());
        
        setActiveQuizzes(active);
        setPastQuizzes(past);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, []);

  const pastQuizzesToShow = showAllPast ? pastQuizzes : pastQuizzes.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              OpenOct Quizzes
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
          Not just coding — tackle challenges in web dev, Git, DBMS, math, data science, system design, and more.
🎯 Compete. Learn. Dominate.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading quizzes...</p>
            </div>
          ) : (
            <>
              {/* Upcoming & Active Quizzes */}
              <section className="mb-12">
                <div className="flex items-center mb-6">
                  <FaPuzzlePiece className="text-blue-500 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-800">Upcoming & Active Quizzes</h2>
                </div>
                
                {activeQuizzes.length === 0 ? (
                  <div className="bg-white rounded-lg p-6 text-center">
                    <p className="text-gray-500">No active or upcoming quizzes at the moment.</p>
                    <p className="text-sm text-gray-400 mt-1">Check back soon for new challenges!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeQuizzes.map(quiz => (
                      <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                  </div>
                )}
              </section>
              
              {/* Past Quizzes */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaHistory className="text-gray-500 mr-2" />
                    <h2 className="text-2xl font-semibold text-gray-800">Past Quizzes</h2>
                  </div>
                  
                  {pastQuizzes.length > 3 && (
                    <button 
                      onClick={() => setShowAllPast(!showAllPast)}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                    >
                      {showAllPast ? (
                        <>Show less <FaChevronUp className="ml-1" /></>
                      ) : (
                        <>Show all <FaChevronDown className="ml-1" /></>
                      )}
                    </button>
                  )}
                </div>
                
                {pastQuizzes.length === 0 ? (
                  <div className="bg-white rounded-lg p-6 text-center">
                    <p className="text-gray-500">No past quizzes yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Join our upcoming quizzes!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastQuizzesToShow.map(quiz => (
                      <QuizCard key={quiz.id} quiz={quiz} isPast={true} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;