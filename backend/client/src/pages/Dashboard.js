import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FileText, Image, Users, Download } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import CreatePostModal from '../components/CreatePostModal';
import UploadMediaModal from '../components/UploadMediaModal';

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);
  
  const { data: stats, isLoading } = useQuery('dashboard-stats', async () => {
    const response = await axios.get('/api/admin/stats');
    return response.data;
  });

  const importMutation = useMutation(
    async () => {
      const response = await axios.post('/api/admin/import-data');
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries('dashboard-stats');
        } else {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        toast.error('Failed to import data');
      }
    }
  );

  const cards = [
    {
      name: 'Total Posts',
      value: stats?.totalPosts || 0,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: 'Published Posts',
      value: stats?.publishedPosts || 0,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      name: 'Total Media',
      value: stats?.totalMedia || 0,
      icon: Image,
      color: 'bg-purple-500',
    },
    {
      name: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your blog management dashboard</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center h-8 w-8 rounded-md ${card.color} text-white`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                No recent activity to display.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-4 space-y-3">
              <button 
                onClick={() => setIsCreatePostModalOpen(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                Create New Post
              </button>
              <button 
                onClick={() => setIsUploadMediaModalOpen(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Image className="mr-2 h-4 w-4" />
                Upload Media
              </button>
              <button 
                onClick={() => importMutation.mutate()}
                disabled={importMutation.isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 disabled:opacity-50"
              >
                <Download className="mr-2 h-4 w-4" />
                {importMutation.isLoading ? 'Importing...' : 'Import Website Data'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal 
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
      <UploadMediaModal 
        isOpen={isUploadMediaModalOpen}
        onClose={() => setIsUploadMediaModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard; 