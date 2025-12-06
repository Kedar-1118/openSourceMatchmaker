// Loading component using custom bouncing dots loader

const Loading = ({ message = 'Loading...' }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-light-bg-secondary dark:bg-dark-bg">
            <div className="text-center space-y-4">
                <span className="loader"></span>
                <p className="text-light-text dark:text-dark-text font-medium">{message}</p>
            </div>
        </div>
    );
};

export default Loading;
