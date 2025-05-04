import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from "/src/assets/logo.png";

const layoutStyles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#f7f2e8',
  },
  logo: {
    height: 36,
  },
};

function Layout() {
  return (
    <div>
      <header style={layoutStyles.header}>
        <img src={logo} alt="로고" style={layoutStyles.logo} />
      </header>
      <Outlet /> {/* 여기에 각 페이지가 렌더링됨 */}
    </div>
  );
}

export default Layout;
