import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCalendarDay, FaBookmark, FaUser } from 'react-icons/fa';
import { collection, query, where, orderBy, limit, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

const InfoCard = ({ featured = false }) => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchInfoCard = async () => {
      setLoading(true);
      try {
        // Query for today's card or the most recent one
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let infoCardQuery;
        
        if (featured) {
          // Get featured card
          infoCardQuery = query(
            collection(db, "infoCards"),
            where("featured", "==", true),
            orderBy("publishDate", "desc"),
            limit(1)
          );
        } else {
          // Get card for today or most recent
          infoCardQuery = query(
            collection(db, "infoCards"),
            where("publishDate", "<=", today),
            orderBy("publishDate", "desc"),
            limit(1)
          );
        }
        
        const snapshot = await getDocs(infoCardQuery);
        
        if (!snapshot.empty) {
          const cardDoc = snapshot.docs[0];
          const cardData = {
            id: cardDoc.id,
            ...cardDoc.data(),
            publishDate: cardDoc.data().publishDate?.toDate() || new Date()
          };
          
          setCard(cardData);
          
          // Increment view count
          await updateDoc(doc(db, "infoCards", cardDoc.id), {
            viewCount: increment(1)
          });
        }
      } catch (error) {
        console.error("Error fetching InfoCard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfoCard();
  }, [featured]);
  
  const handleSave = () => {
    // In a real app, you'd save this to the user's bookmarks collection
    setSaved(!saved);
    toast.success(saved ? "Removed from your saved cards" : "Saved to your collection");
  };
  
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-4 h-64 animate-pulse"
      >
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded-full w-8"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </motion.div>
    );
  }
  
  if (!card) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-6 text-center"
      >
        <FaCalendarDay className="mx-auto text-gray-300 text-3xl mb-3" />
        <h3 className="text-gray-700 font-medium mb-1">No InfoCard Available</h3>
        <p className="text-gray-500 text-sm">Check back tomorrow for a new learning snippet!</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden relative"
    >
      {featured && (
        <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
          Featured
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {card.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaCalendarDay className="mr-1" />
              <span>
                {card.publishDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            className={`p-2 rounded-full ${saved ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            aria-label={saved ? "Unsave card" : "Save card"}
          >
            <FaBookmark />
          </button>
        </div>
        
        <div className="prose prose-sm max-w-none mb-4 text-gray-600">
          <ReactMarkdown>
            {card.content}
          </ReactMarkdown>
        </div>
        
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {card.authorAvatar ? (
                <img 
                  src={card.authorAvatar} 
                  alt={card.authorName}
                  className="w-8 h-8 rounded-full mr-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(card.authorName)}&background=random`;
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                  <FaUser className="text-gray-400 text-xs" />
                </div>
              )}
              <span className="text-sm text-gray-600">{card.authorName}</span>
            </div>
            
            {card.resourceUrl && (
              <a 
                href={card.resourceUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Learn more
                <FaExternalLinkAlt className="ml-1 text-xs" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoCard;