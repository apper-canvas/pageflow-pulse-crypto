import mockBooks from "@/services/mockData/books.json";
import { toast } from "react-toastify";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get books from localStorage or use mock data
const getStoredBooks = () => {
  try {
    const stored = localStorage.getItem("pageflow-books");
    return stored ? JSON.parse(stored) : mockBooks;
  } catch (error) {
    console.error("Error reading stored books:", error);
    return mockBooks;
  }
};

// Save books to localStorage
const saveBooks = (books) => {
  try {
    localStorage.setItem("pageflow-books", JSON.stringify(books));
  } catch (error) {
    console.error("Error saving books:", error);
    toast.error("Failed to save book data");
  }
};

// Get reading settings from localStorage
const getStoredSettings = () => {
  try {
    const stored = localStorage.getItem("pageflow-settings");
    return stored ? JSON.parse(stored) : {
      theme: "light",
      fontSize: 18,
      lineSpacing: 1.8,
      pageWidth: 700
    };
  } catch (error) {
    console.error("Error reading stored settings:", error);
    return {
      theme: "light",
      fontSize: 18,
      lineSpacing: 1.8,
      pageWidth: 700
    };
  }
};

// Save reading settings to localStorage
const saveSettings = (settings) => {
  try {
    localStorage.setItem("pageflow-settings", JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings:", error);
    toast.error("Failed to save settings");
  }
};

export const bookService = {
  // Get all books
  async getAll() {
    await delay(300);
    return [...getStoredBooks()];
  },

  // Get book by ID
  async getById(id) {
    await delay(200);
    const books = getStoredBooks();
    const book = books.find(b => b.Id === parseInt(id));
    if (!book) {
      throw new Error("Book not found");
    }
    return { ...book };
  },

  // Add new book
  async create(bookData) {
    await delay(400);
    const books = getStoredBooks();
    const maxId = books.length > 0 ? Math.max(...books.map(b => b.Id)) : 0;
    const newBook = {
      Id: maxId + 1,
      ...bookData,
      currentPage: 1,
      lastReadAt: new Date().toISOString(),
      uploadedAt: new Date().toISOString()
    };
    
    const updatedBooks = [...books, newBook];
    saveBooks(updatedBooks);
    return { ...newBook };
  },

  // Update book (primarily for reading progress)
  async update(id, updateData) {
    await delay(200);
    const books = getStoredBooks();
    const bookIndex = books.findIndex(b => b.Id === parseInt(id));
    
    if (bookIndex === -1) {
      throw new Error("Book not found");
    }

    books[bookIndex] = {
      ...books[bookIndex],
      ...updateData,
      lastReadAt: new Date().toISOString()
    };
    
    saveBooks(books);
    return { ...books[bookIndex] };
  },

  // Delete book
  async delete(id) {
    await delay(300);
    const books = getStoredBooks();
    const filteredBooks = books.filter(b => b.Id !== parseInt(id));
    saveBooks(filteredBooks);
    return true;
  },

  // Update reading position
  async updateReadingPosition(id, currentPage) {
    return this.update(id, { currentPage });
  },

  // Get reading settings
  async getSettings() {
    await delay(100);
    return { ...getStoredSettings() };
  },

  // Save reading settings
  async saveSettings(settings) {
    await delay(100);
    saveSettings(settings);
    return { ...settings };
  }
};