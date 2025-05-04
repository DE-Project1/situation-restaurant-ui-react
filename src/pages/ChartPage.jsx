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

        const generatedClusters = data.map((c, index) => {
          const normalized = Math.max(Number(c.count), 1);
          const size = 60 + 120 * (normalized / maxCount);
          const color = randomColor(index);

          return {
            ...c,
            size,
            color,
          };
        });

        setClusters(generatedClusters);
      } catch (error) {
        console.error('클러스터 불러오기 실패:', error);
      }
    };

    fetchClusters();
  }, [district, navigate]);

  const handleClick = (clusterId, clusterName, color) => {
    navigate('/detail', {
      state: {
        district,
        clusterId,
        clusterName,
        color,
      },
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.selectBar}>
          <select style={styles.select} disabled>
            <option style={{ color: '#000' }}>서울특별시</option>
          </select>
          <select style={styles.select} disabled>
            <option style={{ color: '#000' }}>{district}</option>
          </select>
        </div>
        <p>지금 당신의 상황에 딱 맞는 음식점을 골라볼까요?</p>
      </div>

      <div style={styles.visualArea}>
        {clusters.map((cluster) => {
          const fontSize = `${cluster.size * 0.11}px`;

          return (
            <div
              key={cluster.cluster_id}
              onClick={() => handleClick(cluster.cluster_id, cluster.cluster_name, cluster.color)}
              style={{
                ...styles.bubble,
                width: cluster.size,
                height: cluster.size,
                backgroundColor: cluster.color,
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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    height: '80vh',
    overflow: 'auto',
  },
  bubble: {
    borderRadius: '50%',
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '900',
    cursor: 'pointer',
    textAlign: 'center',
  },
  textWrapper: {
    width: '90%',
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
