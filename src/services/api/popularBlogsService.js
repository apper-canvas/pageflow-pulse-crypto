import popularBlogsData from '../mockData/popularBlogs.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PopularBlogsService {
  async getAll() {
    await delay(400);
    return [...popularBlogsData];
  }

  async getById(id) {
    await delay(250);
    const blog = popularBlogsData.find(item => item.Id === parseInt(id));
    if (!blog) {
      throw new Error(`Blog with ID ${id} not found`);
    }
    return { ...blog };
  }
}

export const popularBlogsService = new PopularBlogsService();