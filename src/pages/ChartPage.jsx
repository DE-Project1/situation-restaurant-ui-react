// src/pages/ChartPage.jsx
import BubbleChart from '../components/BubbleChart';

const sampleData = [
  { name: '식당 A', value: 30, color: '#ff7f0e' },
  { name: '식당 B', value: 80, color: '#1f77b4' },
  { name: '식당 C', value: 45, color: '#2ca02c' },
];

function ChartPage() {
  const handleBubbleClick = (data) => {
    console.log('클릭된 식당:', data.name);
    // 여기서 navigate(`/detail/${data.id}`) 할 수도 있음
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>추천 식당</h1>
      <BubbleChart data={sampleData} onClick={handleBubbleClick} />
    </div>
  );
}

export default ChartPage;
