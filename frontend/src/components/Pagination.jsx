import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5 text-light-text dark:text-dark-text" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-light-text-secondary dark:text-dark-text-secondary"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                                    ? 'bg-light-accent dark:bg-dark-primary text-white'
                                    : 'bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5 text-light-text dark:text-dark-text" />
            </button>

            {/* Page Info */}
            <span className="ml-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Page {currentPage} of {totalPages}
            </span>
        </div>
    );
};

export default Pagination;
