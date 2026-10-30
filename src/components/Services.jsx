import React from 'react';
import { motion } from 'framer-motion';
import { Boxes, Sparkles, Cpu, Layers, ArrowUpRight, Zap } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    title: 'Spatial 3D Experiences',
    description: 'Immersive, interactive web experiences rendered in real-time WebGL & WebGPU with reactive spatial physics.',
    icon: <Boxes size={32} color="#00f0ff" />,
    tag: 'THREE.JS / SHADERS',
    glowColor: '#00f0ff'
  },
  {
    title: 'Holographic UI & Systems',
    description: 'Ultra-modern, glassmorphic design systems engineered for high-conversion spatial web applications.',
    icon: <Layers size={32} color="#c084fc" />,
    tag: 'FUTURISTIC UX',
    glowColor: '#8a2be2'
  },
  {
    title: 'Generative AI Pipelines',
    description: 'Neural prompt-to-3D compilers and autonomous layouts that dynamically reconstruct themselves.',
    icon: <Cpu size={32} color="#ff007f" />,
    tag: 'NEURAL RUNTIME',
    glowColor: '#ff007f'
  },
  {
    title: 'Global Edge Multiverse',
    description: 'Sub-second decentralized web delivery with edge caching, WebAssembly optimizations, and 120 FPS guarantees.',
    icon: <Zap size={32} color="#38bdf8" />,
    tag: 'ULTRA LOW-LATENCY',
    glowColor: '#38bdf8'
  }
];

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <div className="services-badge-pill">
          <Sparkles size={12} />
          <span>CAPABILITIES & ARCHITECTURE</span>
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built for the <span className="text-gradient">Next Dimension</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Delivering high-performance spatial digital experiences that captivate visitors and redefine creative boundaries.
        </motion.p>
      </div>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <motion.div 
            className="service-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="service-card-glow"
              style={{ background: service.glowColor }}
            />
            <div className="icon-wrapper">
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-pill-tag">
              <span>{service.tag}</span>
              <ArrowUpRight size={13} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
