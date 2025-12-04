# 🚀 Quick Start Guide - Open Source Matchmaker

## ⚡ 5-Minute Setup

### Step 1: Clone & Install (2 minutes)

```bash
# You're already in the project directory!
cd "c:\Projects\open source"

# Install backend dependencies
cd Contributor-main
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### Step 2: Configure Environment (1 minute)

**Backend** - Create `Contributor-main/.env`:
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# GitHub OAuth (get from https://github.com/settings/developers)
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/auth/callback

# JWT Secret (any random string, min 32 characters)
JWT_SECRET=super_secret_key_at_least_32_characters_long

# Database (if using Supabase)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

**Frontend** - Already configured! (`.env` file exists)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Open Source Matchmaker
VITE_ENABLE_API_DISCOVERY=true
```

### Step 3: Start Servers (2 minutes)

**Terminal 1 - Backend:**
```bash
cd "c:\Projects\open source\Contributor-main"
npm start
```

**Terminal 2 - Frontend:**
```bash
cd "c:\Projects\open source\frontend"
npm run dev
```

### Step 4: Open Browser

Visit: **http://localhost:5173**

---

## 🎯 What You'll See

### 1. **Login Page**
- Beautiful dark/light theme
- "Connect with GitHub" button
- Feature highlights

### 2. **OAuth Flow** (if configured)
- Redirects to GitHub
- Returns authenticated
- Lands on dashboard

### 3. **Dashboard**
- Profile summary
- Charts (skills, languages, contributions)
- Recent repositories
- Stat cards

### 4. **Explore Features**
- 🎯 **Recommendations** - Matched repos
- 🔍 **Search** - Find projects
- ⭐ **Saved** - Your bookmarks
- 📈 **History** - GitHub timeline
- ⚙️ **System** - Backend status

---

## 🛠️ GitHub OAuth Setup (Optional but Recommended)

### Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: `Open Source Matchmaker Dev`
   - **Homepage URL**: `http://localhost:5173`
   - **Callback URL**: `http://localhost:3000/auth/callback`
4. Click "Register application"
5. Copy **Client ID** and **Client Secret**
6. Add to `Contributor-main/.env`

---

## 🎨 Features to Try

### Theme Toggle
- Look for the toggle in the navbar
- Switch between light (GitHub-style) and dark (Matrix-style)
- Theme persists across sessions

### Dashboard Charts
- Radar chart shows skill distribution
- Pie chart displays language usage
- Line chart tracks contributions
- Hover for details

### Search
- Search by repository name
- Filter by language (e.g., "JavaScript")
- Set minimum stars
- Add skill tags

### Recommendations
- View match scores
- Filter results
- Save/unsave repositories
- See match reasoning

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <process_id> /F
```

### Frontend won't start
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### OAuth not working
- Did you create a GitHub OAuth app?
- Are the CLIENT_ID and CLIENT_SECRET correct in `.env`?
- Is the callback URL exactly `http://localhost:3000/auth/callback`?
- Restart the backend after changing `.env`

### CORS errors
- Check `FRONTEND_URL` in backend `.env` is `http://localhost:5173`
- No trailing slash!
- Restart backend

### Charts not loading
- Backend must be running
- Check browser console for errors
- Verify API_URL in frontend `.env`

---

## 📚 Available Commands

### Backend
```bash
npm start       # Start server
npm run dev     # Start with nodemon (auto-restart)
```

### Frontend
```bash
npm run dev     # Start dev server (HMR enabled)
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

---

## 🎓 Learning Path

### Day 1: Setup & Explore
1. ✅ Install dependencies
2. ✅ Start servers  
3. ✅ Explore UI
4. ✅ Test theme toggle

### Day 2: Authentication
1. Set up GitHub OAuth
2. Test login flow
3. View dashboard data

### Day 3: Features
1. Try recommendations
2. Use search
3. Save repositories
4. Check history

### Day 4: Customization
1. Modify colors in `tailwind.config.js`
2. Add custom components
3. Adjust layouts

### Day 5: Deploy
1. Choose hosting (Vercel, Netlify, Railway)
2. Set up production environment
3. Deploy!

---

## 📁 Important Files

| File | Purpose | Edit for |
|------|---------|----------|
| `frontend/src/App.jsx` | Main app | Add routes |
| `frontend/src/index.css` | Global styles | Custom CSS |
| `frontend/tailwind.config.js` | Theme colors | Color scheme |
| `frontend/.env` | API config | Backend URL |
| `Contributor-main/.env` | Server config | OAuth, secrets |

---

## 🎯 Your First Task

Try this:
1. Start both servers ✅ (Already running!)
2. Open http://localhost:5173
3. Toggle the theme 🌓
4. Click around the UI
5. Check the System Status page
6. See the backend connection status

---

## 🆘 Need Help?

### Check Logs
**Backend logs:**
- Look at your backend terminal
- Errors will show there

**Frontend logs:**
- Open browser DevTools (F12)
- Check Console tab
- Look for red errors

### Common Issues

**"Cannot connect to backend"**
- Is backend running on port 3000?
- Check `VITE_API_URL` in frontend `.env`

**"Module not found"**
```bash
npm install
```

**"Port already in use"**
```bash
# Change port in Contributor-main/src/server.js
# Or kill the process using that port
```

---

## ✅ Success Checklist

- [ ] Backend running on http://localhost:3000
- [ ] Frontend running on http://localhost:5173
- [ ] Can see login page
- [ ] Theme toggle works
- [ ] No console errors
- [ ] System page shows "Connected"

---

## 🎉 You're All Set!

The frontend is fully built and running at:
**http://localhost:5173**

The backend API is available at:
**http://localhost:3000**

### Next Steps:
1. Explore all pages
2. Set up GitHub OAuth for full functionality
3. Customize the theme
4. Add features
5. Deploy to production

---

**Happy coding! 🚀**

*Found this helpful? Star the repo and share with others!*
