import React from 'react';
import { useQuery } from 'react-query';
import { Upload, Trash2, Download } from 'lucide-react';
import axios from 'axios';

const Media = () => {
  const { data: mediaData, isLoading, refetch } = useQuery('media', async () => {
    const response = await axios.get('/api/media');
    return response.data;
  });

  const media = mediaData?.media || [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await axios.delete(`/api/media/${id}`);
        refetch();
      } catch (error) {
        console.error('Error deleting media:', error);
      }
    }
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
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your uploaded files and images
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {media?.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No media files found. Upload your first file!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {media?.map((file) => (
                <li key={file.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {file.mime_type && file.mime_type.startsWith('image/') ? (
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={`/uploads/${file.filename}`}
                            alt={file.original_name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">FILE</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {file.original_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`/uploads/${file.filename}`}
                        download
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Media; 