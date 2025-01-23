import { Link } from 'react-router-dom';
import { FaCodeCompare } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <FaCodeCompare className="text-3xl" />
            <span className='text-2xl'>
              OpenUp</span>
          </Link>
          
          <div className="flex space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;