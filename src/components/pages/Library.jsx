import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { bookService } from "@/services/api/bookService";
import RightSidebar from "@/components/organisms/RightSidebar";
import ApperIcon from "@/components/ApperIcon";
import LibraryGrid from "@/components/organisms/LibraryGrid";
const Library = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [activeTab, setActiveTab] = useState('popular');

  const tabs = [
    { id: 'popular', label: 'Popular' },
    { id: 'top-selling', label: 'Top Selling' },
    { id: 'following', label: 'Following' },
    { id: 'new', label: 'New' }
  ];
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'Home', path: '/' },
    { id: 'discover', label: 'Discover', icon: 'Compass', path: '/discover' },
    { id: 'bookmark', label: 'Bookmark', icon: 'Bookmark', path: '/bookmarks' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'help', label: 'Help', icon: 'HelpCircle', path: '/help' },
  ];

  const handleMenuClick = (path) => {
    if (path === '/') {
      // Already on home/library page
      return;
    }
    navigate(path);
  };

  return (
<div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
<div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg rounded-r-2xl z-10">
        <div className="flex flex-col h-full">
          {/* App Logo */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-slate-800">PageFlow</h1>
                <p className="text-sm text-slate-500">Digital Library</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-100 text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <ApperIcon 
                      name={item.icon} 
                      className={`w-5 h-5 ${isActive ? 'text-slate-700' : 'text-slate-500'}`} 
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100">
            <div className="text-xs text-slate-400 text-center">
              © 2024 PageFlow
            </div>
          </div>
        </div>
      </div>

{/* Main Content */}
      <div className="flex-1 ml-64 mr-80">
        {/* Tab Bar */}
        <div className="px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 px-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <LibraryGrid activeTab={activeTab} />
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default Library;