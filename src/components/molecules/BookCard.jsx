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
  
  // Elegant default book covers with colors
  const coverColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  ];
  
  const colorIndex = book.Id % coverColors.length;
  const titleDisplay = book.title.length > 24 ? book.title.substring(0, 24) + '...' : book.title;
  const authorDisplay = book.author.length > 20 ? book.author.substring(0, 20) + '...' : book.author;
  
  const defaultCover = `data:image/svg+xml,%3Csvg width='300' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${coverColors[colorIndex].match(/#([a-f0-9]{6})/i)?.[1] || '667eea'};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${coverColors[colorIndex].match(/#([a-f0-9]{6}).*#([a-f0-9]{6})/i)?.[2] || '764ba2'};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='400' fill='url(%23grad)' rx='8'/%3E%3Cg transform='translate(150,180)'%3E%3Ctext x='0' y='0' text-anchor='middle' font-family='Merriweather,serif' font-size='18' fill='white' font-weight='bold' opacity='0.95'%3E${encodeURIComponent(titleDisplay)}%3C/text%3E%3Ctext x='0' y='30' text-anchor='middle' font-family='Lora,serif' font-size='14' fill='white' opacity='0.8'%3E${encodeURIComponent(authorDisplay)}%3C/text%3E%3C/g%3E%3C/svg%3E`;
  
  const handleImageError = (e) => {
    e.target.src = defaultCover;
  };
  return (
<div className="group book-card cursor-pointer h-full flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-2 overflow-hidden border border-stone-100">
      <div onClick={handleOpenBook} className="block relative flex-1">
        {/* Book Cover */}
        <div
className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 dark:bg-dark-surface transition-all duration-300">
            <img
                src={book.coverUrl || defaultCover}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                onError={handleImageError} />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Delete button */}
<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
                onClick={handleDelete}
                className="w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
                title="Delete book">
                <ApperIcon name="Trash2" className="w-4 h-4" />
            </button>
        </div>
        
        {/* File type badge */}
        <div className="absolute top-4 left-4">
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider shadow-lg bg-white/90 text-stone-700 backdrop-blur-sm border border-white/50">
                {book.fileType}
            </span>
        </div>
        </div>
    </div>
    
    {/* Book Title and Author */}
{/* Glass-like bottom panel */}
        <div className="relative bg-white/80 backdrop-blur-sm p-5 space-y-3 flex-grow flex flex-col border-t border-stone-100/50">
            <h3 className="font-serif font-bold text-lg leading-tight text-stone-800 dark:text-dark-primary line-clamp-2 group-hover:text-stone-900 transition-colors duration-200">
                {book.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-dark-secondary font-medium opacity-80">
                {book.author}
            </p>
            
            {/* Enhanced Progress Bar */}
            {book.currentPage > 0 && (
                <div className="mt-auto pt-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-stone-500 font-medium">Progress</span>
                        <span className="text-xs text-stone-600 font-semibold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-stone-600 to-stone-700 dark:bg-accent rounded-full h-2 transition-all duration-500 shadow-sm"
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