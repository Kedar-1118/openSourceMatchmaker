import { Star, GitFork, ExternalLink, Code, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAddSavedRepo, useRemoveSavedRepo, useSavedRepos } from '../hooks/useApi';

const RepoCard = ({ repo }) => {
    const { data: savedReposData } = useSavedRepos();
    const addSaved = useAddSavedRepo();
    const removeSaved = useRemoveSavedRepo();

    // Extract repositories array from API response
    const savedRepos = savedReposData?.repositories || [];
    const isSaved = savedRepos.some(saved =>
        saved.id === repo.id ||
        (saved.full_name && repo.full_name && saved.full_name === repo.full_name) ||
        (saved.fullName && repo.fullName && saved.fullName === repo.fullName)
    );

    const handleToggleSave = () => {
        if (isSaved) {
            removeSaved.mutate(repo);
        } else {
            addSaved.mutate(repo);
        }
    };

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
                                    href={repo.htmlUrl || repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-light-accent dark:text-dark-matrix hover:opacity-80"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </h3>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                {repo.owner?.login || repo.fullName || repo.full_name}
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
                            <span>{(repo.stargazersCount || repo.stargazers_count || 0).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <GitFork className="w-4 h-4" />
                            <span>{(repo.forksCount || repo.forks_count || 0).toLocaleString()}</span>
                        </span>
                        {repo.language && (
                            <span className="flex items-center space-x-1">
                                <Code className="w-4 h-4" />
                                <span>{repo.language}</span>
                            </span>
                        )}
                        {(repo.openIssuesCount || repo.open_issues_count || 0) > 0 && (
                            <span className="flex items-center space-x-1 text-light-accent dark:text-dark-matrix">
                                <Users className="w-4 h-4" />
                                <span>{repo.openIssuesCount || repo.open_issues_count} open issues</span>
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
                    onClick={handleToggleSave}
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

export default RepoCard;
