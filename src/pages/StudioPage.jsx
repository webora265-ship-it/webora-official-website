import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import {
  Sparkles,
  Copy,
  Check,
  Rocket,
  Eye
} from 'lucide-react';
import './StudioPage.css';

// Dynamic Configurable Studio 3D Mesh
const ConfigurableWorld = ({
  meshType,
  ringType,
  color,
  wireframe,
  rotationSpeed
}) => {
  const groupRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * rotationSpeed * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main 3D Core Geometry */}
        {meshType === 'sphere' && (
          <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
              color="#0d0a1e"
              emissive={color}
              emissiveIntensity={0.8}
              roughness={0.15}
              metalness={0.8}
              wireframe={wireframe}
            />
          </mesh>
        )}

        {meshType === 'icosahedron' && (
          <mesh>
            <icosahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
              color="#0d0a1e"
              emissive={color}
              emissiveIntensity={1.0}
              roughness={0.1}
              metalness={0.9}
              wireframe={wireframe}
            />
          </mesh>
        )}

        {meshType === 'torusKnot' && (
          <mesh>
            <torusKnotGeometry args={[1.1, 0.35, 100, 32]} />
            <meshStandardMaterial
              color="#0a191e"
              emissive={color}
              emissiveIntensity={1.1}
              roughness={0.2}
              metalness={0.8}
              wireframe={wireframe}
            />
          </mesh>
        )}

        {meshType === 'dodecahedron' && (
          <mesh>
            <dodecahedronGeometry args={[1.4, 0]} />
            <meshStandardMaterial
              color="#1a0a26"
              emissive={color}
              emissiveIntensity={1.0}
              roughness={0.2}
              wireframe={wireframe}
            />
          </mesh>
        )}

        {/* Dynamic Rings */}
        {ringType === 'single' && (
          <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.5, 0.05, 16, 100]} />
            <meshBasicMaterial color={color} />
          </mesh>
        )}

        {ringType === 'dual' && (
          <>
            <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0, 0]}>
              <torusGeometry args={[2.4, 0.05, 16, 100]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <mesh rotation={[Math.PI / 2.6, 0, 0]}>
              <torusGeometry args={[2.8, 0.03, 16, 100]} />
              <meshBasicMaterial color="#ff007f" />
            </mesh>
          </>
        )}
      </group>
    </Float>
  );
};

