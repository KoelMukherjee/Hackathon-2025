import "./App.css";
import { DataProvider, useData } from "./context/DataContext";

// Component that uses the API data
function DataDisplay() {
  const { news, loading, error, fetchNews, currentSentiment } = useData();

  const handleSentimentChange = (sentiment: string) => {
    fetchNews(sentiment);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>News with Sentiment Analysis</h1>

      {/* Sentiment Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Filter by Sentiment:</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={() => handleSentimentChange("positive")}
            style={{
              padding: "10px 20px",
              backgroundColor:
                currentSentiment === "positive" ? "#28a745" : "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Positive
          </button>
          <button
            onClick={() => handleSentimentChange("negative")}
            style={{
              padding: "10px 20px",
              backgroundColor:
                currentSentiment === "negative" ? "#dc3545" : "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Negative
          </button>
          <button
            onClick={() => handleSentimentChange("neutral")}
            style={{
              padding: "10px 20px",
              backgroundColor:
                currentSentiment === "neutral" ? "#17a2b8" : "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Neutral
          </button>
        </div>
      </div>

      {loading && <p>Loading news...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* News Articles */}
      <div style={{ marginBottom: "30px" }}>
        <h2>
          News Articles ({news.length}) - {currentSentiment} sentiment
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px",
          }}
        >
          {news.map((article, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
                  {article.title}
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    margin: "0 0 10px 0",
                  }}
                >
                  {article.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <small style={{ color: "#999" }}>
                    {article.source.name} •{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </small>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#007bff",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <div>
        <DataDisplay />
      </div>
    </DataProvider>
  );
}

export default App;
