import React from 'react';
import { useNavigate } from 'react-router-dom';

const situations = ['혼밥', '데이트', '회식', '가족모임', '간단한 한 끼'];

function Home() {
  const navigate = useNavigate();

  const handleClick = (situation) => {
    navigate(`/chart?situation=${encodeURIComponent(situation)}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🍽️ 상황별 식당 추천</h1>
      <p>상황을 선택하면 추천 식당을 보여드릴게요!</p>

      <div style={{
        marginTop: '1.5rem',
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
              border: '1px solid #ccc',
              background: '#f9f9f9',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => handleClick(s)}
            onMouseOver={(e) => e.currentTarget.style.background = '#eaeaea'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f9f9f9'}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
