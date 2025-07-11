import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { X, Save, Loader, Plus, X as XIcon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreatePostModal = ({ isOpen, onClose, onPostSaved, editingPost }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    read_time: 5,
    seo_description: '',
    locale: 'en',
    status: 'draft',
    featured_image_url: ''
  });

  const [errors, setErrors] = useState({});
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewTagInput, setShowNewTagInput] = useState(false);

  // Load editing post data when provided
  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title || '',
        excerpt: editingPost.excerpt || '',
        content: editingPost.content || '',
        category: editingPost.category || '',
        tags: editingPost.tags ? (typeof editingPost.tags === 'string' ? JSON.parse(editingPost.tags) : editingPost.tags) : [],
        read_time: editingPost.read_time || 5,
        status: editingPost.status || 'draft',
        seo_description: editingPost.seo_description || '',
        featured_image_url: editingPost.featured_image_url || '',
        locale: editingPost.locale || 'en'
      });
    } else {
      resetForm();
    }
  }, [editingPost]);

  // Fetch categories and tags
  const { data: categoriesData } = useQuery('categories', async () => {
    const response = await axios.get('/api/blog/categories');
    return response.data.categories;
  });

  const { data: tagsData } = useQuery('tags', async () => {
    const response = await axios.get('/api/blog/tags');
    return response.data.tags;
  });

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 10) {
      newErrors.excerpt = 'Excerpt must be at least 10 characters';
    } else if (formData.excerpt.length > 500) {
      newErrors.excerpt = 'Excerpt must be less than 500 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    } else if (formData.category.length < 2) {
      newErrors.category = 'Category must be at least 2 characters';
    } else if (formData.category.length > 50) {
      newErrors.category = 'Category must be less than 50 characters';
    }

    if (!formData.tags.length) {
      newErrors.tags = 'At least one tag is required';
    }

    // Optional field validations
    if (formData.seo_description && formData.seo_description.length > 300) {
      newErrors.seo_description = 'SEO description must be less than 300 characters';
    }

    if (formData.featured_image_url && formData.featured_image_url.trim()) {
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(formData.featured_image_url)) {
        newErrors.featured_image_url = 'Featured image URL must be a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mutations
  const createPostMutation = useMutation(
    async (postData) => {
      const response = await axios.post('/api/blog', postData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Post created successfully!');
        queryClient.invalidateQueries('blog-posts');
        queryClient.invalidateQueries('dashboard-stats');
        if (onPostSaved) {
          onPostSaved();
        } else {
          onClose();
        }
        resetForm();
      },
      onError: (error) => {
        console.error('Error details:', error.response?.data);
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
          toast.error(errorMessages);
        } else {
          toast.error(error.response?.data?.message || error.response?.data?.error || 'Error creating post');
        }
      }
    }
  );

  const updatePostMutation = useMutation(
    async (postData) => {
      const response = await axios.put(`/api/blog/id/${editingPost.id}`, postData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Post updated successfully!');
        queryClient.invalidateQueries('blog-posts');
        queryClient.invalidateQueries('dashboard-stats');
        if (onPostSaved) {
          onPostSaved();
        } else {
          onClose();
        }
        resetForm();
      },
      onError: (error) => {
        console.error('Error details:', error.response?.data);
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
          toast.error(errorMessages);
        } else {
          toast.error(error.response?.data?.message || error.response?.data?.error || 'Error updating post');
        }
      }
    }
  );

  const createCategoryMutation = useMutation(
    async (categoryData) => {
      const response = await axios.post('/api/blog/categories', categoryData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Category created successfully!');
        queryClient.invalidateQueries('categories');
        setNewCategory('');
        setShowNewCategoryInput(false);
        setFormData(prev => ({ ...prev, category: data.category.name }));
        // Clear error when category is set
        if (errors.category) {
          setErrors(prev => ({ ...prev, category: '' }));
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to create category');
      }
    }
  );

  const createTagMutation = useMutation(
    async (tagData) => {
      const response = await axios.post('/api/blog/tags', tagData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Tag created successfully!');
        queryClient.invalidateQueries('tags');
        setNewTag('');
        setShowNewTagInput(false);
        setFormData(prev => ({ 
          ...prev, 
          tags: [...prev.tags, data.tag.name]
        }));
        // Clear error when tag is added
        if (errors.tags) {
          setErrors(prev => ({ ...prev, tags: '' }));
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to create tag');
      }
    }
  );

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      read_time: 5,
      seo_description: '',
      locale: 'en',
      status: 'draft',
      featured_image_url: ''
    });
    setErrors({});
    setNewCategory('');
    setNewTag('');
    setShowNewCategoryInput(false);
    setShowNewTagInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }
    
    const postData = {
      ...formData,
      tags: formData.tags
    };

    if (editingPost) {
      updatePostMutation.mutate(postData);
    } else {
      createPostMutation.mutate(postData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (value === 'new') {
      setShowNewCategoryInput(true);
    } else {
      setFormData(prev => ({ ...prev, category: value }));
      setShowNewCategoryInput(false);
      // Clear error when category is selected
      if (errors.category) {
        setErrors(prev => ({ ...prev, category: '' }));
      }
    }
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    if (value === 'new') {
      setShowNewTagInput(true);
    } else if (value && !formData.tags.includes(value)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, value] }));
      // Clear error when tag is added
      if (errors.tags) {
        setErrors(prev => ({ ...prev, tags: '' }));
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
    // Check if we need to show error again
    if (formData.tags.length === 1 && errors.tags) {
      setErrors(prev => ({ ...prev, tags: 'At least one tag is required' }));
    }
  };

  const handleCreateCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (newCategory.length < 2) {
      toast.error('Category must be at least 2 characters');
      return;
    }
    if (newCategory.length > 50) {
      toast.error('Category must be less than 50 characters');
      return;
    }
    createCategoryMutation.mutate({ name: newCategory.trim() });
  };

  const handleCreateTag = () => {
    if (!newTag.trim()) {
      toast.error('Tag name is required');
      return;
    }
    createTagMutation.mutate({ name: newTag.trim() });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              {!showNewCategoryInput ? (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categoriesData?.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option value="new">+ Create New Category</option>
                </select>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    disabled={createCategoryMutation.isLoading}
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
                  >
                    {createCategoryMutation.isLoading ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategoryInput(false);
                      setNewCategory('');
                    }}
                    className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags *
              </label>
              <div className="space-y-2">
                <select
                  name="tags"
                  onChange={handleTagChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.tags ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select tags</option>
                  {tagsData?.map(tag => (
                    <option key={tag.id} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
                  <option value="new">+ Create New Tag</option>
                </select>
                
                {showNewTagInput && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter new tag name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleCreateTag}
                      disabled={createTagMutation.isLoading}
                      className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
                    >
                      {createTagMutation.isLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewTagInput(false);
                        setNewTag('');
                      }}
                      className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <XIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {errors.tags && (
                <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read Time (minutes)
              </label>
              <input
                type="number"
                name="read_time"
                value={formData.read_time}
                onChange={handleChange}
                min="1"
                max="60"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                name="locale"
                value={formData.locale}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              name="featured_image_url"
              value={formData.featured_image_url}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.featured_image_url ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.featured_image_url && (
              <p className="mt-1 text-sm text-red-600">{errors.featured_image_url}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="3"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief description of the post"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Description
            </label>
            <textarea
              name="seo_description"
              value={formData.seo_description}
              onChange={handleChange}
              rows="2"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.seo_description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="SEO meta description"
            />
            {errors.seo_description && (
              <p className="mt-1 text-sm text-red-600">{errors.seo_description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="10"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your post content here. You can use HTML tags for formatting."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPostMutation.isLoading || updatePostMutation.isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {createPostMutation.isLoading || updatePostMutation.isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {editingPost ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {editingPost ? 'Update Post' : 'Create Post'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal; 