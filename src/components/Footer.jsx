import React from 'react';
import { FaCodeCompare, FaGithub } from 'react-icons/fa6';
import { FaDiscord, FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
              <FaCodeCompare className="text-blue-400" />
              OpenOct
            </h3>
            <p className="text-gray-400 mt-1">Showcasing amazing projects from our community</p>
          </div>
          
          {/* Navigation and Social Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link to="/about" className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                About Us
              </Link>
              <Link to="/about" className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                Contact Us
              </Link>
              <Link to="/feedback" className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                Feedback
              </Link>
            </div>
            
            {/* Social Links with proper aria labels */}
            <div className="flex items-center justify-center gap-4 mt-2 sm:mt-0">
              <a 
                href="https://github.com/Jivan052/OpenOct" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                <FaGithub className="text-2xl sm:text-3xl" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Discord Community"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                <FaDiscord className="text-2xl sm:text-3xl" />
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp Contact"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                <FaWhatsapp className="text-2xl sm:text-3xl" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} OpenOct. All rights reserved by Open Source Club, PWIOI.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;