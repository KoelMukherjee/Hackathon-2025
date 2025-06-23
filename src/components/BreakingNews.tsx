import React, { useState, useEffect } from "react";
import { fetchData } from "../api/fetchData";
import { useSentiment } from "../context/SentimentContext";
import { useData } from "../context/DataContext";

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

interface BreakingNewsProps {
  autoScroll?: boolean;
}

const BreakingNews: React.FC<BreakingNewsProps> = () => {
  const { sentimentState } = useSentiment();
  const { news } = useData();

  // Helper function to truncate text based on sentiment
  const truncateText = (text: string, length: "short" | "medium" | "full") => {
    if (!text) return "";

    switch (length) {
      case "short":
        return text.length > 50 ? text.substring(0, 100) + "..." : text;
      case "medium":
        return text.length > 100 ? text.substring(0, 200) + "..." : text;
      case "full":
        return text;
      default:
        return text;
    }
  };

  // Check if sentiment should show only scrolling text
  const shouldShowScrollingText = ["irritated", "tired", "sad"].includes(
    sentimentState.title.toLowerCase()
  );
  console.log(news);
  //   if (!news) {
  //     return (
  //       <div
  //         style={{
  //           backgroundColor: sentimentState.color,
  //           color: "white",
  //           padding: "12px 0",
  //           position: "sticky",
  //           top: 0,
  //           zIndex: 1000,
  //           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  //         }}
  //       >
  //         <div style={{ textAlign: "center" }}>
  //           🔥 Loading breaking political news...
  //         </div>
  //       </div>
  //     );
  //   }

  // Show only scrolling text for negative sentiments
  if (shouldShowScrollingText) {
    return (
      <div
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          padding: "12px 0",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            animation: "scroll-left 20s linear infinite",
          }}
        >
          <span style={{ marginRight: "50px" }}>🔥 BREAKING:</span>
          {news?.map((article, index) => (
            <span style={{ marginRight: "50px" }} key={index}>
              {article.title}
            </span>
          ))}
        </div>
        <style>
          {`
            @keyframes scroll-left {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </div>
    );
  }

  // Show full content for neutral or happy sentiments
  return (
    <div
      style={{
        backgroundColor: "#dc3545",
        color: "white",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* News Image with Sentiment Effects */}
          {news[0]?.urlToImage && (
            <div style={{ flexShrink: 0, position: "relative" }}>
              <img
                src={news[0]?.urlToImage}
                alt={news[0]?.title}
                style={{
                  width: "300px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  filter: `blur(${sentimentState.blurAmount}px)`,
                  opacity: 1 - sentimentState.overlayOpacity,
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x200/ffffff/666666?text=Politics";
                }}
              />

              {/* Sentiment Overlay */}
              {sentimentState.showOverlay && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                ></div>
              )}
            </div>
          )}

          {/* News Content with Sentiment-based Text Length */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "1.3",
              }}
            >
              {truncateText(news[0]?.title, sentimentState.textLength)}
            </h3>
            {news[0]?.description && (
              <p
                style={{
                  margin: "0",
                  fontSize: "14px",
                  opacity: "0.9",
                  lineHeight: "1.4",
                }}
              >
                {truncateText(news[0]?.description, sentimentState.textLength)}
              </p>
            )}
            <div style={{ marginTop: "8px", fontSize: "12px", opacity: "0.8" }}>
              {news[0]?.source.name} •{" "}
              {new Date(news[0]?.publishedAt).toLocaleTimeString()}
            </div>
          </div>

          {/* Read More Button */}
          <div style={{ flexShrink: 0 }}>
            <a
              href={news[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                border: "1px solid rgba(255,255,255,0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
              }}
            >
              Read More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
