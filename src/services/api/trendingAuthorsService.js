import trendingAuthorsData from '../mockData/trendingAuthors.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TrendingAuthorsService {
  async getAll() {
    await delay(300);
    return [...trendingAuthorsData];
  }

  async getById(id) {
    await delay(200);
    const author = trendingAuthorsData.find(item => item.Id === parseInt(id));
    if (!author) {
      throw new Error(`Author with ID ${id} not found`);
    }
    return { ...author };
  }
}

export const trendingAuthorsService = new TrendingAuthorsService();