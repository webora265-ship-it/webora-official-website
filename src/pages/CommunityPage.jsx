import React from 'react';
import {
  Trophy,
  Flame,
  Users,
  Sparkles,
  ArrowUpRight,
  Send
} from 'lucide-react';
import './CommunityPage.css';

const leaderboard = [
  { rank: '01', name: 'astro_arch', specialty: 'GLSL Spatial Shader Architect', score: '184.2K', avatarBg: '#00f0ff' },
  { rank: '02', name: 'stellar_lab', specialty: 'Three.js Audio Reactivity', score: '142.9K', avatarBg: '#a855f7' },
  { rank: '03', name: 'neo_coder', specialty: 'Cyberpunk AST Web Matrix', score: '128.5K', avatarBg: '#ff007f' },
  { rank: '04', name: 'warp_mechanic', specialty: 'Volumetric Doppler Particle FX', score: '98.3K', avatarBg: '#2dd4bf' },
  { rank: '05', name: 'pixie_art', specialty: 'Playful Ragdoll Celestial Physics', score: '76.1K', avatarBg: '#f59e0b' }
];

const activityFeed = [
  { user: 'astro_arch', action: 'deployed version 2.4 of Minimal Space', time: '12 mins ago' },
  { user: 'vedic_3d', action: 'received 4.2K stars on Navratri Durga Temple', time: '45 mins ago' },
  { user: 'shreya_design', action: 'published Behind The Scenes: 120 FPS WebGL', time: '2 hours ago' },
  { user: 'neo_coder', action: 'opened Matrix AST compiler repository to open-source', time: '4 hours ago' }
];

const CommunityPage = () => {
  return (
    <div className="community-page-wrapper">
      <div className="community-hero">
        <div className="community-badge">
          <Users size={14} />
          <span>GLOBAL CREATOR ECOSYSTEM</span>
        </div>
        <h1>
          The Webora <span className="text-gradient">Creator Universe.</span>
        </h1>
        <p>
          Join thousands of spatial developers, 3D artists, and creative coders pushing the limits
          of the modern spatial web.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="community-grid-layout">
        <div>
          {/* Active Monthly Challenge Banner */}
          <div className="challenge-banner-card">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#ff007f', fontWeight: 700, marginBottom: '6px' }}>
                <Flame size={14} />
                <span>COMMUNITY CHALLENGE #08</span>
              </div>
              <div className="challenge-title">Cyberpunk Spatial Portfolio Hackathon</div>
              <div className="challenge-desc">
                Build an interactive 3D portfolio featuring custom GLSL shaders, raycasted interaction,
                and under 2MB bundle size on Webora.
              </div>
              <div className="challenge-meta-row">
                <span>PRIZE POOL: <strong>$15,000 USD</strong></span>
                <span>SUBMISSIONS: <strong>342 WORLDS</strong></span>
                <span>ENDS IN: <strong>6 DAYS</strong></span>
              </div>
            </div>

            <button className="cosmic-btn-primary" style={{ flexShrink: 0 }}>
              Join Challenge <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Top Creators Leaderboard */}
          <div className="leaderboard-card">
            <div className="leaderboard-title">
              <Trophy size={20} color="#fbbf24" />
              <span>Top Spatial Creators of the Month</span>
            </div>

            <div className="leaderboard-list">
              {leaderboard.map((item) => (
                <div key={item.rank} className="leader-item">
                  <div className="leader-left">
                    <span className="leader-rank">{item.rank}</span>
                    <div className="leader-avatar" style={{ backgroundColor: item.avatarBg }}>
                      {item.name[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="leader-name">@{item.name}</div>
                      <div className="leader-specialty">{item.specialty}</div>
                    </div>
                  </div>

                  <div className="leader-stats">
                    <span>{item.score} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Live Activity & Submit */}
        <div>
          <div className="activity-card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>Submit Your Creation</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Have you built a 3D website or interactive world? Submit it to be featured in the
              Webora Multiverse and on our Instagram Reels!
            </p>
            <input
              type="text"
              placeholder="https://your-website.com"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px 14px',
                color: '#ffffff',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
            <button className="cosmic-btn-primary" style={{ justifyContent: 'center' }}>
              <Send size={15} />
              <span>Submit for Feature</span>
            </button>
          </div>

          <div className="activity-card">
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>Live Multiverse Stream</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activityFeed.map((act, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <div className="activity-text">
                      <strong>@{act.user}</strong> {act.action}
                    </div>
                    <div className="activity-time">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
