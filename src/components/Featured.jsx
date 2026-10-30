import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Compass,
  Rocket,
  Zap,
  Globe,
  Eye,
  Star,
  Layers,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import WorldMiniCanvas from './WorldMiniCanvas';
import World3DViewerModal from './World3DViewerModal';
import './Featured.css';

const categories = [
  'All Worlds',
  'Spatial 3D',
  'Interactive Art',
  'Futuristic SaaS',
  'AI Ecosystems'
];

const creationsData = [
  {
    id: 1,
    title: 'Minimal Space',
    category: 'Spatial 3D',
    meshType: 'minimal',
    domain: 'minimal-space.webora.io',
    tagType: 'tag-cyan',
    status: '120 FPS WebGL',
    description: 'Clean architectural universe with procedural lighting, spatial camera paths, and soft atmospheric shadows.',
    colorTheme: '#00f0ff',
    gradient: 'linear-gradient(135deg, #090a14, #121c2d)',
    tags: ['Three.js', 'Clean & Minimal', 'Spatial Nav'],
    views: '54.2K',
    rating: '4.95',
    creator: { name: 'astro_arch', initial: 'A', bg: '#00f0ff' }
  },
  {
    id: 2,
    title: 'The Universe',
    category: 'Interactive Art',
    meshType: 'universe',
    domain: 'universe-explorer.webora.io',
    tagType: 'tag-purple',
    status: 'R3F Dynamic',
    description: 'Educational spatial journey featuring full planetary orbits, relativistic speeds, and reactive celestial audio.',
    colorTheme: '#c084fc',
    gradient: 'linear-gradient(135deg, #130924, #2c124d)',
    tags: ['React Three Fiber', 'Audio Reactive', 'Cosmic'],
    views: '88.9K',
    rating: '5.0',
    creator: { name: 'stellar_lab', initial: 'S', bg: '#8a2be2' }
  },
  {
    id: 3,
    title: 'Tiny Friends Galaxy',
    category: 'Interactive Art',
    meshType: 'tiny',
    domain: 'tinyfriends.webora.io',
    tagType: 'tag-pink',
    status: 'Physics Active',
    description: 'Playful low-poly celestial creatures interacting inside soft gravitational bubbles with spring ragdoll physics.',
    colorTheme: '#ff007f',
    gradient: 'linear-gradient(135deg, #240a18, #421228)',
    tags: ['Cannon.js', 'Playful 3D', 'Interactive'],
    views: '41.0K',
    rating: '4.9',
    creator: { name: 'pixie_art', initial: 'P', bg: '#ff007f' }
  },
  {
    id: 4,
    title: 'Reimagine Web Matrix',
    category: 'Futuristic SaaS',
    meshType: 'matrix',
    domain: 'matrix.webora.io',
    tagType: 'tag-cyan',
    status: 'Production v2',
    description: 'Next-generation spatial portfolio for creative coders, featuring holographic AST syntax nodes and raycasted tabs.',
    colorTheme: '#00f0ff',
    gradient: 'linear-gradient(135deg, #061922, #0d3845)',
    tags: ['Cyberpunk', 'AST Compiler', 'GLSL Shaders'],
    views: '92.6K',
    rating: '4.98',
    creator: { name: 'neo_coder', initial: 'N', bg: '#00f0ff' }
  },
  {
    id: 5,
    title: 'Chronos Warp Studio',
    category: 'Spatial 3D',
    meshType: 'chronos',
    domain: 'chronos.webora.io',
    tagType: 'tag-teal',
    status: 'Spatial Audio',
    description: 'Relativistic time-warp interactive portfolio showcasing high-density volumetric particle fields and Doppler sound.',
    colorTheme: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #061e1b, #0e3d36)',
    tags: ['Volumetric', 'WebGL 2.0', 'Audio Engine'],
    views: '67.4K',
    rating: '4.92',
    creator: { name: 'warp_mechanic', initial: 'W', bg: '#2dd4bf' }
  },
  {
    id: 6,
    title: 'Synthetix Neural Realm',
    category: 'AI Ecosystems',
    meshType: 'synthetix',
    domain: 'synthetix.webora.io',
    tagType: 'tag-purple',
    status: 'Neural Model',
    description: 'Dynamic neural network landscape where spatial nodes learn visitor behavior to reconstruct customized layouts.',
    colorTheme: '#a855f7',
    gradient: 'linear-gradient(135deg, #1b0c2e, #34125b)',
    tags: ['Neural Net', 'Generative UI', 'R3F Shaders'],
    views: '115.3K',
    rating: '5.0',
    creator: { name: 'neural_mind', initial: 'M', bg: '#a855f7' }
  }
];

