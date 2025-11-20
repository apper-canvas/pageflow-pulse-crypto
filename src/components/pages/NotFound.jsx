import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center px-8">
      <div className="text-center space-y-8 max-w-md">
        <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="BookX" className="w-16 h-16 text-accent" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-serif font-bold text-primary dark:text-dark-primary">
            404
          </h1>
          <h2 className="text-2xl font-serif font-bold text-primary dark:text-dark-primary">
            Page Not Found
          </h2>
          <p className="text-lg text-secondary dark:text-dark-secondary">
            The page you're looking for seems to have wandered off into another chapter.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Return to Library
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => window.history.back()}
            size="lg"
            className="gap-2"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        <div className="pt-8 text-sm text-secondary dark:text-dark-secondary">
          <p>Lost in your reading journey?</p>
          <p>Your library is always here to welcome you back.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;