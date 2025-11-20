import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No books yet",
  message = "Upload your first book to get started reading",
  actionText = "Upload Book",
  onAction,
  icon = "BookOpen"
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-32 h-32 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name={icon} className="w-16 h-16 text-accent" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-primary dark:text-dark-primary">
            {title}
          </h2>
          <p className="text-lg text-secondary dark:text-dark-secondary">
            {message}
          </p>
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-red-600 text-white rounded-lg font-medium text-lg transition-all duration-200 transform hover:scale-105"
          >
            <ApperIcon name="Upload" className="w-5 h-5" />
            {actionText}
          </button>
        )}

        <div className="pt-4 space-y-2 text-sm text-secondary dark:text-dark-secondary">
          <p>Supported formats: PDF, ePub</p>
          <p>Drag and drop files anywhere to upload</p>
        </div>
      </div>
    </div>
  );
};

export default Empty;