const Featured = ({ onExploreClick }) => {
  const [activeFilter, setActiveFilter] = useState('All Worlds');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeViewerWorld, setActiveViewerWorld] = useState(null);

  const filteredCreations = creationsData.filter(item => {
    if (activeFilter === 'All Worlds') return true;
    return item.category === activeFilter;
  });

  return (
    <section className="featured-section" id="work">
      {/* Header & Controls */}
      <div className="featured-header-wrapper">
        <div className="featured-header-top">
          <div className="featured-header-title-box">
            <div className="featured-badge-pill">
              <Sparkles size={13} />
              <span>COMMUNITY CREATIONS SHOWCASE</span>
            </div>
            <h2>
              Featured <span className="text-gradient">3D Worlds</span>
            </h2>
            <p>
              Experience the next frontier of web design. Explore interactive spatial websites,
              holographic portfolios, and AI ecosystems built entirely on Webora.
            </p>
          </div>

          <div className="featured-header-actions">
            <button
              className="btn btn-outline glass"
              style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}
              onClick={onExploreClick}
            >
              <Compass size={16} /> Explore All Realities
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="filter-pills-bar">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === 'All Worlds' && <Globe size={13} />}
              {cat === 'Spatial 3D' && <Layers size={13} />}
              {cat === 'Interactive Art' && <Rocket size={13} />}
              {cat === 'Futuristic SaaS' && <Zap size={13} />}
              {cat === 'AI Ecosystems' && <Sparkles size={13} />}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Creations Grid */}
      <motion.div layout className="creations-grid">
        <AnimatePresence>
          {filteredCreations.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="creation-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onMouseEnter={() => setHoveredCardId(item.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={() => setActiveViewerWorld(item)}
            >
              {/* Browser Chrome Header */}
              <div className="card-browser-bar">
                <div className="browser-dots">
                  <span className="browser-dot dot-red"></span>
                  <span className="browser-dot dot-yellow"></span>
                  <span className="browser-dot dot-green"></span>
                </div>

                <div className="browser-url">
                  <Globe size={11} />
                  <span>{item.domain}</span>
                </div>

                <div className={`browser-status-tag ${item.tagType}`}>
                  {item.status}
                </div>
              </div>

              {/* REAL 3D Three.js WebGL Canvas Stage */}
              <div
                className="card-preview-stage"
                style={{ background: item.gradient }}
              >
                <div className="preview-grid-wireframe"></div>

                {/* Real 3D Rotating Mesh Canvas */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                  <WorldMiniCanvas
                    type={item.meshType}
                    isHovered={hoveredCardId === item.id}
                  />
                </div>

                {/* Hover Action Overlay with 3D Sandbox Launcher */}
                <div className="preview-hover-action">
                  <div className="launch-btn-pill">
                    <Maximize2 size={15} />
                    <span>Launch 3D Sandbox</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body-content">
                <div className="card-title-row">
                  <h3>{item.title}</h3>
                  <span className="card-category-badge">{item.category}</span>
                </div>

                <p className="card-desc">{item.description}</p>

                {/* Tags */}
                <div className="card-tags-list">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer: Creator info & metrics */}
                <div className="card-creator-footer">
                  <div className="creator-info">
                    <div
                      className="creator-avatar"
                      style={{ background: item.creator.bg }}
                    >
                      {item.creator.initial}
                    </div>
                    <span>@{item.creator.name}</span>
                  </div>

                  <div className="card-metrics">
                    <div className="metric-item">
                      <Eye size={12} color="#94a3b8" />
                      <span>{item.views}</span>
                    </div>
                    <div className="metric-item">
                      <Star size={12} color="#fbbf24" fill="#fbbf24" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Live 3D World Sandbox Modal */}
      <AnimatePresence>
        {activeViewerWorld && (
          <World3DViewerModal
            world={activeViewerWorld}
            onClose={() => setActiveViewerWorld(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Featured;
