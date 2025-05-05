// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import foodImage from '/src/assets/food.png';

function Home() {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const districts = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  const handleSelect = () => {
    if (!selectedDistrict) {
      alert('지역구를 선택해주세요!');
      return;
    }
    navigate('/loading', { state: { district: selectedDistrict } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.textBox}>
          <h1 style={styles.title}>
            <strong>오늘의 상황,<br />오늘의 맛집</strong>
          </h1>
          <p style={styles.subtitle}>서울특별시 342,873개의 식당 데이터 수</p>
          <p style={styles.subtitle}>수집된 총 리뷰 수 : 1,726,634개 </p>
          <p style={styles.highlight}>상황에 따라, 기분에 따라, 나만의 맛집을 만나보세요 !</p>
        </div>
        <img
          src={foodImage}
          alt="음식 아이콘"
          style={styles.foodImage}
        />
      </div>

      <hr style={styles.divider} />

      <div style={styles.selectionBox}>
        <p style={{ textAlign: 'center' }}>먼저 지역을 선택해 주세요. 가까운 곳부터 시작해볼까요?</p>
        <div style={styles.selectRow}>
          <select disabled style={{ ...styles.select, backgroundColor: '#eee' }}>
            <option>서울특별시</option>
          </select>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={styles.select}
          >
            <option value="">지역구</option>
            {districts.map((gu) => (
              <option key={gu} value={gu}>{gu}</option>
            ))}
          </select>
          <button onClick={handleSelect} style={styles.button}>선택</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '5vw',
    backgroundColor: '#f7f2e8',
    fontFamily: "'Pretendard', sans-serif",
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  textBox: {
    flex: '1 1 300px',
    minWidth: '280px',
  },
  title: {
    fontSize: 'clamp(24px, 6vw, 40px)',
    lineHeight: 1.4,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 'clamp(14px, 3vw, 18px)',
    margin: '6px 0',
  },
  highlight: {
    marginTop: 12,
    color: '#a5443f',
    fontWeight: 'bold',
  },
  foodImage: {
    width: 'min(200px, 40vw)',
    height: 'auto',
  },
  divider: {
    margin: '40px 0',
    borderTop: '1px dashed #aaa',
  },
  selectionBox: {
    backgroundColor: '#fff',
    padding: 24,
    border: '1px solid #ccc',
    borderRadius: 6,
    maxWidth: 800,
    margin: '0 auto',
  },
  selectRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  select: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #aaa',
    width: 160,
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 18px',
    fontSize: 16,
    border: 'none',
    cursor: 'pointer',
  },
};

export default Home;
