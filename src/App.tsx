import "./App.css";
import BreakingNews from "./components/BreakingNews";

import { DataProvider, useData } from "./context/DataContext";
import {useState} from "react";

const POSITIVE = "positive"
const NAGATIVE = "negative"
const NEUTRAL = "neutral"

type Props = {
    callback: (sentiment: string) => void;
}
// Component that uses the API data
function DataDisplay({ callback }: Props) {
    const { news, loading, error, fetchNews, currentSentiment } = useData();
    const [mood, setMood] = useState(NEUTRAL)

    const handleSentimentChange = (sentiment: string) => {
        fetchNews(sentiment);
        callback(sentiment);
        setMood(sentiment);
    };

    return (
        <div style={{padding: "20px", maxWidth: "1200px", margin: "0 auto"}}> 
          <BreakingNews sentiment={mood}/>
            {/* Sentiment Filter Buttons */}
            <div style={{marginBottom: "20px"}}>
                <h3>Filter by Sentiment:</h3>
                <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
                    <button
                        onClick={() => handleSentimentChange(POSITIVE)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor:
                                currentSentiment === POSITIVE ? "#28a745" : "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Positive
                    </button>
                    <button
                        onClick={() => handleSentimentChange(NAGATIVE)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor:
                                currentSentiment === NAGATIVE ? "#dc3545" : "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Negative
                    </button>
                    <button
                        onClick={() => handleSentimentChange(NEUTRAL)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor:
                                currentSentiment === NEUTRAL ? "#17a2b8" : "#6c757d",
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
            {error && <p style={{color: "red"}}>Error: {error}</p>}

            {/* News Articles */}
            <div className="news-section">
                <h2>
                    News Articles ({news.length}) - {currentSentiment} sentiment
                </h2>

                <div className="news-grid">
                    {news.map((article, index) => (
                        <div className={`news-card card-${mood}`} key={index}>
                            {article.urlToImage ? (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="news-image"
                                />
                            ) : <div className={`news-image placeholder-image placeholder-${mood}`} />}
                            <div className="teaser-content">
                                <h3 className="title">{article.title}</h3>
                                <p className="description">{article.description}</p>
                                <div className="meta-footer">
                                    <small className="source">
                                        {article.source.name} •{" "}
                                        {new Date(article.publishedAt).toLocaleDateString()}
                                    </small>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`read-more link-${mood}`}
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
    const [mood, setMood] = useState('neutral')
    return (

        <DataProvider>
            <nav className={`navigation ${mood}`}> Mood Aware News Feed</nav>
            <DataDisplay callback={setMood}/>
        </DataProvider>
    );
}

export default App;
