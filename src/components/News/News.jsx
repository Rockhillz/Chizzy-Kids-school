
import React, { useState, useEffect } from "react";
import "./News.css";

const News = () => {
  const [newsList, setNewsList] = useState([]); // All news from backend
  const [selectedNews, setSelectedNews] = useState(null); // Selected news
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  // Fetch news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/news/newsPage`
        );
        const data = await response.json();
        setNewsList(data);
        if (data.length > 0) setSelectedNews(data[0]); // Set first news as default
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ marginTop: "20px" }} className="py-3">
      {/* Hero Section */}
      <div className="news-hero">
        <div className="hero-overlay">
          <h1>Latest News</h1>
        </div>
      </div>

      {/* Desktop View: Sidebar + News Content */}
      {!isMobile ? (
        <div className="news-container mt-3">
          {/* Left Sidebar - News List */}
          <div className="news-sidebar">
            <h4>Latest News</h4>
            <ul>
              {newsList.map((news) => (
                <li
                  key={news._id}
                  className={selectedNews?._id === news._id ? "active" : ""}
                  onClick={() => {
                    setSelectedNews(news);
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to top when clicked
                  }}
                >
                  <h5>{news.title}</h5>
                  <p>{new Date(news.date).toDateString().slice(4)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Only Selected News */}
          <div className="news-content">
            {selectedNews && (
              <>
                <h2>{selectedNews.title}</h2>
                <p className="news-date">📅 {new Date(selectedNews.date).toDateString().slice(4)}</p>
                <p>{selectedNews.content}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Mobile View: Render All News in a Stacked Format */
        <div className="news-mobile-container">
          {newsList.map((news, index) => (
            <div key={news._id} className="news-item">
              <h2>{news.title}</h2>
              <span>📅 {new Date(news.date).toDateString().slice(4)}</span>
              <p className="news-contentMob">{news.content}</p>
              {index < newsList.length - 1 && <hr />} {/* Separator */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
