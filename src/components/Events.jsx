import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md p-12 text-center"
      >
        <div className="mx-auto max-w-lg">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-6">
            <FaCalendarAlt className="text-blue-600 text-4xl" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
          
          <p className="text-lg text-gray-600">
            <i>
            We're working on bringing exciting community events to you.
            Till then explore <a href="/projects" className="text-blue-600 underline">Projects</a>, <a href="/proposals" className="text-blue-600 underline">Propose something new</a> or Just chill with <a href="/blog" className="text-blue-600 underline">Resources</a>
            </i>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Events;