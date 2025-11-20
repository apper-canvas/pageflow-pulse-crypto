import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';

const TopNavigation = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
<div className="bg-white shadow-lg mx-8 mt-6 rounded-xl">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Left spacer for alignment */}
        <div className="flex-1"></div>
        
        {/* Centered Search Bar */}
<div className="flex-1 max-w-md mx-8">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search your library..."
            className="w-full shadow-sm"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Notification Bell */}
<button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
            <ApperIcon 
              name="Bell" 
              size={20} 
              className="text-secondary group-hover:text-primary transition-colors duration-200" 
            />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Avatar */}
<button className="flex items-center space-x-2 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <ApperIcon 
                name="User" 
                size={16} 
                className="text-white" 
              />
            </div>
            <ApperIcon 
              name="ChevronDown" 
              size={16} 
              className="text-secondary group-hover:text-primary transition-colors duration-200" 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;