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
    { from: '#6366f1', to: '#8b5cf6', name: 'Indigo Dreams' },
    { from: '#ec4899', to: '#f43f5e', name: 'Rose Passion' },
    { from: '#06b6d4', to: '#0ea5e9', name: 'Ocean Breeze' },
    { from: '#10b981', to: '#059669', name: 'Forest Deep' },
    { from: '#f59e0b', to: '#d97706', name: 'Golden Hour' },
    { from: '#8b5cf6', to: '#7c3aed', name: 'Purple Haze' },
    { from: '#ef4444', to: '#dc2626', name: 'Crimson Fire' },
    { from: '#06b6d4', to: '#0891b2', name: 'Turquoise Wave' }
  ];
  
  const colorIndex = book.Id % coverColors.length;
  const selectedColor = coverColors[colorIndex];
  const titleDisplay = book.title.length > 28 ? book.title.substring(0, 28) + '...' : book.title;
  const authorDisplay = book.author.length > 24 ? book.author.substring(0, 24) + '...' : book.author;
const defaultCover = `data:image/svg+xml,%3Csvg width='300' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${selectedColor.from.replace('#', '%23')};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${selectedColor.to.replace('#', '%23')};stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='overlay' x1='0%25' y1='70%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23000000;stop-opacity:0' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:0.6' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='400' fill='url(%23grad)' rx='18'/%3E%3Crect width='300' height='400' fill='url(%23overlay)' rx='18'/%3E%3Cg transform='translate(150,320)'%3E%3Ctext x='0' y='0' text-anchor='middle' font-family='Inter,sans-serif' font-size='20' fill='white' font-weight='700' opacity='0.95'%3E${encodeURIComponent(titleDisplay)}%3C/text%3E%3Ctext x='0' y='24' text-anchor='middle' font-family='Inter,sans-serif' font-size='14' fill='white' opacity='0.75'%3E${encodeURIComponent(authorDisplay)}%3C/text%3E%3C/g%3E%3C/svg%3E`;
  
  const handleImageError = (e) => {
    e.target.src = defaultCover;
  };
  return (
<div className="group book-card cursor-pointer h-full flex flex-col bg-white rounded-[18px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-3 overflow-hidden border border-slate-100/60 backdrop-blur-sm">
      <div onClick={handleOpenBook} className="block relative flex-1">
        {/* Book Cover */}
<div
className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:bg-dark-surface transition-all duration-300 rounded-t-[18px]">
            <img
                src={book.coverUrl || defaultCover}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                onError={handleImageError} />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Delete button */}
<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
                onClick={handleDelete}
                className="w-9 h-9 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 backdrop-blur-md border border-white/30 hover:scale-110"
                title="Delete book">
                <ApperIcon name="Trash2" className="w-3.5 h-3.5" />
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
{/* Glass-like bottom panel */}
        <div className="relative bg-white/90 backdrop-blur-md p-6 space-y-4 flex-grow flex flex-col border-t border-slate-100/60 rounded-b-[18px]">
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent rounded-b-[18px]" />
            <div className="relative z-10">
                <h3 className="font-serif font-bold text-xl leading-tight text-slate-900 dark:text-dark-primary line-clamp-2 group-hover:text-slate-800 transition-colors duration-200 mb-2">
                    {book.title}
                </h3>
                <p className="text-base text-slate-600 dark:text-dark-secondary font-medium opacity-75 mb-4">
                    {book.author}
                </p>
                
                {/* Enhanced Progress Bar with rounded ends */}
                {book.currentPage > 0 && (
                    <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-slate-500 font-semibold">Reading Progress</span>
                            <span className="text-sm text-slate-700 font-bold bg-slate-100 px-2 py-1 rounded-full">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-slate-600 to-slate-800 dark:bg-accent rounded-full h-3 transition-all duration-700 shadow-sm relative overflow-hidden"
                                style={{
                                    width: `${progressPercentage}%`
                                }}
                                title={`${Math.round(progressPercentage)}% complete`}>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
</div>
  );
};

export default BookCard;