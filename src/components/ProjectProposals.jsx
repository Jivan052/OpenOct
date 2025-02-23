import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { db } from '../firebase'; // Firebase config
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { BiSolidUpvote } from "react-icons/bi";

function ProjectProposals() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [proposals, setProposals] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, "proposals"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const proposalsData = [];
      querySnapshot.forEach((doc) => {
        proposalsData.push({ ...doc.data(), id: doc.id });
      });
      setProposals(proposalsData.reverse());
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (data) => {
    try {
      const createdAt = new Date();
      const expirationDate = new Date(createdAt);
      expirationDate.setDate(expirationDate.getDate() + 7);

      await addDoc(collection(db, "proposals"), { ...data, createdAt, expirationDate, upvotes: 0, downvotes: 0 });
      toast.success('Proposal submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit proposal');
      console.error('Error saving data: ', error);
    }
  };

  const handleVote = async (id, type) => {
    const voteKey = `vote_${id}`;
    const existingVote = sessionStorage.getItem(voteKey);

    if (existingVote) {
      toast.error('You have already voted on this proposal.');
      return;
    }

    try {
      const proposalRef = doc(db, "proposals", id);
      const proposal = proposals.find(p => p.id === id);
      const updatedProposal = {
        ...proposal,
        upvotes: type === 'upvote' ? proposal.upvotes + 1 : proposal.upvotes,
        downvotes: type === 'downvote' ? proposal.downvotes + 1 : proposal.downvotes
      };
      await updateDoc(proposalRef, updatedProposal);
      sessionStorage.setItem(voteKey, type);
    } catch (error) {
      toast.error('Failed to update vote');
      console.error('Error updating vote: ', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const q = query(collection(db, "proposals"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const proposal = doc.data();
        if (proposal.expirationDate.toDate() < now) {
          await deleteDoc(doc.ref);
        }
      });
    }, 24 * 60 * 60 * 1000); // Check once a day

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mt-8 mb-4">Project Proposals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
            <p className="text-gray-700 mb-4">{proposal.description}</p>
            <p className="text-gray-700 mb-4"><strong>Required Skills:</strong> {proposal.skills}</p>
            <p className="text-gray-700 mb-4"><strong>Author:</strong> {proposal.Author}</p>
            <a href={proposal.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-700 text-2xl mb-4">
              <FaGithub />
            </a>
            <br></br>
            <div className="flex items-center space-x-4">
              <button onClick={() => handleVote(proposal.id, 'upvote')} className="text-xl text-green-500 hover:text-green-700">
                <BiSolidUpvote />
              </button>
              <span>{proposal.upvotes}</span>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-8">Submit Your Project Proposal</h1>
      
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
            Required Skills
          </label>
          <input
            type="text"
            className="input"
            {...register('skills', { required: 'Skills are required' })}
          />
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Repository URL
          </label>
          <input
            type="url"
            className="input"
            {...register('repoUrl', { required: 'GitHub URL is required' })}
          />
          {errors.repoUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.repoUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author ( if many authors, separate by comma )
          </label>
          <input
            type="text"
            className="input"
            {...register('Author', { required: 'Authors are required' })}
          />
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.Author.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Submit Proposal
        </button>
      </form>
    </div>
  );
}

export default ProjectProposals;