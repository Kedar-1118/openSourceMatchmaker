# Deployment Guide - Open Source Matchmaker

## 📦 Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Frontend Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to Frontend**
   ```bash
   cd frontend
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com
   VITE_APP_NAME=Open Source Matchmaker
   VITE_ENABLE_API_DISCOVERY=true
   ```

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify (Alternative for Frontend)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Set Environment Variables** in Netlify dashboard

### Option 3: Railway/Render (For Both Backend & Frontend)

#### Backend Deploy (Railway)

1. Create `Procfile`:
   ```
   web: node src/server.js
   ```

2. Push to GitHub

3. Connect to Railway:
   - Visit [railway.app](https://railway.app)
   - New Project → Deploy from GitHub
   - Select repository
   - Add environment variables

#### Frontend Deploy (Railway)

1. Create `railway.json`:
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm run build && npm run preview -- --host 0.0.0.0 --port $PORT",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

2. Push and connect to Railway

### Option 4: Docker Deployment

#### Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
```

#### Docker Compose (Both Services)

Create `docker-compose.yml` in root:
```yaml
version: '3.8'

services:
  backend:
    build: ./Contributor-main
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - FRONTEND_URL=http://localhost:5173
      - GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
      - GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - database

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:3000
    depends_on:
      - backend

  database:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=oss_matchmaker
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Server
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com

# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=https://your-backend-url.com/auth/callback

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# Database (if using Supabase/PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# Supabase (if using)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
VITE_APP_NAME=Open Source Matchmaker
VITE_ENABLE_API_DISCOVERY=true
```

## 📋 Pre-Deployment Checklist

### Backend
- [ ] Set all environment variables
- [ ] Configure GitHub OAuth app
  - Homepage URL: `https://your-frontend-url.com`
  - Callback URL: `https://your-backend-url.com/auth/callback`
- [ ] Set up database (Supabase/PostgreSQL)
- [ ] Test API endpoints
- [ ] Enable CORS for frontend URL
- [ ] Set up logging/monitoring

### Frontend
- [ ] Update API URL in environment
- [ ] Test build locally (`npm run build`)
- [ ] Verify all routes work
- [ ] Check responsive design
- [ ] Test dark/light themes
- [ ] Optimize images
- [ ] Test authentication flow

### Security
- [ ] Use HTTPS in production
- [ ] Secure JWT secret (min 32 characters)
- [ ] Enable rate limiting
- [ ] Set secure CORS policy
- [ ] Add CSP headers
- [ ] Regular dependency updates

## 🚀 GitHub OAuth Setup

1. **Create GitHub OAuth App**
   - Go to GitHub Settings → Developer Settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - Application name: Open Source Matchmaker
     - Homepage URL: `https://your-frontend-url.com`
     - Authorization callback URL: `https://your-backend-url.com/auth/callback`
   - Save and copy Client ID and Client Secret

2. **Update Environment Variables**
   - Add to backend `.env`
   - Redeploy backend service

## 📊 Post-Deployment

### Monitoring
- Set up error tracking (Sentry)
- Analytics (Google Analytics, Plausible)
- Uptime monitoring (UptimeRobot)
- Performance monitoring (Lighthouse)

### Testing
1. Test OAuth flow end-to-end
2. Verify all API endpoints
3. Check theme switching
4. Test on mobile devices
5. Verify search functionality
6. Test save/unsave features

### Performance
- Enable gzip compression
- Use CDN for static assets
- Implement caching headers
- Optimize images
- Minimize bundle size

## 🔄 CI/CD Setup

### GitHub Actions (Frontend)

Create `.github/workflows/deploy-frontend.yml`:
```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          
      - name: Build
        run: |
          cd frontend
          npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          
      - name: Deploy to Vercel
        run: |
          cd frontend
          npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### GitHub Actions (Backend)

Create `.github/workflows/deploy-backend.yml`:
```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'Contributor-main/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## 📈 Scaling

### Frontend
- Use CDN (Cloudflare, Vercel Edge)
- Implement code splitting
- Lazy load routes
- Optimize bundle size
- Enable caching

### Backend
- Horizontal scaling (multiple instances)
- Database connection pooling
- Redis caching
- Load balancer
- Rate limiting

## 🐛 Troubleshooting

### CORS Issues
- Check `FRONTEND_URL` in backend env
- Verify CORS middleware configuration
- Ensure URLs match exactly (no trailing slash)

### OAuth Not Working
- Verify callback URLs match in GitHub app settings
- Check CLIENT_ID and CLIENT_SECRET
- Ensure HTTPS in production

### Build Failures
- Clear `node_modules` and reinstall
- Check Node.js version (use v18+)
- Verify environment variables
- Check for typos in imports

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [Docker Docs](https://docs.docker.com)
- [GitHub OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps)

---

## ✅ Quick Deploy Commands

### Development
```bash
# Start backend
cd Contributor-main && npm start

# Start frontend
cd frontend && npm run dev
```

### Production
```bash
# Build frontend
cd frontend && npm run build

# Deploy frontend (Vercel)
cd frontend && vercel --prod

# Deploy backend (Railway)
cd Contributor-main && railway up
```

---

**🎉 Your app is ready for production!**
