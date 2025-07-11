const { db } = require('./src/database/init');

async function testDatabaseInsert() {
  try {
    console.log('Testing database insertion...');
    
    const testData = {
      title: 'Test Post',
      excerpt: 'Test excerpt',
      content: 'Test content that is long enough',
      author: 'Test Author',
      category: 'Technology',
      slug: 'test-post-' + Date.now(),
      tags: JSON.stringify(['test']),
      locale: 'en',
      status: 'draft'
    };
    
    console.log('Inserting test data:', testData);
    
    const [postId] = await db('blog_posts').insert(testData);
    console.log('Successfully inserted post with ID:', postId);
    
    const post = await db('blog_posts').where('id', postId).first();
    console.log('Retrieved post:', post);
    
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    process.exit(0);
  }
}

testDatabaseInsert(); 