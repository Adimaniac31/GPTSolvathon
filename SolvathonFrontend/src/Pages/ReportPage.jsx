import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ReportPage = () => {
  const [articles, setArticles] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState(""); // Message state for no articles

  // Fetch data from the API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/article/fetchData`, {
          withCredentials: true, // Enable credentials
        });
        if (response.data.length === 0) {
          setArticles([]); // Set articles to null if empty
          setMessage("No articles to analyze."); // Set message for no articles
        } else {
          setArticles(response.data); // Set articles if data exists
          setMessage(""); // Clear message if articles are present
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setMessage("Error fetching articles."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-primary-light p-8">
      <h1 className="text-4xl text-primary-dark font-bold mb-6 text-center">
        Articles Report
      </h1>
      {loading ? (
        <div className="text-center text-gray-700">Loading articles...</div>
      ) : (
        <>
          {message ? (
            <div className="text-center text-red-600 mb-4">{message}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-2xl text-primary-dark font-semibold mb-4">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {article.content}
                  </p>
                  <h3 className="text-xl text-primary font-bold mb-2">Analysis:</h3>
                  <p className="text-gray-600 mb-4 whitespace-pre-line">
                    {article.analysis}
                  </p>
                  <h3 className="text-xl text-primary font-bold mb-2">Suggested Improvements:</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {article.suggestedArticle}
                  </p>
                  <span className="inline-block bg-primary-dark text-white px-4 py-2 rounded-full mt-4">
                    Tag: {article.tags ? article.tags.replace(/'/g, '') : 'No tag available'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportPage;

