import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { districts } from '../utils/districtList';

function Home() {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleSelect = () => {
    if (selectedDistrict) {
      navigate(`/loading?city=서울특별시&district=${encodeURIComponent(selectedDistrict)}`);
    } else {
      alert('지역구를 선택해주세요!');
    }
  };

  return (
    <div style={{ background: '#F6F1E7', minHeight: '100vh', border: '4px solid #7EB5A6', boxSizing: 'border-box' }}>
      {/* 상단 네비게이션 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px 0 40px' }}>
        <img src="/logo.png" alt="로고" style={{ width: 48, height: 48 }} />
        <div style={{ display: 'flex', gap: '48px', fontSize: '1.1rem', fontWeight: 500 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/search')}>검색</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/scrap')}>스크랩</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/mypage')}>마이페이지</span>
        </div>
        <div style={{ width: 48, height: 48 }} /> {/* 오른쪽 여백 맞춤용 */}
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '40px 80px 0 80px' }}>
        {/* 왼쪽 텍스트 */}
        <div>
          <div style={{ borderTop: '2px solid #222', width: 400, marginBottom: 32 }} />
          <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            오늘의 상황,<br />오늘의 맛집
          </h1>
          <div style={{ margin: '32px 0 0 0', fontSize: '1.2rem', color: '#222', letterSpacing: 1 }}>
            서울특별시 1,000,000개의 식당 식당 데이터 수<br />
            수집된 총 리뷰 수
          </div>
        </div>
        {/* 오른쪽 아이콘 */}
        <img src="/food-illustration.png" alt="음식 아이콘" style={{ width: 160, height: 160, marginTop: 24 }} />
      </div>

      {/* 안내 문구 */}
      <div style={{ color: '#A05A4A', fontSize: '1.2rem', margin: '40px 0 0 80px', fontWeight: 500 }}>
        상황에 따라, 기분에 따라, 나만의 맛집을 만나보세요 !
      </div>

      {/* 구분선 */}
      <div style={{ borderTop: '2px dashed #BDBDBD', margin: '32px 0' }} />

      {/* 지역 선택 박스 */}
      <div style={{
        background: '#fff',
        border: '2px solid #BDBDBD',
        borderRadius: 12,
        margin: '0 auto',
        maxWidth: 700,
        padding: '32px 24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.1rem', marginBottom: 24 }}>
          먼저 지역을 선택해 주세요. 가까운 곳부터 시작해볼까요?
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <select style={{ minWidth: 160, fontSize: '1.1rem' }} disabled>
            <option>서울특별시</option>
          </select>
          <select
            style={{ minWidth: 160, fontSize: '1.1rem' }}
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
          >
            <option value="">지역구</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button
            style={{
              background: '#111',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '0 32px'
            }}
            onClick={handleSelect}
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
