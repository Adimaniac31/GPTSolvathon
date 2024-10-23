import React from "react";
import SingleArticleAnalysis from "./SingleArticleAnalysis";
import AnalyzeAllButton from "./AnalyzeAllButton";

const ArticleAnalysisPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-primary-light py-8">
      <h1 className="text-3xl font-bold mb-10 text-primary-dark">Article Analysis</h1>

      <SingleArticleAnalysis />
      <AnalyzeAllButton />
    </div>
  );
};

export default ArticleAnalysisPage;
