import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { bookService } from "@/services/api/bookService";
import ApperIcon from "@/components/ApperIcon";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Library from "@/components/pages/Library";
import Button from "@/components/atoms/Button";
import Slider from "@/components/atoms/Slider";
const BookReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  // Book and content state
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState("");

  // UI state
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const hideControlsTimeoutRef = useRef(null);

  // Reading settings
  const [settings, setSettings] = useState({
    theme: "light",
    fontSize: 18,
    lineSpacing: 1.8,
    pageWidth: 700
  });

// Auto-hide controls after inactivity
  const resetControlsTimeout = useCallback(() => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    
    setShowControls(true);
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (!showSettings) {
        setShowControls(false);
      }
    }, 3000);
  }, [showSettings]);

  // Mouse and touch activity handlers
  useEffect(() => {
    const handleActivity = () => resetControlsTimeout();
    
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('touchstart', handleActivity);
    document.addEventListener('click', handleActivity);
    
    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('touchstart', handleActivity);
      document.removeEventListener('click', handleActivity);
    };
  }, [resetControlsTimeout]);

  // Load book and settings on mount
  useEffect(() => {
    loadBook();
    loadSettings();
    resetControlsTimeout();
  }, [bookId, resetControlsTimeout]);

// Load content for current page
  useEffect(() => {
    if (book && book.content) {
      const pageContent = book.content[currentPage.toString()] || "Page content not available.";
      setContent(pageContent);
    }
  }, [book, currentPage]);

  // Touch/Swipe handling for mobile
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swiped left - next page
        goToNextPage();
      } else {
        // Swiped right - previous page
        goToPreviousPage();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }, []);

  useEffect(() => {
    const contentArea = document.getElementById('reader-content');
    if (contentArea) {
      contentArea.addEventListener('touchstart', handleTouchStart);
      contentArea.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        contentArea.removeEventListener('touchstart', handleTouchStart);
        contentArea.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchEnd]);

// Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showSettings) return;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goToPreviousPage();
          break;
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          goToNextPage();
          break;
        case "Home":
          e.preventDefault();
          goToPage(1);
          break;
        case "End":
          e.preventDefault();
          goToPage(book?.totalPages || 1);
          break;
        case "Escape":
          navigate("/");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [book, currentPage, showSettings, navigate]);

  // Load book data
