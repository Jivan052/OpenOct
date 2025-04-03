import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { toast } from 'react-hot-toast';
import { FaDownload, FaProjectDiagram, FaLightbulb, FaSignOutAlt, FaSync } from 'react-icons/fa';

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projectCount: 0,
    proposalCount: 0
  });
  const [refreshing, setRefreshing] = useState(false);

  // Set up real-time listeners for stats
  useEffect(() => {
    if (!user) return;
    
    setLoading(true);
    
    // Create real-time listeners for both collections
    const projectsUnsubscribe = onSnapshot(collection(db, "projects"), 
      (snapshot) => {
        setStats(prevStats => ({
          ...prevStats,
          projectCount: snapshot.size
        }));
        
        if (loading) {
          setLoading(false);
        }
      }, 
      (error) => {
        console.error("Error getting projects:", error);
        toast.error("Failed to get real-time projects updates");
        setLoading(false);
      }
    );
    
    const proposalsUnsubscribe = onSnapshot(collection(db, "proposals"), 
      (snapshot) => {
        setStats(prevStats => ({
          ...prevStats,
          proposalCount: snapshot.size
        }));
        
        if (loading) {
          setLoading(false);
        }
      }, 
      (error) => {
        console.error("Error getting proposals:", error);
        toast.error("Failed to get real-time proposals updates");
        setLoading(false);
      }
    );
    
    // Clean up listeners when component unmounts
    return () => {
      projectsUnsubscribe();
      proposalsUnsubscribe();
    };
  }, [user]);

  // Manual refresh function
  const refreshStats = async () => {
    if (!user) return;
    
    try {
      setRefreshing(true);
      
      // Get projects count
      const projectsSnapshot = await getDocs(collection(db, "projects"));
      const projectCount = projectsSnapshot.size;
      
      // Get proposals count
      const proposalsSnapshot = await getDocs(collection(db, "proposals"));
      const proposalCount = proposalsSnapshot.size;
      
      setStats({
        projectCount,
        proposalCount
      });
      
      toast.success("Statistics refreshed successfully");
    } catch (error) {
      console.error("Error refreshing stats:", error);
      toast.error("Failed to refresh statistics");
    } finally {
      setRefreshing(false);
    }
  };

  const downloadExcel = async () => {
    try {
      toast.loading('Preparing your download...');
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projects = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Format dates and arrays for Excel readability
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          techStack: Array.isArray(data.techStack) ? data.techStack.join(', ') : data.techStack,
          contributors: Array.isArray(data.contributors) ? data.contributors.join(', ') : data.contributors
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(projects);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");

      XLSX.writeFile(workbook, `projects_${Date.now()}.xlsx`);
      toast.dismiss();
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to download Excel file');
      console.error('Error downloading Excel file: ', error);
    }
  };
  
  const handleLogout = () => {
    auth.signOut();
    toast.success('Logged out successfully');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, {user.email}</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <button 
            onClick={refreshStats} 
            className="mr-2 px-4 py-2 flex items-center bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 disabled:opacity-50"
            disabled={refreshing}
          >
            <FaSync className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Stats'}
          </button>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 flex items-center bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FaProjectDiagram className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-medium">Total Projects</h2>
              {loading ? (
                <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold text-gray-800">{stats.projectCount}</p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Updates in real-time</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <FaLightbulb className="text-green-600 text-xl" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-medium">Total Proposals</h2>
              {loading ? (
                <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold text-gray-800">{stats.proposalCount}</p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Updates in real-time</p>
        </div>
      </div>
      
      {/* Actions Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Export Data</h3>
          <p className="text-gray-600 mb-4">
            Download all projects data as an Excel file for reporting or offline analysis.
          </p>
          <button 
            onClick={downloadExcel} 
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
          >
            <FaDownload className="mr-2" />
            Download Projects Excel
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <a href="/project" className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              View All Projects
            </a>
            <a href="/proposals" className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              View All Proposals
            </a>
            <a href="/profile" className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Platform Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;