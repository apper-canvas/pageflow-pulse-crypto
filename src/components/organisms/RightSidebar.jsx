import React, { useState, useEffect } from 'react';
import { trendingAuthorsService } from '@/services/api/trendingAuthorsService';
import { popularBlogsService } from '@/services/api/popularBlogsService';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

function RightSidebar() {
  const [trendingAuthors, setTrendingAuthors] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followedAuthors, setFollowedAuthors] = useState(new Set());

  useEffect(() => {
    const loadSidebarContent = async () => {
      try {
        const [authors, blogs] = await Promise.all([
          trendingAuthorsService.getAll(),
          popularBlogsService.getAll()
        ]);
        setTrendingAuthors(authors);
        setPopularBlogs(blogs);
      } catch (error) {
        console.error('Failed to load sidebar content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSidebarContent();
  }, []);

  const handleFollowToggle = (authorId) => {
    setFollowedAuthors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(authorId)) {
        newSet.delete(authorId);
      } else {
        newSet.add(authorId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="w-80 bg-white fixed right-0 top-0 h-screen shadow-lg rounded-l-2xl overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white fixed right-0 top-0 h-screen shadow-lg rounded-l-2xl overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Trending Authors Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Trending Authors</h3>
          <div className="space-y-4">
            {trendingAuthors.map((author) => (
              <div key={author.Id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={author.profileImage}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.booksCount} books</p>
                  </div>
                </div>
                <Button
                  variant={followedAuthors.has(author.Id) ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => handleFollowToggle(author.Id)}
                  className="ml-3 text-xs px-3 py-1 flex-shrink-0"
                >
                  {followedAuthors.has(author.Id) ? 'Following' : 'Follow'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Popular Blogs Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Blogs</h3>
          <div className="space-y-4">
            {popularBlogs.map((blog) => (
              <div key={blog.Id} className="flex items-start space-x-3 group cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-accent transition-colors">
                    {blog.title}
                  </h4>
                  <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.readTime} min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Links */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <button className="w-full text-left text-sm text-accent hover:text-accent/80 font-medium transition-colors">
            View all trending authors
          </button>
          <button className="w-full text-left text-sm text-accent hover:text-accent/80 font-medium transition-colors">
            Explore more blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;