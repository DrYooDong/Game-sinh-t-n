import React from 'react';
import { CardDefinition } from '../types/game';
import { PVZ2_CARD_ASSETS } from '../data/pvz2AssetMap';

interface CardVisualProps {
  card: CardDefinition;
  isSelected?: boolean;
  isDraggable?: boolean;
  cooldownPercent?: number; // 0 to 100
  canAfford?: boolean;
  compact?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
  level?: number;
}

export const PvZIcon: React.FC<{ type: string; cardId?: string; className?: string }> = ({ type, cardId, className = 'w-12 h-12' }) => {
  const assetUrl = (cardId && PVZ2_CARD_ASSETS[cardId]) || PVZ2_CARD_ASSETS[type];
  const [imgError, setImgError] = React.useState(false);

  if (assetUrl && !imgError) {
    return (
      <img
        src={assetUrl}
        alt={type}
        className={`${className} object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]`}
        onError={() => setImgError(true)}
      />
    );
  }

  switch (type) {
    case 'sunflower':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(234,179,8,0.4)]`}>
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="petalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <radialGradient id="faceGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#A16207" />
              <stop offset="60%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </radialGradient>
          </defs>

          {/* Outer Sun Halo Aura */}
          <circle cx="50" cy="50" r="46" fill="url(#sunGlow)" />

          {/* 16 Detailed Layered Petals with Highlights */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <path
                d="M 50 8 Q 42 24 45 36 Q 50 38 55 36 Q 58 24 50 8 Z"
                fill="url(#petalGrad)"
                stroke="#B45309"
                strokeWidth="1.2"
              />
              <path d="M 50 12 L 50 32" stroke="#FEF08A" strokeWidth="0.8" opacity="0.7" />
            </g>
          ))}

          {/* Stalk & Leaves at Bottom */}
          <path d="M 50 68 Q 48 85 50 94" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
          <path d="M 48 82 Q 32 78 28 88 Q 40 92 48 84" fill="#22C55E" stroke="#166534" strokeWidth="1.5" />
          <path d="M 52 82 Q 68 78 72 88 Q 60 92 52 84" fill="#22C55E" stroke="#166534" strokeWidth="1.5" />

          {/* Center Sunflower Face with Rich Spherical Depth */}
          <circle cx="50" cy="50" r="23" fill="url(#faceGrad)" stroke="#451A03" strokeWidth="2" />

          {/* Big Adorable Anime Eyes */}
          <ellipse cx="42" cy="46" rx="4" ry="5.5" fill="#000" />
          <ellipse cx="41" cy="44.5" rx="1.8" ry="2.5" fill="#FFF" />
          <circle cx="43.5" cy="48" r="0.9" fill="#FFF" />

          <ellipse cx="58" cy="46" rx="4" ry="5.5" fill="#000" />
          <ellipse cx="57" cy="44.5" rx="1.8" ry="2.5" fill="#FFF" />
          <circle cx="59.5" cy="48" r="0.9" fill="#FFF" />

          {/* Cute Rosy Blushing Cheeks */}
          <ellipse cx="36" cy="53" rx="3.5" ry="2" fill="#F43F5E" opacity="0.8" />
          <ellipse cx="64" cy="53" rx="3.5" ry="2" fill="#F43F5E" opacity="0.8" />

          {/* Sweet Open Smile with Tongue */}
          <path d="M 43 56 Q 50 64 57 56 Z" fill="#991B1B" stroke="#451A03" strokeWidth="1" />
          <ellipse cx="50" cy="59" rx="3" ry="2" fill="#F472B6" />
        </svg>
      );

    case 'peashooter':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(34,197,94,0.4)]`}>
          <defs>
            <linearGradient id="peaSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <radialGradient id="snoutGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="60%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#052E16" />
            </radialGradient>
            <linearGradient id="bandanaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
          </defs>

          {/* Leaf Pedestal Base */}
          <ellipse cx="50" cy="88" rx="32" ry="8" fill="#14532D" opacity="0.6" />
          <path d="M 30 84 Q 15 76 22 68 Q 36 74 38 82" fill="#15803D" stroke="#052E16" strokeWidth="1.5" />
          <path d="M 70 84 Q 85 76 78 68 Q 64 74 62 82" fill="#15803D" stroke="#052E16" strokeWidth="1.5" />

          {/* Organic Curving Stem */}
          <path d="M 48 84 Q 44 65 52 48" stroke="#16A34A" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 46 84 Q 42 65 50 48" stroke="#86EFAC" strokeWidth="2" fill="none" opacity="0.6" />

          {/* Trailing Ninja Pod Tail */}
          <path d="M 36 46 Q 16 38 20 24 Q 32 32 38 42 Z" fill="#16A34A" stroke="#14532D" strokeWidth="2" />

          {/* Head Sphere */}
          <circle cx="52" cy="42" r="22" fill="url(#peaSkinGrad)" stroke="#14532D" strokeWidth="2.5" />

          {/* Dynamic Bad-Boy Red Ninja Bandana */}
          <path d="M 33 32 Q 52 24 70 34 L 72 40 Q 52 30 31 38 Z" fill="url(#bandanaGrad)" stroke="#7F1D1D" strokeWidth="1.5" />
          {/* Flying Bandana Ribbons */}
          <path d="M 28 34 Q 14 36 8 46 Q 18 42 26 38 Z" fill="#DC2626" />
          <path d="M 28 36 Q 16 45 12 55 Q 22 48 27 40 Z" fill="#B91C1C" />

          {/* Gatling Cannon Snout */}
          <path d="M 66 34 L 84 32 Q 88 42 84 52 L 66 50 Z" fill="url(#snoutGrad)" stroke="#14532D" strokeWidth="2" />
          <ellipse cx="84" cy="42" rx="4" ry="9.5" fill="#022c14" stroke="#4ade80" strokeWidth="1" />
          {/* Glowing Green Plasma Muzzle */}
          <ellipse cx="83" cy="42" rx="2" ry="6" fill="#86EFAC" />

          {/* Fierce Anime Smug Eyes */}
          <path d="M 42 38 L 58 40" stroke="#7F1D1D" strokeWidth="2.5" />
          <ellipse cx="50" cy="42" rx="4.5" ry="5.5" fill="#FFF" stroke="#000" strokeWidth="1.5" />
          <circle cx="53" cy="42" r="2.8" fill="#052E16" />
          <circle cx="52" cy="40.5" r="1.2" fill="#FFF" />
        </svg>
      );

    case 'walnut':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(180,83,9,0.4)]`}>
          <defs>
            <radialGradient id="nutGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#451A03" />
            </radialGradient>
            <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Sturdy Armored Nut Shell */}
          <ellipse cx="50" cy="54" rx="34" ry="40" fill="url(#nutGrad)" stroke="#291102" strokeWidth="3" />

          {/* Shell Segments & Armor Grooves */}
          <path d="M 50 15 Q 60 52 50 93" stroke="#78350F" strokeWidth="3" fill="none" />
          <path d="M 50 15 Q 40 52 50 93" stroke="#B45309" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 30 28 Q 22 55 34 82" stroke="#78350F" strokeWidth="2.5" fill="none" />
          <path d="M 70 28 Q 78 55 66 82" stroke="#78350F" strokeWidth="2.5" fill="none" />

          {/* Crack of Power / Golden Vein */}
          <path d="M 48 24 L 54 36 L 46 48 L 52 60" stroke="#FDE047" strokeWidth="1.5" fill="none" filter="drop-shadow(0 0 3px #EAB308)" />

          {/* Big Determined Heroic Eyes */}
          <ellipse cx="38" cy="46" rx="6" ry="8" fill="#FFF" stroke="#291102" strokeWidth="2" />
          <ellipse cx="40" cy="46" rx="3.5" ry="5" fill="#1C1917" />
          <circle cx="39" cy="44" r="1.5" fill="#FFF" />

          <ellipse cx="62" cy="46" rx="6" ry="8" fill="#FFF" stroke="#291102" strokeWidth="2" />
          <ellipse cx="60" cy="46" rx="3.5" ry="5" fill="#1C1917" />
          <circle cx="59" cy="44" r="1.5" fill="#FFF" />

          {/* Confident Grin */}
          <path d="M 42 66 Q 50 72 58 66" stroke="#291102" strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* Pi Card 0 Emblem Badge on Head */}
          <circle cx="50" cy="20" r="10" fill="url(#crestGold)" stroke="#FFF" strokeWidth="2" />
          <text x="50" y="24" fill="#000" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">0</text>
        </svg>
      );

    case 'newspaper_zombie':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(220,38,38,0.4)]`}>
          <defs>
            <radialGradient id="zombieSkin" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="60%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#065F46" />
            </radialGradient>
          </defs>

          {/* Zombie Head */}
          <circle cx="48" cy="38" r="22" fill="url(#zombieSkin)" stroke="#064E3B" strokeWidth="2.5" />
          {/* Hair Strands */}
          <path d="M 38 18 Q 44 26 40 30" stroke="#1E293B" strokeWidth="2" fill="none" />
          <path d="M 52 16 Q 54 25 58 28" stroke="#1E293B" strokeWidth="2" fill="none" />

          {/* Reading Glasses with Glowing Fiery Pupils */}
          <rect x="34" y="32" width="12" height="11" rx="2" fill="rgba(255,255,255,0.3)" stroke="#000" strokeWidth="2" />
          <rect x="50" y="32" width="12" height="11" rx="2" fill="rgba(255,255,255,0.3)" stroke="#000" strokeWidth="2" />
          <line x1="46" y1="37" x2="50" y2="37" stroke="#000" strokeWidth="2" />
          <circle cx="40" cy="37.5" r="3" fill="#DC2626" />
          <circle cx="56" cy="37.5" r="3" fill="#DC2626" />
          <circle cx="39.5" cy="36.5" r="1" fill="#FFF" />
          <circle cx="55.5" cy="36.5" r="1" fill="#FFF" />

          {/* Zombie Grin */}
          <path d="M 40 52 Q 48 56 56 50" stroke="#064E3B" strokeWidth="2" fill="none" />
          <polygon points="44,52 46,55 48,52" fill="#FEF08A" />

          {/* Newspaper (BÁO THỜI SỰ MA QUÁI) */}
          <rect x="18" y="48" width="64" height="36" rx="3" fill="#F5F5F4" stroke="#44403C" strokeWidth="2" />
          <rect x="22" y="52" width="56" height="6" fill="#DC2626" rx="1" />
          <line x1="24" y1="62" x2="52" y2="62" stroke="#78716C" strokeWidth="2" />
          <line x1="24" y1="67" x2="52" y2="67" stroke="#78716C" strokeWidth="1.5" />
          <line x1="24" y1="72" x2="52" y2="72" stroke="#78716C" strokeWidth="1.5" />
          <rect x="56" y="60" width="22" height="20" fill="#E7E5E4" stroke="#A8A29E" strokeWidth="1" />

          {/* Iconic Pink Heart Boxers */}
          <rect x="32" y="84" width="36" height="15" rx="3" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
          <circle cx="40" cy="91" r="2.5" fill="#BE185D" />
          <circle cx="60" cy="91" r="2.5" fill="#BE185D" />
        </svg>
      );

    case 'chomper':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(147,51,234,0.4)]`}>
          <defs>
            <radialGradient id="chompGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="60%" stopColor="#7E22CE" />
              <stop offset="100%" stopColor="#3B0764" />
            </radialGradient>
          </defs>
          <path d="M 50 92 Q 46 72 42 55" stroke="#16A34A" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 40 85 Q 22 75 26 65" fill="#15803D" stroke="#052E16" strokeWidth="1.5" />
          {/* Huge Menacing Jaws */}
          <path d="M 24 55 Q 50 15 82 35 Q 56 46 24 55 Z" fill="url(#chompGrad)" stroke="#3B0764" strokeWidth="2.5" />
          <path d="M 24 55 Q 54 90 84 62 Q 58 60 24 55 Z" fill="#6B21A8" stroke="#3B0764" strokeWidth="2.5" />
          {/* Razor Teeth */}
          <polygon points="38,34 43,44 35,43" fill="#FFF" />
          <polygon points="50,33 55,45 47,44" fill="#FFF" />
          <polygon points="64,36 68,48 60,47" fill="#FFF" />
          <polygon points="38,68 43,57 35,58" fill="#FFF" />
          <polygon points="50,71 55,59 47,60" fill="#FFF" />
          <polygon points="64,66 68,56 60,57" fill="#FFF" />
          {/* Acid Drool */}
          <path d="M 72 56 Q 74 74 70 80" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'melon_pult':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(22,163,74,0.4)]`}>
          <ellipse cx="50" cy="86" rx="36" ry="10" fill="#15803D" opacity="0.8" />
          <path d="M 32 82 Q 40 50 62 55" stroke="#166534" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 60 55 L 34 28" stroke="#854D0E" strokeWidth="7" strokeLinecap="round" />
          {/* Heavy Armored Striped Watermelon */}
          <ellipse cx="30" cy="24" rx="22" ry="17" fill="#22C55E" stroke="#14532D" strokeWidth="3" transform="rotate(-15 30 24)" />
          <path d="M 14 18 Q 30 22 46 14" stroke="#052E16" strokeWidth="3" fill="none" />
          <path d="M 14 28 Q 30 32 46 26" stroke="#052E16" strokeWidth="3" fill="none" />
          <path d="M 18 38 Q 32 40 44 36" stroke="#052E16" strokeWidth="3" fill="none" />
        </svg>
      );

    case 'cherry_bomb':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(239,68,68,0.5)]`}>
          <path d="M 34 46 Q 48 18 62 14" stroke="#15803D" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 66 52 Q 58 26 62 14" stroke="#15803D" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Burning Spark Fuse */}
          <circle cx="64" cy="12" r="6" fill="#FBBF24" />
          <polygon points="64,4 69,12 59,12" fill="#EF4444" />
          {/* Cherry 1 */}
          <circle cx="34" cy="58" r="21" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" />
          <circle cx="28" cy="52" r="4" fill="#FFF" />
          <circle cx="38" cy="52" r="4" fill="#FFF" />
          <circle cx="29" cy="53" r="2" fill="#000" />
          <circle cx="37" cy="53" r="2" fill="#000" />
          <path d="M 28 66 Q 34 60 40 66" stroke="#450A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Cherry 2 */}
          <circle cx="66" cy="62" r="22" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="3" />
          <circle cx="60" cy="56" r="4" fill="#FFF" />
          <circle cx="70" cy="56" r="4" fill="#FFF" />
          <circle cx="61" cy="57" r="2" fill="#000" />
          <circle cx="69" cy="57" r="2" fill="#000" />
          <path d="M 60 70 Q 66 64 72 70" stroke="#450A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'jalapeno':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(239,68,68,0.5)]`}>
          <path d="M 50 18 Q 48 6 36 6" stroke="#15803D" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 36 22 Q 64 20 64 45 Q 62 76 48 95 Q 36 76 34 45 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3.5" />
          {/* Fire Eyebrows */}
          <path d="M 34 32 Q 44 36 48 30" stroke="#FDE047" strokeWidth="3.5" fill="none" />
          <path d="M 66 32 Q 56 36 52 30" stroke="#FDE047" strokeWidth="3.5" fill="none" />
          <polygon points="38,38 46,44 38,46" fill="#000" />
          <polygon points="62,38 54,44 62,46" fill="#000" />
          {/* Gritted Teeth */}
          <rect x="40" y="56" width="20" height="9" rx="2" fill="#FFF" stroke="#450A0A" strokeWidth="2" />
          <line x1="45" y1="56" x2="45" y2="65" stroke="#450A0A" strokeWidth="1.5" />
          <line x1="50" y1="56" x2="50" y2="65" stroke="#450A0A" strokeWidth="1.5" />
          <line x1="55" y1="56" x2="55" y2="65" stroke="#450A0A" strokeWidth="1.5" />
        </svg>
      );

    case 'magnet_shroom':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(239,68,68,0.4)]`}>
          <path d="M 44 85 L 44 55 Q 50 50 56 55 L 56 85 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M 20 55 C 20 18, 80 18, 80 55 L 66 55 C 66 30, 34 30, 34 55 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
          <rect x="20" y="44" width="14" height="13" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
          <rect x="66" y="44" width="14" height="13" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        </svg>
      );

    case 'torchwood':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(249,115,22,0.5)]`}>
          <rect x="26" y="44" width="48" height="48" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="3.5" />
          <path d="M 28 46 Q 36 8 50 2 Q 64 10 72 46 Q 60 34 50 40 Q 40 34 28 46 Z" fill="#F97316" stroke="#EA580C" strokeWidth="2" />
          <path d="M 36 42 Q 44 18 50 12 Q 56 20 64 42 Q 56 36 50 38 Q 44 36 36 42 Z" fill="#FDE047" />
          <circle cx="40" cy="62" r="4" fill="#FEF08A" />
          <circle cx="60" cy="62" r="4" fill="#FEF08A" />
          <circle cx="40" cy="62" r="1.5" fill="#000" />
          <circle cx="60" cy="62" r="1.5" fill="#000" />
        </svg>
      );

    case 'lightning_shroom':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(6,182,212,0.5)]`}>
          <path d="M 50 90 L 50 35" stroke="#0891B2" strokeWidth="7" strokeLinecap="round" />
          <circle cx="50" cy="30" r="18" fill="#67E8F9" stroke="#0891B2" strokeWidth="3" />
          <polygon points="50,16 42,30 49,30 46,42 58,26 51,26" fill="#FDE047" stroke="#EAB308" strokeWidth="1.5" />
        </svg>
      );

    case 'hypno_shroom':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(217,70,239,0.5)]`}>
          <path d="M 44 85 L 44 55 Q 50 50 56 55 L 56 85 Z" fill="#FDF4FF" stroke="#C026D3" strokeWidth="2.5" />
          <path d="M 16 55 C 16 14, 84 14, 84 55 Z" fill="#D946EF" stroke="#701A75" strokeWidth="3" />
          <path d="M 30 45 Q 50 22 70 45" stroke="#FDE047" strokeWidth="4" fill="none" />
          <path d="M 36 34 Q 50 18 64 34" stroke="#06B6D4" strokeWidth="4" fill="none" />
        </svg>
      );

    case 'pumpkin':
      return (
        <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(234,88,12,0.4)]`}>
          <ellipse cx="50" cy="56" rx="42" ry="34" fill="#EA580C" stroke="#7C2D12" strokeWidth="4" />
          <ellipse cx="50" cy="56" rx="24" ry="18" fill="#7C2D12" stroke="#431407" strokeWidth="2.5" />
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center rounded-xl bg-emerald-800 text-white font-bold shadow-md ${className}`}>
          🌱
        </div>
      );
  }
};

