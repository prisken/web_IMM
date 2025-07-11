import React from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your application settings
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              General Settings
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">
                  Site Name
                </label>
                <input
                  type="text"
                  name="site_name"
                  id="site_name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="IMM Blog CRM"
                />
              </div>

              <div>
                <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">
                  Site Description
                </label>
                <textarea
                  name="site_description"
                  id="site_description"
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="Professional blog management system"
                />
              </div>

              <div>
                <label htmlFor="admin_email" className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="admin_email"
                  id="admin_email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="admin@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Blog Settings
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="posts_per_page" className="block text-sm font-medium text-gray-700">
                  Posts per Page
                </label>
                <input
                  type="number"
                  name="posts_per_page"
                  id="posts_per_page"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue={10}
                />
              </div>

              <div>
                <label htmlFor="default_status" className="block text-sm font-medium text-gray-700">
                  Default Post Status
                </label>
                <select
                  name="default_status"
                  id="default_status"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="draft"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Media Settings
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="max_file_size" className="block text-sm font-medium text-gray-700">
                  Maximum File Size (MB)
                </label>
                <input
                  type="number"
                  name="max_file_size"
                  id="max_file_size"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue={10}
                />
              </div>

              <div>
                <label htmlFor="allowed_types" className="block text-sm font-medium text-gray-700">
                  Allowed File Types
                </label>
                <input
                  type="text"
                  name="allowed_types"
                  id="allowed_types"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="jpg,jpeg,png,gif,pdf,doc,docx"
                  placeholder="jpg,jpeg,png,gif,pdf,doc,docx"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 