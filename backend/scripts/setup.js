#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  console.log('🚀 IMM Blog CRM Backend Setup');
  console.log('================================\n');

  try {
    // Check if .env exists
    const envPath = path.join(__dirname, '../.env');
    const envExists = await fs.access(envPath).then(() => true).catch(() => false);

    if (!envExists) {
      console.log('📝 Creating environment configuration...');
      
      const envExample = await fs.readFile(path.join(__dirname, '../env.example'), 'utf8');
      await fs.writeFile(envPath, envExample);
      
      console.log('✅ Environment file created (.env)');
      console.log('⚠️  Please edit .env with your configuration before starting the server\n');
    } else {
      console.log('✅ Environment file already exists\n');
    }

    // Create necessary directories
    const directories = [
      'data',
      'uploads',
      'backups',
      'logs'
    ];

    for (const dir of directories) {
      const dirPath = path.join(__dirname, '..', dir);
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }

    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 18) {
      console.log('⚠️  Warning: Node.js 18+ is recommended for optimal performance');
    } else {
      console.log(`✅ Node.js version: ${nodeVersion}`);
    }

    // Check if dependencies are installed
    const packageJsonPath = path.join(__dirname, '../package.json');
    const nodeModulesPath = path.join(__dirname, '../node_modules');
    
    const packageExists = await fs.access(packageJsonPath).then(() => true).catch(() => false);
    const nodeModulesExists = await fs.access(nodeModulesPath).then(() => true).catch(() => false);

    if (!packageExists) {
      console.log('❌ package.json not found. Please run "npm install" first.');
      process.exit(1);
    }

    if (!nodeModulesExists) {
      console.log('📦 Installing dependencies...');
      const { execSync } = require('child_process');
      execSync('npm install', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
      console.log('✅ Dependencies installed');
    } else {
      console.log('✅ Dependencies already installed');
    }

    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Edit .env file with your configuration');
    console.log('2. Run "npm run dev" to start the development server');
    console.log('3. Access the admin panel at http://localhost:5000/admin');
    console.log('4. Login with default admin account:');
    console.log('   Email: admin@immmedia.hk');
    console.log('   Password: admin123');
    console.log('\n⚠️  Remember to change the default password!');

    // Ask if user wants to start the server
    const startServer = await question('\nWould you like to start the server now? (y/n): ');
    
    if (startServer.toLowerCase() === 'y' || startServer.toLowerCase() === 'yes') {
      console.log('\n🚀 Starting server...');
      const { spawn } = require('child_process');
      const server = spawn('npm', ['run', 'dev'], { 
        cwd: path.join(__dirname, '..'), 
        stdio: 'inherit' 
      });
      
      server.on('error', (error) => {
        console.error('❌ Failed to start server:', error);
      });
    }

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setup();
}

module.exports = { setup }; 