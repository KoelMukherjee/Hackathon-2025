import React, { createContext, useContext, useState } from "react";

export interface SentimentState {
  title: string;
  image: string;
  color: string;
  overlayOpacity: number;
  blurAmount: number;
  textLength: "short" | "medium" | "full";
  showOverlay: boolean;
  overlayText: string;
}

export interface SentimentConfig {
  happy: SentimentState;
  sad: SentimentState;
  irritated: SentimentState;
  tired: SentimentState;
  neutral: SentimentState;
}

const sentimentConfig: SentimentConfig = {
  happy: {
    title: "Happy",
    image: "/src/assets/happy.svg",
    color: "#28a745",
    overlayOpacity: 0.1,
    blurAmount: 0,
    textLength: "full",
    showOverlay: false,
    overlayText: "😊 Positive News",
  },
  sad: {
    title: "Sad",
    image: "/src/assets/sad.svg",
    color: "#6c757d",
    overlayOpacity: 0.3,
    blurAmount: 2,
    textLength: "short",
    showOverlay: true,
    overlayText: "😔 Sad News",
  },
  irritated: {
    title: "Irritated",
    image: "/src/assets/angry.svg",
    color: "#dc3545",
    overlayOpacity: 0.4,
    blurAmount: 3,
    textLength: "medium",
    showOverlay: true,
    overlayText: "😠 Concerning News",
  },
  tired: {
    title: "Tired",
    image: "/src/assets/tired.svg",
    color: "#fd7e14",
    overlayOpacity: 0.2,
    blurAmount: 1,
    textLength: "medium",
    showOverlay: false,
    overlayText: "😴 Tiring News",
  },
  neutral: {
    title: "Neutral",
    image: "/src/assets/neutral.svg",
    color: "#17a2b8",
    overlayOpacity: 0.05,
    blurAmount: 0,
    textLength: "full",
    showOverlay: false,
    overlayText: "😐 Neutral News",
  },
};

interface SentimentContextType {
  currentSentiment: keyof SentimentConfig;
  sentimentState: SentimentState;
  setSentiment: (sentiment: keyof SentimentConfig) => void;
  getSentimentState: (sentiment: keyof SentimentConfig) => SentimentState;
}

const SentimentContext = createContext<SentimentContextType | undefined>(
  undefined
);

export const useSentiment = () => {
  const context = useContext(SentimentContext);
  if (!context) {
    throw new Error("useSentiment must be used within a SentimentProvider");
  }
  return context;
};

interface SentimentProviderProps {
  children: React.ReactNode;
}

export const SentimentProvider: React.FC<SentimentProviderProps> = ({
  children,
}) => {
  const [currentSentiment, setCurrentSentiment] =
    useState<keyof SentimentConfig>("neutral");

  const setSentiment = (sentiment: keyof SentimentConfig) => {
    setCurrentSentiment(sentiment);
  };

  const getSentimentState = (
    sentiment: keyof SentimentConfig
  ): SentimentState => {
    return sentimentConfig[sentiment];
  };

  const value: SentimentContextType = {
    currentSentiment,
    sentimentState: sentimentConfig[currentSentiment],
    setSentiment,
    getSentimentState,
  };

  return (
    <SentimentContext.Provider value={value}>
      {children}
    </SentimentContext.Provider>
  );
};
