import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { FaLink, FaArrowRight } from 'react-icons/fa';



const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: "Getting Started with Open Source",
      excerpt: "A beginner's guide to contributing to open source projects",
      image: "https://miro.medium.com/v2/resize:fit:2000/format:webp/0*bsb4aUtPqQ_6ugFB",
      date: "2024-03-15",
      category: "Guide",
      platform: "Medium",
      link: "https://medium.com/@nirespire/getting-started-with-opensource-74e963db32f5",
      author: {
        name: "Sanjay Nair",
        avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
      }
    },
    {
      id: 2,
      title: "Best Practices for Project Documentation",
      excerpt: "Learn how to write effective documentation for your projects",
      image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*ytZ5s98ULeTbpofOb4zk7A.jpeg",
      date: "2024-03-10",
      category: "Tutorial",
      platform: "Medium",
      link: "https://medium.com/@Anita-ihuman/contributing-to-open-source-documentation-as-a-technical-writer-ddac83a7c7d1",
      author: {
        name: "Anita Ihuman",
        avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
      }
    },
    {
      id: 3,
      title: "Modern Web Development Trends",
      excerpt: "Exploring the latest trends in web development",
      image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20201026224623/Top-10-Web-Development-Trends-for-2020.png",
      date: "2024-03-05",
      category: "Webdevelopment",
      platform: "GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/top-web-development-trends/",
      author: {
        name: "Yep",
        avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
      }
    },

  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section with Title and Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
      </div>
      
      {/* Resource Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-10 shadow-sm border border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-blue-800">Open Source Resources</h2>
            <p className="text-blue-600 mt-1">
              Discover tools, programs, and learning materials for your open source journey
            </p>
          </div>
          <Link 
            to="/links" 
            className="px-5 py-2 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex items-center whitespace-nowrap"
          >
            Visit Resource Collection
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
      

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-10 shadow-sm border border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-blue-800">Open Domain Reosurces</h2>
            <p className="text-blue-600 mt-1">
              Discover tools, programs, and learning materials for your open source journey
            </p>
          </div>
          <Link 
            to="/opendomain" 
            className="px-5 py-2 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex items-center whitespace-nowrap"
          >
            Visit domain Resource Collection
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
      
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;