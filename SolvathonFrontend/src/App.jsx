// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/HomePageComponents/Navbar";
import ReportPage from './Pages/ReportPage';
import ArticleForm from './Pages/AddArticlePage';
import AnalyzePage from './Pages/AnalyzePage';
import HomePage from './Pages/HomePage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/add-article" element={<ArticleForm />} />
        <Route path="/analyze" element={<AnalyzePage />} />
      </Routes>
    </Router>
  );
};

export default App;
