import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// 3D Object for Minimal Space (Planet with tilted neon ring & orbiting moon)
const MinimalSpaceMesh = ({ isHovered }) => {
  const groupRef = useRef();
  const ringRef = useRef();
  const moonRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isHovered ? 2.5 : 1.0;
    
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4 * speed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3 * speed;
    }
    if (moonRef.current) {
      moonRef.current.position.x = Math.sin(t * 1.5 * speed) * 1.8;
      moonRef.current.position.z = Math.cos(t * 1.5 * speed) * 1.8;
      moonRef.current.position.y = Math.sin(t * 2 * speed) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Planet */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#0d233a"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Wireframe Glow Shell */}
      <mesh>
        <sphereGeometry args={[0.92, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Tilted Neon Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.45, 0.035, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      {/* Orbiting Moon */}
      <mesh ref={moonRef} position={[1.8, 0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
};

// 3D Object for The Universe (Saturn-like with dual rings & particle disk)
const UniverseMesh = ({ isHovered }) => {
  const groupRef = useRef();
  const diskRef = useRef();

  useFrame((state, delta) => {
    const speed = isHovered ? 2.2 : 0.8;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3 * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
    if (diskRef.current) {
      diskRef.current.rotation.z -= delta * 0.5 * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color="#2a0845"
          emissive="#aa77ff"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Concentric Dual Rings */}
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.35, 0.04, 16, 64]} />
        <meshBasicMaterial color="#aa77ff" />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.65, 0.025, 16, 64]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>
      {/* Particle Disc */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.6, 0, 0]}>
        <ringGeometry args={[1.05, 1.8, 32]} />
        <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

// 3D Object for Tiny Friends (Playful cluster with bouncing orbs)
const TinyFriendsMesh = ({ isHovered }) => {
  const groupRef = useRef();
  const orb1Ref = useRef();
  const orb2Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isHovered ? 2.8 : 1.2;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5 * speed;
    }
    if (orb1Ref.current) {
      orb1Ref.current.position.y = Math.sin(t * 3 * speed) * 0.35 + 0.6;
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.y = Math.cos(t * 3 * speed) * 0.35 - 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={orb1Ref} position={[1.2, 0.6, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={orb2Ref} position={[-1.1, -0.5, 0.3]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
};

// 3D Object for Reimagine Web Matrix (Cyberpunk spinning icosahedron with AST wireframe)
const MatrixMesh = ({ isHovered }) => {
  const meshRef = useRef();
  const outerRef = useRef();

  useFrame((_, delta) => {
    const speed = isHovered ? 2.5 : 0.8;
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6 * speed;
      meshRef.current.rotation.y += delta * 0.8 * speed;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x -= delta * 0.3 * speed;
      outerRef.current.rotation.y -= delta * 0.5 * speed;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#061922"
          emissive="#00f0ff"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// 3D Object for Chronos Warp (Torus Knot with shifting holographic aura)
const ChronosMesh = ({ isHovered }) => {
  const meshRef = useRef();

  useFrame((_, delta) => {
    const speed = isHovered ? 2.2 : 0.7;
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5 * speed;
      meshRef.current.rotation.y += delta * 0.7 * speed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.7, 0.22, 64, 16]} />
      <meshStandardMaterial
        color="#0e3d36"
        emissive="#2dd4bf"
        emissiveIntensity={1.0}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
};

// 3D Object for Synthetix Neural Realm (Dodecahedron with electron cloud)
const SynthetixMesh = ({ isHovered }) => {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const speed = isHovered ? 2.6 : 0.9;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5 * speed;
      coreRef.current.rotation.z += delta * 0.3 * speed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.8 * speed;
      ringRef.current.rotation.z += delta * 0.4 * speed;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#34125b"
          emissive="#c084fc"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[1.35, 0.03, 16, 64]} />
          <meshBasicMaterial color="#e879f9" />
        </mesh>
        <mesh position={[1.35, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
};

// Main Exported Real 3D Mini-Canvas for each card
const WorldMiniCanvas = ({ type = 'minimal', isHovered = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-4, -3, -2]} intensity={1.0} color="#ff007f" />
      <pointLight position={[0, 0, 2]} intensity={isHovered ? 2.5 : 1.2} color="#00f0ff" />

      {type === 'minimal' && <MinimalSpaceMesh isHovered={isHovered} />}
      {type === 'universe' && <UniverseMesh isHovered={isHovered} />}
      {type === 'tiny' && <TinyFriendsMesh isHovered={isHovered} />}
      {type === 'matrix' && <MatrixMesh isHovered={isHovered} />}
      {type === 'chronos' && <ChronosMesh isHovered={isHovered} />}
      {type === 'synthetix' && <SynthetixMesh isHovered={isHovered} />}
    </Canvas>
  );
};

export default WorldMiniCanvas;
