import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AnalyzeAllButton = () => {
  const [message, setMessage] = useState("");

  const handleAnalyzeAll = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/article/analyzeAll`);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error analyzing all articles", error);
      setMessage("Failed to analyze articles.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-6 text-primary-dark">Analyze All Articles</h2>
      <button
        onClick={handleAnalyzeAll}
        className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-darkest transition-all"
      >
        Analyze All
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
