const situations = ['혼밥', '데이트', '회식', '가족모임', '간단한 한 끼'];

function SituationButtons() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {situations.map((situation, idx) => (
        <button
          key={idx}
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: '10px',
            border: '1px solid #ccc',
            background: '#f5f5f5',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
          onClick={() => alert(`${situation} 상황을 선택했어요!`)}
        >
          {situation}
        </button>
      ))}
    </div>
  )
}

export default SituationButtons
