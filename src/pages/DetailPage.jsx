import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const location = useLocation();
  const { district, clusterId, clusterName, color } = location.state || {};
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const itemsPerPage = 21;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!district || !clusterId) return;

    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://api.where2eat.r-e.kr/regions/places', {
          params: {
            district,
            cluster_id: Number(clusterId),
          },
        });
        setPlaces(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error('음식점 리스트 불러오기 실패:', error);
      }
    };

    fetchPlaces();
  }, [district, clusterId]);

  const totalPages = Math.ceil(places.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = places.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const left = Math.max(2, currentPage - 2);
      const right = Math.min(totalPages - 1, currentPage + 2);
      if (left > 2) pages.push('...');
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <span style={{ color: '#555' }}>{district}</span>
        <br />
        <span style={{ color: color || '#333' }}>
          {clusterName}에 어울리는 음식점
        </span>
      </h2>

      <div style={styles.list}>
        {currentItems.length > 0 ? (
          currentItems.map((place, index) => (
            <a
              key={index}
              href={`https://map.naver.com/p/entry/place/${place.place_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.cardLink}
            >
              <div
                style={{
                  ...styles.card,
                  width: isMobile ? '30%' : 260,
                  maxWidth: 260,
                  minWidth: isMobile ? undefined : 200,
                }}
              >
                <h3 style={styles.name}>{place.name}</h3>
                <p style={styles.category}>{place.category}</p>
                <p style={styles.address}>{place.address}</p>
                <p style={styles.rating}>
                  {Number(place.naver_rating) > 0
                    ? `⭐ ${Number(place.naver_rating).toFixed(2)}`
                    : '⭐ 평점 없음'}
                </p>
              </div>
            </a>
          ))
        ) : (
          <p style={styles.noResult}> </p>
        )}
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            style={{ ...styles.pageButton, visibility: currentPage === 1 ? 'hidden' : 'visible' }}
          >
            이전
          </button>

          {getPageNumbers().map((page, idx) =>
            page === '...' ? (
              <span key={idx} style={styles.ellipsis}>…</span>
            ) : (
              <button
                key={idx}
                onClick={() => setCurrentPage(page)}
                style={{
                  ...styles.pageButton,
                  backgroundColor: currentPage === page ? '#333' : '#fff',
                  color: currentPage === page ? '#fff' : '#333',
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            style={{ ...styles.pageButton, visibility: currentPage === totalPages ? 'hidden' : 'visible' }}
          >
            다음
          </button>
        </div>
      )}
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
    boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  pagination: {
    marginTop: 30,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  pageButton: {
    padding: '6px 12px',
    fontSize: 14,
    border: '1px solid #333',
    borderRadius: 4,
    cursor: 'pointer',
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
  },
  ellipsis: {
    padding: '6px 12px',
    fontSize: 14,
    color: '#999',
  },
};

export default DetailPage;
