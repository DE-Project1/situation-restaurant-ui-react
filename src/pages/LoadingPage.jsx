import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get('city') || '서울특별시';
  const district = params.get('district') || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/chart?city=${encodeURIComponent(city)}&district=${encodeURIComponent(district)}`);
    }, 5000); // 5.0초 후 이동
    return () => clearTimeout(timer);
  }, [city, district, navigate]);

  return (
    <div style={{
      background: '#F6F1E7', minHeight: '100vh', padding: '60px 0',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 1200 }}>
        <img src="/logo.png" alt="로고" style={{ width: 48, height: 48, marginLeft: 40 }} />
        <div style={{ display: 'flex', gap: '48px', fontSize: '1.1rem', fontWeight: 500 }}>
          <span>검색</span>
          <span>스크랩</span>
          <span>마이페이지</span>
        </div>
        <div style={{ width: 48, height: 48 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <div style={{ color: '#A05A4A', fontWeight: 700, fontSize: '2rem', marginBottom: 16 }}>
            {city} <span style={{ color: '#A05A4A', fontWeight: 700 }}>{district}</span> 에서
          </div>
          <div style={{ fontSize: '1.4rem', color: '#222' }}>
            당신의 오늘에 어울리는 음식점을 추천해드릴게요 !
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;