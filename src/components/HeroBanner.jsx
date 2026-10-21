import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Hexagon } from 'lucide-react';
import './HeroBanner.css';

const HeroBanner = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="hero-banner-section">
      <div className="hero-banner-container">
        
        {/* Background 3D Canvas */}
        <div className="hero-canvas-bg">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} color="#aa77ff" />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} enablePan={false} />
          </Canvas>
        </div>

        {/* Content */}
        <div className="hero-banner-content">
          <motion.div 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            A UNIVERSE OF WEBSITES
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore <br/>
            <span className="text-gradient">Infinite Worlds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From simple ideas to extraordinary experiences — <br/>
            discover thousands of unique websites and be part <br/>
            of a creative universe.
          </motion.p>

          <motion.div 
            className="hero-action-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button className="btn-explore">
              Explore Now <ArrowRight size={16} />
            </button>
            <button className="btn-surprise">
              <Hexagon size={16} /> Surprise Me
            </button>
          </motion.div>
        </div>

        <motion.div className="hero-illustration" style={{ y: yParallax }}>
           <img
             src="/hero_illustration.jpg"
             alt="Webora 3D Space Illustration"
             className="hero-illus-img"
           />
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar-wrapper">
        <div className="stats-bar glass">
          <div className="stat-item">
            <div className="stat-icon pink"><Hexagon size={20} /></div>
            <div className="stat-text">
              <h4>5000+</h4>
              <p>Websites</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon blue"><Hexagon size={20} /></div>
            <div className="stat-text">
              <h4>50+</h4>
              <p>Categories</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon pink-light"><Hexagon size={20} /></div>
            <div className="stat-text">
              <h4>∞</h4>
              <p>Creative Possibilities</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon green"><Hexagon size={20} /></div>
            <div className="stat-text">
              <h4>10K+</h4>
              <p>Community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
