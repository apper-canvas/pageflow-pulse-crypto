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

const progressPercentage = (book.currentPage / book.totalPages) * 100;
  
// Default book cover placeholder - proper book cover design
  const defaultCover = "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=450&fit=crop&auto=format&q=80";
  
  const handleImageError = (e) => {
    e.target.src = defaultCover;
  };
  return (
<div className="group book-card cursor-pointer">
    <div onClick={handleOpenBook} className="block">
        {/* Book Cover */}
        <div
            className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg hover:shadow-xl bg-white dark:bg-dark-surface transition-all duration-300">
            <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError} />
        </div>
        {/* Delete button */}
        <div
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
                onClick={handleDelete}
                className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                title="Delete book">
                <ApperIcon name="Trash2" className="w-3 h-3" />
            </button>
        </div>
        {/* File type badge */}
        <div className="absolute top-2 left-2">
            <span
                className={cn(
                    "text-xs px-1.5 py-0.5 rounded font-medium uppercase tracking-wide opacity-80",
                    book.fileType === "pdf" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                )}>
                {book.fileType}
            </span>
        </div>
    </div>
    {/* Book Title and Author */}
    <div className="mt-4 space-y-2">
        <h3
            className="font-serif font-bold text-base leading-tight text-primary dark:text-dark-primary line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {book.title}
        </h3>
        <p className="text-sm text-stone-600 dark:text-dark-secondary">
            {book.author}
        </p>
        {/* Progress Bar at bottom of card */}
        {book.currentPage > 1 && <div className="mt-3">
            <div className="w-full bg-stone-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                    className="bg-stone-600 dark:bg-accent rounded-full h-1.5 transition-all duration-300"
                    style={{
                        width: `${progressPercentage}%`
                    }}
                    title={`${Math.round(progressPercentage)}% complete`} />
            </div>
        </div>}
    </div>
</div>
  );
};

export default BookCard;