const StudioPage = () => {
  const [meshType, setMeshType] = useState('sphere');
  const [ringType, setRingType] = useState('single');
  const [color, setColor] = useState('#00f0ff');
  const [wireframe, setWireframe] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1.2);
  const [copied, setCopied] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const colorsList = [
    { name: 'Cyan', hex: '#00f0ff' },
    { name: 'Pink', hex: '#ff007f' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Teal', hex: '#2dd4bf' },
    { name: 'Amber', hex: '#f59e0b' }
  ];

  const generatedCode = `<WeboraWorld
  geometry="${meshType}"
  ringSystem="${ringType}"
  emissiveColor="${color}"
  wireframe={${wireframe}}
  speed={${rotationSpeed}}
/>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeploy = () => {
    setDeployed(true);
    setTimeout(() => setDeployed(false), 3500);
  };

  return (
    <div className="studio-page-wrapper">
      <div className="studio-header">
        <div className="studio-badge">
          <Sparkles size={14} />
          <span>WEBORA 3D SPATIAL STUDIO</span>
        </div>
        <h1>
          Craft Your <span className="text-gradient">3D Universe.</span>
        </h1>
        <p>
          Customize real-time spatial geometries, neon atmosphere rings, and lighting shaders.
          Export production Three.js code or deploy instantly to the Webora Multiverse.
        </p>
      </div>

      <div className="studio-workspace-grid">
        {/* 3D Viewport Side */}
        <div className="studio-viewport-panel">
          <div className="studio-canvas-hud">
            <div className="studio-hud-tag">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              <span>LIVE R3F ENGINE: 120 FPS</span>
            </div>
            <div className="studio-hud-tag">
              <span>MESH: {meshType.toUpperCase()}</span>
            </div>
          </div>

          <div className="studio-drag-hint">
            <span>Click & Drag to Orbit • Scroll to Zoom</span>
          </div>

          <div className="studio-viewport-canvas">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[8, 8, 8]} intensity={1.8} color="#ffffff" />
              <directionalLight position={[-8, -8, -8]} intensity={1.2} color="#aa77ff" />
              <pointLight position={[0, 0, 3]} intensity={2.0} color={color} />

              <Stars radius={80} depth={40} count={2500} factor={3} saturation={1} fade speed={1.2} />

              <ConfigurableWorld
                meshType={meshType}
                ringType={ringType}
                color={color}
                wireframe={wireframe}
                rotationSpeed={rotationSpeed}
              />

              <OrbitControls enableZoom={true} enablePan={false} minDistance={2.5} maxDistance={10} />
            </Canvas>
          </div>
        </div>

        {/* Controls Inspector Side */}
        <div className="studio-inspector-panel">
          <div>
            <div className="control-group">
              <div className="inspector-section-title">Core Geometry</div>
              <div className="options-pill-grid">
                <button
                  className={`option-btn ${meshType === 'sphere' ? 'active' : ''}`}
                  onClick={() => setMeshType('sphere')}
                >
                  Cosmic Sphere
                </button>
                <button
                  className={`option-btn ${meshType === 'icosahedron' ? 'active' : ''}`}
                  onClick={() => setMeshType('icosahedron')}
                >
                  Icosahedron
                </button>
                <button
                  className={`option-btn ${meshType === 'torusKnot' ? 'active' : ''}`}
                  onClick={() => setMeshType('torusKnot')}
                >
                  Torus Knot
                </button>
                <button
                  className={`option-btn ${meshType === 'dodecahedron' ? 'active' : ''}`}
                  onClick={() => setMeshType('dodecahedron')}
                >
                  Dodecahedron
                </button>
              </div>
            </div>

            <div className="control-group">
              <div className="inspector-section-title">Neon Ring System</div>
              <div className="options-pill-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                <button
                  className={`option-btn ${ringType === 'none' ? 'active' : ''}`}
                  onClick={() => setRingType('none')}
                >
                  None
                </button>
                <button
                  className={`option-btn ${ringType === 'single' ? 'active' : ''}`}
                  onClick={() => setRingType('single')}
                >
                  Single Ring
                </button>
                <button
                  className={`option-btn ${ringType === 'dual' ? 'active' : ''}`}
                  onClick={() => setRingType('dual')}
                >
                  Dual Rings
                </button>
              </div>
            </div>

            <div className="control-group">
              <div className="inspector-section-title">Emissive Shader Color</div>
              <div className="colors-row">
                {colorsList.map((c) => (
                  <button
                    key={c.hex}
                    className={`color-dot-btn ${color === c.hex ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setColor(c.hex)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="control-group">
              <div className="slider-control">
                <div className="slider-label-row">
                  <span>Orbit Speed</span>
                  <span>{rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="studio-slider"
                />
              </div>
            </div>

            <div className="control-group">
              <button
                className={`option-btn ${wireframe ? 'active' : ''}`}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => setWireframe(!wireframe)}
              >
                <Eye size={14} />
                <span>{wireframe ? 'Disable Wireframe Mesh' : 'Enable Wireframe Mesh'}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="inspector-section-title">React Three Fiber Code</div>
            <div className="studio-code-box">
              <pre style={{ margin: 0 }}>{generatedCode}</pre>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="option-btn"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={handleCopyCode}
              >
                {copied ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
              </button>

              <button
                className="deploy-world-btn"
                style={{ flex: 1.5 }}
                onClick={handleDeploy}
              >
                <Rocket size={16} />
                <span>{deployed ? '✨ Deployed to Cosmos!' : 'Deploy Reality'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
