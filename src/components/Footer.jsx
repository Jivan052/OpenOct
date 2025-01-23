import React from 'react';
import { FaCodeCompare, FaGithub } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">
              <FaCodeCompare className="inline-block mr-2" />
              OpenOct</h3>
            <p className="text-gray-400">Showcasing amazing projects from our community</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="/about" className="hover:text-primary-400">
              AboutUs
            </a>
            <a href="about" className="hover:text-primary-400">
              ContactUs
            </a>
            <a href="https://github.com/Jivan052/OpenOct" className="hover:text-primary-400">
              <FaGithub className="inline-block text-3xl"/>
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} OpenOct. All rights reserved by Open Source Club, PWIOI.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
