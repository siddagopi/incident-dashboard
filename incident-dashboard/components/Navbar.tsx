"use client";
import React, { useState } from 'react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        background: 'linear-gradient(90deg, #222 60%, #333 100%)',
        color: '#fff',
        height: '64px',
        borderBottom: '2px solid #444',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      {/* Left Side */}
      <div style={{ fontWeight: 'bold', fontSize: '1.6rem', letterSpacing: '2px' }}>
        MANDLACX
      </div>

      {/* Middle Links */}
      <div style={{ display: 'flex', gap: '2rem', flex: 1, justifyContent: 'center' }}>
        <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Dashboard</a>
        <a href="/camera" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Camera</a>
        <a href="/scenes" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Scenes</a>
        <a href="/incidents" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Incidents</a>
        <a href="/users" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Users</a>
      </div>

      {/* Right Side: Login/Logout */}
      <div style={{ position: 'relative' }}>
        {!isLoggedIn ? (
          <a href="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Login</a>
        ) : (
          <div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Account ▼
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: '#333',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                minWidth: '120px',
                zIndex: 10
              }}>
                <button
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    padding: '10px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;