import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [sido, setSido] = useState('');
  const [gugun, setGugun] = useState('');

  const handleSidoChange = (e) => {
    setSido(e.target.value);
  };

  const handleGugunChange = (e) => {
    setGugun(e.target.value);
  };

  const handleSelectRegion = () => {
    // Implement the logic to handle region selection
  };

  return (
    <div>
      {/* 상단 네비게이션 */}
      <nav>
        <button onClick={() => navigate('/search')}>검색</button>
        <button onClick={() => navigate('/scrap')}>스크랩</button>
        <button onClick={() => navigate('/mypage')}>마이페이지</button>
      </nav>

      {/* 메인 타이틀 및 설명 */}
      <h1>오늘의 상황,<br />오늘의 맛집</h1>
      <p>매일 다른 당신의 순간을 위해</p>
      <p style={{ color: '#A05A4A' }}>
        상황에 따라, 기분에 따라, 나만의 맛집을 만나보세요 !
      </p>

      {/* 지역 선택 UI */}
      <div>
        <label>먼저 지역을 선택해 주세요. 가까운 곳부터 시작해볼까요?</label>
        <select value={sido} onChange={handleSidoChange}>
          {/* 시/도 옵션 */}
        </select>
        <select value={gugun} onChange={handleGugunChange}>
          {/* 구/군 옵션 */}
        </select>
        <button onClick={handleSelectRegion}>선택</button>
      </div>
    </div>
  );
};

export default MainPage; 