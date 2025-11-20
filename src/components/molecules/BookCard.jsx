import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

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

  return (
    <div className="group book-card bg-surface dark:bg-dark-surface rounded-lg shadow-md hover:shadow-xl cursor-pointer overflow-hidden">
      <div onClick={handleOpenBook} className="block">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={book.coverUrl} 
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Progress overlay */}
          {book.currentPage > 1 && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="text-white text-xs font-medium mb-2">
                  {Math.round(progressPercentage)}% complete
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div 
                    className="bg-accent rounded-full h-1.5 transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* File type badge */}
          <div className="absolute top-3 right-3">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wide",
              book.fileType === "pdf" 
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            )}>
              {book.fileType}
            </span>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-primary dark:text-dark-primary line-clamp-2 group-hover:text-accent transition-colors duration-200">
              {book.title}
            </h3>
            <p className="text-secondary dark:text-dark-secondary font-medium">
              {book.author}
            </p>
          </div>

          <div className="space-y-2 text-sm text-secondary dark:text-dark-secondary">
            <div className="flex items-center justify-between">
              <span>Pages</span>
              <span className="font-medium">{book.currentPage} / {book.totalPages}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Size</span>
              <span className="font-medium">{formatFileSize(book.fileSize)}</span>
            </div>
            
            {book.lastReadAt && (
              <div className="flex items-center justify-between">
                <span>Last read</span>
                <span className="font-medium">
                  {formatDistanceToNow(new Date(book.lastReadAt), { addSuffix: true })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete button */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleDelete}
          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          title="Delete book"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;