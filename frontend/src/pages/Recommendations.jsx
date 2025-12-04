import { useState } from 'react';
import {
    TrendingUp, Star, GitFork, ExternalLink,
    Bookmark, BookmarkCheck, Filter, Code, Users
} from 'lucide-react';
import { useRecommendations, useAddSavedRepo, useRemoveSavedRepo, useSavedRepos } from '../hooks/useApi';

const Recommendations = () => {
    // Separate state for form inputs vs applied filters
    const [filterInputs, setFilterInputs] = useState({
        language: '',
        minStars: '',
        domain: '',
    });

    const [appliedFilters, setAppliedFilters] = useState({
        language: '',
        minStars: '',
        domain: '',
    });

    const { data: recommendationsData, isLoading } = useRecommendations(appliedFilters);
    const { data: savedReposData } = useSavedRepos();
    const addSaved = useAddSavedRepo();
    const removeSaved = useRemoveSavedRepo();

    // Extract actual data from API responses
    const recommendations = recommendationsData?.recommendations || [];
    const savedRepos = savedReposData?.repositories || [];

    const [showFilters, setShowFilters] = useState(false);

    const isSaved = (repoId) => {
        return savedRepos?.some(repo => repo.id === repoId);
    };

    const handleToggleSave = (repo) => {
        if (isSaved(repo.id)) {
            removeSaved.mutate(repo);
        } else {
            addSaved.mutate(repo);
        }
    };

    const handleApplyFilters = () => {
        console.log('[Recommendations] Applying filters:', filterInputs);
        setAppliedFilters({ ...filterInputs }); // Create new object to ensure React sees the change
    };

    const handleClearFilters = () => {
        console.log('[Recommendations] Clearing filters');
        setFilterInputs({ language: '', minStars: '', domain: '' });
        setAppliedFilters({ language: '', minStars: '', domain: '' });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-bg-secondary dark:bg-dark-bg">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light-bg-secondary dark:bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text flex items-center space-x-2">
                            <TrendingUp className="w-8 h-8 text-light-accent dark:text-dark-matrix" />
                            <span>Recommended Repositories</span>
                        </h1>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                            Projects matched to your skills and interests
                        </p>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary flex items-center space-x-2"
                    >
                        <Filter className="w-4 h-4" />
                        <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="card p-6 animate-slide-in">
                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                            Filter Recommendations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Language
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., JavaScript, Python"
                                    className="input"
                                    value={filterInputs.language}
                                    onChange={(e) => setFilterInputs({ ...filterInputs, language: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Minimum Stars
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g., 100"
                                    className="input"
                                    value={filterInputs.minStars}
                                    onChange={(e) => setFilterInputs({ ...filterInputs, minStars: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Domain
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., web, ml, devops"
                                    className="input"
                                    value={filterInputs.domain}
                                    onChange={(e) => setFilterInputs({ ...filterInputs, domain: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleApplyFilters}
                                className="btn-primary flex items-center space-x-2"
                            >
                                <Filter className="w-4 h-4" />
                                <span>Apply Filters</span>
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="btn-secondary"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Recommendations List */}
                <div className="space-y-4">
                    {recommendations?.length === 0 ? (
                        <div className="card p-12 text-center">
                            <TrendingUp className="w-16 h-16 mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-4" />
                            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                                No recommendations yet
                            </h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                We're analyzing your profile to find the perfect matches!
                            </p>
                        </div>
                    ) : (
                        recommendations?.map((repo) => (
                            <RepoCard
                                key={repo.id}
                                repo={repo}
                                isSaved={isSaved(repo.id)}
                                onToggleSave={() => handleToggleSave(repo)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// Repository Card Component
const RepoCard = ({ repo, isSaved, onToggleSave }) => {
    return (
        <div className="card p-6 hover:shadow-lg transition-all animate-fade-in">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start space-x-3 mb-3">
                        {repo.matchScore && (
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full border-4 border-light-accent dark:border-dark-matrix flex items-center justify-center">
                                    <span className="text-lg font-bold text-light-accent dark:text-dark-matrix">
                                        {repo.matchScore}%
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text flex items-center space-x-2">
                                <span>{repo.name}</span>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-light-accent dark:text-dark-matrix hover:opacity-80"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </h3>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                {repo.owner?.login || repo.full_name}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-light-text dark:text-dark-text mb-4">
                        {repo.description || 'No description available'}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                        <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{repo.stargazers_count?.toLocaleString() || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <GitFork className="w-4 h-4" />
                            <span>{repo.forks_count?.toLocaleString() || 0}</span>
                        </span>
                        {repo.language && (
                            <span className="flex items-center space-x-1">
                                <Code className="w-4 h-4" />
                                <span>{repo.language}</span>
                            </span>
                        )}
                        {repo.open_issues_count > 0 && (
                            <span className="flex items-center space-x-1 text-light-accent dark:text-dark-matrix">
                                <Users className="w-4 h-4" />
                                <span>{repo.open_issues_count} open issues</span>
                            </span>
                        )}
                    </div>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {repo.topics.slice(0, 5).map((topic, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-light-accent/10 text-light-accent dark:bg-dark-matrix/10 dark:text-dark-matrix"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Reason for recommendation */}
                    {repo.matchReason && (
                        <div className="bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg p-3 border-l-4 border-light-accent dark:border-dark-matrix">
                            <p className="text-sm text-light-text dark:text-dark-text">
                                <span className="font-semibold">Why this matches:</span> {repo.matchReason}
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <button
                    onClick={onToggleSave}
                    className="ml-4 p-2 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary transition-colors"
                    title={isSaved ? 'Remove from saved' : 'Save repository'}
                >
                    {isSaved ? (
                        <BookmarkCheck className="w-6 h-6 text-light-accent dark:text-dark-matrix" />
                    ) : (
                        <Bookmark className="w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Recommendations;
