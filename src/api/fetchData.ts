// News API with sentiment support
// You can get a free API key from: https://newsapi.org/
const API_KEY = "bfddeba5e29c4ab0b29ee0c21653cfe7"; // Replace with your actual API key
const BASE_URL = "https://newsapi.org/v2";

export const fetchData = {
  // Get news with sentiment analysis
  async getNews<T>(sentiment?: string): Promise<T> {
    try {
      // For NewsAPI, we'll filter by keywords that typically indicate sentiment
      let query = "technology";
      let sortBy = "publishedAt";

      if (sentiment === "positive") {
        query = "success OR innovation OR breakthrough OR growth";
      } else if (sentiment === "negative") {
        query = "crisis OR decline OR failure OR crash";
      } else if (sentiment === "neutral") {
        query = "technology OR business OR science";
      }

      const url = `${BASE_URL}/everything?q=${encodeURIComponent(
        query
      )}&sortBy=${sortBy}&apiKey=${API_KEY}&language=en&pageSize=100`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Alternative: Use a free mock API for testing
  async getMockNews<T>(sentiment?: string): Promise<T> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockData = {
      status: "ok",
      totalResults: 10,
      articles: [
        {
          source: { id: "mock", name: "Mock News" },
          author: "John Doe",
          title:
            sentiment === "positive"
              ? "Great Success in Technology Sector"
              : sentiment === "negative"
              ? "Market Downturn Concerns"
              : "Technology Update",
          description:
            sentiment === "positive"
              ? "Amazing breakthrough in AI technology shows promising results."
              : sentiment === "negative"
              ? "Economic uncertainty causes market volatility."
              : "Latest developments in the tech industry.",
          url: "https://example.com",
          urlToImage: "https://via.placeholder.com/300x200",
          publishedAt: new Date().toISOString(),
          content: "This is mock content for testing purposes.",
        },
        {
          source: { id: "mock", name: "Mock News" },
          author: "Jane Smith",
          title:
            sentiment === "positive"
              ? "Innovation Leads to Growth"
              : sentiment === "negative"
              ? "Challenges Ahead for Industry"
              : "Industry Report Released",
          description:
            sentiment === "positive"
              ? "New innovations are driving unprecedented growth in the sector."
              : sentiment === "negative"
              ? "Industry faces significant challenges in the coming months."
              : "Comprehensive industry report provides insights into current trends.",
          url: "https://example.com",
          urlToImage: "https://via.placeholder.com/300x200",
          publishedAt: new Date().toISOString(),
          content: "This is mock content for testing purposes.",
        },
      ],
    };

    return mockData as T;
  },
};
