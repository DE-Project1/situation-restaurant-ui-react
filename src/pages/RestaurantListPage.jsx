import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { districts } from '../utils/districtList';

const situations = [
  '친구랑 수다',
  '분위기 좋은',
  '건강 챙기고 싶을 때',
  '가족과 함께',
  '비 오는 날',
  '야식이 생각날 때',
  '기분전환이 필요할 때',
  '해장하고 싶을 때',
  '특별한 날',
  '회식 장소 찾을 때',
  '아이와 함께',
  '혼술하기 좋은'
];

// 임시 샘플 데이터
const sampleRestaurants = [
  { name: '파틱', type: '프랑스음식', rating: 4.5, address: '서울 종로구 옥인길 16 1층 파틱' },
  { name: '비스트로 친친', type: '이탈리아음식', rating: 4.5, address: '서울 종로구 효자로13길 54 1층 비스트로친친' },
  // ... 나머지 식당
];

function RestaurantListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [district, setDistrict] = useState(params.get('district') || districts[0]);
  const [situation, setSituation] = useState(params.get('situation') || situations[0]);

  // 실제로는 district, situation에 따라 필터링된 데이터 fetch 필요
  const filteredRestaurants = sampleRestaurants; // 임시

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    navigate(`/restaurants?city=서울특별시&district=${encodeURIComponent(e.target.value)}&situation=${encodeURIComponent(situation)}`);
  };
  const handleSituationChange = (e) => {
    setSituation(e.target.value);
    navigate(`/restaurants?city=서울특별시&district=${encodeURIComponent(district)}&situation=${encodeURIComponent(e.target.value)}`);
  };

  return (
    <div style={{ background: '#F6F1E7', minHeight: '100vh', padding: '0 0 40px 0' }}>
      {/* 상단 네비 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px 0 40px' }}>
        <img src="/logo.png" alt="로고" style={{ width: 48, height: 48 }} />
        <div style={{ display: 'flex', gap: '48px', fontSize: '1.1rem', fontWeight: 500 }}>
          <span>검색</span>
          <span>스크랩</span>
          <span>마이페이지</span>
        </div>
        <div style={{ width: 48, height: 48 }} />
      </div>
      {/* 드롭다운 */}
      <div style={{ display: 'flex', gap: 16, margin: '32px 0 24px 0', justifyContent: 'center' }}>
        <select value="서울특별시" disabled style={{ minWidth: 140 }}>
          <option>서울특별시</option>
        </select>
        <select value={district} onChange={handleDistrictChange} style={{ minWidth: 140 }}>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={situation} onChange={handleSituationChange} style={{ minWidth: 200 }}>
          {situations.map(s => <option key={s} value={s}>#{s}</option>)}
        </select>
      </div>
      {/* 식당 리스트 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
        maxWidth: 900,
        margin: '0 auto'
      }}>
        {filteredRestaurants.map((r, i) => (
          <div key={i} style={{
            background: '#fff',
            border: '1.5px solid #BDBDBD',
            borderRadius: 12,
            padding: 24,
            minHeight: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>{r.name} <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>{r.type}</span></div>
            <div style={{ color: '#A05A4A', fontWeight: 600, marginBottom: 4 }}>4.5 ★★★★★</div>
            <div style={{ color: '#444', fontSize: '0.98rem' }}>{r.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantListPage;
