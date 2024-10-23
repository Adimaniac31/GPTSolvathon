import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportPage from './Pages/ReportPage';
import ArticleForm from './Pages/AddArticlePage';
import AnalyzePage from './Pages/AnalyzePage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage/>} />
        <Route path="/add-article" element={<ArticleForm/>}/>
        <Route path="/analyze" element={<AnalyzePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
