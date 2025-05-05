import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const { district } = location.state || {};

  useEffect(() => {
    if (!district) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      navigate('/chart', { state: { district } });
    }, 3000); // 1초 후 chart 페이지로 이동

    return () => clearTimeout(timer);
  }, [district, navigate]);

  return (
    <div style={styles.container}>
      <p style={styles.text}>
        <span style={styles.red}>서울특별시 {district}</span> 에서<br />
        당신의 오늘에 어울리는 음식점을 추천해드릴게요 !
      </p>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f7f2e8',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Pretendard', sans-serif",
    fontSize: 22,
    textAlign: 'center',
  },
  text: {
    lineHeight: 1.8,
  },
  red: {
    color: '#a5443f',
    fontWeight: 'bold',
  },
};

export default Loading;
