import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Compass, Rocket, Zap } from 'lucide-react';
import './Featured.css';

const creations = [
  {
    title: 'Minimal Space',
    category: 'Clean & Simple',
    icon: <Sparkles size={24} />,
    color: 'linear-gradient(135deg, #1e1e2f, #2a2a40)'
  },
  {
    title: 'The Universe',
    category: 'Educational / Interactive',
    icon: <Compass size={24} />,
    color: 'linear-gradient(135deg, #2a0845, #6441A5)'
  },
  {
    title: 'Tiny Friends',
    category: 'Fun / Entertainment',
    icon: <Rocket size={24} />,
    color: 'linear-gradient(135deg, #ff9966, #ff5e62)'
  },
  {
    title: 'Reimagine Web',
    category: 'Creative / Portfolio',
    icon: <Zap size={24} />,
    color: 'linear-gradient(135deg, #00f2fe, #4facfe)'
  }
];

const Featured = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="featured-section" id="work">
      <div className="featured-header">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured <span className="text-gradient">Creations</span>
        </motion.h2>
        <motion.button 
          className="btn btn-outline"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          View All
        </motion.button>
      </div>

      <motion.div className="featured-grid" style={{ y }}>
        {creations.map((item, index) => (
          <motion.div 
            className="featured-card"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{ background: item.color }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <div className="card-overlay glass"></div>
            <div className="card-content">
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
            <div className="card-badge">Featured</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Featured;
