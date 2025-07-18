# 🚀 Render Deployment Guide

## Prerequisites
- Render account (free tier available)
- MongoDB Atlas account (free tier available)
- Spoonacular API key

## 📋 Step 1: Backend Deployment

### 1.1 Prepare Backend Repository
1. Push your backend code to GitHub
2. Ensure `package.json` has correct start script: `"start": "node index.js"`

### 1.2 Create Backend Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the backend repository/branch

### 1.3 Configure Backend Service
- **Name**: `recipe-backend` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free (or paid if needed)

### 1.4 Set Environment Variables
Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/recipe-app
SPOONACULAR_API_KEY=your-spoonacular-api-key
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### 1.5 Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL: `https://your-backend-app.onrender.com`

## 📋 Step 2: Frontend Deployment

### 2.1 Prepare Frontend Repository
1. Push your frontend code to GitHub
2. Ensure `package.json` has build script: `"build": "vite build"`

### 2.2 Create Frontend Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Select the frontend repository/branch

### 2.3 Configure Frontend Service
- **Name**: `recipe-frontend` (or your preferred name)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Plan**: Free (or paid if needed)

### 2.4 Set Environment Variables
Add these environment variables in Render dashboard:

```
VITE_BACKEND_URL=https://your-backend-app.onrender.com/api
```

### 2.5 Deploy Frontend
1. Click "Create Static Site"
2. Wait for deployment to complete
3. Note your frontend URL: `https://your-frontend-app.onrender.com`

## 📋 Step 3: Update Backend CORS

### 3.1 Update CORS Configuration
In your backend `index.js`, update the CORS origins:

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-frontend-app.onrender.com']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 3.2 Redeploy Backend
1. Update the code with new CORS settings
2. Push to GitHub
3. Render will automatically redeploy

## 📋 Step 4: MongoDB Atlas Setup

### 4.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Set up database access (username/password)
4. Set up network access (allow all IPs: 0.0.0.0/0)

### 4.2 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add this to your backend environment variables

## 📋 Step 5: Spoonacular API Setup

### 5.1 Get API Key
1. Go to [Spoonacular](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Get your API key
4. Add to backend environment variables

## 🔧 Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure frontend URL is in backend CORS origins
2. **Build Failures**: Check build commands and dependencies
3. **Database Connection**: Verify MongoDB URI and network access
4. **Environment Variables**: Ensure all variables are set correctly

### Health Check:
- Backend: `https://your-backend-app.onrender.com/health`
- Should return: `{"status":"OK","message":"Server is running"}`

## 🌐 Final URLs
- **Frontend**: `https://your-frontend-app.onrender.com`
- **Backend**: `https://your-backend-app.onrender.com`
- **API Base**: `https://your-backend-app.onrender.com/api`

## 📝 Notes
- Free tier has limitations (sleep after inactivity)
- Consider upgrading for production use
- Monitor your API usage (Spoonacular has rate limits)
- Set up proper error monitoring for production 