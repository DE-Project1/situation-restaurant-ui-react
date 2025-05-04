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
        <div style={styles.textSection}>
          <h1 style={styles.title}>오늘의 상황,<br />오늘의 맛집</h1>
          <p style={styles.subtitle}>서울특별시 <span style={styles.num}>340,000</span>개의 식당 식당 데이터 수</p>
          <p style={styles.subtitle}>수집된 총 리뷰 수</p>
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
        <p style={styles.selectTitle}>먼저 지역을 선택해 주세요. 가까운 곳부터 시작해볼까요?</p>
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
    padding: '60px 80px',
    backgroundColor: '#f7f2e8',
    fontFamily: "'Pretendard', sans-serif",
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSection: {
    flex: 1,
    paddingRight: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 1.5,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  num: {
    fontFamily: 'monospace',
    fontWeight: 600,
  },
  highlight: {
    marginTop: 16,
    fontSize: 18,
    color: '#b54848',
    fontWeight: 600,
  },
  foodImage: {
    width: 140,
    height: 'auto',
    marginLeft: 20,
  },
  divider: {
    margin: '60px 0 50px',
    borderTop: '2px dashed #aaa',
  },
  selectionBox: {
    backgroundColor: '#fff',
    padding: 32,
    border: '1px solid #ccc',
    borderRadius: 8,
    maxWidth: 900,
    margin: '0 auto',
  },
  selectTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  selectRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  select: {
    padding: 12,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #aaa',
    width: 170,
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '12px 20px',
    fontSize: 16,
    border: 'none',
    cursor: 'pointer',
    borderRadius: 4,
  },
};

export default Home;
