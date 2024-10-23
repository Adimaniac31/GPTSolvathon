import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const articleData = {
      title: title,
      content: content,
    };

    try {
      await axios.post(`${BACKEND_URL}/api/article/saveData`, articleData);
      alert("Article saved successfully!");
    } catch (error) {
      console.error("There was an error saving the article!", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-light">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-primary-dark">Create a New Article</h1>

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

        <div className="mb-6">
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
          Save Article
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
