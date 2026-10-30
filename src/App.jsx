import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Webora3DScrollExperience from './components/Webora3DScrollExperience';
import InstagramReelsShowcase from './components/InstagramReelsShowcase';
import Featured from './components/Featured';
import Services from './components/Services';
import Footer from './components/Footer';
import ExplorePage from './pages/ExplorePage';
import StudioPage from './pages/StudioPage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import { Hexagon } from 'lucide-react';
import './components/HeroBanner.css';
import './index.css';

function App() {
  const [activePage, setActivePage] = useState('home');

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'explore', 'studio', 'reels', 'community', 'about'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.location.hash = `#${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Top Navigation */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Page Routing */}
      {activePage === 'home' && (
        <main>
          {/* 3D Scroll-Triggered Interactive Cosmos Sphere */}
          <Webora3DScrollExperience />

          {/* Cosmic Platform Stats Bar */}
          <div className="stats-bar-wrapper" style={{ marginTop: '20px', marginBottom: '40px' }}>
            <div className="stats-bar glass">
              <div className="stat-item">
                <div className="stat-icon pink"><Hexagon size={20} /></div>
                <div className="stat-text">
                  <h4>5000+</h4>
                  <p>Cosmic Worlds</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon blue"><Hexagon size={20} /></div>
                <div className="stat-text">
                  <h4>120 FPS</h4>
                  <p>Spatial Three.js</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon pink-light"><Hexagon size={20} /></div>
                <div className="stat-text">
                  <h4>∞</h4>
                  <p>Infinite Multiverse</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon green"><Hexagon size={20} /></div>
                <div className="stat-text">
                  <h4>10K+</h4>
                  <p>Webora Creators</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Reels / Viral Video Creations Section */}
          <InstagramReelsShowcase />

          {/* Featured 3D Worlds (Real Three.js WebGL Canvases & Sandbox Viewer) */}
          <Featured onExploreClick={() => handleNavigate('explore')} />

          {/* Platform Capabilities */}
          <Services />
        </main>
      )}

      {activePage === 'explore' && (
        <main style={{ paddingTop: '60px' }}>
          <ExplorePage />
        </main>
      )}

      {activePage === 'studio' && (
        <main style={{ paddingTop: '60px' }}>
          <StudioPage />
        </main>
      )}

      {activePage === 'reels' && (
        <main style={{ paddingTop: '100px' }}>
          <InstagramReelsShowcase />
        </main>
      )}

      {activePage === 'community' && (
        <main style={{ paddingTop: '60px' }}>
          <CommunityPage />
        </main>
      )}

      {activePage === 'about' && (
        <main style={{ paddingTop: '60px' }}>
          <AboutPage />
        </main>
      )}

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
