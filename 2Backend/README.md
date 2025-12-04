# Open Source Matchmaker - Backend API

A powerful backend API that helps developers discover the best open-source repositories to contribute to by analyzing their GitHub activity, tech stack, and matching them with relevant projects.

## Features

- GitHub OAuth authentication
- Profile analysis and tech stack detection
- Intelligent repository recommendations
- Advanced search and filtering
- Save and track repositories
- Contributor-friendly project discovery

## Tech Stack

- Node.js + Express
- Supabase (PostgreSQL)
- GitHub REST & GraphQL API
- JWT Authentication

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=development

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/callback

JWT_SECRET=your_jwt_secret_key_here

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

FRONTEND_URL=http://localhost:5173
```

### 3. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/auth/callback`
4. Copy Client ID and Client Secret to your `.env` file

### 4. Run the Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/callback` - GitHub OAuth callback
- `POST /auth/logout` - Logout user
- `GET /auth/verify` - Verify JWT token

### Profile

- `GET /profile/summary` - Get user profile summary with analysis
- `GET /profile/repos` - Get user repositories
- `GET /profile/stats` - Get user statistics

### Recommendations

- `GET /recommend/repos` - Get personalized repository recommendations
  - Query params: `difficulty`, `language`, `minStars`, `maxStars`, `domain`, `limit`, `refresh`

### Search

- `GET /search/repos` - Search repositories
  - Query params: `query`, `language`, `topics`, `minStars`, `sort`, `limit`

### Saved Repositories

- `POST /saved/add` - Save a repository
- `POST /saved/remove` - Remove a saved repository
- `GET /saved/list` - List all saved repositories
- `PUT /saved/update` - Update saved repository notes

## Recommendation Algorithm

The matching algorithm scores repositories based on:

- **Tech Stack Match (35%)** - Match between user's languages and repo language
- **Recency (20%)** - How recently the repository was updated
- **Contributor Friendliness (25%)** - Good first issues, documentation, activity
- **Popularity (10%)** - Stars, forks, watchers
- **Domain Match (10%)** - Match between user's domains and repo topics

## Database Schema

### users
- Profile and GitHub integration data
- Tech stack analysis
- Activity scores

### saved_repositories
- User-saved repos for tracking
- Match scores
- Personal notes

### user_recommendations
- Cached recommendations (24h TTL)
- Match scores and breakdowns

## Security

- JWT-based authentication
- Row Level Security (RLS) on all tables
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- CORS configuration

## Architecture

```
src/
├── routes/          # API route definitions
├── controllers/     # Request handlers
├── services/        # Business logic
│   ├── githubService.js      # GitHub API integration
│   ├── analysisService.js    # Profile analysis
│   └── matchService.js       # Recommendation engine
├── models/          # Data models
├── middleware/      # Auth and validation
├── config/          # Configuration files
└── utils/           # Helper functions
```

## Development

The backend is built with vanilla JavaScript (no TypeScript) as per project requirements.

## License

MIT
