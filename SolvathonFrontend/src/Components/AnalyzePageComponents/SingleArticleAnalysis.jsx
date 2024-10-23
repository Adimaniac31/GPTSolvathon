import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SingleArticleAnalysis = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/article/analyzeNow`, articleData);
      setAnalysis(response.data);
    } catch (error) {
      console.error("Error analyzing the article", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
      <h2 className="text-xl font-bold mb-6 text-primary-dark">Analyze a Single Article</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-primary-dark mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter article title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-dark mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter article content"
            required
            rows="5"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-darkest transition-all"
        >
          Analyze Article
        </button>
      </form>

      {analysis && (
        <div className="mt-6 p-4 bg-primary-light rounded-lg">
          <h3 className="text-lg font-bold">Analysis:</h3>
          <p><strong>Title:</strong> {analysis.title}</p>
          <p><strong>Tag:</strong> {analysis.tag}</p>
          <p><strong>Analysis:</strong> {analysis.analysis}</p>
          <h4 className="font-bold mt-4">Suggested Article:</h4>
          <p>{analysis.suggestedArticle}</p>
        </div>
      )}
    </div>
  );
};

export default SingleArticleAnalysis;
