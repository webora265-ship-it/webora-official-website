import React from 'react';
import {
  Info,
  Cpu,
  Globe,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import './AboutPage.css';

const benchmarks = [
  { value: '120 FPS', label: 'Frame Rate Guarantee', desc: 'Hardware-accelerated Three.js render pipeline with sub-frame time damping.' },
  { value: '< 1.8 MB', label: 'Universal Bundle Size', desc: 'Modular tree-shaken spatial runtime optimized for instant mobile web load.' },
  { value: '100%', label: 'WebGL2 & WebGPU Ready', desc: 'Future-proof shader compilation compatible across desktop, mobile and VR headsets.' },
  { value: '32 Regions', label: 'Decentralized Edge Network', desc: 'Zero-latency global distribution delivering 3D assets in under 30 milliseconds.' }
];

const pillars = [
  {
    icon: <Cpu size={24} />,
    title: 'Spatial AST Compiler',
    desc: 'Transforms traditional React markup and state flows into high-performance 3D scene graphs in real time.'
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Volumetric GLSL Shaders',
    desc: 'Custom fragment & vertex shaders for glowing cosmic dust, raycasted atmospheric fog, and iridescent materials.'
  },
  {
    icon: <Globe size={24} />,
    title: 'Multiverse Cloud Routing',
    desc: 'Interconnect unlimited spatial subdomains with smooth continuous camera transitions and shared state.'
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Cross-Device Performance',
    desc: 'Automatic device capability detection and adaptive LOD (Level of Detail) scaling for butter-smooth experiences everywhere.'
  }
];

const AboutPage = () => {
  return (
    <div className="about-page-wrapper">
      <div className="about-hero">
        <div className="about-badge">
          <Info size={14} />
          <span>ABOUT WEBORA ARCHITECTURE</span>
        </div>
        <h1>
          Reimagining the Web in <br />
          <span className="text-gradient">Three Dimensions.</span>
        </h1>
        <p>
          For decades, the web has been trapped in flat rectangular boxes. Webora empowers creators,
          developers, and brands to build spatial cosmic websites that feel alive, interactive, and infinite.
        </p>
      </div>

      {/* Benchmarks Grid */}
      <div className="benchmarks-grid">
        {benchmarks.map((b, idx) => (
          <div key={idx} className="benchmark-card">
            <div className="benchmark-number">{b.value}</div>
            <div className="benchmark-title">{b.label}</div>
            <div className="benchmark-desc">{b.desc}</div>
          </div>
        ))}
      </div>

      {/* Architecture Pillars */}
      <div className="pillars-section">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#ffffff' }}>
            The Four Pillars of the <span className="text-gradient">Spatial Engine</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
            Built from scratch on Three.js, React Three Fiber, and WebGL2 to achieve maximum fluidity.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((p, idx) => (
            <div key={idx} className="pillar-item">
              <div className="pillar-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
