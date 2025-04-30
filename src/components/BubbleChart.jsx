// src/components/BubbleChart.jsx
import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

function BubbleChart({ data, onClick }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // 기존 요소 초기화

    const width = 400;
    const height = 400;

    const pack = d3.pack().size([width, height]).padding(5);
    const root = d3.hierarchy({ children: data }).sum((d) => d.value);
    const nodes = pack(root).leaves();

    const group = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(0,0)`);

    group
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.r)
      .attr('fill', (d) => d.data.color)
      .style('cursor', 'pointer')
      .on('click', (event, d) => onClick(d.data));
  }, [data, onClick]);

  return <svg ref={ref} />;
}

export default BubbleChart;