const loadBook = async () => {
    if (!bookId) {
      setError("No book ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const bookData = await bookService.getById(parseInt(bookId));
      setBook(bookData);
      setCurrentPage(bookData.currentPage || 1);
    } catch (err) {
      console.error("Error loading book:", err);
      setError("Failed to load book. Please try again.");
    } finally {
      setLoading(false);
    }
  };
const loadSettings = async () => {
    try {
      const savedSettings = await bookService.getSettings();
      setSettings(savedSettings);
      
      // Apply theme
      if (savedSettings.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (err) {
      console.error("Error loading settings:", err);
    }
  };
const saveReadingPosition = useCallback(async (page) => {
    if (!book) return;
    
    try {
      await bookService.updateReadingPosition(book.Id, page);
    } catch (err) {
      console.error("Error saving reading position:", err);
    }
  }, [book]);

  // Navigation functions
const goToPage = useCallback((page) => {
    if (!book || page < 1 || page > book.totalPages) return;
    
    setCurrentPage(page);
    saveReadingPosition(page);
    resetControlsTimeout();
  }, [book, saveReadingPosition, resetControlsTimeout]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < (book?.totalPages || 1)) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, book?.totalPages, goToPage]);

  // Settings management
const updateSettings = async (newSettings) => {
    try {
      setSettings(newSettings);
      await bookService.saveSettings(newSettings);
      
      // Apply theme
      if (newSettings.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      toast.success("Settings saved", { autoClose: 2000 });
    } catch (err) {
      console.error("Error saving settings:", err);
      toast.error("Failed to save settings");
    }
  };

  const handleThemeChange = (theme) => {
    updateSettings({ ...settings, theme });
  };
// Calculate progress
  const progressPercentage = book ? (currentPage / book.totalPages) * 100 : 0;

  // Loading state
  if (loading) {
    return <Loading type="reader" />;
  }

  // Error state
  if (error) {
    return <ErrorView message={error} onRetry={loadBook} />;
  }

  // No book found
  if (!book) {
    return <ErrorView message="Book not found" showRetry={false} />;
  }

  return (
<div className="min-h-screen theme-transition reading-surface">
      {/* Top Controls */}
      <div className={`fixed top-0 left-0 right-0 z-50 reader-ui ${showControls ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        <div className="bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2 flex-shrink-0"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                <span className="hidden sm:inline">Library</span>
              </Button>
              
              <div className="min-w-0 flex-1">
                <h1 className="font-serif font-bold text-base sm:text-lg text-primary dark:text-dark-primary truncate">
                  {book.title}
                </h1>
                <p className="text-xs sm:text-sm text-secondary dark:text-dark-secondary truncate">
                  by {book.author}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-2 text-sm text-secondary dark:text-dark-secondary">
                <span>Page {currentPage} of {book.totalPages}</span>
                <span>•</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                title="Reading Settings"
              >
                <ApperIcon name="Settings" className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              <ThemeToggle onThemeChange={handleThemeChange} />
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full bg-accent transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-4 sm:right-6 z-50 bg-surface dark:bg-dark-surface rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-72 sm:w-80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-lg text-primary dark:text-dark-primary">
              Reading Settings
            </h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowSettings(false)}
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-primary dark:text-dark-primary mb-3">
                Font Size: {settings.fontSize}px
              </label>
              <Slider
                min={14}
                max={24}
                step={1}
                value={settings.fontSize}
                onChange={(value) => updateSettings({ ...settings, fontSize: value })}
              />
            </div>

            {/* Line Spacing */}
            <div>
              <label className="block text-sm font-medium text-primary dark:text-dark-primary mb-3">
                Line Spacing: {settings.lineSpacing}
              </label>
              <Slider
                min={1.2}
                max={2.4}
                step={0.1}
                value={settings.lineSpacing}
                onChange={(value) => updateSettings({ ...settings, lineSpacing: value })}
              />
            </div>

            {/* Page Width */}
            <div>
              <label className="block text-sm font-medium text-primary dark:text-dark-primary mb-3">
                Page Width: {settings.pageWidth}px
              </label>
              <Slider
                min={500}
                max={900}
                step={50}
                value={settings.pageWidth}
                onChange={(value) => updateSettings({ ...settings, pageWidth: value })}
              />
            </div>
</div>
        </div>
      )}

      {/* Navigation Arrows */}
      {/* Navigation Arrows */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage <= 1}
        className={`fixed left-0 top-0 bottom-0 w-16 sm:w-20 z-40 flex items-center justify-center reader-ui transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        } disabled:opacity-20 hover:bg-black/5 dark:hover:bg-white/5 disabled:cursor-not-allowed`}
        title="Previous page (← or ↑)"
      >
        <ApperIcon name="ChevronLeft" className="w-6 h-6 sm:w-8 sm:h-8 text-primary dark:text-dark-primary" />
      </button>

      <button
        onClick={goToNextPage}
        disabled={currentPage >= book.totalPages}
        className={`fixed right-0 top-0 bottom-0 w-16 sm:w-20 z-40 flex items-center justify-center reader-ui transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        } disabled:opacity-20 hover:bg-black/5 dark:hover:bg-white/5 disabled:cursor-not-allowed`}
        title="Next page (→, ↓, or Space)"
      >
        <ApperIcon name="ChevronRight" className="w-6 h-6 sm:w-8 sm:h-8 text-primary dark:text-dark-primary" />
      </button>

      {/* Main Content */}
      <div 
        id="reader-content"
        className="px-4 sm:px-6 py-16 sm:py-20 min-h-screen cursor-pointer select-text"
        onClick={resetControlsTimeout}
      >
        <div 
          className="mx-auto reading-text"
          style={{ 
            maxWidth: `${settings.pageWidth}px`,
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineSpacing
          }}
        >
          <div className="prose prose-lg max-w-none text-primary dark:text-dark-primary">
            {content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                <p key={index} className="mb-6 text-justify">
                  {paragraph.trim()}
                </p>
              ) : (
                <div key={index} className="h-4" />
              )
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 reader-ui ${showControls ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        <div className="bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              className="flex-shrink-0"
            >
              <ApperIcon name="ChevronLeft" className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-2 sm:gap-3 text-sm text-secondary dark:text-dark-secondary">
              <span className="hidden sm:inline">Page</span>
              <input
                type="number"
                min={1}
                max={book.totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= book.totalPages) {
                    goToPage(page);
                  }
                }}
                className="w-14 sm:w-16 px-2 py-1 text-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-primary dark:text-dark-primary focus:border-accent focus:outline-none text-sm"
              />
              <span>of {book.totalPages}</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage >= book.totalPages}
              className="flex-shrink-0"
            >
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Mobile progress info */}
          <div className="sm:hidden text-center mt-2 text-xs text-secondary dark:text-dark-secondary">
            {Math.round(progressPercentage)}% complete
          </div>
        </div>
      </div>
</div>
  );
};

export default BookReader;