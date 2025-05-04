import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { district } = location.state || {};

  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    if (!district) {
      navigate('/');
      return;
    }

    const fetchClusters = async () => {
      try {
        const response = await axios.get(`https://api.where2eat.r-e.kr/regions/clusters`, {
          params: { district },
        });

        const data = response.data;
        const maxCount = Math.max(...data.map(c => Number(c.count) || 1), 1);

        const rowCount = 3;
        const spacing = 30;

        const generatedClusters = data.map((c, idx) => {
          const normalized = Math.max(Number(c.count), 1);
          const size = 60 + 140 * (normalized / maxCount);

          const row = idx % rowCount;
          const col = Math.floor(idx / rowCount);

          const top = 10 + row * spacing + Math.random() * 10;
          const left = 10 + col * spacing + Math.random() * 10;

          return {
            ...c,
            size,
            top,
            left,
          };
        });

        setClusters(generatedClusters);
      } catch (error) {
        console.error('클러스터 불러오기 실패:', error);
      }
    };

    fetchClusters();
  }, [district, navigate]);

  const handleClick = (clusterId, clusterName) => {
    navigate('/detail', {
      state: {
        district,
        clusterId,
        clusterName,
      },
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.selectBar}>
          <select style={styles.select} disabled>
            <option>서울특별시</option>
          </select>
          <select style={styles.select} disabled>
            <option>{district}</option>
          </select>
        </div>
        <p>지금 당신의 상황에 딱 맞는 음식점을 골라볼까요?</p>
      </div>

      <div style={styles.visualArea}>
        {clusters.map((cluster, index) => {
          const color = randomColor(index);
          const fontSize = `${cluster.size * 0.11}px`; // 버블 크기에 비례한 글씨 크기

          return (
            <div
              key={cluster.cluster_id}
              onClick={() => handleClick(cluster.cluster_id, cluster.cluster_name)}
              style={{
                ...styles.bubble,
                width: `${cluster.size}px`,
                height: `${cluster.size}px`,
                backgroundColor: color,
                top: `${cluster.top}%`,
                left: `${cluster.left}%`,
                fontSize,
              }}
            >
              <div style={styles.textWrapper}>
                #{cluster.cluster_name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function randomColor(index) {
  const colors = [
    '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB',
    '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784',
    '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D',
    '#A1887F', '#90A4AE'
  ];
  return colors[index % colors.length];
}

const styles = {
  container: {
    backgroundColor: '#f7f2e8',
    minHeight: '100vh',
    padding: 30,
    fontFamily: "'Pretendard', sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  selectBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  select: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #aaa',
    width: 160,
    backgroundColor: '#eee',
  },
  visualArea: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    border: '1px dashed #ccc',
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    borderRadius: '50%',
    cursor: 'pointer',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '1 / 1',
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    padding: 0,
    transition: 'transform 0.3s ease-in-out',
  },
  textWrapper: {
    width: '90%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    lineHeight: 1.3,
    fontWeight: '900',
    color: '#fff',
  },
};

export default ChartPage;
