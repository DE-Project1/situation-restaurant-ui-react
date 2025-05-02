import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChartPage from './pages/ChartPage'; // 차트 페이지 연결
import LoadingPage from './pages/LoadingPage';
import RestaurantListPage from './pages/RestaurantListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/restaurants" element={<RestaurantListPage />} />
      </Routes>
    </Router>
  );
}

export default App;

