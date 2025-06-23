import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { fetchData } from "../api/fetchData";

// News data types
interface NewsArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

interface DataContextType {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  fetchNews: (sentiment?: string) => Promise<void>;
  currentSentiment: string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSentiment, setCurrentSentiment] = useState<string>("positive");

  const fetchNews = async (sentiment: string = "positive") => {
    setLoading(true);
    setError(null);
    setCurrentSentiment(sentiment);

    try {
      // Use real API now that we have a valid key
      const data = await fetchData.getNews<NewsResponse>(sentiment);
      setNews(data.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchNews("positive");
  }, []);

  const value: DataContextType = {
    news,
    loading,
    error,
    fetchNews,
    currentSentiment,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
