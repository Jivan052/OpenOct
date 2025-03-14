import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { db } from '../firebase'; // Firebase config
import { collection, addDoc } from 'firebase/firestore';


function ProjectSubmission() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "projects"), data);
      toast.success('Project submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit project');
      console.error('Error saving data: ', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Submit Your Project</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Title
          </label>
          <input
            type="text"
            className="input"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="input min-h-[100px]"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            className="input"
            placeholder="React, Node.js, MongoDB"
            {...register('techStack', { required: 'Tech stack is required' })}
          />
          {errors.techStack && (
            <p className="text-red-500 text-sm mt-1">{errors.techStack.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Live Demo URL
          </label>
          <input
            type="url"
            className="input"
            {...register('demoUrl', { required: 'Demo URL is required' })}
          />
          {errors.demoUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.demoUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Repository URL
          </label>
          <input
            type="url"
            className="input"
            {...register('githubUrl', { required: 'GitHub URL is required' })}
          />
          {errors.githubUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Image URL
          </label>
          <input
            type="url"
            className="input"
            {...register('imageUrl', { required: 'Image URL is required' })}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contributors (comma-separated)
          </label>
          <input
            type="text"
            className="input"
            placeholder="Jivan Jamdar, Jane Smith"
            {...register('contributors', { required: 'Contributors are required' })}
          />
          {errors.contributors && (
            <p className="text-red-500 text-sm mt-1">{errors.contributors.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Submit Project
        </button>
      </form>
    </div>
  );
}

export default ProjectSubmission;