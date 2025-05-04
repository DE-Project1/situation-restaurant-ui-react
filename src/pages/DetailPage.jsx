import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const location = useLocation();
  const { district, clusterId, clusterName } = location.state || {};
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!district || !clusterId) return;

    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://api.where2eat.r-e.kr', {
    
          params: {
            district,
            clusterId: Number(clusterId),
          },
          
        });
        setPlaces(response.data);
      } catch (error) {
        console.error('음식점 리스트 불러오기 실패:', error);
      }
    };

    fetchPlaces();
  }, [district, clusterId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {district} - {clusterName}에 어울리는 음식점
      </h2>

      <div style={styles.list}>
        {places.length > 0 ? (
          places.map((place, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.name}>{place.name}</h3>
              <p style={styles.category}>{place.category}</p>
              <p style={styles.address}>{place.address}</p>
              <p style={styles.rating}>⭐ {place.rating.toFixed(1)}</p>
            </div>
          ))
        ) : (
          <p style={styles.noResult}>해당 상황에 맞는 음식점을 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f7f2e8',
    minHeight: '100vh',
    padding: 30,
    fontFamily: "'Pretendard', sans-serif",
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: 260,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  rating: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
};

export default DetailPage;
