# 🔧 OAuth Troubleshooting Guide

## ✅ Changes Made

I've fixed the GitHub OAuth flow for you! Here's what was updated:

### Backend Changes (`Contributor-main/src/controllers/authController.js`)
- ✅ Fixed callback redirect to use `/auth/callback` (matches frontend route)
- ✅ Added proper user data to redirect URL
- ✅ Error redirects now go to `/auth/callback?error=...`

### Frontend Changes
- ✅ `src/services/api.js` - Fixed to fetch auth URL from backend first
- ✅ `src/pages/Login.jsx` - Made login handler async with error handling

## 🚀 Setup Steps

### Step 1: Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `Open Source Matchmaker (Dev)`
   - **Homepage URL**: `http://localhost:5174`  ⚠️ (Note: Your frontend is on port 5174, not 5173!)
   - **Authorization callback URL**: `http://localhost:3000/auth/callback`
4. Click **"Register application"**
5. Copy the **Client ID** and **Client Secret**

### Step 2: Update Backend .env

Edit `Contributor-main/.env` and add/update these lines:

```env
# Server  
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174

# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here  
GITHUB_CALLBACK_URL=http://localhost:3000/auth/callback

# JWT Secret (at least 32 characters)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# Database (if using Supabase)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

⚠️ **IMPORTANT**: Notice `FRONTEND_URL=http://localhost:5174` (not 5173!)

### Step 3: Update Frontend .env

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Open Source Matchmaker
VITE_ENABLE_API_DISCOVERY=true
```

### Step 4: Restart Servers

After updating `.env` files:

**Terminal 1 - Backend:**
```bash
# Stop with Ctrl+C, then:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# Already running on port 5174
# No need to restart unless you changed frontend .env
```

## 🧪 Testing the OAuth Flow

### Test 1: Check Backend
Visit: http://localhost:3000/
You should see JSON with API endpoints.

### Test 2: Check frontend
Visit: http://localhost:5174/
You should see the login page.

### Test 3: Click "Continue with GitHub"

Expected flow:
1. ✅ Frontend calls `/auth/github` endpoint
2. ✅ Backend returns GitHub OAuth URL
3. ✅ Frontend redirects to GitHub
4. ✅ User authorizes on GitHub
5. ✅ GitHub redirects to `/auth/callback` on backend
6. ✅ Backend creates/updates user in database  
7. ✅ Backend generates JWT token
8. ✅ Backend redirects to frontend `/auth/callback?token=...&user=...`
9. ✅ Frontend saves token and user data
10. ✅ Frontend redirects to dashboard

## 🐛 Common Issues & Solutions

### Issue 1: "Missing CLIENT_ID or CLIENT_SECRET"
**Solution**: Make sure you created the GitHub OAuth app and added credentials to `.env`

### Issue 2: "Redirect URL mismatch"
**Solution**: GitHub callback URL must be exactly `http://localhost:3000/auth/callback`

### Issue 3: "CORS error"
**Solution**: Check `FRONTEND_URL` in backend `.env` matches frontend port (5174)

### Issue 4: "Database error"
**Solution**: Ensure Supabase is configured or database is running

### Issue 5: "Token not saving"
**Solution**: Check browser console for errors. Clear localStorage and try again.

## 📝 Verification Checklist

Before testing, verify:

- [ ] GitHub OAuth app created
- [ ] CLIENT_ID in backend `.env`
- [ ] CLIENT_SECRET in backend `.env`
- [ ] FRONTEND_URL = `http://localhost:5174` (not 5173!)
- [ ] GITHUB_CALLBACK_URL = `http://localhost:3000/auth/callback`
- [ ] Backend running on port 3000
- [ ] Frontend running on port 5174
- [ ] Database configured (Supabase or PostgreSQL)
- [ ] Both servers restarted after `.env` changes

## 🔍 Debugging Tips

### Check Backend Logs
Look at the backend terminal for errors when you click login.

### Check Frontend Console
Open browser DevTools (F12) → Console tab

### Check Network Tab
1. Open DevTools → Network tab
2. Click "Continue with GitHub"
3. Watch for:
   - Call to `/auth/github` → Should return `{"authUrl":"https://github.com/..."}`
   - Redirect to GitHub
   - Redirect back to `/auth/callback`

### Test Backend Endpoint Directly
Visit in browser: http://localhost:3000/auth/github
Should return JSON with `authUrl` property.

## ✨ Expected User Experience

1. **Login Page**: Beautiful dark/light themed page
2. **Click Button**: "Continue with GitHub"
3. **GitHub Authorization**: GitHub asks you to authorize the app
4. **Auto Redirect**: Automatically returns to app
5. **Dashboard**: See your profile with charts!

## 🎯 Quick Test

After setting up, try this:

1. Open: http://localhost:5174/
2. Click "Continue with GitHub"
3. Check backend terminal - should show OAuth request
4. Authorize on GitHub (if prompted)
5. Should land on dashboard

## 💡 Pro Tips

### Tip 1: Use ngrok for Testing
If you want to test with a public URL:
```bash
ngrok http 3000
# Update GitHub OAuth callback to ngrok URL
```

### Tip 2: Check Database
After successful login, check Supabase `users` table.
You should see your GitHub user created.

### Tip 3: Clear State
If things get stuck:
```javascript
// In browser console:
localStorage.clear();
// Refresh page
```

## 📞 Still Having Issues?

Check these files for more details:
- `Contributor-main/src/controllers/authController.js` - OAuth logic
- `frontend/src/pages/AuthCallback.jsx` - Token handling
- `frontend/src/services/api.js` - API calls

---

**The OAuth flow is now fixed and ready to test! 🎉**

Make sure to:
1. Create GitHub OAuth app
2. Add credentials to .env
3. Restart backend server
4. Test the login flow
