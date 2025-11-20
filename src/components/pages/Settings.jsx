import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import RightSidebar from '@/components/organisms/RightSidebar';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      newBooks: true,
      recommendations: true,
      readingReminders: false
    },
    reading: {
      fontSize: 'medium',
      theme: 'light',
      lineSpacing: 'normal',
      fontFamily: 'serif'
    },
    privacy: {
      profileVisible: true,
      readingProgressVisible: false,
      allowAnalytics: true
    }
  });

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'Home', path: '/' },
    { id: 'discover', label: 'Discover', icon: 'Compass', path: '/discover' },
    { id: 'bookmark', label: 'Bookmark', icon: 'Bookmark', path: '/bookmarks' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'help', label: 'Help', icon: 'HelpCircle', path: '/help' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };

  const handleSelect = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
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
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="text-slate-600 mt-1">Customize your reading experience</p>
            </div>
            <ApperIcon name="Settings" className="w-8 h-8 text-slate-400" />
          </div>
        </div>

        {/* Settings Content */}
        <div className="px-8 py-6 space-y-8">
          {/* Account Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <ApperIcon name="User" className="w-6 h-6 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Account</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Profile Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <ApperIcon name="Bell" className="w-6 h-6 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-slate-500">
                      {key === 'email' && 'Receive notifications via email'}
                      {key === 'push' && 'Receive push notifications'}
                      {key === 'newBooks' && 'Get notified about new book releases'}
                      {key === 'recommendations' && 'Receive book recommendations'}
                      {key === 'readingReminders' && 'Get reminded to continue reading'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('notifications', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
                      value ? 'bg-slate-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Preferences */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Reading Preferences</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Font Size</label>
                <select
                  value={settings.reading.fontSize}
                  onChange={(e) => handleSelect('reading', 'fontSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
                <select
                  value={settings.reading.theme}
                  onChange={(e) => handleSelect('reading', 'theme', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="sepia">Sepia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Font Family</label>
                <select
                  value={settings.reading.fontFamily}
                  onChange={(e) => handleSelect('reading', 'fontFamily', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="serif">Serif</option>
                  <option value="sans-serif">Sans Serif</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <ApperIcon name="Shield" className="w-6 h-6 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Privacy</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-slate-500">
                      {key === 'profileVisible' && 'Make your profile visible to other users'}
                      {key === 'readingProgressVisible' && 'Share your reading progress publicly'}
                      {key === 'allowAnalytics' && 'Help improve the app with usage analytics'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('privacy', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
                      value ? 'bg-slate-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default Settings;