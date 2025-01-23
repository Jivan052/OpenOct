import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [user] = useAuthState(auth);

  const downloadExcel = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projects = querySnapshot.docs.map(doc => doc.data());

      const worksheet = XLSX.utils.json_to_sheet(projects);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");

      XLSX.writeFile(workbook, `projects_${Date.now()}.xlsx`);
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download Excel file');
      console.error('Error downloading Excel file: ', error);
    }
  };

  if (!user) {
    return <p className="text-xl mt-10">Please log in to view this page...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={downloadExcel} className="btn-primary mt-5">
        Download Excel
      </button>
    </div>
  );
};

export default ProfilePage;