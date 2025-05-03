import React, { useState } from 'react';
import { FaPlus, FaProjectDiagram } from 'react-icons/fa';
import ProjectSubmission from '../components/ProjectSubmission';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = ({ user }) => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const navigate = useNavigate();
  
  // View all projects
  const viewProjects = () => {
    navigate('/project');
  };

  return (
    <>
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-medium mb-2">Projects Management</h3>
        <p className="text-gray-600 mb-4">
          Add or manage projects that appear on the Projects Showcase page.
        </p>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowProjectForm(true)} 
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add New Project
          </button>
          <button 
            onClick={viewProjects} 
            className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center"
          >
            <FaProjectDiagram className="mr-2" />
            View Projects Page
          </button>
        </div>
      </div>
      
      {/* Project Submission Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Add New Project</h2>
                <button 
                  onClick={() => setShowProjectForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <ProjectSubmission 
                user={user} 
                onClose={() => setShowProjectForm(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectManagement;