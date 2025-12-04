# Open Source Matchmaker - Frontend

A beautiful, modern React frontend for the Open Source Matchmaker platform that helps developers discover and contribute to open-source projects matched to their skills and interests.

## 🎨 Features

- **GitHub OAuth Authentication** - Secure login through GitHub
- **Dark/Light Theme Toggle** - Matrix-inspired dark mode & GitHub-inspired light mode
- **Smart Recommendations** - AI-powered repository matching based on your skills
- **Advanced Search** - Filter repositories by language, stars, skills, and more
- **Contribution History** - Visual heatmap of your GitHub activity
- **Saved Repositories** - Bookmark projects you're interested in
- **System Status** - Real-time backend API health monitoring
- **Responsive Design** - Works beautifully on all devices

## 🛠️ Tech Stack

- **Framework**: React 19 with Vite
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query (@tanstack/react-query)
- **Routing**: React Router v7
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see ../Contributor-main)

## 🚀 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=Open Source Matchmaker
   VITE_ENABLE_API_DISCOVERY=true
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   ├── ThemeToggle.jsx # Dark/light theme switch
│   └── RepoCard.jsx    # Repository card component
├── pages/              # Page components
│   ├── Login.jsx       # Login page with GitHub OAuth
│   ├── AuthCallback.jsx # OAuth callback handler
│   ├── Dashboard.jsx   # Main dashboard with charts
│   ├── Recommendations.jsx # Recommended repositories
│   ├── Search.jsx      # Search repositories
│   ├── Saved.jsx       # Saved/bookmarked repos
│   ├── History.jsx     # GitHub contribution history
│   └── System.jsx      # System status & API health
├── hooks/              # Custom React hooks
│   └── useApi.js       # React Query hooks for API calls
├── services/           # API integration
│   ├── apiClient.js    # Axios instance with interceptors
│   └── api.js          # API service functions
├── store/              # Zustand stores
│   ├── authStore.js    # Authentication state
│   └── themeStore.js   # Theme state
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles & Tailwind

## 🎨 Design Philosophy

### Light Mode (GitHub + HackerRank inspired)
- Clean, neutral colors
- Productivity-focused design
- Professional appearance

### Dark Mode (Matrix + Terminal inspired)
- Neon green (#00ff41) and blue (#58a6ff) accents
- Dark gray backgrounds
- Terminal/hacker aesthetic
- Glow effects and animations

## 🔑 Key Features

### Authentication
- GitHub OAuth integration
- JWT token management
- Automatic token refresh
- Persistent login state

### Dashboard
- **Radar Chart**: Skill distribution
- **Pie Chart**: Language usage
- **Line Chart**: Contribution history over time
- **Stat Cards**: Quick metrics (repos, stars, forks, score)
- **Recent Repositories**: Latest GitHub activity

### Recommendations
- Match score percentage
- Filter by language, stars, domain
- Quick save/unsave repositories
- View open issues count
- Match reasoning explanation

### Search
- Search by keywords
- Filter by programming language
- Minimum star count filter
- Skills/topics filtering

### System Status
- Backend connection health
- Available API routes
- Real-time status monitoring
- Frontend configuration display

## 🔌 Backend Integration

The frontend dynamically adapts to backend APIs:

1. **API Discovery**: Fetches available routes from backend
2. **Health Monitoring**: Checks backend status every 30 seconds
3. **Feature Flags**: Enables/disables features based on backend
4. **Error Handling**: Graceful degradation if backend is unavailable

### Expected Backend Endpoints

```
GET  /auth/github          - Initiate GitHub OAuth
GET  /auth/callback        - Handle OAuth callback
POST /auth/logout          - Logout user
GET  /auth/verify          - Verify JWT token

GET  /profile/summary      - User profile summary
GET  /profile/repos        - User repositories
GET  /profile/stats        - User statistics

GET  /recommend/repos      - Get recommendations
GET  /search/repos         - Search repositories

GET  /saved/list           - List saved repos
POST /saved/add            - Save repository
POST /saved/remove         - Remove saved repo
PUT  /saved/update         - Update saved repo
```

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |
| `VITE_APP_NAME` | Application name | `Open Source Matchmaker` |
| `VITE_ENABLE_API_DISCOVERY` | Enable API discovery | `true` |

## 🎯 Development Guidelines

### State Management
- Use Zustand for global state (auth, theme)
- Use React Query for server state
- Persist auth and theme to localStorage

### Styling
- Use Tailwind utility classes
- Follow defined color scheme
- Maintain consistent spacing
- Ensure dark/light mode compatibility

### API Calls
- Always use React Query hooks
- Handle loading and error states
- Implement proper error messages
- Use optimistic updates where appropriate

## 📱 Responsive Design

- **Mobile**: Single column layout, hamburger menu
- **Tablet**: Two column layouts, condensed navigation
- **Desktop**: Full layout with sidebar navigation

## 🚧 Future Enhancements

- [ ] Advanced filtering options
- [ ] Repository comparison
- [ ] Contribution tracking
- [ ] Team collaboration features
- [ ] Social sharing
- [ ] Email notifications
- [ ] Custom skill tagging
- [ ] Project roadmap view

## 🐛 Known Issues

- None currently documented

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 👥 Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ for the open-source community**
