import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="top-nav">
      <div className="nav-logo">
        webora<span className="logo-dot">.</span>
      </div>

      <div className="nav-center">
        <div className="nav-item">
          Explore <ChevronDown size={14} />
        </div>
        <div className="nav-item">
          Categories <ChevronDown size={14} />
        </div>
        <div className="nav-item">Community</div>
        <div className="nav-item">About</div>
      </div>

      <div className="nav-right">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search websites, ideas, categories..." />
        </div>
        <button className="sign-in-btn">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
