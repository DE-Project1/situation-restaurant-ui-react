// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Loading from './pages/Loading';
import ChartPage from './pages/ChartPage';
import DetailPage from './pages/DetailPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/detail" element={<DetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
