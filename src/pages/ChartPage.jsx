import React from 'react';
import { useLocation } from 'react-router-dom';
import BubbleChart from '../components/BubbleChart';

// 상황별 샘플 데이터
const sampleDataMap = {
  혼밥: [
    { name: '혼밥집 1', value: 40, color: '#ff7f0e' },
    { name: '혼밥집 2', value: 60, color: '#1f77b4' },
  ],
  데이트: [
    { name: '데이트 맛집 1', value: 70, color: '#ff69b4' },
    { name: '데이트 맛집 2', value: 50, color: '#ff1493' },
  ],
  회식: [
    { name: '회식 장소 1', value: 90, color: '#6a5acd' },
    { name: '회식 장소 2', value: 80, color: '#8a2be2' },
  ],
  가족모임: [
    { name: '가족식당 1', value: 85, color: '#2ca02c' },
    { name: '가족식당 2', value: 65, color: '#98fb98' },
  ],
  '간단한 한 끼': [
    { name: '분식집 1', value: 30, color: '#deb887' },
    { name: '분식집 2', value: 35, color: '#d2691e' },
  ],
};

function ChartPage() {
  const location = useLocation();

  // URL 쿼리 파싱 (e.g., ?situation=혼밥)
  const params = new URLSearchParams(location.search);
  const situation = params.get('situation');

  const data = sampleDataMap[situation] || [];

  const handleBubbleClick = (data) => {
    alert(`선택한 식당: ${data.name}`);
    // 또는 navigate(`/detail/${data.id}`) 등으로 연결
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>추천 식당 - {situation}</h1>
      {data.length > 0 ? (
        <BubbleChart data={data} onClick={handleBubbleClick} />
      ) : (
        <p>해당 상황에 맞는 추천 식당이 없어요.</p>
      )}
    </div>
  );
}

export default ChartPage;
