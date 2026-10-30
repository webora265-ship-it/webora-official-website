import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import {
  X,
  RotateCw,
  Eye,
  Sun,
  Globe,
  Maximize2
} from 'lucide-react';
import './World3DViewerModal.css';

// Dynamic 3D Model with Wireframe & Lighting Support
const InteractiveWorldObject = ({ type, isWireframe, lightTheme, isAutoRotate }) => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (isAutoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
    }
  });

  const primaryColor =
    lightTheme === 'cyan' ? '#00f0ff' :
    lightTheme === 'pink' ? '#ff007f' :
    lightTheme === 'purple' ? '#c084fc' : '#2dd4bf';

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.6}>
      <group ref={meshRef}>
        {type === 'minimal' && (
          <>
            <mesh>
              <sphereGeometry args={[1.5, 64, 64]} />
              <meshStandardMaterial
                color="#091424"
                emissive={primaryColor}
                emissiveIntensity={0.7}
                roughness={0.15}
                metalness={0.8}
                wireframe={isWireframe}
              />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[2.4, 0.05, 16, 100]} />
              <meshBasicMaterial color={primaryColor} wireframe={isWireframe} />
            </mesh>
            <mesh position={[2.6, 0.5, 0]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial color="#ffffff" emissive={primaryColor} emissiveIntensity={1.5} />
            </mesh>
          </>
        )}

        {type === 'universe' && (
          <>
            <mesh>
              <sphereGeometry args={[1.4, 64, 64]} />
              <meshStandardMaterial
                color="#1d0736"
                emissive={primaryColor}
                emissiveIntensity={0.8}
                wireframe={isWireframe}
              />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
              <torusGeometry args={[2.3, 0.06, 16, 100]} />
              <meshBasicMaterial color={primaryColor} />
            </mesh>
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <torusGeometry args={[2.7, 0.035, 16, 100]} />
              <meshBasicMaterial color="#ff007f" />
            </mesh>
          </>
        )}

        {type === 'tiny' && (
          <>
            <mesh>
              <sphereGeometry args={[1.2, 48, 48]} />
              <meshStandardMaterial
                color="#3d0a21"
                emissive={primaryColor}
                emissiveIntensity={0.8}
                wireframe={isWireframe}
              />
            </mesh>
            <mesh position={[1.8, 0.8, 0.5]}>
              <sphereGeometry args={[0.45, 32, 32]} />
              <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={1} />
            </mesh>
            <mesh position={[-1.7, -0.6, -0.5]}>
              <sphereGeometry args={[0.38, 32, 32]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
            </mesh>
          </>
        )}

        {type === 'matrix' && (
          <>
            <mesh>
              <icosahedronGeometry args={[1.3, 0]} />
              <meshStandardMaterial
                color="#061922"
                emissive={primaryColor}
                emissiveIntensity={1.1}
                roughness={0.1}
                metalness={0.9}
                wireframe={isWireframe}
              />
            </mesh>
            <mesh ref={ringRef}>
              <icosahedronGeometry args={[1.9, 1]} />
              <meshBasicMaterial color={primaryColor} wireframe transparent opacity={0.5} />
            </mesh>
          </>
        )}

        {type === 'chronos' && (
          <mesh>
            <torusKnotGeometry args={[1.1, 0.35, 100, 32]} />
            <meshStandardMaterial
              color="#0e3d36"
              emissive={primaryColor}
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.8}
              wireframe={isWireframe}
            />
          </mesh>
        )}

        {type === 'synthetix' && (
          <>
            <mesh>
              <dodecahedronGeometry args={[1.3, 0]} />
              <meshStandardMaterial
                color="#260c45"
                emissive={primaryColor}
                emissiveIntensity={1.2}
                wireframe={isWireframe}
              />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[2.2, 0.04, 16, 80]} />
              <meshBasicMaterial color={primaryColor} />
            </mesh>
          </>
        )}
      </group>
    </Float>
  );
};

const World3DViewerModal = ({ world, onClose }) => {
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [lightTheme, setLightTheme] = useState('cyan');

  if (!world) return null;

  return (
    <div className="world-viewer-backdrop" onClick={onClose}>
      <div className="world-viewer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="world-viewer-header">
          <div className="viewer-header-left">
            <div className="viewer-title-box">
              <h3>{world.title}</h3>
              <div className="viewer-domain-pill">
                <Globe size={11} />
                <span>{world.domain}</span>
              </div>
            </div>
          </div>

          <div className="viewer-header-right">
            <button
              className="viewer-close-btn"
              onClick={onClose}
              aria-label="Close Viewer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 3D Body */}
        <div className="world-viewer-body">
          {/* Controls HUD */}
          <div className="viewer-controls-hud">
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
              3D Sandbox Tools
            </span>

            <button
              className={`hud-control-btn ${isWireframe ? 'active' : ''}`}
              onClick={() => setIsWireframe(!isWireframe)}
            >
              <Eye size={13} />
              <span>{isWireframe ? 'Solid Mode' : 'Wireframe Mesh'}</span>
            </button>

            <button
              className={`hud-control-btn ${isAutoRotate ? 'active' : ''}`}
              onClick={() => setIsAutoRotate(!isAutoRotate)}
            >
              <RotateCw size={13} />
              <span>{isAutoRotate ? 'Pause Orbit' : 'Auto Rotate'}</span>
            </button>

            <button
              className="hud-control-btn"
              onClick={() => {
                const themes = ['cyan', 'pink', 'purple', 'teal'];
                const next = themes[(themes.indexOf(lightTheme) + 1) % themes.length];
                setLightTheme(next);
              }}
            >
              <Sun size={13} />
              <span>Theme: {lightTheme.toUpperCase()}</span>
            </button>
          </div>

          {/* Drag to Orbit Hint */}
          <div className="viewer-drag-hint">
            <Maximize2 size={13} color="#00f0ff" />
            <span>Click & Drag to Orbit in 3D • Scroll to Zoom</span>
          </div>

          {/* Telemetry HUD */}
          <div className="viewer-telemetry-hud">
            <div className="telemetry-item">
              FPS: <strong>120</strong>
            </div>
            <div className="telemetry-item">
              POLYGONS: <strong>{isWireframe ? '4.8K WIRE' : '18.4K SHADED'}</strong>
            </div>
            <div className="telemetry-item">
              ENGINE: <strong>THREE.JS WEBGL2</strong>
            </div>
          </div>

          {/* Real 3D Interactive Canvas */}
          <div className="viewer-canvas-area">
            <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
              <directionalLight position={[-10, -10, -10]} intensity={1.2} color="#ff007f" />
              <pointLight position={[0, 0, 3]} intensity={2.0} color="#00f0ff" />

              <Stars radius={80} depth={40} count={2500} factor={3} saturation={1} fade speed={1.5} />

              <InteractiveWorldObject
                type={world.meshType || 'minimal'}
                isWireframe={isWireframe}
                lightTheme={lightTheme}
                isAutoRotate={isAutoRotate}
              />

              <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={2.5}
                maxDistance={12}
                autoRotate={false}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default World3DViewerModal;
