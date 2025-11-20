import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();
  
  const handleOpenBook = () => {
    navigate(`/reader/${book.Id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(book.Id);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

const progressPercentage = book.currentPage > 0 ? (book.currentPage / book.totalPages) * 100 : 0;
// Default book cover placeholder with title
const defaultCover = `data:image/svg+xml,%3Csvg width='300' height='450' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='450' fill='%23f8f9fa' stroke='%23e0e0e0' stroke-width='2'/%3E%3Cg transform='translate(150,225)'%3E%3Ctext x='0' y='-30' text-anchor='middle' font-family='serif' font-size='16' fill='%23666' font-weight='bold'%3E${encodeURIComponent(book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title)}%3C/text%3E%3Ctext x='0' y='-10' text-anchor='middle' font-family='serif' font-size='12' fill='%23999'%3E${encodeURIComponent(book.author)}%3C/text%3E%3Ctext x='0' y='30' text-anchor='middle' font-family='serif' font-size='14' fill='%23aaa'%3EBook Cover%3C/text%3E%3C/g%3E%3C/svg%3E`;
  
  const handleImageError = (e) => {
    e.target.src = defaultCover;
  };
  return (
<div className="group book-card cursor-pointer">
      <div onClick={handleOpenBook} className="block">
        {/* Book Cover */}
        <div
            className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg hover:shadow-xl bg-white dark:bg-dark-surface transition-all duration-300 border border-stone-200 dark:border-gray-600">
            <img
                src={book.coverUrl || defaultCover}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError} />
        </div>
{/* Delete button */}
        <div
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
                onClick={handleDelete}
                className="w-7 h-7 bg-stone-600 hover:bg-stone-700 text-white rounded-full flex items-center justify-center shadow-md transition-colors duration-200"
                title="Delete book">
                <ApperIcon name="Trash2" className="w-3 h-3" />
            </button>
        </div>
        {/* File type badge */}
        <div className="absolute top-2 left-2">
            <span
                className={cn(
                    "text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wide",
                    book.fileType === "pdf" ? "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300" : "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                )}>
                {book.fileType}
            </span>
        </div>
    </div>
    {/* Book Title and Author */}
<div className="mt-4 space-y-1">
        <h3
            className="font-serif font-bold text-lg leading-tight text-stone-800 dark:text-dark-primary line-clamp-2 group-hover:text-stone-600 transition-colors duration-200">
            {book.title}
        </h3>
        <p className="text-sm text-stone-400 dark:text-dark-secondary font-medium">
            {book.author}
        </p>
        {/* Progress Bar at bottom of card */}
{book.currentPage > 0 && (
          <div className="mt-3">
            <div className="w-full bg-stone-200 dark:bg-gray-700 rounded-full h-3">
                <div
                    className="bg-stone-600 dark:bg-accent rounded-full h-3 transition-all duration-300"
                    style={{
                        width: `${progressPercentage}%`
                    }}
                    title={`${Math.round(progressPercentage)}% complete`} />
            </div>
          </div>
        )}
    </div>
</div>
  );
};

export default BookCard;