import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import RightSidebar from '@/components/organisms/RightSidebar';

const Bookmarks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState('all');

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'Home', path: '/' },
    { id: 'discover', label: 'Discover', icon: 'Compass', path: '/discover' },
    { id: 'bookmark', label: 'Bookmark', icon: 'Bookmark', path: '/bookmarks' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'help', label: 'Help', icon: 'HelpCircle', path: '/help' },
  ];

  const filters = [
    { id: 'all', label: 'All Bookmarks' },
    { id: 'recent', label: 'Recently Added' },
    { id: 'reading', label: 'Currently Reading' },
    { id: 'completed', label: 'Completed' }
  ];

  const bookmarks = [
    { 
      id: 1, 
      title: 'JavaScript: The Good Parts', 
      author: 'Douglas Crockford', 
      progress: 65, 
      status: 'reading',
      addedDate: '2024-01-15',
      category: 'Programming'
    },
    { 
      id: 2, 
      title: 'Clean Code', 
      author: 'Robert C. Martin', 
      progress: 100, 
      status: 'completed',
      addedDate: '2024-01-10',
      category: 'Programming'
    },
    { 
      id: 3, 
      title: 'The Art of War', 
      author: 'Sun Tzu', 
      progress: 0, 
      status: 'bookmarked',
      addedDate: '2024-01-20',
      category: 'Philosophy'
    }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    if (filter === 'all') return true;
    if (filter === 'recent') return new Date(bookmark.addedDate) > new Date('2024-01-15');
    if (filter === 'reading') return bookmark.status === 'reading';
    if (filter === 'completed') return bookmark.status === 'completed';
    return true;
  });

  const handleRemoveBookmark = (id) => {
    // Remove bookmark functionality would be implemented here
    console.log('Removing bookmark:', id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg rounded-xl z-10">
        <div className="flex flex-col h-full">
          {/* App Logo */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-800">PageFlow</h1>
                <p className="text-sm text-slate-500">Digital Library</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = item.path === location.pathname;
                
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
          <div className="p-6 border-t border-slate-100">
            <div className="text-xs text-slate-400 text-center">
              © 2024 PageFlow
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 mr-80 min-h-screen">
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Bookmarks</h1>
              <p className="text-slate-600 mt-1">Keep track of your saved books</p>
            </div>
            <ApperIcon name="Bookmark" className="w-8 h-8 text-slate-400" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-8 py-4 bg-white border-b border-gray-100">
          <div className="flex space-x-8">
            {filters.map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`pb-3 px-2 text-sm font-medium transition-colors duration-200 ${
                  filter === filterOption.id
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {filteredBookmarks.length > 0 ? (
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                        <ApperIcon name="BookOpen" className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{bookmark.title}</h3>
                          <button
                            onClick={() => handleRemoveBookmark(bookmark.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <ApperIcon name="X" className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">by {bookmark.author}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-slate-500 mb-3">
                          <span className="bg-slate-100 px-2 py-1 rounded-md text-xs font-medium">
                            {bookmark.category}
                          </span>
                          <span>Added {new Date(bookmark.addedDate).toLocaleDateString()}</span>
                        </div>

                        {bookmark.progress > 0 && (
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${bookmark.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600">
                              {bookmark.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      bookmark.status === 'completed' 
                        ? 'bg-green-100 text-green-700'
                        : bookmark.status === 'reading'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {bookmark.status === 'completed' ? 'Completed' : 
                       bookmark.status === 'reading' ? 'Currently Reading' : 'Bookmarked'}
                    </span>
                    
                    <button className="text-slate-600 hover:text-slate-800 text-sm font-medium px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
                      {bookmark.status === 'reading' ? 'Continue Reading' : 'Start Reading'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ApperIcon name="Bookmark" className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No bookmarks found</h3>
              <p className="text-slate-500 mb-6">Start exploring books and add them to your bookmarks!</p>
              <button 
                onClick={() => navigate('/discover')}
                className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                Discover Books
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default Bookmarks;