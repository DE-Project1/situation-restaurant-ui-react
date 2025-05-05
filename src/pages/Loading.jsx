import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const { district } = location.state || {};
  const [fontSize, setFontSize] = useState(getFontSize(window.innerWidth));

  function getFontSize(width) {
    return width < 480 ? 16 : 22;
  }

  useEffect(() => {
    if (!district) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      navigate('/chart', { state: { district } });
    }, 3000);

    const handleResize = () => {
      setFontSize(getFontSize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [district, navigate]);

  const styles = {
    container: {
      backgroundColor: '#f7f2e8',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Pretendard', sans-serif",
      textAlign: 'center',
    },
    text: {
      lineHeight: 1.8,
      fontSize: fontSize,
    },
    red: {
      color: '#a5443f',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.text}>
        <span style={styles.red}>서울특별시 {district}</span> 에서<br />
        당신의 오늘에 어울리는 음식점을 추천해드릴게요 !
      </p>
    </div>
  );
}

export default Loading;
