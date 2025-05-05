// src/pages/ChartPage.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import axios from 'axios';

function ChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { district } = location.state || {};
  const svgRef = useRef();
  const [data, setData] = useState([]);

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

        const rawData = response.data;
        const sorted = [...rawData].sort((a, b) => b.count - a.count);
        const maxCount = Math.max(...sorted.map(d => Number(d.count) || 1), 1);

        const colors = [
          '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB',
          '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784',
          '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D',
          '#A1887F', '#90A4AE'
        ];

        const finalData = sorted.map((d, i) => {
          const baseCount = Number(d.count) || 1;
          return {
            ...d,
            radius: i < 10
              ? 40 + 100 * (baseCount / maxCount)
              : 10 + 80 * (baseCount / maxCount),
            color: colors[i % colors.length],
          };
        });

        setData(finalData);
      } catch (err) {
        console.error('클러스터 불러오기 실패:', err);
      }
    };

    fetchClusters();
  }, [district, navigate]);

  useEffect(() => {
    if (!data.length) return;

    const width = window.innerWidth;
    const height = window.innerHeight * 1.3;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(data)
      .force('x', d3.forceX(width / 2).strength(0.07))
      .force('y', d3.forceY(height / 2.5).strength(0.07))
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
              district,
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
  }, [data, district, navigate]);

  return (
    <div style={{ backgroundColor: '#f7f2e8', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <select disabled style={{ padding: 8, fontSize: 16 }}>
          <option>서울특별시</option>
        </select>
        <select disabled style={{ padding: 8, fontSize: 16, marginLeft: 10 }}>
          <option>{district}</option>
        </select>
        <p style={{ marginTop: 10 }}>지금 당신의 상황에 딱 맞는 음식점을 골라볼까요?</p>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ChartPage;
