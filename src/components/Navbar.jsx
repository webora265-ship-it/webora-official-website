import React, { useState } from 'react';
import { Search, Sparkles, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ activePage = 'home', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (pageId, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('explore');
    }
  };

  return (
    <nav className="top-nav">
      {/* Brand Logo */}
      <div
        className="nav-logo"
        onClick={(e) => handleNavClick('home', e)}
        style={{ cursor: 'pointer' }}
      >
        webora<span className="logo-dot">.</span>
      </div>

      {/* Nav Center - Multi-Page Navigation Links */}
      <div className={`nav-center ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <button
          className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('home', e)}
        >
          Home
        </button>

        <button
          className={`nav-item ${activePage === 'explore' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('explore', e)}
        >
          Explore 3D Worlds
        </button>

        <button
          className={`nav-item studio-nav-item ${activePage === 'studio' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('studio', e)}
        >
          <Sparkles size={13} />
          <span>3D Studio</span>
        </button>

        <button
          className={`nav-item reels-nav-item ${activePage === 'reels' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('reels', e)}
        >
          🔥 Insta Reels
        </button>

        <button
          className={`nav-item ${activePage === 'community' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('community', e)}
        >
          Community
        </button>

        <button
          className={`nav-item ${activePage === 'about' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('about', e)}
        >
          About
        </button>
      </div>

      {/* Nav Right - Search Bar & Launch */}
      <div className="nav-right">
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search 3D universes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <button
          className="sign-in-btn"
          onClick={(e) => handleNavClick('studio', e)}
        >
          Launch Studio
        </button>

        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
