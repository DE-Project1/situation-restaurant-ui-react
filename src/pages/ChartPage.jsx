import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const situations = [
  { label: '친구랑 수다', color: '#E57373' },
  { label: '기분전환이 필요할 때', color: '#F8BBD0' },
  { label: '혼술하기 좋은', color: '#B0BEC5' },
  { label: '아이와 함께', color: '#F06292' },
  { label: '가족과 함께', color: '#9575CD' },
  { label: '비 오는 날', color: '#78909C' },
  { label: '해장하고 싶을 때', color: '#FFD54F' },
  { label: '아식이 생각날 때', color: '#388E3C' },
  { label: '건강 챙기고 싶을 때', color: '#E53935' },
  { label: '분위기 좋은', color: '#F8BBD0' },
  // ...원하는 만큼 추가
];

function ChartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get('city') || '서울특별시';
  const district = params.get('district') || '';

  const handleBubbleClick = (situation) => {
    // 식당 리스트 페이지로 이동
    navigate(`/restaurants?city=${encodeURIComponent(city)}&district=${encodeURIComponent(district)}&situation=${encodeURIComponent(situation)}`);
  };

  return (
    <div style={{ background: '#F6F1E7', minHeight: '100vh', padding: '0 0 40px 0' }}>
      {/* 상단 네비게이션 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px 0 40px' }}>
        <img src="/logo.png" alt="로고" style={{ width: 48, height: 48 }} />
        <div style={{ display: 'flex', gap: '48px', fontSize: '1.1rem', fontWeight: 500 }}>
          <span>검색</span>
          <span>스크랩</span>
          <span>마이페이지</span>
        </div>
        <div style={{ width: 48, height: 48 }} />
      </div>
      {/* 안내 문구 */}
      <div style={{ borderTop: '2px dashed #BDBDBD', margin: '32px 0 0 0' }} />
      <div style={{ textAlign: 'center', margin: '40px 0 32px 0', fontSize: '1.3rem', fontWeight: 500 }}>
        지금 당신의 상황에 딱 맞는 음식점을 골라볼까요?
      </div>
      {/* 버블 UI */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        maxWidth: 900,
        margin: '0 auto'
      }}>
        {situations.map((s, i) => (
          <div
            key={i}
            onClick={() => handleBubbleClick(s.label)}
            style={{
              width: 120 + Math.random() * 60,
              height: 120 + Math.random() * 60,
              background: s.color,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textAlign: 'center',
              padding: 12,
              transition: 'transform 0.15s',
            }}
          >
            #{' '}{s.label}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '2px dashed #BDBDBD', margin: '40px 0 0 0' }} />
    </div>
  );
}

export default ChartPage;
