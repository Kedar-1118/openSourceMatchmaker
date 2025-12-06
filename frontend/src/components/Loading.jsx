import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'Loading...' }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-light-bg-secondary dark:bg-dark-bg">
            <div className="text-center space-y-4 animate-pulse">
                <Loader2 className="w-12 h-12 animate-spin text-light-accent dark:text-dark-primary mx-auto" />
                <p className="text-light-text dark:text-dark-text font-medium">{message}</p>
            </div>
        </div>
    );
};

export default Loading;
