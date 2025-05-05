import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // Link 추가
import logo from "/src/assets/logo.png";

const layoutStyles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#f7f2e8',
  },
  logo: {
    height: 110,
    width: 'auto',
    marginLeft: '20px',
    cursor: 'pointer', // 클릭 가능한 커서로 변경
  },
};

function Layout() {
  return (
    <div>
      <header style={layoutStyles.header}>
        <Link to="/"> {/* 메인 페이지로 이동 */}
          <img src={logo} alt="로고" style={layoutStyles.logo} />
        </Link>
      </header>
      <Outlet /> {/* 여기에 각 페이지가 렌더링됨 */}
    </div>
  );
}

export default Layout;
