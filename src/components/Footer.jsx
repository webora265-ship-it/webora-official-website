import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import './Footer.css';

const currentYear = 2026;

const Footer = ({ onNavigate }) => {
  const handleClick = (page, e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-glow" />
      <div className="footer-content">
        <div className="footer-brand">
          <div
            className="footer-logo"
            onClick={(e) => handleClick('home', e)}
            style={{ cursor: 'pointer' }}
          >
            <span className="text-gradient">webora</span>
            <span className="logo-dot">.</span>
          </div>
          <p>
            The decentralized cosmic platform for spatial 3D web experiences and infinite digital universes.
          </p>
          <div className="footer-status-pill">
            <span className="status-ping"></span>
            <span>All Multiverse Clusters Operational</span>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h3>Ecosystem</h3>
            <a href="#home" onClick={(e) => handleClick('home', e)}>3D Cosmos Engine</a>
            <a href="#explore" onClick={(e) => handleClick('explore', e)}>Featured Worlds</a>
            <a href="#studio" onClick={(e) => handleClick('studio', e)}>3D Spatial Studio</a>
            <a href="#reels" onClick={(e) => handleClick('reels', e)}>🔥 Viral Insta Reels</a>
          </div>

          <div className="link-group">
            <h3>Community & Tech</h3>
            <a href="#community" onClick={(e) => handleClick('community', e)}>Creator Hub</a>
            <a href="#about" onClick={(e) => handleClick('about', e)}>Spatial Architecture</a>
            <a href="#community" onClick={(e) => handleClick('community', e)}>Monthly Hackathons</a>
            <a href="#">Documentation <ArrowUpRight size={12} /></a>
          </div>

          <div className="link-group">
            <h3>Connect</h3>
            <a href="#"><FaTwitter size={14} /> X / Twitter</a>
            <a href="#"><FaDiscord size={14} /> Discord Universe</a>
            <a href="#"><FaGithub size={14} /> GitHub Spatial</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Webora Spatial Systems Inc. All Rights Reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Protocol</a>
          <a href="#">Terms of Dimension</a>
          <a href="#">Security</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
