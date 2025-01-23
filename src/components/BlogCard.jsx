import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <a href={blog.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">{blog.date}</span>
            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
              {blog.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={blog.author.avatar} 
                alt={blog.author.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700">{blog.author.name}</span>
            </div>
            <span className="text-sm text-gray-500">{blog.platform}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;