import mockBooks from "@/services/mockData/books.json";

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
  }
};

// Book service class
class BookService {
  constructor() {
    this.booksData = getStoredBooks();
  }

  // Get books by category
  async getPopular() {
    await delay(400);
    const books = getStoredBooks();
    // Filter books with high ratings and recent activity
    return books.filter(book => book.rating >= 4.5 || book.isPopular).slice(0, 12);
  }

  async getTopSelling() {
    await delay(350);
    const books = getStoredBooks();
    // Filter books marked as bestsellers or with high purchase counts
    return books.filter(book => book.isBestseller || book.salesRank <= 100).slice(0, 12);
  }

  async getFollowing() {
    await delay(300);
    const books = getStoredBooks();
    // Filter books from authors user follows or similar genres to user's preferences
    return books.filter(book => book.isFollowing || book.genre === 'Fiction').slice(0, 8);
  }

  async getNew() {
    await delay(450);
    const books = getStoredBooks();
    // Filter recently added or published books
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return books.filter(book => {
      const uploadDate = new Date(book.uploadedAt);
      return uploadDate > thirtyDaysAgo;
    }).slice(0, 10);
  }
}

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
  }
};

// Create service instance
const bookServiceInstance = new BookService();

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
  },

  // Category methods from BookService class
  async getPopular() {
    return bookServiceInstance.getPopular();
  },

  async getTopSelling() {
    return bookServiceInstance.getTopSelling();
  },

  async getFollowing() {
    return bookServiceInstance.getFollowing();
  },

  async getNew() {
    return bookServiceInstance.getNew();
  }
};

export default bookService;