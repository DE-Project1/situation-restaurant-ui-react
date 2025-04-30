import React from 'react';

const situations = ['혼밥', '데이트', '회식', '가족모임', '간단한 한 끼'];

function Home() {
  const handleClick = (situation) => {
    alert(`${situation} 상황을 선택했어요!`);
    // 추후: navigate(`/chart?situation=${situation}`) 가능
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🍽️ 상황별 식당 추천</h1>
      <p>상황을 선택하면 추천 식당을 보여드릴게요!</p>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {situations.map((s, i) => (
          <button
            key={i}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '10px',
              border: '1px solid #ccc',
              background: '#f2f2f2',
              cursor: 'pointer'
            }}
            onClick={() => handleClick(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
