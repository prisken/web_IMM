# 🚀 IMM Media Production - Deployment Guide

## 📋 **Overview**

This project has multiple ways to run depending on your needs:

1. **Development Mode**: Separate servers for frontend and backend
2. **Production Mode**: Single server serving everything
3. **Admin Only**: Just the CRM system

## 🛠️ **Development Mode (Recommended for Development)**

### **Option A: Run Both Servers**
```bash
# Start both frontend and backend servers
npm run dev:full
```

This will start:
- **Frontend**: `http://localhost:3000` (Next.js with hot reload)
- **Backend**: `http://localhost:5001` (Express API + Admin Panel)
- **Admin Panel**: `http://localhost:5001/admin`

### **Option B: Run Separately**
```bash
# Terminal 1: Frontend only
npm run dev

# Terminal 2: Backend only  
cd backend && node src/server.js
```

## 🚀 **Production Mode (Single Server)**

### **Build and Serve Everything**
```bash
# Build frontend and serve everything from backend
npm run serve
```

This will:
1. Build the Next.js frontend
2. Build the React admin panel
3. Serve everything from `http://localhost:5001`

### **Access Points**
- **Main Website**: `http://localhost:5001`
- **Admin Panel**: `http://localhost:5001/admin`
- **API**: `http://localhost:5001/api`

## 🔧 **Admin Only Mode**

If you only need the CRM system:

```bash
cd backend
node src/server.js
```

Then access:
- **Admin Panel**: `http://localhost:5001/admin`
- **Login**: `admin@immmedia.hk` / `admin123`

## 📊 **Why Different Modes?**

### **Development Mode Benefits**
- ✅ **Hot Reload**: Frontend changes reflect immediately
- ✅ **Fast Development**: No need to rebuild for changes
- ✅ **Debugging**: Easier to debug frontend and backend separately
- ✅ **Flexibility**: Can modify frontend without affecting backend

### **Production Mode Benefits**
- ✅ **Single Server**: Everything served from one port
- ✅ **Simplified Deployment**: Only one server to manage
- ✅ **Better Performance**: Static files served directly
- ✅ **Cost Effective**: Single server deployment

## 🌐 **Live Site Access**

### **For Your Live Site**

**Option 1: Production Mode (Recommended)**
```bash
npm run serve
```
Then access everything at `http://localhost:5001`

**Option 2: Development Mode**
```bash
npm run dev:full
```
Then access:
- Main site: `http://localhost:3000`
- Admin: `http://localhost:5001/admin`

## 🔐 **Admin Credentials**

- **Email**: `admin@immmedia.hk`
- **Password**: `admin123`

## 📝 **Environment Variables**

Create `.env` file in the root directory:
```env
NODE_ENV=production
PORT=5001
FRONTEND_URL=http://localhost:3000
```

## 🚀 **Deployment Options**

### **Option 1: Single Server (Recommended)**
Deploy the backend server and build the frontend:
```bash
npm run serve
```

### **Option 2: Separate Servers**
Deploy frontend and backend separately:
- Frontend: Vercel, Netlify, etc.
- Backend: Heroku, DigitalOcean, etc.

### **Option 3: Docker**
Create a Docker container with everything included.

## 🎯 **Recommendation**

**For Development**: Use `npm run dev:full`
**For Production**: Use `npm run serve`

This gives you the best of both worlds - easy development and simple production deployment! 