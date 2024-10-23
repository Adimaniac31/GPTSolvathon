import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportPage from './Pages/ReportPage';
import ArticleForm from './Pages/AddArticlePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/report" element={<ReportPage/>} />
        <Route path="/add-article" element={<ArticleForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
