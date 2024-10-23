// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary-dark animate-bounce">Welcome to Article Analyser</h1>
        <p className="mb-6 text-lg">
          Your guide to analyzing and validating content with ease. Explore our features to get insights on articles!
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/report"
            className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-darkest transition-all transform hover:scale-105 shadow-lg"
          >
            View Reports
          </Link>
          <Link
            to="/add-article"
            className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-darkest transition-all transform hover:scale-105 shadow-lg"
          >
            Add Article
          </Link>
          <Link
            to="/analyze"
            className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-darkest transition-all transform hover:scale-105 shadow-lg"
          >
            Analyze
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
