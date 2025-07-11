# Blog Management Guide - Admin Panel

## Overview
The admin panel now includes comprehensive blog management features for editing draft and archived posts to get them ready for publishing.

## New Admin API Endpoints

### 1. Get All Blog Posts (Admin)
```
GET /api/admin/blog-posts
```
**Query Parameters:**
- `status` - Filter by status: `draft`, `published`, `archived`, or `all`
- `page` - Page number (default: 1)
- `limit` - Posts per page (default: 20)
- `search` - Search in title, excerpt, or content
- `category` - Filter by category
- `locale` - Language filter: `en` or `zh` (default: `en`)

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5001/api/admin/blog-posts?status=draft&locale=en"
```

### 2. Get Draft and Archived Posts
```
GET /api/admin/blog-posts/drafts
```
**Query Parameters:**
- `locale` - Language filter: `en` or `zh` (default: `en`)

**Response:**
```json
{
  "drafts": [
    {
      "id": 1,
      "title": "Draft Post Title",
      "excerpt": "Post excerpt...",
      "content": "Post content...",
      "status": "draft",
      "category": "Technology",
      "tags": ["tech", "innovation"],
      "created_at": "2025-07-11T21:00:00.000Z",
      "updated_at": "2025-07-11T21:00:00.000Z"
    }
  ],
  "archived": [
    {
      "id": 2,
      "title": "Archived Post Title",
      "status": "archived",
      // ... other fields
    }
  ]
}
```

### 3. Get Single Blog Post for Editing
```
GET /api/admin/blog-posts/:id
```
**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5001/api/admin/blog-posts/1"
```

### 4. Update Blog Post Status
```
PATCH /api/admin/blog-posts/:id/status
```
**Request Body:**
```json
{
  "status": "published"
}
```
**Status Options:**
- `draft` - Save as draft
- `published` - Publish the post
- `archived` - Archive the post

**Example:**
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "published"}' \
  "http://localhost:5001/api/admin/blog-posts/1/status"
```

### 5. Bulk Update Blog Posts Status
```
PATCH /api/admin/blog-posts/bulk-status
```
**Request Body:**
```json
{
  "postIds": [1, 2, 3],
  "status": "published"
}
```

### 6. Get Blog Categories (Admin)
```
GET /api/admin/blog-categories
```
**Query Parameters:**
- `locale` - Language filter: `en` or `zh` (default: `en`)

### 7. Get Blog Tags (Admin)
```
GET /api/admin/blog-tags
```
**Query Parameters:**
- `locale` - Language filter: `en` or `zh` (default: `en`)

## Using the Existing Blog Update Endpoint

The existing blog update endpoint can also be used for editing posts:

```
PUT /api/blog/id/:id
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "excerpt": "Updated excerpt",
  "content": "Updated content with HTML",
  "category": "Technology",
  "tags": ["tech", "innovation"],
  "status": "published",
  "featured_image_url": "https://example.com/image.jpg",
  "seo_description": "SEO description",
  "read_time": 5
}
```

## Workflow for Managing Draft/Archived Posts

### 1. View Draft and Archived Posts
```bash
# Get all draft posts
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5001/api/admin/blog-posts?status=draft"

# Get all archived posts
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5001/api/admin/blog-posts?status=archived"
```

### 2. Edit a Draft Post
```bash
# Get the post for editing
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5001/api/admin/blog-posts/1"

# Update the post content
curl -X PUT \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content...",
    "status": "published"
  }' \
  "http://localhost:5001/api/blog/id/1"
```

### 3. Publish a Draft Post
```bash
# Change status to published
curl -X PATCH \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "published"}' \
  "http://localhost:5001/api/admin/blog-posts/1/status"
```

### 4. Archive a Published Post
```bash
# Change status to archived
curl -X PATCH \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "archived"}' \
  "http://localhost:5001/api/admin/blog-posts/1/status"
```

## Authentication

All admin endpoints require authentication. Include the JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:5001/api/admin/blog-posts"
```

## Current Blog Posts Status

Based on the database, you currently have:
- **8 published posts** (visible on the public blog)
- **2 draft posts** (only visible in admin panel)
- **0 archived posts**

## Testing the New Features

1. **View all posts in admin:**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     "http://localhost:5001/api/admin/blog-posts?status=all"
   ```

2. **View only drafts:**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     "http://localhost:5001/api/admin/blog-posts?status=draft"
   ```

3. **Get draft and archived posts:**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     "http://localhost:5001/api/admin/blog-posts/drafts"
   ```

## Admin Panel Access

Access the admin panel at: `http://localhost:5001/admin`

The admin panel provides a web interface for managing all blog posts, including:
- Viewing all posts with status filters
- Editing post content
- Changing post status (draft → published → archived)
- Bulk operations on multiple posts

## Features Summary

✅ **New Admin Routes Added:**
- Get all blog posts with filtering
- Get draft and archived posts specifically
- Get single post for editing
- Update post status (publish/archive)
- Bulk status updates
- Get categories and tags for admin

✅ **Existing Features Enhanced:**
- Blog post editing via PUT `/api/blog/id/:id`
- Status management with automatic `published_at` timestamp
- HTML content sanitization
- Tag and category management

✅ **Workflow Support:**
- Draft → Published workflow
- Published → Archived workflow
- Bulk operations for efficiency
- Search and filtering capabilities

The backend now provides a complete blog management system for editing draft and archived posts to get them ready for publishing! 