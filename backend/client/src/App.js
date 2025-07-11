import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogPosts from './pages/BlogPosts';
import BlogPostForm from './pages/BlogPostForm';
import Media from './pages/Media';
import Users from './pages/Users';
import Settings from './pages/Settings';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<BlogPosts />} />
        <Route path="/blog/new" element={<BlogPostForm />} />
        <Route path="/blog/edit/:id" element={<BlogPostForm />} />
        <Route path="/media" element={<Media />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App; 