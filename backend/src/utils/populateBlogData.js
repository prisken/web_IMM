const { db } = require('../database/init');
const { sampleBlogPosts } = require('./sampleBlogData');
const slugify = require('slugify');

async function populateBlogData() {
  try {
    console.log('🔄 Starting blog data population...');
    
    // Check if we already have blog posts
    const existingPosts = await db('blog_posts').count('* as count').first();
    
    if (existingPosts.count > 0) {
      console.log(`📝 Found ${existingPosts.count} existing blog posts. Skipping population.`);
      return;
    }
    
    // Insert sample blog posts
    for (const postData of sampleBlogPosts) {
      // Generate slug from title
      const slug = slugify(postData.title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      
      // Check if slug already exists
      const existingPost = await db('blog_posts')
        .where('slug', slug)
        .where('locale', postData.locale)
        .first();
      
      if (existingPost) {
        console.log(`⚠️ Post with slug "${slug}" already exists, skipping...`);
        continue;
      }
      
      // Insert the blog post
      const [postId] = await db('blog_posts').insert({
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        author: 'IMM Creative Team',
        category: postData.category,
        slug: slug,
        seo_description: postData.seo_description,
        read_time: postData.read_time,
        tags: JSON.stringify(postData.tags),
        featured_image_url: postData.featured_image_url,
        locale: postData.locale,
        status: postData.status,
        author_id: 1, // Default admin user ID
        published_at: postData.status === 'published' ? new Date() : null,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      console.log(`✅ Created blog post: "${postData.title}" (ID: ${postId})`);
    }
    
    console.log('🎉 Blog data population completed successfully!');
    
    // Display summary
    const totalPosts = await db('blog_posts').count('* as count').first();
    console.log(`📊 Total blog posts in database: ${totalPosts.count}`);
    
  } catch (error) {
    console.error('❌ Error populating blog data:', error);
    throw error;
  }
}

// Run the population if this file is executed directly
if (require.main === module) {
  populateBlogData()
    .then(() => {
      console.log('✅ Blog data population script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Blog data population script failed:', error);
      process.exit(1);
    });
}

module.exports = { populateBlogData }; 