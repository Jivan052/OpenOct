
// Future use: For creating indivisual blog detail page
// Author: Jivan Jamdar ( @Jivan052 ) DATE: 2021-08-25

// <Route path="/blog/:id" element={<BlogDetail />} />



import { useParams } from 'react-router-dom';
import { FaSteam } from "react-icons/fa6";

const BlogDetail = () => {
  const { id } = useParams();
  // Fetch blog data based on id
  
  return (
    <div className="container mx-auto px-4 py-20 text-center font-bold text-secondary-600">
      <FaSteam  className="inline-block text-9xl text-secondary-600"/>
      <h1 className="text-xl py-5">Work in progress...!</h1>
    </div>
  );
};

export default BlogDetail;