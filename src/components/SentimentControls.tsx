import React from "react";
import { useSentiment } from "../context/SentimentContext";

const SentimentControls: React.FC = () => {
  const { currentSentiment, setSentiment, getSentimentState } = useSentiment();

  const sentiments = [
    { key: "happy", label: "😊 Happy", color: "#28a745" },
    { key: "sad", label: "😔 Sad", color: "#6c757d" },
    { key: "irritated", label: "😠 Irritated", color: "#dc3545" },
    { key: "tired", label: "😴 Tired", color: "#fd7e14" },
    { key: "neutral", label: "😐 Neutral", color: "#17a2b8" },
  ] as const;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Breaking News Sentiment:</h3>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {sentiments.map((sentiment) => {
          const isActive = currentSentiment === sentiment.key;
          const sentimentState = getSentimentState(sentiment.key);

          return (
            <button
              key={sentiment.key}
              onClick={() => setSentiment(sentiment.key)}
              style={{
                padding: "12px 20px",
                backgroundColor: isActive ? sentimentState.color : "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                boxShadow: isActive
                  ? "0 4px 8px rgba(0,0,0,0.2)"
                  : "0 2px 4px rgba(0,0,0,0.1)",
                transform: isActive ? "translateY(-2px)" : "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = sentimentState.color;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#6c757d";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {sentiment.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SentimentControls;
