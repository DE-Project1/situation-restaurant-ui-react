import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from "/src/assets/logo.png";

function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const layoutStyles = {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: isMobile ? '12px 16px' : '16px 24px',
      backgroundColor: '#f7f2e8',
    },
    logo: {
      height: isMobile ? 60 : 80,
      width: 'auto',
      marginLeft: isMobile ? 8 : 20,
      cursor: 'pointer',
    },
  };

  return (
    <div>
      <header style={layoutStyles.header}>
        <Link to="/">
          <img src={logo} alt="로고" style={layoutStyles.logo} />
        </Link>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
