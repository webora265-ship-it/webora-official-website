import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <h2><span className="text-gradient">Web</span>ora</h2>
          <p>Designing the future, one pixel at a time.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h3>Company</h3>
            <a href="#about">About Us</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="link-group">
            <h3>Socials</h3>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Webora. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
