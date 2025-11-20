import React from "react";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true 
}) => {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-primary dark:text-dark-primary">
            Oops! Something went wrong
          </h2>
          <p className="text-secondary dark:text-dark-secondary">
            {message}
          </p>
        </div>

        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            Try Again
          </button>
        )}

        <p className="text-sm text-secondary dark:text-dark-secondary">
          If this problem persists, please try refreshing the page.
        </p>
      </div>
    </div>
  );
};

export default ErrorView;