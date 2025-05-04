import React, { useState } from 'react';
import { FaPlus, FaProjectDiagram, FaList } from 'react-icons/fa';
import ProjectSubmissionModal from './ProjectSubmissionModal';
import { useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";

const ProjectManagement = ({ user }) => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const navigate = useNavigate();
  
  // View all projects
  const viewProjects = () => {
    navigate('/project');
  };

  return (
    <div className="border-t border-gray-200 pt-6 mb-6">
      <h3 className="text-lg font-medium mb-2">Projects Management <span className="font-medium text-red-600 text-sm">(Only OS Club Core members)</span></h3>
      <p className="text-gray-600 mb-4">
        Add or manage projects that appear on the Projects Showcase page.
      </p>
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => setShowProjectForm(true)} 
            className='px-6 py-2 bg-primary-100 text-black rounded-lg hover:bg-blue-300 flex items-center'
          >
             
            <IoMdAddCircle class="text-500 mr-2"/>
            Add
        </button>
        <button 
          onClick={viewProjects} 
          className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center"
        >
          <FaProjectDiagram className="mr-2" />
          View Projects Page
        </button>
      </div>
      
      {/* Project Submission Modal */}
      <ProjectSubmissionModal 
        isOpen={showProjectForm} 
        onClose={() => setShowProjectForm(false)} 
        user={user}
      />
    </div>
  );
};

export default ProjectManagement;