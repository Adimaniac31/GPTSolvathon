import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AnalyzeAllButton = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleAnalyzeAll = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${BACKEND_URL}/api/article/analyzeAll`);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error analyzing all articles", error);
      setMessage("Failed to analyze articles.");
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
        <div className="mt-4 p-4 bg-primary-light rounded-lg">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default AnalyzeAllButton;
