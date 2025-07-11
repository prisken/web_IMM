const { db } = require('./src/database/init');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');

async function testApiLogic() {
  try {
    console.log('Testing API logic...');
    
    const reqBody = {
      title: 'Unique Test Post 123',
      excerpt: 'This is a test excerpt that is long enough to meet the minimum requirement of 10 characters',
      content: 'This is test content that is long enough to meet the minimum requirement of 50 characters for the blog post creation API. This should be sufficient for testing.',
      category: 'Technology',
      tags: ['test'],
      read_time: 5,
      locale: 'en',
      status: 'draft'
    };
    
    const mockUser = {
      userId: 1,
      full_name: 'IMM Admin',
      username: 'admin'
    };
    
    console.log('Request body:', reqBody);
    console.log('Mock user:', mockUser);
    
    // Generate slug from title
    const slug = slugify(reqBody.title, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
    
    console.log('Generated slug:', slug);
    
    // Check if slug already exists
    const existingPost = await db('blog_posts')
      .where('slug', slug)
      .where('locale', reqBody.locale)
      .first();
    
    if (existingPost) {
      console.log('Slug already exists:', existingPost);
      return;
    }
    
    console.log('Slug is unique, proceeding...');
    
    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(reqBody.content, {
      allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'u', 's',
        'ul', 'ol', 'li', 'blockquote', 'code',
        'pre', 'a', 'img', 'div', 'span'
      ],
      allowedAttributes: {
        'a': ['href', 'target', 'rel'],
        'img': ['src', 'alt', 'width', 'height'],
        '*': ['class', 'id']
      }
    });
    
    console.log('Sanitized content length:', sanitizedContent.length);
    
    // Create blog post
    const insertData = {
      title: reqBody.title,
      excerpt: reqBody.excerpt,
      content: sanitizedContent,
      author: mockUser.full_name || mockUser.username,
      category: reqBody.category,
      slug,
      seo_description: reqBody.seo_description,
      read_time: reqBody.read_time,
      tags: JSON.stringify(reqBody.tags),
      featured_image_url: reqBody.featured_image_url,
      locale: reqBody.locale,
      status: reqBody.status,
      author_id: mockUser.userId,
      published_at: reqBody.status === 'published' ? new Date() : null
    };
    
    console.log('Insert data:', insertData);
    
    const [postId] = await db('blog_posts').insert(insertData);
    console.log('Successfully inserted post with ID:', postId);
    
    const newPost = await db('blog_posts').where('id', postId).first();
    console.log('Retrieved new post:', newPost);
    
  } catch (error) {
    console.error('API logic test failed:', error);
    console.error('Error stack:', error.stack);
  } finally {
    process.exit(0);
  }
}

testApiLogic(); 