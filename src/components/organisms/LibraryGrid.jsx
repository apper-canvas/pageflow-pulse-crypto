import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bookService from "@/services/api/bookService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import FileUpload from "@/components/molecules/FileUpload";
import BookCard from "@/components/molecules/BookCard";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import ErrorView from "@/components/ui/ErrorView";
import Library from "@/components/pages/Library";
import Button from "@/components/atoms/Button";

const LibraryGrid = ({ activeTab }) => {
const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lastRead"); // lastRead, title, author, recentlyAdded
  const [showUpload, setShowUpload] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
useEffect(() => {
    loadBooks();
  }, [activeTab]);

// Extract unique genres from books
  const getUniqueGenres = (books) => {
    const genres = books.flatMap(book => book.genres || []);
    return ["all", ...new Set(genres)];
  };

const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");
      let data;
      
      // Fetch different data based on active tab
      switch (activeTab) {
        case 'popular':
          data = await bookService.getPopular();
          break;
        case 'topSelling':
          data = await bookService.getTopSelling();
          break;
        case 'following':
          data = await bookService.getFollowing();
          break;
        case 'new':
          data = await bookService.getNew();
          break;
        default:
          data = await bookService.getAll();
      }
      
      setBooks(data);
    } catch (err) {
      console.error(`Error loading ${activeTab} books:`, err);
      setError(`Failed to load ${activeTab} books. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (bookData) => {
    try {
      const newBook = await bookService.create(bookData);
      setBooks(prev => [newBook, ...prev]);
      setShowUpload(false);
      toast.success("Book added to your library!");
    } catch (err) {
      console.error("Error uploading book:", err);
      throw err;
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      return;
    }

    try {
      await bookService.delete(bookId);
      setBooks(prev => prev.filter(book => book.Id !== bookId));
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error("Error deleting book:", err);
      toast.error("Failed to delete book. Please try again.");
    }
  };

const filteredBooks = books
    .filter(book => {
      // Genre filter
      const matchesGenre = selectedGenre === "all" || 
        (book.genres && book.genres.includes(selectedGenre));
      
      // Search filter
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesGenre && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "recentlyAdded":
          return new Date(b.uploadedAt) - new Date(a.uploadedAt);
        case "lastRead":
        default:
          const aLastRead = a.lastReadAt ? new Date(a.lastReadAt) : new Date(0);
          const bLastRead = b.lastReadAt ? new Date(b.lastReadAt) : new Date(0);
          return bLastRead - aLastRead;
      }
    });

  const uniqueGenres = getUniqueGenres(books);

  if (loading) {
    return <Loading type="library" />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadBooks} />;
  }

  if (books.length === 0) {
return (
      <div className="min-h-screen bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Empty
            title="Your Library is Empty"
            message="Start building your digital library by uploading your first book"
            actionText="Upload Books"
            onAction={() => setShowUpload(true)}
          />
          
{showUpload && (
          <div className="mt-8 max-w-2xl mx-auto">
              <div className="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-stone-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-center justify-between mb-6">
<h2 className="text-2xl font-semibold text-stone-800 dark:text-dark-primary">
              Upload New Books
            </h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowUpload(false)}
                    className="hover:bg-stone-100/50 rounded-full"
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                  </Button>
                </div>
                <FileUpload onUpload={handleUpload} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
<div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800 mb-2">
                My Library
              </h1>
              <p className="text-slate-500">
                {books.length} {books.length === 1 ? "book" : "books"} in your collection
              </p>
            </div>
            <div className="relative">
              <Button
                onClick={() => setShowUpload(!showUpload)}
                size="lg"
                className="gap-2 flex-shrink-0 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                <ApperIcon name="Plus" className="w-4 h-4" />
                Add Books
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                Upload New Books
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)} className="hover:bg-gray-200 rounded-xl p-2">
                <ApperIcon name="X" className="w-4 h-4" />
              </Button>
            </div>
            <FileUpload onUpload={handleUpload} />
          </div>
        )}

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            className="w-full max-w-md shadow-sm"
            placeholder="Search your library..." 
          />
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border">
            <span className="text-sm text-slate-600 font-medium whitespace-nowrap">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-transparent border-none text-sm text-slate-800 focus:outline-none font-medium cursor-pointer">
              <option value="lastRead">Last Read</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="recentlyAdded">Recently Added</option>
            </select>
            <ApperIcon name="ChevronDown" className="w-4 h-4 text-slate-400" />
          </div>
        </div>
            {/* Results Info */}
{searchQuery && <div className="mb-8">
            <p className="text-slate-500 dark:text-dark-secondary">
              {filteredBooks.length === 0 ? "No books found" : `${filteredBooks.length} ${filteredBooks.length === 1 ? "book" : "books"} found`} for "{searchQuery}"
            </p>
            </div>}
{/* Books Grid */}
            {filteredBooks.length === 0 && searchQuery ? (
                <div className="text-center py-16">
                    <ApperIcon
                        name="Search"
                        className="w-16 h-16 text-secondary dark:text-dark-secondary mx-auto mb-4" />
                    <h3
                        className="text-xl font-serif font-bold text-primary dark:text-dark-primary mb-2">No books found
                    </h3>
                    <p className="text-secondary dark:text-dark-secondary">Try adjusting your search terms or browse all books
                    </p>
                    <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-4">Show All Books
                    </Button>
                </div>
            ) : (
<div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-12">
            {filteredBooks.map(book => <BookCard key={book.Id} book={book} onDelete={handleDeleteBook} />)}
          </div>
        </div>
            )}
</div>
</div>
    </div>
  );
};

export default LibraryGrid;