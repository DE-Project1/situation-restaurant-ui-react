import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import axios from 'axios';

function ChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { district } = location.state || {};
  const svgRef = useRef();
  const scrollWrapperRef = useRef(null);
  const [data, setData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(district);

  const districts = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  useEffect(() => {
    if (!selectedDistrict) {
      navigate('/');
      return;
    }

    const fetchClusters = async () => {
      try {
        const response = await axios.get(`https://api.where2eat.r-e.kr/regions/clusters`, {
          params: { district: selectedDistrict },
        });

        const rawData = response.data;
        const sorted = [...rawData].sort((a, b) => b.count - a.count);
        const maxCount = Math.max(...sorted.map(d => Number(d.count) || 1), 1);

        const screenWidth = window.innerWidth;
        const scaleFactor = screenWidth < 480 ? 0.55 : screenWidth < 768 ? 0.8 : 1.0;

        const colors = [
          '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB',
          '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784',
          '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D',
          '#A1887F', '#90A4AE'
        ];

        const finalData = sorted.map((d, i) => {
          const baseCount = Number(d.count) || 1;
          const rawRadius = i < 10
            ? 40 + 80 * (baseCount / maxCount)
            : 10 + 60 * (baseCount / maxCount);
          return {
            ...d,
            radius: rawRadius * scaleFactor,
            color: colors[i % colors.length],
          };
        });

        setData(finalData);
      } catch (err) {
        console.error('클러스터 불러오기 실패:', err);
      }
    };

    fetchClusters();
  }, [selectedDistrict, navigate]);

  useEffect(() => {
    if (!data.length) return;

    const isMobile = window.innerWidth <= 480;
    const screenWidth = window.innerWidth;
    const svgWidth = isMobile ? screenWidth * 2 : screenWidth;
    const svgHeight = isMobile ? window.innerHeight * 1.1 : window.innerHeight * 1.6;
    const centerY = isMobile ? svgHeight / 2.2 : svgHeight / 2.0;

    const svg = d3.select(svgRef.current)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(data)
      .force('x', d3.forceX(svgWidth / 2).strength(0.07))
      .force('y', d3.forceY(centerY).strength(0.07))
      .force('collision', d3.forceCollide().radius(d => d.radius + 5))
      .alphaDecay(0.02)
      .on('tick', ticked);

    function ticked() {
      const bubbles = svg.selectAll('g')
        .data(data, d => d.cluster_id);

      const enter = bubbles.enter().append('g')
        .style('cursor', 'pointer')
        .on('click', (event, d) => {
          navigate('/detail', {
            state: {
              district: selectedDistrict,
              clusterId: d.cluster_id,
              clusterName: d.cluster_name,
              color: d.color,
            }
          });
        });

      enter.append('circle')
        .attr('r', d => d.radius)
        .attr('fill', d => d.color);

      enter.append('foreignObject')
        .attr('x', d => -d.radius * 0.9)
        .attr('y', d => -d.radius * 0.5)
        .attr('width', d => d.radius * 1.8)
        .attr('height', d => d.radius * 1.2)
        .append('xhtml:div')
        .style('width', '100%')
        .style('height', '100%')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('text-align', 'center')
        .style('color', '#fff')
        .style('font-family', 'Pretendard, sans-serif')
        .style('font-weight', 'bold')
        .style('font-size', d => `${Math.max(10, d.radius * 0.21)}px`)
        .style('line-height', '1.2')
        .style('pointer-events', 'none')
        .text(d => `#${d.cluster_name}`);

      bubbles.merge(enter)
        .attr('transform', d => `translate(${d.x},${d.y})`);
    }

    if (scrollWrapperRef.current) {
      const wrapper = scrollWrapperRef.current;
      wrapper.scrollLeft = (svgWidth - wrapper.clientWidth) / 2;
    }
  }, [data, selectedDistrict, navigate]);

  return (
    <div style={{ backgroundColor: '#f7f2e8', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <select disabled style={{ padding: 8, fontSize: 16 }}>
          <option>서울특별시</option>
        </select>
        <select 
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          style={{ padding: 8, fontSize: 16, marginLeft: 10 }}
        >
          {districts.map((gu) => (
            <option key={gu} value={gu}>{gu}</option>
          ))}
        </select>
        <p style={{ marginTop: 10 }}>지금 당신의 상황에 딱 맞는 음식점을 골라볼까요?</p>
      </div>

      <div ref={scrollWrapperRef} style={{ overflowX: 'auto', width: '100%' }}>
        <svg ref={svgRef} style={{ display: 'block' }}></svg>
      </div>
    </div>
  );
}

export default ChartPage;
