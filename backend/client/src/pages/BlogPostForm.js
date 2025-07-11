import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import CreatePostModal from '../components/CreatePostModal';

const BlogPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { data: post, isLoading } = useQuery(
    ['post', id],
    async () => {
      if (isEditing) {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/blog/id/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.post;
      }
      return null;
    },
    { enabled: isEditing }
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/blog');
  };

  const handlePostSaved = () => {
    setIsModalOpen(false);
    navigate('/blog');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </button>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>

      <CreatePostModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onPostSaved={handlePostSaved}
        editingPost={isEditing ? post : null}
      />
    </div>
  );
};

export default BlogPostForm; 