import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Search,
  Globe,
  Eye,
  Star,
  Maximize2,
  ArrowUpRight
} from 'lucide-react';
import WorldMiniCanvas from '../components/WorldMiniCanvas';
import World3DViewerModal from '../components/World3DViewerModal';
import './ExplorePage.css';

const allWorldsCatalog = [
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
  },
  {
    id: 7,
    title: 'Solar System Simulator',
    category: 'Spatial 3D',
    meshType: 'minimal',
    domain: 'solarsystem.webora.io',
    tagType: 'tag-cyan',
    status: 'Physics Active',
    description: 'Complete planetary simulation with realistic gravitational calculations and astronomical timescale controllers.',
    colorTheme: '#00f0ff',
    gradient: 'linear-gradient(135deg, #0a1128, #1c2541)',
    tags: ['Astrophysics', 'Three.js', 'Simulation'],
    views: '78.1K',
    rating: '4.97',
    creator: { name: 'kepler_orbit', initial: 'K', bg: '#00f0ff' }
  },
  {
    id: 8,
    title: 'Navratri Durga Temple 3D',
    category: 'Interactive Art',
    meshType: 'universe',
    domain: 'navratri.webora.io',
    tagType: 'tag-pink',
    status: 'Cultural Experience',
    description: 'Virtual interactive temple celebrating 9 divine forms of Maa Durga with devotional spatial acoustics.',
    colorTheme: '#ff007f',
    gradient: 'linear-gradient(135deg, #290d23, #4d153e)',
    tags: ['Cultural 3D', 'Spatial Audio', 'WebGL'],
    views: '142K',
    rating: '5.0',
    creator: { name: 'vedic_3d', initial: 'V', bg: '#ff007f' }
  }
];

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeViewerWorld, setActiveViewerWorld] = useState(null);

  const categories = ['All', 'Spatial 3D', 'Interactive Art', 'Futuristic SaaS', 'AI Ecosystems'];

  const filteredWorlds = allWorldsCatalog.filter(world => {
    const matchesCategory = selectedCategory === 'All' || world.category === selectedCategory;
    const matchesSearch = world.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          world.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          world.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="explore-page-wrapper">
      <div className="explore-hero-box">
        <div className="explore-badge">
          <Compass size={14} />
          <span>SPATIAL REALMS DIRECTORY</span>
        </div>
        <h1>
          Explore <span className="text-gradient">Every Universe.</span>
        </h1>
        <p>
          Discover cutting-edge 3D websites, spatial portfolios, and interactive WebGL experiences
          created by the worldwide Webora developer community.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="explore-filter-bar">
        <div className="explore-search-input">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search by world name, creator, or tech stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="explore-tags-pills">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`explore-tag-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Real 3D Worlds */}
      <motion.div layout className="creations-grid">
        <AnimatePresence>
          {filteredWorlds.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="creation-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
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

              {/* Real 3D WebGL Canvas */}
              <div className="card-preview-stage" style={{ background: item.gradient }}>
                <div className="preview-grid-wireframe"></div>

                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                  <WorldMiniCanvas
                    type={item.meshType}
                    isHovered={hoveredCardId === item.id}
                  />
                </div>

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

                <div className="card-tags-list">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="card-creator-footer">
                  <div className="creator-info">
                    <div className="creator-avatar" style={{ background: item.creator.bg }}>
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

      {/* 3D Viewer Sandbox Modal */}
      <AnimatePresence>
        {activeViewerWorld && (
          <World3DViewerModal
            world={activeViewerWorld}
            onClose={() => setActiveViewerWorld(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExplorePage;
