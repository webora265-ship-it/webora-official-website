import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Code2,
  Boxes,
  Zap,
  ArrowRight,
  Compass,
  Maximize2
} from 'lucide-react';
import './Webora3DScrollExperience.css';

// ============================================================================
// 1. CUSTOM GLOWING PARTICLE SHADER (High-Performance Cosmic Dust & Nebula)
// ============================================================================
const CosmicParticleShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uScrollProgress;
    attribute float aScale;
    attribute vec3 aRandomness;
    attribute vec3 aColor;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vColor = aColor;
      vec3 pos = position;

      // Subtle orbital motion and breathing
      float angle = uTime * 0.12 + aRandomness.x * 6.2831;
      pos.x += sin(angle) * aRandomness.y * 0.4;
      pos.y += cos(angle) * aRandomness.z * 0.4;

      // Particle expansion & warp effect in Step 3
      float warp = smoothstep(0.6, 1.0, uScrollProgress);
      pos.z += warp * aRandomness.z * 5.0;
      pos.xy *= 1.0 + warp * 0.5;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Attenuated point size based on depth
      gl_PointSize = (aScale * 38.0) / -mvPosition.z;
      
      // Distance fade
      vAlpha = smoothstep(30.0, 4.0, -mvPosition.z);
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Soft exponential radial glow with intense core
      float strength = pow(1.0 - (dist * 2.0), 2.2);
      vec3 finalColor = vColor * (strength + 0.35);

      gl_FragColor = vec4(finalColor, strength * vAlpha * 0.95);
    }
  `,
};

// Pre-generate deterministic particle data for high performance
const createParticleBuffers = (count = 2400) => {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const scl = new Float32Array(count);
  const rnd = new Float32Array(count * 3);

  const palette = [
    new THREE.Color('#00f0ff'), // cyan
    new THREE.Color('#8a2be2'), // purple
    new THREE.Color('#ff007f'), // neon pink
    new THREE.Color('#38bdf8'), // electric sky
    new THREE.Color('#ffffff'), // pure starlight
  ];

  // Seeded deterministic pseudo-random generator
  let seed = 42;
  const pseudoRand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < count; i++) {
    const r = 2.5 + pseudoRand() * 15.0;
    const theta = pseudoRand() * Math.PI * 2;
    const phi = Math.acos(2 * pseudoRand() - 1);

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);

    const colorChoice = palette[Math.floor(pseudoRand() * palette.length)];
    col[i * 3] = colorChoice.r;
    col[i * 3 + 1] = colorChoice.g;
    col[i * 3 + 2] = colorChoice.b;

    scl[i] = 0.6 + pseudoRand() * 1.8;
    rnd[i * 3] = pseudoRand();
    rnd[i * 3 + 1] = pseudoRand();
    rnd[i * 3 + 2] = pseudoRand();
  }

  return { positions: pos, colors: col, scales: scl, randomness: rnd };
};

const staticParticleData = createParticleBuffers(2400);

const CosmicParticleField = ({ scrollRef }) => {
  const pointsRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uScrollProgress.value = scrollRef.current;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[staticParticleData.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[staticParticleData.colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[staticParticleData.scales, 1]} />
        <bufferAttribute attach="attributes-aRandomness" args={[staticParticleData.randomness, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[CosmicParticleShaderMaterial]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ============================================================================
// 2. STEP 1: GLOWING COSMIC PLANET + VIBRANT NEON RINGS + ORBITING UI CARDS
// ============================================================================
const Step1CosmicHero = ({ scrollRef }) => {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const cardGroupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current;

    // Fade out as we scroll to Step 2
    const step1Weight = 1 - THREE.MathUtils.smoothstep(scroll, 0.22, 0.45);

    if (groupRef.current) {
      groupRef.current.visible = step1Weight > 0.01;
      groupRef.current.position.y = (1 - step1Weight) * 1.5;
      groupRef.current.rotation.y = t * 0.15;
    }

    // Independent glowing ring rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.2;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
      ring2Ref.current.rotation.y = Math.cos(t * 0.3) * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -Math.PI / 4 + Math.sin(t * 0.2) * 0.08;
      ring3Ref.current.rotation.z = t * 0.12;
    }

    // Orbiting cards rotation
    if (cardGroupRef.current) {
      cardGroupRef.current.rotation.y = t * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Neon Glow Rings */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.5, 0.045, 16, 120]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[Math.PI / 2.3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.8, 0.035, 16, 120]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
      </group>

      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[3.15, 0.02, 16, 120]} />
          <meshBasicMaterial color="#aa77ff" />
        </mesh>
      </group>

      {/* Orbiting Floating UI Cards */}
      <group ref={cardGroupRef}>
        {/* Card 1: Webora AI Builder */}
        <group position={[3.3, 0.4, 0]}>
          <Html transform distanceFactor={7} center>
            <div className="orbit-card">
              <div className="orbit-card-header">
                <span className="orbit-badge badge-cyan">AI Engine</span>
                <Sparkles size={12} color="#00f0ff" />
              </div>
              <div className="orbit-card-title">Prompt to 3D World</div>
              <div className="orbit-card-desc">Real-time neural spatial scene compiler</div>
              <div className="orbit-card-stats">
                <span>LATENCY: 12ms</span>
                <span>STATUS: LIVE</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Card 2: 3D Spatial Canvas */}
        <group position={[-3.2, -0.6, 0.8]}>
          <Html transform distanceFactor={7} center>
            <div className="orbit-card">
              <div className="orbit-card-header">
                <span className="orbit-badge badge-pink">WebGL 2.0</span>
                <Boxes size={12} color="#ff007f" />
              </div>
              <div className="orbit-card-title">Infinite Spatial Canvas</div>
              <div className="orbit-card-desc">Butter-smooth 120 FPS Three.js rendering</div>
              <div className="orbit-card-stats">
                <span>VERTICES: 1.2M</span>
                <span>FPS: 120</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Card 3: Cloud Web Multiverse */}
        <group position={[0.2, 2.7, -1.8]}>
          <Html transform distanceFactor={7} center>
            <div className="orbit-card">
              <div className="orbit-card-header">
                <span className="orbit-badge badge-purple">Multiverse</span>
                <Globe size={12} color="#aa77ff" />
              </div>
              <div className="orbit-card-title">Global Edge Deployment</div>
              <div className="orbit-card-desc">Zero-config instant CDN propagation</div>
              <div className="orbit-card-stats">
                <span>REGIONS: 32</span>
                <span>UPTIME: 99.9%</span>
              </div>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
};

// ============================================================================
// 3. STEP 2: ZOOM-IN MORPH + HOLOGRAPHIC CODE STREAMS + MODULAR WEBSITE BLOCKS
// ============================================================================
const Step2ModularModules = ({ scrollRef }) => {
  const groupRef = useRef();
  const codeStreamRef = useRef();
  const segmentsRef = useRef([]);

  // 6 curved outer tectonic shell pieces that split open as you scroll into Step 2
  const shellPositions = useMemo(() => [
    [1.6, 1.2, 0.5],
    [-1.6, 1.2, -0.5],
    [1.8, -1.1, -0.4],
    [-1.7, -1.0, 0.6],
    [0.0, 2.0, 0.2],
    [0.0, -2.0, -0.2],
  ], []);

  useFrame((state) => {
    const scroll = scrollRef.current;
    const t = state.clock.getElapsedTime();

    // Step 2 active weight window: [0.28, 0.72]
    const appear = THREE.MathUtils.smoothstep(scroll, 0.24, 0.45);
    const disappear = THREE.MathUtils.smoothstep(scroll, 0.62, 0.78);
    const weight = appear * (1 - disappear);

    if (groupRef.current) {
      groupRef.current.visible = weight > 0.01;
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.position.y = (1 - appear) * -1.5;
    }

    // Outer crust segments expand outward
    const explodeDist = appear * 1.35;
    segmentsRef.current.forEach((mesh, index) => {
      if (mesh) {
        const orig = shellPositions[index];
        mesh.position.x = orig[0] * (1 + explodeDist * 0.6);
        mesh.position.y = orig[1] * (1 + explodeDist * 0.6);
        mesh.position.z = orig[2] * (1 + explodeDist * 0.6);
        mesh.rotation.x = t * 0.2 + index;
        mesh.rotation.y = t * 0.15 + index;
      }
    });

    // Holographic code streams rotation and pulse
    if (codeStreamRef.current) {
      codeStreamRef.current.rotation.y = -t * 0.35;
      codeStreamRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Internal Glowing Quantum Core */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#aa77ff"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing Core Energy Aura */}
      <mesh>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Exploded Tectonic Wireframe Shell Segments */}
      {shellPositions.map((pos, idx) => (
        <mesh
          key={idx}
          ref={(el) => (segmentsRef.current[idx] = el)}
          position={pos}
        >
          <dodecahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="#1a103c"
            emissive="#00f0ff"
            emissiveIntensity={0.6}
            wireframe
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Holographic Code Stream Columns */}
      <group ref={codeStreamRef}>
        <group position={[1.8, 0.8, 1.2]}>
          <Html transform distanceFactor={6} center>
            <div className="holo-code-block">
              <div><span className="code-kw">import</span> &#123; Universe &#125; <span className="code-kw">from</span> <span className="code-str">'@webora/core'</span>;</div>
              <div><span className="code-kw">const</span> world = <span className="code-fn">createReality</span>(&#123;</div>
              <div style={{ paddingLeft: '10px' }}>theme: <span className="code-str">'cosmic_matrix'</span>,</div>
              <div style={{ paddingLeft: '10px' }}>shaders: <span className="code-fn">webgl2</span>(),</div>
              <div style={{ paddingLeft: '10px' }}>particles: <span className="code-kw">4096</span></div>
              <div>&#125;);</div>
              <div>world.<span className="code-fn">morphToModules</span>();</div>
            </div>
          </Html>
        </group>

        <group position={[-1.9, -0.6, -1.0]}>
          <Html transform distanceFactor={6} center>
            <div className="holo-code-block">
              <div><span className="code-kw">async function</span> <span className="code-fn">streamTelemetry</span>() &#123;</div>
              <div>&nbsp;&nbsp;<span className="code-kw">const</span> pulse = <span className="code-kw">await</span> webora.<span className="code-fn">sync</span>();</div>
              <div>&nbsp;&nbsp;gl.uniforms.<span className="code-fn">uGlow</span> = 2.4;</div>
              <div>&nbsp;&nbsp;<span className="code-kw">return</span> pulse.<span className="code-fn">ready</span>;</div>
              <div>&#125;</div>
            </div>
          </Html>
        </group>
      </group>

      {/* Floating Modular Website Blocks Surfacing from Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Module 1: Spatial Hero Layout */}
        <group position={[2.6, 0.2, -0.5]}>
          <Html transform distanceFactor={6.5} center>
            <div className="module-3d-card">
              <div className="module-header">
                <Layers size={14} />
                <span>3D Canvas Block</span>
              </div>
              <div className="module-body">
                Auto-responsive reactive viewport with raycast interactions.
              </div>
              <div className="module-status">
                <span className="status-dot"></span>
                <span>SYNCHRONIZED</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Module 2: AI Code Generation Engine */}
        <group position={[-2.7, 0.6, 0.6]}>
          <Html transform distanceFactor={6.5} center>
            <div className="module-3d-card">
              <div className="module-header">
                <Code2 size={14} />
                <span>Modular Code Stream</span>
              </div>
              <div className="module-body">
                Holographic AST components compiled into production bundle.
              </div>
              <div className="module-status">
                <span className="status-dot"></span>
                <span>STREAMING</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Module 3: Cloud Edge Pipeline */}
        <group position={[0.2, -2.1, 1.4]}>
          <Html transform distanceFactor={6.5} center>
            <div className="module-3d-card">
              <div className="module-header">
                <Zap size={14} />
                <span>Realtime Shaders</span>
              </div>
              <div className="module-body">
                Custom vertex & fragment pipelines optimized for mobile & desktop.
              </div>
              <div className="module-status">
                <span className="status-dot"></span>
                <span>OPTIMIZED</span>
              </div>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
};

// ============================================================================
// 4. STEP 3: SPHERE SPLITS INTO INTERCONNECTED MINI-GALAXIES / MULTIVERSE PORTALS
// ============================================================================
const Step3MultiverseGalaxies = ({ scrollRef }) => {
  const groupRef = useRef();
  const portalsGroupRef = useRef();
  const linesRef = useRef();

  // 6 interconnected mini-galaxies / portals representing infinite web creations
  const portals = useMemo(() => [
    { name: 'Cyberpunk Portfolio', type: 'Creative 3D', color: '#00f0ff', pos: [-3.2, 1.4, -0.2] },
    { name: 'SaaS Universe', type: 'Enterprise App', color: '#ff007f', pos: [3.3, 1.2, 0.4] },
    { name: 'Spatial E-Commerce', type: 'Virtual Store', color: '#aa77ff', pos: [-2.9, -1.5, 0.6] },
    { name: 'Generative Art Realm', type: 'Interactive WebGL', color: '#38bdf8', pos: [3.0, -1.4, -0.5] },
    { name: 'Neural Metaverse', type: 'Spatial Social', color: '#ff5e62', pos: [0.0, 2.6, -1.0] },
    { name: 'DeFi Constellation', type: 'Next-Gen Protocol', color: '#00ffcc', pos: [0.0, -2.5, 0.8] },
  ], []);

  // Compute interconnected network lines between all portal positions
  const connectionLineGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < portals.length; i++) {
      for (let j = i + 1; j < portals.length; j++) {
        points.push(new THREE.Vector3(...portals[i].pos));
        points.push(new THREE.Vector3(...portals[j].pos));
      }
      // Also connect to cosmic origin
      points.push(new THREE.Vector3(...portals[i].pos));
      points.push(new THREE.Vector3(0, 0, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [portals]);

  useFrame((state) => {
    const scroll = scrollRef.current;
    const t = state.clock.getElapsedTime();

    // Step 3 active weight: [0.60, 1.0]
    const weight = THREE.MathUtils.smoothstep(scroll, 0.6, 0.88);

    if (groupRef.current) {
      groupRef.current.visible = weight > 0.01;
      groupRef.current.rotation.y = t * 0.08;
      // Expand portals outward as scroll increases
      const scaleVal = THREE.MathUtils.lerp(0.3, 1.0, weight);
      groupRef.current.scale.set(scaleVal, scaleVal, scaleVal);
    }

    if (portalsGroupRef.current) {
      portalsGroupRef.current.children.forEach((portalGroup, i) => {
        portalGroup.rotation.z = t * (0.2 + i * 0.05);
      });
    }

    if (linesRef.current) {
      linesRef.current.material.opacity = weight * 0.35 * (0.8 + Math.sin(t * 2) * 0.2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Supermassive Multiverse Core */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={3.0}
        />
      </mesh>

      {/* Interconnecting Luminous Network Lines */}
      <lineSegments ref={linesRef} geometry={connectionLineGeometry}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* 6 Interconnected Mini-Galaxies */}
      <group ref={portalsGroupRef}>
        {portals.map((portal, idx) => (
          <group key={idx} position={portal.pos}>
            {/* Mini-Galaxy Core Orb */}
            <mesh>
              <sphereGeometry args={[0.35, 24, 24]} />
              <meshStandardMaterial
                color={portal.color}
                emissive={portal.color}
                emissiveIntensity={2.0}
              />
            </mesh>

            {/* Glowing Neon Portal Ring */}
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <torusGeometry args={[0.65, 0.035, 16, 64]} />
              <meshBasicMaterial color={portal.color} />
            </mesh>

            {/* Miniature Spiral Particle Disk */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <ringGeometry args={[0.4, 0.95, 32]} />
              <meshBasicMaterial
                color={portal.color}
                wireframe
                transparent
                opacity={0.4}
              />
            </mesh>

            {/* Floating Portal Label Card */}
            <Html transform distanceFactor={7} center position={[0, -0.9, 0]}>
              <div className="portal-hud-card" style={{ borderColor: portal.color }}>
                <div className="portal-title" style={{ color: portal.color }}>
                  {portal.name}
                </div>
                <div className="portal-sub">{portal.type}</div>
              </div>
            </Html>
          </group>
        ))}
      </group>
    </group>
  );
};

// ============================================================================
// 5. MASTER 3D SCENE CONTROLLER (Lerp Damping, Camera Parallax & Sphere Core)
// ============================================================================
const SceneController = ({ scrollRef, mouseRef }) => {
  const centralSphereRef = useRef();

  useFrame((state, delta) => {
    const scroll = scrollRef.current;
    const mouse = mouseRef.current;
    const t = state.clock.getElapsedTime();

    // 1. Smooth Camera Movement & Zooming between Steps
    // Step 1: Camera z = 6.8
    // Step 2: Camera zooms in to z = 4.2
    // Step 3: Camera pulls back to z = 7.6 to reveal entire multiverse
    let targetCameraZ = 6.8;
    let targetCameraY = 0;

    if (scroll < 0.33) {
      // Step 1: Hero
      targetCameraZ = THREE.MathUtils.lerp(6.8, 5.5, scroll / 0.33);
      targetCameraY = THREE.MathUtils.lerp(0.2, -0.1, scroll / 0.33);
    } else if (scroll < 0.66) {
      // Step 2: Zoom-in into layers & modular core
      const p = (scroll - 0.33) / 0.33;
      targetCameraZ = THREE.MathUtils.lerp(5.5, 4.3, p);
      targetCameraY = THREE.MathUtils.lerp(-0.1, 0.0, p);
    } else {
      // Step 3: Pull back into infinite worlds & portals
      const p = (scroll - 0.66) / 0.34;
      targetCameraZ = THREE.MathUtils.lerp(4.3, 7.8, p);
      targetCameraY = THREE.MathUtils.lerp(0.0, 0.3, p);
    }

    // Camera Lerp Damping + Mouse Parallax
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCameraZ, 3.5, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCameraY + mouse.y * 0.4, 3.5, delta);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, mouse.x * 0.6, 3.5, delta);
    state.camera.lookAt(0, 0, 0);

    // 2. Central Core Sphere Morphing & Rotation
    if (centralSphereRef.current) {
      centralSphereRef.current.rotation.y = t * 0.15 + scroll * Math.PI * 2;
      centralSphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mouse.y * 0.2;

      // When reaching Step 3, the central sphere dissolves/shrinks to pass focus to mini-galaxies
      const sphereScale = scroll < 0.65 ? 1.0 : Math.max(0.05, 1.0 - (scroll - 0.65) * 3.5);
      centralSphereRef.current.scale.set(sphereScale, sphereScale, sphereScale);
      centralSphereRef.current.visible = sphereScale > 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.8} color="#00f0ff" />
      <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#ff007f" />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#aa77ff" distance={10} />

      {/* High-Performance Glowing Particle Shader System */}
      <CosmicParticleField scrollRef={scrollRef} />

      {/* Central Base Sphere (Visible in Step 1 & 2) */}
      <group ref={centralSphereRef}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            color="#0b081a"
            emissive="#431c77"
            emissiveIntensity={0.8}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* Luminous Crystalline Grid Overlay */}
        <mesh>
          <sphereGeometry args={[1.52, 32, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* Step 1 Component: Rings + Orbiting UI Cards */}
      <Step1CosmicHero scrollRef={scrollRef} />

      {/* Step 2 Component: Internal Holographic Code Streams + Modular Blocks */}
      <Step2ModularModules scrollRef={scrollRef} />

      {/* Step 3 Component: Interconnected Mini-Galaxies & Portals */}
      <Step3MultiverseGalaxies scrollRef={scrollRef} />
    </>
  );
};

// ============================================================================
// 6. MAIN EXPORTED COMPONENT: Webora3DScrollExperience
// ============================================================================
const Webora3DScrollExperience = () => {
  const containerRef = useRef(null);
  const targetScrollProgress = useRef(0);
  const smoothedScrollProgress = useRef(0);
  const targetMouse = useRef({ x: 0, y: 0 });
  const smoothedMouse = useRef({ x: 0, y: 0 });

  // UI state for reactive overlay content
  const [activeStep, setActiveStep] = useState(1);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Scroll listener with high precision
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const current = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      targetScrollProgress.current = current;

      // Update active step number
      if (current < 0.33) {
        setActiveStep(1);
      } else if (current < 0.66) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }

      setScrollPercent(Math.round(current * 100));
    };

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouse.current = { x: nx, y: ny };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    // Smooth continuous lerp loop for the Three.js references
    let animId;
    const loop = () => {
      // Lerp scroll damping
      smoothedScrollProgress.current += (targetScrollProgress.current - smoothedScrollProgress.current) * 0.08;
      // Lerp mouse damping
      smoothedMouse.current.x += (targetMouse.current.x - smoothedMouse.current.x) * 0.06;
      smoothedMouse.current.y += (targetMouse.current.y - smoothedMouse.current.y) * 0.06;

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Jump to specific step by scrolling
  const scrollToStep = (stepNum) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetFraction = stepNum === 1 ? 0 : stepNum === 2 ? 0.48 : 0.95;
    window.scrollTo({
      top: containerTop + totalScrollable * targetFraction,
      behavior: 'smooth',
    });
  };

  return (
    <div className="webora-scroll-wrapper" ref={containerRef} id="webora-experience">
      {/* Sticky 3D Viewport */}
      <div className="webora-sticky-viewport">
        {/* Cosmic Nebula Backlight Gradients */}
        <div className="cosmic-nebula-glow nebula-purple" />
        <div className="cosmic-nebula-glow nebula-cyan" />
        <div className="cosmic-nebula-glow nebula-pink" />

        {/* 3D React Three Fiber Canvas */}
        <div className="webora-canvas-container">
          <Canvas
            camera={{ position: [0, 0, 6.8], fov: 45 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
          >
            <SceneController
              scrollRef={smoothedScrollProgress}
              mouseRef={smoothedMouse}
            />
          </Canvas>
        </div>

        {/* Interactive Cosmic UI HUD Overlays */}
        <div className="webora-ui-overlay">
          {/* Top Status HUD */}
          <div className="webora-top-hud">
            <div className="hud-badge">
              <span className="hud-pulse"></span>
              <span>Webora Spatial Engine v3.8</span>
            </div>

            <div className="hud-telemetry">
              <span>ORBIT: <strong>STABLE</strong></span>
              <span>SHADERS: <strong>ACTIVE</strong></span>
              <span>PROGRESS: <strong>{scrollPercent}%</strong></span>
            </div>
          </div>

          {/* Dynamic Content Based on Active Step */}
          {activeStep === 1 && (
            <div className="webora-stage-content stage-1-pos">
              <div className="stage-step-tag">
                <span className="step-number">STEP 01</span>
                <span>COSMIC HERO REALM</span>
              </div>
              <h1 className="stage-title">
                Explore <br />
                <span className="neon-text">Infinite Worlds.</span>
              </h1>
              <p className="stage-desc">
                Welcome to Webora. A decentralized spatial cosmos where stunning 3D websites,
                holographic UI components, and infinite digital universes live together.
              </p>
              <div className="stage-features-pills">
                <span className="feature-pill"><Sparkles size={12} /> Neon Rings System</span>
                <span className="feature-pill"><Globe size={12} /> Orbiting Glass UI</span>
                <span className="feature-pill"><Zap size={12} /> 120 FPS Shaders</span>
              </div>
              <div className="stage-actions">
                <button
                  className="cosmic-btn-primary"
                  onClick={() => scrollToStep(2)}
                >
                  Enter The Core <ArrowRight size={16} />
                </button>
                <button
                  className="cosmic-btn-glass"
                  onClick={() => scrollToStep(3)}
                >
                  <Compass size={16} /> Jump to Multiverse
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="webora-stage-content stage-2-pos">
              <div className="stage-step-tag">
                <span className="step-number">STEP 02</span>
                <span>MODULAR ARCHITECTURE</span>
              </div>
              <h1 className="stage-title">
                Holographic <br />
                <span className="neon-text">Code & Modules.</span>
              </h1>
              <p className="stage-desc">
                Dive beneath the planetary crust. Inspect streaming holographic code streams,
                reactive AST compiler nodes, and floating modular website blocks designed for next-gen spatial web applications.
              </p>
              <div className="stage-features-pills">
                <span className="feature-pill"><Code2 size={12} /> Live Code Streams</span>
                <span className="feature-pill"><Boxes size={12} /> Exploded Modular Blocks</span>
                <span className="feature-pill"><Cpu size={12} /> Reactive Quantum Core</span>
              </div>
              <div className="stage-actions">
                <button
                  className="cosmic-btn-primary"
                  onClick={() => scrollToStep(3)}
                >
                  Split into Multiverse <ArrowRight size={16} />
                </button>
                <button
                  className="cosmic-btn-glass"
                  onClick={() => scrollToStep(1)}
                >
                  Return to Orbit
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="webora-stage-content stage-3-pos">
              <div className="stage-step-tag">
                <span className="step-number">STEP 03</span>
                <span>INFINITE CREATIONS</span>
              </div>
              <h1 className="stage-title">
                The Webora <br />
                <span className="neon-text">Multiverse Network.</span>
              </h1>
              <p className="stage-desc">
                The central sphere splits open into an infinite constellation of interconnected mini-galaxies.
                Each portal represents a living website universe crafted by creators worldwide.
              </p>
              <div className="stage-features-pills" style={{ justifyContent: 'center' }}>
                <span className="feature-pill"><Globe size={12} /> 6 Interconnected Portals</span>
                <span className="feature-pill"><Zap size={12} /> Luminous Energy Web</span>
                <span className="feature-pill"><Maximize2 size={12} /> Boundless Exploration</span>
              </div>
              <div className="stage-actions">
                <a
                  href="#work"
                  className="cosmic-btn-primary"
                  onClick={(e) => {
                    const el = document.getElementById('work');
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Explore All Creations <ArrowRight size={16} />
                </a>
                <button
                  className="cosmic-btn-glass"
                  onClick={() => scrollToStep(1)}
                >
                  Restart Journey
                </button>
              </div>
            </div>
          )}

          {/* Right Side Step Navigator HUD */}
          <div className="webora-step-nav">
            <button
              className={`step-nav-item ${activeStep === 1 ? 'active' : ''}`}
              onClick={() => scrollToStep(1)}
              aria-label="Step 1: Cosmic Hero Realm"
            >
              <div className="step-indicator-bar" />
              <div className="step-nav-label">
                <span>01 HERO</span>
                <strong>Cosmic Core</strong>
              </div>
            </button>

            <button
              className={`step-nav-item ${activeStep === 2 ? 'active' : ''}`}
              onClick={() => scrollToStep(2)}
              aria-label="Step 2: Modular Architecture"
            >
              <div className="step-indicator-bar" />
              <div className="step-nav-label">
                <span>02 ARCHITECTURE</span>
                <strong>Holographic Modules</strong>
              </div>
            </button>

            <button
              className={`step-nav-item ${activeStep === 3 ? 'active' : ''}`}
              onClick={() => scrollToStep(3)}
              aria-label="Step 3: Infinite Creations"
            >
              <div className="step-indicator-bar" />
              <div className="step-nav-label">
                <span>03 MULTIVERSE</span>
                <strong>Infinite Worlds</strong>
              </div>
            </button>
          </div>

          {/* Bottom HUD Bar */}
          <div className="webora-bottom-hud">
            <div className="scroll-guide">
              <div className="mouse-scroll-icon">
                <div className="mouse-wheel-dot" />
              </div>
              <span>Scroll to transform universe</span>
            </div>

            <div className="progress-track-wrapper">
              <span>STAGE {activeStep} / 3</span>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
              <span>{scrollPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webora3DScrollExperience;
