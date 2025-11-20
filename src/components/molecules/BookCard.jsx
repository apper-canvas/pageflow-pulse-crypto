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
  const titleDisplay = book.title.length > 32 ? book.title.substring(0, 32) + '...' : book.title;
  const authorDisplay = book.author.length > 28 ? book.author.substring(0, 28) + '...' : book.author;

// Generate consistent placeholder book cover
  const generateDefaultCover = () => {
    return `data:image/svg+xml,%3Csvg width='240' height='320' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad${book.Id}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${selectedColor.from.replace('#', '%23')};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${selectedColor.to.replace('#', '%23')};stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='overlay${book.Id}' x1='0%25' y1='70%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23000000;stop-opacity:0' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:0.4' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='240' height='320' fill='url(%23grad${book.Id})' rx='12'/%3E%3Crect width='240' height='320' fill='url(%23overlay${book.Id})' rx='12'/%3E%3Cg transform='translate(120,280)'%3E%3Ctext x='0' y='-15' text-anchor='middle' font-family='Inter,sans-serif' font-size='14' fill='white' font-weight='600' opacity='0.9'%3E${encodeURIComponent(titleDisplay)}%3C/text%3E%3Ctext x='0' y='5' text-anchor='middle' font-family='Inter,sans-serif' font-size='12' fill='white' opacity='0.7'%3E${encodeURIComponent(authorDisplay)}%3C/text%3E%3C/g%3E%3C/svg%3E`;
  };

  const defaultCover = generateDefaultCover();
  
  // Validate cover image - reject inappropriate images and always use placeholder for books
  const shouldUseDefaultCover = (coverUrl) => {
    // Always use default cover for book files - no external images
    if (!coverUrl || coverUrl.includes('data:image/svg+xml')) return true;
    
    // Block any external image URLs to prevent random photos/portraits
    return true;
  };

  const finalCoverUrl = shouldUseDefaultCover(book.coverUrl) ? defaultCover : book.coverUrl;

  const handleImageError = (e) => {
    e.target.src = defaultCover;
  };
  return (
<div className="group book-card cursor-pointer h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div onClick={handleOpenBook} className="block relative">
        {/* Book Cover - Compact Size */}
<div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50 transition-all duration-300 rounded-t-xl">
        <img
          src={finalCoverUrl}
          alt={`${book.title} cover`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ aspectRatio: '4/5', objectFit: 'cover' }}
          onError={handleImageError} />
{/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
{/* Delete button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button
            onClick={handleDelete}
            className="w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 backdrop-blur-sm hover:scale-105"
            title="Delete book">
            <ApperIcon name="Trash2" className="w-2.5 h-2.5" />
          </button>
        </div>
            {/* File type badge */}
<div className="absolute top-2 left-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wide shadow-sm bg-white/85 text-gray-600 backdrop-blur-sm">
            {book.fileType}
          </span>
        </div>
        </div>
    </div>
    
{/* Book Info - Compact Layout */}
      <div className="bg-white p-3 space-y-1 flex-grow flex flex-col rounded-b-xl">
        <div>
          <h3 className="font-semibold text-sm leading-tight text-slate-900 line-clamp-2 mb-1 text-left">
            {book.title}
          </h3>
          <p className="text-xs text-slate-500 mb-2 text-left">
            {book.author}
          </p>
            
            {/* Clean Progress Bar */}
{book.currentPage > 0 && (
            <div className="mt-auto pt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-400">Progress</span>
                <span className="text-[10px] text-slate-600 font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-0.5 overflow-hidden">
                <div
                  className="bg-slate-400 rounded-full h-0.5 transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`
                  }}
                  title={`${Math.round(progressPercentage)}% complete`}>
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