export const CardVisual: React.FC<CardVisualProps> = ({
  card,
  isSelected,
  cooldownPercent = 0,
  canAfford = true,
  compact = false,
  onClick,
  showDetails = false,
  level = 1
}) => {
  const isCooldown = cooldownPercent > 0;

  const getRarityGlow = () => {
    switch (card.rarity) {
      case 'Pi':
        return 'holo-card-pi border-red-500/90 shadow-[0_0_20px_rgba(239,68,68,0.5)]';
      case 'SS':
        return 'holo-card-ss border-amber-400/90 shadow-[0_0_18px_rgba(245,158,11,0.45)]';
      case 'S':
        return 'holo-card-s border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.4)]';
      case 'A':
        return 'border-blue-500/80 bg-gradient-to-b from-blue-950 via-slate-900 to-neutral-900 shadow-[0_0_12px_rgba(59,130,246,0.35)]';
      default:
        return 'border-emerald-600/80 bg-gradient-to-b from-emerald-950 via-teal-950 to-neutral-900 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
    }
  };

  return (
    <div
      onClick={onClick}
      id={`card-${card.id}`}
      className={`relative select-none transition-all duration-200 cursor-pointer overflow-hidden rounded-2xl border-2 
        ${isSelected ? 'ring-4 ring-yellow-400 scale-105 border-yellow-300 shadow-2xl z-20' : 'hover:scale-102 hover:shadow-xl'}
        ${!canAfford && !isCooldown ? 'opacity-65 grayscale-[25%]' : ''}
        ${getRarityGlow()}
        ${compact ? 'w-22 h-32 p-1.5' : 'w-32 h-44 p-2.5'}
      `}
    >
      {/* Top Banner: Sun Cost & Rarity Tag */}
      <div className="flex items-center justify-between gap-1 mb-1 relative z-10">
        {/* Sun Badge */}
        <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-neutral-950 font-black px-2 py-0.5 rounded-full text-xs shadow-md border border-yellow-200">
          <span className="animate-spin" style={{ animationDuration: '6s' }}>☀️</span>
          <span>{card.sunCost}</span>
        </div>

        {/* Rarity & Level */}
        <div className="flex items-center gap-1">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-md
            ${card.rarity === 'Pi' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white animate-pulse border border-red-300' :
              card.rarity === 'SS' ? 'bg-gradient-to-r from-amber-300 to-yellow-500 text-neutral-950 font-black border border-yellow-200' :
              card.rarity === 'S' ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border border-purple-300' :
              card.rarity === 'A' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-cyan-300' : 'bg-emerald-600 text-white'}
          `}>
            {card.rarity}
          </span>
          {level > 1 && (
            <span className="text-[10px] text-amber-300 font-black bg-black/80 px-1 rounded border border-amber-500/50">
              +{level}
            </span>
          )}
        </div>
      </div>

      {/* Center Illustrated Icon with Bobbing Anime Feel & Dynamic Glow Plate */}
      <div className="relative flex justify-center items-center py-1">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-sm" />
        <PvZIcon type={card.iconType} cardId={card.id} className={`${compact ? 'w-12 h-12' : 'w-18 h-18'} relative z-10 transition-transform duration-300 group-hover:scale-110`} />
      </div>

      {/* Card Vietnamese Title */}
      <div className="text-center mt-1">
        <p className={`font-black text-white leading-tight truncate drop-shadow ${compact ? 'text-[11px]' : 'text-xs'}`}>
          {card.vietnameseTitle}
        </p>
        {card.nickname && !compact && (
          <p className="text-[9px] text-amber-300 font-bold truncate">
            {card.nickname}
          </p>
        )}
      </div>

      {/* Cooldown Mask Overlay */}
      {isCooldown && (
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-30"
          style={{ clipPath: `polygon(0 0, 100% 0, 100% ${cooldownPercent}%, 0 ${cooldownPercent}%)` }}
        >
          <span className="text-yellow-300 text-sm font-black drop-shadow-md animate-spin">
            ⏳
          </span>
        </div>
      )}

      {/* Category Tag pill */}
      <div className="absolute bottom-1 right-1">
        {card.rarity === 'Pi' ? (
          <span className="text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-black shadow">Pi</span>
        ) : card.category === 'fusion' ? (
          <span className="text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-black shadow">Nhập Thể</span>
        ) : null}
      </div>

      {/* Show Details Expanded */}
      {showDetails && (
        <div className="mt-2 text-[10px] text-neutral-300 space-y-1">
          <p className="line-clamp-2 text-neutral-200">{card.description}</p>
        </div>
      )}
    </div>
  );
};
