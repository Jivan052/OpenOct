import BlogCard from './BlogCard';

const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: "Getting Started with Open Source",
      excerpt: "A beginner's guide to contributing to open source projects",
      image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
      date: "2024-03-15",
      category: "Guide",
      platform: "Medium",
      link: "https://medium.com/@nirespire/getting-started-with-opensource-74e963db32f5",
      author: {
        name: "Jivan Jamdar",
        avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
      }
    },
    {
      id: 2,
      title: "Best Practices for Project Documentation",
      excerpt: "Learn how to write effective documentation for your projects",
      image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
      date: "2024-03-10",
      category: "Tutorial",
      platform: "Medium",
      link: "https://medium.com/@nirespire/getting-started-with-opensource-74e963db32f5",
      author: {
        name: "Jane Smith",
        avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
      }
    },
    {
      id: 3,
      title: "Modern Web Development Trends",
      excerpt: "Exploring the latest trends in web development",
      image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
      date: "2024-03-05",
      category: "Technology",
      platform: "Medium",
      link: "https://medium.com/@nirespire/getting-started-with-opensource-74e963db32f5",
      author: {
        name: "John Doe",
        avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
      }
    },
    {
        id: 3,
        title: "Modern Web Development Trends",
        excerpt: "Exploring the latest trends in web development",
        image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
        date: "2024-03-05",
        category: "Technology",
        platform: "Medium",
        link: "https://medium.com/@nirespire/getting-started-with-opensource-74e963db32f5",
        author: {
          name: "John Doe",
          avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
        }
      },
      {
        id: 3,
        title: "Modern Web Development Trends",
        excerpt: "Exploring the latest trends in web development",
        image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
        date: "2024-03-05",
        category: "Technology",
        platform: "Medium",
        link: "https://medium.com/@nirespire/getting-started-with-opensource-74e963db32f5",
        author: {
          name: "John Doe",
          avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
        }
      },
      {
        id: 3,
        title: "Modern Web Development Trends",
        excerpt: "Exploring the latest trends in web development",
        image: "https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg",
        date: "2024-03-05",
        category: "Technology",
        platform: "Medium",
        link: "https://medium.com/@nirespire/getting-started-with-opensource-74e963db32f5",
        author: {
          name: "John Doe",
          avatar: "https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg"
        }
      },

  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;