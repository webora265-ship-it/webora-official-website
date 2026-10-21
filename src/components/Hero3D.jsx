import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, MeshTransmissionMaterial, Float, Environment, Stars } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero3D.css';

const PlanetSystem = () => {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main Glass Planet */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            backside
            backsideThickness={2}
            thickness={1.5}
            chromaticAberration={0.8}
            anisotropy={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
            color="#aa77ff"
            distortion={0.5}
            distortionScale={0.5}
          />
        </Sphere>
      </Float>

      {/* Ring */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.5}>
        <Torus args={[2.2, 0.05, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
        </Torus>
      </Float>

      {/* Moons */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[2.5, 1, -1]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
        </Sphere>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.4, 32, 32]} position={[-2, -1.5, 1]}>
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
        </Sphere>
      </Float>
    </group>
  );
};

const Hero3D = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="hero-section" id="home">
      <motion.div className="hero-content" style={{ y: y1, opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-badge"
        >
          <span>✨ Welcome to Webora Universe</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore <br/><span className="text-gradient">Infinite Worlds.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          From simple ideas to extraordinary experiences—discover thousands of unique websites and be part of a creative universe.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn btn-primary">Explore Now</button>
          <button className="btn btn-outline glass">Surprise Me</button>
        </motion.div>
      </motion.div>

      <motion.div className="hero-3d-container" style={{ y: y2 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#aa77ff" />
          
          <PlanetSystem />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />
          
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            enablePan={false}
          />
        </Canvas>
      </motion.div>
    </section>
  );
};

export default Hero3D;
