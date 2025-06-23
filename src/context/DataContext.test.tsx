import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { DataProvider, useData } from "./DataContext";
import { fetchData } from "../api/fetchData";

// Mock the fetchData module
vi.mock("../api/fetchData", () => ({
  fetchData: {
    getNews: vi.fn(),
  },
}));

const mockFetchData = vi.mocked(fetchData);

// Test component to access context
const TestComponent = () => {
  const { news, loading, error, currentSentiment } = useData();

  return (
    <div>
      <div data-testid="loading">{loading ? "Loading" : "Not Loading"}</div>
      <div data-testid="error">{error || "No Error"}</div>
      <div data-testid="sentiment">{currentSentiment}</div>
      <div data-testid="news-count">{news.length}</div>
      {news.length > 0 && (
        <div data-testid="first-article-title">{news[0].title}</div>
      )}
    </div>
  );
};

describe("DataContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides initial state correctly", () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("Loading");
    expect(screen.getByTestId("error")).toHaveTextContent("No Error");
    expect(screen.getByTestId("sentiment")).toHaveTextContent("positive");
    expect(screen.getByTestId("news-count")).toHaveTextContent("0");
  });

  it("handles successful API response", async () => {
    const mockNewsResponse = {
      status: "ok",
      totalResults: 1,
      articles: [
        {
          source: { id: "1", name: "Test News" },
          author: "Test Author",
          title: "Test Article",
          description: "Test Description",
          url: "https://test.com",
          urlToImage: "https://test.com/image.jpg",
          publishedAt: "2024-01-01T12:00:00Z",
          content: "Test content",
        },
      ],
    };

    mockFetchData.getNews.mockResolvedValue(mockNewsResponse);

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    expect(screen.getByTestId("news-count")).toHaveTextContent("1");
    expect(screen.getByTestId("first-article-title")).toHaveTextContent(
      "Test Article"
    );
  });

  it("handles API error correctly", async () => {
    const errorMessage = "Failed to fetch news";
    mockFetchData.getNews.mockRejectedValue(new Error(errorMessage));

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("Not Loading");
    });

    expect(screen.getByTestId("error")).toHaveTextContent(errorMessage);
  });

  it("throws error when used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useData must be used within a DataProvider");

    consoleSpy.mockRestore();
  });
});
