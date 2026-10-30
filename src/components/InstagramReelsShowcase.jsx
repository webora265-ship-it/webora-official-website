import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaHeart, FaComment, FaPlay } from 'react-icons/fa';
import { Sparkles, ArrowUpRight, X, Flame, Eye } from 'lucide-react';
import './InstagramReelsShowcase.css';

const categories = [
  'All Reels',
  '3D & Space',
  'Festival & Culture',
  'Dev & Coding',
  'Interactive Web'
];

const reelsData = [
  {
    id: 'proposal',
    title: 'Developer Proposal Website 💖',
    caption: 'Software Developer propose bhi kuch alag hi karenge 💻✨ Custom interactive love letter terminal with reactive hearts & spatial confetti.',
    category: 'Dev & Coding',
    img: '/reels/proposal.png',
    likes: '48.2K',
    comments: '1,240',
    views: '320K',
    tags: '#DevProposal #WeboraDev #ViralCode #CreativeCoding',
    audio: '♫ Webora Romantic Lo-Fi Beats',
    topComment: { user: 'priya_codes', text: 'This is the cutest proposal ever! How can I deploy this?' }
  },
  {
    id: 'navratri',
    title: 'Navratri 9 Nights Maa Durga 3D World 🔱',
    caption: 'Feel the Energy. Nine Nights, Nine Worlds! Full 3D Maa Durga interactive experience with devotional spatial audio & sacred mantras.',
    category: 'Festival & Culture',
    img: '/reels/navratri.png',
    likes: '142K',
    comments: '3,890',
    views: '980K',
    tags: '#Navratri3D #MaaDurga #SpatialWeb #Devotional3D',
    audio: '♫ Navratri Cosmic Trance Chants',
    topComment: { user: 'arjun_3d', text: 'Jai Mata Di! The 3D lion model and lighting are next level.' }
  },
  {
    id: 'solarsystem',
    title: 'Interactive 3D Solar System 🪐',
    caption: 'Ever wondered how the Solar System actually works? Explore planetary orbits, gravitational physics, and realtime speeds right in your browser!',
    category: '3D & Space',
    img: '/reels/solarsystem.png',
    likes: '95.4K',
    comments: '2,110',
    views: '640K',
    tags: '#ThreeJS #SpaceUniverse #SolarSystem #WeboraCosmos',
    audio: '♫ Interstellar Cosmic Synthesizer',
    topComment: { user: 'astro_nerd', text: 'Insane smoothness! Runs at 120 FPS even on mobile.' }
  },
  {
    id: 'ganesh',
    title: 'Lord Ganesha Spatial Celebration 🌸',
    caption: 'Happy Ganesh Chaturthi! Celebrating divine blessings with 3D modak generator, virtual diya lighting, and interactive floral aarti.',
    category: 'Festival & Culture',
    img: '/reels/ganesh.png',
    likes: '118K',
    comments: '2,940',
    views: '820K',
    tags: '#GaneshChaturthi #BappaMorya #3DFestival #Webora',
    audio: '♫ Sukhkarta Dukh harta Remix',
    topComment: { user: 'rohit_sharma', text: 'Ganpati Bappa Morya! Beautiful digital tribute.' }
  },
  {
    id: 'diya',
    title: 'Diwali Diya of Lights 🪔',
    caption: 'Light up virtual diyas with dynamic raycasted fire shaders, volumetric smoke particles, and warm festival glow.',
    category: 'Interactive Web',
    img: '/reels/diya.png',
    likes: '62.1K',
    comments: '1,450',
    views: '410K',
    tags: '#DiwaliLights #GLSLShaders #ParticleFX #Webora',
    audio: '♫ Traditional Sitar Ambient',
    topComment: { user: 'deepika_ui', text: 'That flame animation looks hyper realistic!' }
  },
  {
    id: 'garba',
    title: 'Dandiya & Garba Rhythm Simulator 🥁',
    caption: 'Interactive Dandiya beats simulator with traditional rhythmic dhol audio sync! Tap to dance and create custom beats.',
    category: 'Festival & Culture',
    img: '/reels/garba.png',
    likes: '73.8K',
    comments: '1,820',
    views: '510K',
    tags: '#GarbaNights #Dandiya3D #IndianFestivals #Webora',
    audio: '♫ Dholida High Energy Mix',
    topComment: { user: 'garba_queen', text: 'Can not stop tapping! The beat sync is super fun.' }
  },
  {
    id: 'software',
    title: 'We Are Software Developers ☕🚀',
    caption: 'From late night caffeine bug fixes to shipping mind-blowing 3D websites. The unfiltered life of spatial developers at Webora.',
    category: 'Dev & Coding',
    img: '/reels/software.png',
    likes: '56.3K',
    comments: '980',
    views: '390K',
    tags: '#SoftwareLife #DeveloperMemes #CodingHumor #Webora',
    audio: '♫ Cyberpunk Synthwave Beat',
    topComment: { user: 'dev_kartik', text: '100% accurate, especially the coffee part haha' }
  },
  {
    id: 'recipe',
    title: 'Discover What To Cook Today 🍳',
    caption: 'Discover What To Cook Today! Interactive recipe discovery with ingredient wheel, macros breakdown, and personalized culinary matchmaker.',
    category: 'Interactive Web',
    img: '/reels/recipe.png',
    likes: '39.7K',
    comments: '750',
    views: '280K',
    tags: '#FoodTech #InteractiveUI #CreativeWeb #CookApp',
    audio: '♫ Upbeat Cooking Kitchen Pop',
    topComment: { user: 'chef_neha', text: 'Finally a recipe site that does not have 50 ads!' }
  },
  {
    id: 'creator',
    title: 'Building Spatial Worlds BTS 🎧✨',
    caption: 'Behind the scenes: How our spatial designers craft 120 FPS websites on Webora using React Three Fiber and custom shaders.',
    category: 'Dev & Coding',
    img: '/reels/creator.png',
    likes: '84.9K',
    comments: '2,300',
    views: '590K',
    tags: '#BehindTheScenes #SpatialDesign #WomenInTech #Webora',
    audio: '♫ Dreamy Coding Ambient',
    topComment: { user: 'shreya_design', text: 'Inspirational! Keep creating these beautiful websites.' }
  }
];

const InstagramReelsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('All Reels');
  const [selectedReel, setSelectedReel] = useState(null);

  const filteredReels = reelsData.filter((reel) => {
    if (activeFilter === 'All Reels') return true;
    return reel.category === activeFilter;
  });

  return (
    <section className="insta-reels-section" id="reels">
      <div className="reels-ambient-glow" />

      {/* Header */}
      <div className="reels-header-wrapper">
        <div className="reels-header-top">
          <div className="reels-header-title-box">
            <div className="reels-badge-pill">
              <FaInstagram size={15} />
              <span>TRENDING ON INSTAGRAM REELS</span>
            </div>
            <h2>
              Viral Web <span className="text-gradient">Creations & Reels</span>
            </h2>
            <p>
              Watch how our community turns creative website ideas, Indian cultural festivals,
              and interactive 3D spatial tech into viral sensations on Instagram!
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-follow-btn"
          >
            <FaInstagram size={18} />
            <span>Follow @webora</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Controls Bar: Filters & Metrics */}
        <div className="reels-controls-bar">
          <div className="reels-filter-pills">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`reel-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="reels-stats-summary">
            <span><Flame size={13} color="#ff3366" style={{ display: 'inline', verticalAlign: 'middle' }} /> <strong>1.4M+</strong> Total Views</span>
            <span><Sparkles size={13} color="#00f0ff" style={{ display: 'inline', verticalAlign: 'middle' }} /> <strong>Daily</strong> New Drops</span>
          </div>
        </div>
      </div>

      {/* Reels Grid (9:16 Aspect Ratio) */}
      <motion.div layout className="reels-grid">
        <AnimatePresence>
          {filteredReels.map((reel) => (
            <motion.div
              layout
              key={reel.id}
              className="reel-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
              onClick={() => setSelectedReel(reel)}
            >
              {/* Cropped Crisp Thumbnail from User's Instagram Posts */}
              <img
                src={reel.img}
                alt={reel.title}
                className="reel-thumbnail-img"
                loading="lazy"
              />

              {/* Scrims for readability */}
              <div className="reel-top-scrim" />
              <div className="reel-bottom-scrim" />

              {/* Top Header */}
              <div className="reel-top-header">
                <span className="reel-category-pill">{reel.category}</span>
                <div className="reel-icon-badge">
                  <FaInstagram size={16} />
                </div>
              </div>

              {/* Center Play Button on Hover */}
              <div className="reel-play-overlay">
                <FaPlay size={20} />
              </div>

              {/* Bottom Reel Details */}
              <div className="reel-bottom-content">
                <div className="reel-creator-row">
                  <div className="reel-creator-img">W</div>
                  <span className="reel-creator-handle">@webora.official</span>
                </div>

                <p className="reel-caption">{reel.caption}</p>
                <div className="reel-tags">{reel.tags}</div>

                {/* Stats Bar */}
                <div className="reel-stats-bar">
                  <div className="stat-group">
                    <div className="stat-badge">
                      <FaHeart size={13} />
                      <span>{reel.likes}</span>
                    </div>
                    <div className="stat-badge">
                      <FaComment size={13} color="#00f0ff" />
                      <span>{reel.comments}</span>
                    </div>
                  </div>

                  <div className="views-count">
                    <Eye size={12} />
                    <span>{reel.views}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Reel Viewer Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            className="reel-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              className="reel-modal-card"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onClick={() => setSelectedReel(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Video Preview Side */}
              <div className="modal-video-side">
                <img
                  src={selectedReel.img}
                  alt={selectedReel.title}
                />
              </div>

              {/* Info & Comments Side */}
              <div className="modal-info-side">
                <div>
                  <div className="modal-creator-header">
                    <div className="modal-creator-left">
                      <div className="modal-creator-avatar">
                        <FaInstagram size={22} />
                      </div>
                      <div>
                        <div className="modal-creator-name">@webora.official</div>
                        <div className="modal-creator-sub">{selectedReel.category} • Original Audio</div>
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#ffffff' }}>
                    {selectedReel.title}
                  </h3>

                  <p className="modal-caption-text">
                    {selectedReel.caption}
                  </p>

                  <div className="modal-tags">
                    {selectedReel.tags}
                  </div>

                  {/* Top Community Comment Preview */}
                  <div className="modal-comments-box">
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
                      Top Community Reaction
                    </div>
                    <div className="comment-row">
                      <strong>@{selectedReel.topComment.user}</strong>
                      <span>{selectedReel.topComment.text}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-action-bar">
                  <div className="modal-stats-row">
                    <span>❤️ {selectedReel.likes} Likes</span>
                    <span>💬 {selectedReel.comments} Comments</span>
                    <span>👁 {selectedReel.views} Plays</span>
                  </div>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-open-insta-btn"
                  >
                    <FaInstagram size={18} />
                    <span>Watch Full Video on Instagram</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InstagramReelsShowcase;
