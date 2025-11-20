import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const FileUpload = ({ onUpload, className }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };

  const handleFiles = async (files) => {
const validFiles = files.filter(file => {
      const validTypes = ["application/pdf", "application/epub+zip"];
      const validExtensions = [".pdf", ".epub"];
      const isValidType = validTypes.includes(file.type) || 
                         validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      
      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type. Please upload PDF or ePub files.`);
        return false;
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error(`${file.name} is too large. Please upload files smaller than 50MB.`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);

    for (const file of validFiles) {
      try {
        // Simulate file processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const fileType = file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'epub';
        
        // Generate more realistic mock content
        const generateMockContent = () => {
          const chapters = [
            "The Journey Begins", "Into the Unknown", "Challenges Arise", 
            "The Turning Point", "New Discoveries", "Confronting the Past",
            "The Final Chapter", "Resolution", "Epilogue"
          ];
          
          const content = {};
          const totalPages = Math.floor(Math.random() * 200) + 150;
          
          for (let i = 1; i <= totalPages; i++) {
            const chapterIndex = Math.floor((i - 1) / (totalPages / chapters.length));
            const chapterTitle = chapters[chapterIndex] || "Chapter";
            
            content[i.toString()] = `${i === 1 ? `${chapterTitle}\n\n` : ''}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;
          }
          
          return content;
        };
        
        // Extract basic metadata
        const bookData = {
          title: file.name.replace(/\.(pdf|epub)$/i, ''),
          author: "Unknown Author",
          coverUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=300&h=400&fit=crop`,
          fileType,
          fileUrl: URL.createObjectURL(file),
          totalPages: Math.floor(Math.random() * 200) + 150,
          fileSize: file.size,
          content: generateMockContent()
        };

        await onUpload(bookData);
        toast.success(`Successfully uploaded "${bookData.title}"`);
        
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload "${file.name}". Please try again.`);
      }
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generateMockContent = () => {
    const pages = {};
    const sampleContent = [
      "Chapter 1: The Beginning\n\nThis is the opening chapter of our story, where we introduce the main concepts and characters that will guide us through this journey of discovery and learning.",
      "As we delve deeper into the subject matter, we begin to understand the intricate connections between different ideas and how they form a cohesive narrative that spans across multiple disciplines.",
      "The middle section explores the practical applications of the theories we've discussed, providing real-world examples and case studies that illustrate the principles in action."
    ];
    
    for (let i = 1; i <= 3; i++) {
      pages[i.toString()] = sampleContent[i - 1] || "Sample content for this page.";
    }
    
    return pages;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drag and Drop Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer",
          dragActive 
            ? "border-accent bg-accent/5 scale-105" 
            : "border-gray-300 dark:border-gray-600 hover:border-accent hover:bg-accent/5",
          uploading && "pointer-events-none opacity-75"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.epub,application/pdf,application/epub+zip"
          onChange={handleFileInput}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto">
              <div className="w-full h-full border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-primary dark:text-dark-primary">
                Processing Books...
              </h3>
              <p className="text-secondary dark:text-dark-secondary mt-2">
                Please wait while we upload and process your files
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto">
              <ApperIcon 
                name={dragActive ? "Download" : "Upload"} 
                className={cn(
                  "w-8 h-8 transition-all duration-300",
                  dragActive ? "text-accent animate-bounce" : "text-accent"
                )} 
              />
            </div>
            
            <div>
              <h3 className="text-xl font-serif font-bold text-primary dark:text-dark-primary">
                {dragActive ? "Drop your books here" : "Upload Books"}
              </h3>
              <p className="text-secondary dark:text-dark-secondary mt-2">
                Drag and drop PDF or ePub files, or click to browse
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center text-xs text-secondary dark:text-dark-secondary">
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">PDF</span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">ePub</span>
              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Max 50MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Upload Button */}
      {!uploading && (
        <div className="text-center">
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ApperIcon name="FolderOpen" className="w-5 h-5" />
            Choose Files
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;