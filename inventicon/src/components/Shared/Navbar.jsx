import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path is home ('/')
  const isHomePage = location.pathname === '/';

  return (
    <nav
      style={{
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        padding: '12px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Left: Logo/Brand */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        {/* Logo Image */}
        <img 
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="InventiCon Logo"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '6px'
          }}
        />
        
        {/* Brand Name */}
        <h1
          style={{
            margin: 0,
            fontSize: '22px'
          }}
        >
          InventiCon
        </h1>
      </div>

      {/* Right: Only show after login/signup, not on homepage */}
      {!isHomePage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user && <span style={{ fontSize: '16px' }}>Welcome, {user.name}</span>}
          {user && (
            <button
              onClick={logout}
              style={{
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          )}
          {!user && (
            <>
              <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/signup" style={{ color: '#fff', textDecoration: 'none' }}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;