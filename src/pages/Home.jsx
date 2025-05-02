import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { districts } from '../utils/districtList';

const situations = ['혼밥', '데이트', '회식', '가족모임', '간단한 한 끼'];

function Home() {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('');

  const handleSelect = () => {
    if (selectedDistrict && selectedSituation) {
      navigate(
        `/chart?city=서울특별시&district=${encodeURIComponent(selectedDistrict)}&situation=${encodeURIComponent(selectedSituation)}`
      );
    } else {
      alert('상황과 지역구를 모두 선택해주세요!');
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#F2ECDB', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🍽️ 상황별 식당 추천</h1>
      <p>먼저 지역과 상황을 선택해 주세요. 가까운 곳부터 시작해볼까요?</p>

      {/* 지역 선택 */}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <div style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', backgroundColor: '#eee', borderRadius: '8px' }}>
          서울특별시
        </div>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">지역구</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 상황 선택 */}
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {situations.map((s, i) => (
          <button
            key={i}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '10px',
              border: selectedSituation === s ? '2px solid #000' : '1px solid #ccc',
              background: selectedSituation === s ? '#eaeaea' : '#f9f9f9',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => setSelectedSituation(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 선택 버튼 */}
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={handleSelect}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          선택
        </button>
      </div>
    </div>
  );
}

export default Home;
