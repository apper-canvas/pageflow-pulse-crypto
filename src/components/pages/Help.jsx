import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import RightSidebar from '@/components/organisms/RightSidebar';

const Help = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'Home', path: '/' },
    { id: 'discover', label: 'Discover', icon: 'Compass', path: '/discover' },
    { id: 'bookmark', label: 'Bookmark', icon: 'Bookmark', path: '/bookmarks' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'help', label: 'Help', icon: 'HelpCircle', path: '/help' },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I add books to my library?',
      answer: 'You can add books to your library by browsing the Discover section, searching for specific titles, or uploading your own PDF/EPUB files. Simply click on any book and select "Add to Library" to save it to your collection.'
    },
    {
      id: 2,
      question: 'How do I bookmark pages while reading?',
      answer: 'While reading any book, you can bookmark pages by clicking the bookmark icon in the reading interface. All your bookmarks will be saved and accessible from the Bookmarks section in the sidebar.'
    },
    {
      id: 3,
      question: 'Can I customize the reading experience?',
      answer: 'Yes! Visit the Settings page to customize font size, theme (light/dark/sepia), font family, and line spacing to create your perfect reading environment.'
    },
    {
      id: 4,
      question: 'How do I track my reading progress?',
      answer: 'PageFlow automatically tracks your reading progress as you read. You can view your progress in the library, and it will sync across all your devices.'
    },
    {
      id: 5,
      question: 'What file formats are supported?',
      answer: 'PageFlow supports PDF, EPUB, and TXT file formats. You can upload these files directly to your library for reading.'
    },
    {
      id: 6,
      question: 'How do I get book recommendations?',
      answer: 'Our recommendation system suggests books based on your reading history, bookmarks, and preferences. You can find personalized recommendations in the Discover section.'
    }
  ];

  const quickActions = [
    { icon: 'BookOpen', title: 'Browse Library', description: 'Explore your personal book collection', action: () => navigate('/') },
    { icon: 'Compass', title: 'Discover Books', description: 'Find new books to read', action: () => navigate('/discover') },
    { icon: 'Settings', title: 'Adjust Settings', description: 'Customize your reading experience', action: () => navigate('/settings') },
    { icon: 'Mail', title: 'Contact Support', description: 'Get in touch with our team', action: () => console.log('Contact support') }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching help for:', searchQuery);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Help & Support</h1>
              <p className="text-slate-600 mt-1">Get help with PageFlow features and troubleshooting</p>
            </div>
            <ApperIcon name="HelpCircle" className="w-8 h-8 text-slate-400" />
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
            <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </form>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-8">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 text-left"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name={action.icon} className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-slate-600">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="font-medium text-slate-900">{faq.question}</h3>
                    <ApperIcon 
                      name={openFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                      className="w-5 h-5 text-slate-400" 
                    />
                  </button>
                  
                  {openFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <ApperIcon name="Search" className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600">No help articles found matching "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8">
            <div className="text-center">
              <ApperIcon name="Mail" className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Still need help?</h3>
              <p className="text-slate-600 mb-6">Our support team is here to assist you with any questions or issues.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200">
                  Contact Support
                </button>
                <button className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-white transition-colors duration-200">
                  Community Forum
                </button>
              </div>
            </div>
          </div>

          {/* Version Info */}
          <div className="text-center text-sm text-slate-400">
            <p>PageFlow v1.0.0 | Last updated: January 2024</p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default Help;