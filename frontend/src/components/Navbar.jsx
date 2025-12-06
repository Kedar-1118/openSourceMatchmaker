import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    Search,
    Star,
    TrendingUp,
    Settings,
    LogOut,
    Activity,
    GitBranch,
    User,
    AlertCircle
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import { useLogout } from '../hooks/useApi';
import ThemeToggle from './ThemeToggle';
// const isHome = (path) => path === '/';
const Navbar = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { mutate: logout } = useLogout();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
    };

    const navLinks = [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/recommendations', icon: TrendingUp, label: 'Recommended' },
        { path: '/issues', icon: AlertCircle, label: 'Issues' },
        { path: '/search', icon: Search, label: 'Search' },
        { path: '/saved', icon: Star, label: 'Saved' },
        { path: '/history', icon: Activity, label: 'History' },
    ];

    const isActive = (path) => location.pathname === path;

    // Don't show navbar on landing or login pages
    if (!isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-dark-bg border-b border-light-border dark:border-dark-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-2 group">
                        <GitBranch className="w-8 h-8 text-light-accent dark:text-dark-primary transition-transform group-hover:rotate-12" />
                        <span className="text-xl font-bold text-light-text dark:text-dark-text">
                            <span className="dark:text-dark-primary">OS</span> Matchmaker
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive(link.path)
                                    ? 'bg-light-accent text-white dark:bg-dark-bg-tertiary dark:text-dark-primary'
                                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary'
                                    }`}
                            >
                                <link.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        {/* User Menu */}
                        <div className="flex items-center space-x-3">
                            {user?.avatar_url && (
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                    title="View Profile"
                                >
                                    <img
                                        src={user.avatar_url}
                                        alt={user.login}
                                        className="w-8 h-8 rounded-full border-2 border-light-border dark:border-dark-primary cursor-pointer"
                                    />
                                    <span className="hidden sm:block text-sm font-medium text-light-text dark:text-dark-text">
                                        {user?.login}
                                    </span>
                                </button>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="btn-secondary flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex overflow-x-auto space-x-2 pb-3 pt-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${isActive(link.path)
                                ? 'bg-light-accent text-white dark:bg-dark-bg-tertiary dark:text-dark-primary'
                                : 'text-light-text-secondary dark:text-dark-text-secondary'
                                }`}
                        >
                            <link.icon className="w-5 h-5" />
                            <span className="text-xs">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
