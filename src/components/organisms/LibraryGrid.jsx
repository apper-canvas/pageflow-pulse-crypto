import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bookService } from "@/services/api/bookService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import FileUpload from "@/components/molecules/FileUpload";
import BookCard from "@/components/molecules/BookCard";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import ErrorView from "@/components/ui/ErrorView";
import Library from "@/components/pages/Library";
import Button from "@/components/atoms/Button";

const LibraryGrid = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lastRead"); // lastRead, title, author, recentlyAdded
  const [showUpload, setShowUpload] = useState(false);
  useEffect(() => {
    loadBooks();
  }, []);

const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err) {
      console.error("Error loading books:", err);
      setError("Failed to load your library. Please try again.");
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
    .filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
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

  if (loading) {
    return <Loading type="library" />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadBooks} />;
  }

  if (books.length === 0) {
return (
<div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Empty
            title="Your Library is Empty"
            message="Start building your digital library by uploading your first book"
            actionText="Upload Books"
            onAction={() => setShowUpload(true)}
          />
          
{showUpload && (
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-stone-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-dark-primary">
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
<div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
<div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-slate-800 dark:text-dark-primary mb-3 tracking-tight">
                        My Library
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-dark-secondary">
                        {books.length} {books.length === 1 ? "book" : "books"} in your collection
                    </p>
                </div>
                <div className="relative">
                    <Button
                        onClick={() => setShowUpload(!showUpload)}
                        size="lg"
                        className="gap-3 flex-shrink-0 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                        <ApperIcon name="Plus" className="w-5 h-5" />
                        Add Books
                    </Button>
                </div>
            </div>
            {/* Upload Section */}
            {showUpload && <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-dark-primary">
                        Upload New Books
                    </h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)} className="hover:bg-slate-100 rounded-lg p-2">
                        <ApperIcon name="X" className="w-5 h-5" />
                    </Button>
                </div>
                <FileUpload onUpload={handleUpload} />
            </div>}

            <div className="flex flex-col items-center gap-6 mb-8">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full max-w-2xl mx-auto"
                    placeholder="Search your library..." />
                <div className="flex items-center gap-4 bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                    <span className="text-sm text-slate-600 dark:text-dark-secondary font-medium whitespace-nowrap">
                        Sort by:
                    </span>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="bg-transparent border-none text-sm text-slate-800 dark:text-dark-primary focus:outline-none font-medium cursor-pointer">
                        <option value="lastRead">Last Read</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="recentlyAdded">Recently Added</option>
                    </select>
                    <ApperIcon name="ChevronDown" className="w-4 h-4 text-slate-400" />
                </div>
            </div>
            {/* Results Info */}
            {searchQuery && <div className="mb-6">
                <p className="text-secondary dark:text-dark-secondary">
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
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-16">
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