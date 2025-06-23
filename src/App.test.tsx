import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchData } from "./api/fetchData";

// Mock the fetchData module
vi.mock("./api/fetchData", () => ({
  fetchData: {
    getNews: vi.fn(),
  },
}));

const mockFetchData = vi.mocked(fetchData);

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock successful API response
    const mockNewsResponse = {
      status: "ok",
      totalResults: 2,
      articles: [
        {
          source: { id: "1", name: "Test News 1" },
          author: "Author 1",
          title: "Positive News Article",
          description: "This is a positive news article",
          url: "https://test1.com",
          urlToImage: "https://test1.com/image.jpg",
          publishedAt: "2024-01-01T12:00:00Z",
          content: "Test content 1",
        },
        {
          source: { id: "2", name: "Test News 2" },
          author: "Author 2",
          title: "Another Positive Article",
          description: "This is another positive article",
          url: "https://test2.com",
          urlToImage: "https://test2.com/image.jpg",
          publishedAt: "2024-01-01T13:00:00Z",
          content: "Test content 2",
        },
      ],
    };

    mockFetchData.getNews.mockResolvedValue(mockNewsResponse);
  });

  it("renders the app with navigation and mood aware title", () => {
    render(<App />);

    expect(screen.getByText("Mood Aware News Feed")).toBeInTheDocument();
    expect(screen.getByText("Filter by Sentiment:")).toBeInTheDocument();
  });

  it("displays sentiment filter buttons", () => {
    render(<App />);

    expect(screen.getByText("Positive")).toBeInTheDocument();
    expect(screen.getByText("Negative")).toBeInTheDocument();
    expect(screen.getByText("Neutral")).toBeInTheDocument();
  });

  it("changes sentiment when filter buttons are clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initially should show positive sentiment
    await waitFor(() => {
      expect(
        screen.getByText("News Articles (2) - positive sentiment")
      ).toBeInTheDocument();
    });

    // Click negative button
    const negativeButton = screen.getByText("Negative");
    await user.click(negativeButton);

    // Should call API with negative sentiment
    expect(mockFetchData.getNews).toHaveBeenCalledWith("negative");

    // Should update the sentiment display
    await waitFor(() => {
      expect(
        screen.getByText("News Articles (2) - negative sentiment")
      ).toBeInTheDocument();
    });
  });

  it("shows loading state while fetching data", async () => {
    // Mock a delayed response
    mockFetchData.getNews.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                status: "ok",
                totalResults: 1,
                articles: [],
              }),
            100
          )
        )
    );

    render(<App />);

    // Should show loading initially
    expect(screen.getByText("Loading news...")).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading news...")).not.toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    const errorMessage = "Failed to fetch news";
    mockFetchData.getNews.mockRejectedValue(new Error(errorMessage));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});
