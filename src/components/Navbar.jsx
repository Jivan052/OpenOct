import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaCodeCompare } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <FaCodeCompare className="text-2xl" />
            <span className='text-2xl'>OpenUp</span>
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/project" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Projects
            </Link>
            <Link to="/proposals" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Proposals
            </Link>
            <Link to="/blog" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Blogs
            </Link>
            <Link to="/login" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Admin Login
            </Link>
            <Link to="/submit" className="btn-primary">
              Submit Project
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-primary-600 hover:text-primary-700 focus:outline-none">
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <Link to="/project" className="block px-4 py-2 border-t border-gray-300 hover:bg-gray-50">
              Projects
            </Link>
            <Link to="/proposals" className="block px-4 py-2 border-t border-gray-300 hover:bg-gray-50">
              Proposals
            </Link>
            <Link to="/blog" className="block px-4 py-2 border-t border-gray-300 hover:bg-gray-50">
              Blogs
            </Link>
            <Link to="/login" className="block px-4 py-2 border-t border-gray-300 hover:bg-gray-50">
              Admin Login
            </Link>
            <Link to="/submit" className="block px-4 py-2 border-t border-gray-300 hover:bg-gray-50">
              Submit Project
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;