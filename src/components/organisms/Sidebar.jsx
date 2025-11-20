import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = () => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'discover', label: 'Discover', icon: 'Search' },
    { id: 'bookmark', label: 'Bookmark', icon: 'Bookmark' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'help', label: 'Help', icon: 'HelpCircle' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg rounded-r-lg z-40">
      {/* App Logo */}
      <div className="flex items-center justify-center p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="BookOpen" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-primary">PageFlow</h1>
            <p className="text-xs text-secondary">Digital Library</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                <ApperIcon 
                  name={item.icon} 
                  size={20} 
                  className="text-secondary group-hover:text-primary transition-colors duration-200" 
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-stone-50 to-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center">
              <ApperIcon name="Sparkles" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-primary">Reading Progress</p>
              <p className="text-xs text-secondary">Keep exploring!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;