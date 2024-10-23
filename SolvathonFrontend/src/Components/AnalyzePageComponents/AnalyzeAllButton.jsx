import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AnalyzeAllButton = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleAnalyzeAll = async () => {
    setLoading(true); // Start loading
    setMessage(""); // Clear previous message
    try {
      const response = await axios.post(`${BACKEND_URL}/api/article/analyzeAll`);
      setMessage(response.data.message || "Analysis complete.");
    } catch (error) {
      console.error("Error analyzing all articles", error);
      const errorMessage = error.response?.data?.message || "Failed to analyze articles."; 
      setMessage(errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-6 text-primary-dark">Analyze All Articles</h2>
      <button
        onClick={handleAnalyzeAll}
        className={`w-full py-2 rounded-lg transition-all ${
          loading ? "bg-gray-500" : "bg-primary-dark"
        } text-white`}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Analyzing..." : "Analyze All"} {/* Display loading text */}
      </button>
      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            message === "Failed to analyze articles."
              ? "bg-red-100 text-red-700"
              : "bg-primary-light text-primary-dark"
          }`}
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default AnalyzeAllButton;

