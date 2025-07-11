const knex = require('knex');
const path = require('path');

// Database configuration
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../data/blog_crm.db')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'seeds')
  }
});

// Initialize database tables
async function initializeDatabase() {
  try {
    // Create users table
    const usersTableExists = await db.schema.hasTable('users');
    if (!usersTableExists) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password_hash').notNullable();
        table.string('role').defaultTo('editor'); // admin, editor, author
        table.string('full_name');
        table.text('bio');
        table.string('avatar_url');
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
      });
    }

    // Create blog_posts table
    const blogPostsTableExists = await db.schema.hasTable('blog_posts');
    if (!blogPostsTableExists) {
      await db.schema.createTable('blog_posts', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('excerpt');
        table.text('content').notNullable();
        table.string('author').notNullable();
        table.string('category').notNullable();
        table.string('slug').unique().notNullable();
        table.string('seo_title');
        table.text('seo_description');
        table.string('seo_keywords');
        table.integer('read_time').defaultTo(5);
        table.json('tags'); // Array of strings
        table.string('featured_image_url');
        table.string('locale').defaultTo('en'); // en, zh
        table.string('status').defaultTo('draft'); // draft, published, archived
        table.timestamp('published_at');
        table.integer('author_id').references('id').inTable('users');
        table.timestamps(true, true);
      });
    }

    // Create media table
    const mediaTableExists = await db.schema.hasTable('media');
    if (!mediaTableExists) {
      await db.schema.createTable('media', (table) => {
        table.increments('id').primary();
        table.string('filename').notNullable();
        table.string('original_name').notNullable();
        table.string('mime_type').notNullable();
        table.integer('size').notNullable();
        table.string('url').notNullable();
        table.string('alt_text');
        table.integer('uploaded_by').references('id').inTable('users');
        table.timestamps(true, true);
      });
    }

    // Create categories table
    const categoriesTableExists = await db.schema.hasTable('categories');
    if (!categoriesTableExists) {
      await db.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('slug').unique().notNullable();
        table.text('description');
        table.string('locale').defaultTo('en');
        table.timestamps(true, true);
      });
    }

    // Create tags table
    const tagsTableExists = await db.schema.hasTable('tags');
    if (!tagsTableExists) {
      await db.schema.createTable('tags', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('slug').unique().notNullable();
        table.string('locale').defaultTo('en');
        table.timestamps(true, true);
      });
    }

    // Create blog_post_tags junction table
    const blogPostTagsTableExists = await db.schema.hasTable('blog_post_tags');
    if (!blogPostTagsTableExists) {
      await db.schema.createTable('blog_post_tags', (table) => {
        table.increments('id').primary();
        table.integer('blog_post_id').references('id').inTable('blog_posts').onDelete('CASCADE');
        table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE');
        table.unique(['blog_post_id', 'tag_id']);
      });
    }

    // Insert default admin user if not exists
    const adminExists = await db('users').where('email', 'admin@immmedia.hk').first();
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await db('users').insert({
        username: 'admin',
        email: 'admin@immmedia.hk',
        password_hash: hashedPassword,
        role: 'admin',
        full_name: 'IMM Admin',
        bio: 'System Administrator',
        is_active: true
      });
    }

    // Insert default categories
    const defaultCategories = [
      { name: 'Technology', slug: 'technology', description: 'Technology and innovation articles', locale: 'en' },
      { name: 'TV Commercials', slug: 'tv-commercials', description: 'TV commercial production insights', locale: 'en' },
      { name: 'KOL Marketing', slug: 'kol-marketing', description: 'KOL and influencer marketing', locale: 'en' },
      { name: 'Industry Insights', slug: 'industry-insights', description: 'Industry trends and analysis', locale: 'en' },
      { name: 'Production', slug: 'production', description: 'Production process and techniques', locale: 'en' },
      { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Digital marketing strategies', locale: 'en' }
    ];

    for (const category of defaultCategories) {
      const exists = await db('categories').where('slug', category.slug).first();
      if (!exists) {
        await db('categories').insert(category);
      }
    }

    // Insert default tags
    const defaultTags = [
      { name: 'AI', slug: 'ai', locale: 'en' },
      { name: 'Media Production', slug: 'media-production', locale: 'en' },
      { name: 'Innovation', slug: 'innovation', locale: 'en' },
      { name: 'Advertising', slug: 'advertising', locale: 'en' },
      { name: 'Trends', slug: 'trends', locale: 'en' },
      { name: 'KOL', slug: 'kol', locale: 'en' },
      { name: 'Hong Kong', slug: 'hong-kong', locale: 'en' },
      { name: 'Creative Industry', slug: 'creative-industry', locale: 'en' },
      { name: 'Storyboarding', slug: 'storyboarding', locale: 'en' },
      { name: 'Digital Marketing', slug: 'digital-marketing', locale: 'en' }
    ];

    for (const tag of defaultTags) {
      const exists = await db('tags').where('slug', tag.slug).first();
      if (!exists) {
        await db('tags').insert(tag);
      }
    }

    // Populate sample blog posts
    const { populateBlogData } = require('../utils/populateBlogData');
    await populateBlogData();

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

module.exports = {
  db,
  initializeDatabase
}; 