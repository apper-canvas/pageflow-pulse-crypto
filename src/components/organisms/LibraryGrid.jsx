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
case "recentlyAdded":
          return new Date(b.uploadedAt) - new Date(a.uploadedAt);
        case "author":
          return a.author.localeCompare(b.author);
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
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Empty 
            title="Your Library is Empty"
            message="Start building your digital library by uploading your first book"
            actionText="Upload Books"
            onAction={() => setShowUpload(true)}
          />
          
          {showUpload && (
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold text-primary dark:text-dark-primary">
                    Upload New Books
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowUpload(false)}
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
    <div className="min-h-screen bg-stone-50 dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
            <div
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                    <h1
                        className="text-4xl font-serif font-bold text-primary dark:text-dark-primary mb-2">My Library
                                      </h1>
                    <p className="text-lg text-secondary dark:text-dark-secondary">
                        {books.length} {books.length === 1 ? "book" : "books"}in your collection
                                      </p>
                </div>
<Button
                    onClick={() => setShowUpload(!showUpload)}
                    size="sm"
                    className="gap-2 flex-shrink-0 bg-stone-600 hover:bg-stone-700 text-white px-3 py-1.5 text-sm">
                    <ApperIcon name="Plus" className="w-4 h-4" />Upload
                </Button>
            </div>
            {/* Upload Section */}
{showUpload && <div
                className="mb-8 p-6 bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-stone-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="text-xl font-serif font-bold text-primary dark:text-dark-primary">Upload New Books
                                        </h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)}>
                        <ApperIcon name="X" className="w-4 h-4" />
                    </Button>
                </div>
                <FileUpload onUpload={handleUpload} />
            </div>}

            <div className="flex flex-col items-center gap-4 mb-8">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full max-w-md"
                    placeholder="Search by title or author..." />
                <div className="flex items-center gap-2">
                    <span
                        className="text-sm text-secondary dark:text-dark-secondary font-medium whitespace-nowrap">Sort by:
                                    </span>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="bg-surface dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-primary dark:text-dark-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                        <option value="lastRead">Last Read</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="recentlyAdded">Recently Added</option>
                    </select>
                </div>
            </div>
            {/* Results Info */}
            {searchQuery && <div className="mb-6">
                <p className="text-secondary dark:text-dark-secondary">
                    {filteredBooks.length === 0 ? "No books found" : `${filteredBooks.length} ${filteredBooks.length === 1 ? "book" : "books"} found`}for "{searchQuery}"
                                </p>
            </div>}
{/* Books Grid */}
            {filteredBooks.length === 0 && searchQuery ? <div className="text-center py-16">
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
            </div> : <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {filteredBooks.map(book => <BookCard key={book.Id} book={book} onDelete={handleDeleteBook} />)}
            </div>}
        </div>
</div>
    </div>
  );
};

export default LibraryGrid;