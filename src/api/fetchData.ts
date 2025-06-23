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

  // Get political breaking news
  async getPoliticalBreakingNews<T>(): Promise<T> {
    try {
      const url = `${BASE_URL}/top-headlines?apiKey=${API_KEY}&category=politics&pageSize=1`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
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
};
