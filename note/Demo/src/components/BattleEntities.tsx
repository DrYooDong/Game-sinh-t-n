import React from 'react';
import { Enemy, PlacedEntity, Projectile } from '../types/game';
import { ALL_CARDS } from '../data/cardsData';
import { PvZIcon } from './CardVisual';

export const ZombieVisual: React.FC<{ enemy: Enemy }> = ({ enemy }) => {
  switch (enemy.enemyTypeId) {
    case 'newspaper_zombie':
      return (
        <div className="relative w-14 h-16 flex flex-col items-center animate-zombie-sway">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(220,38,38,0.4)]">
            <circle cx="50" cy="36" r="22" fill="#86EFAC" stroke="#166534" strokeWidth="2.5" />
            <rect x="34" y="30" width="13" height="11" rx="2" fill="rgba(255,255,255,0.4)" stroke="#000" strokeWidth="2" />
            <rect x="53" y="30" width="13" height="11" rx="2" fill="rgba(255,255,255,0.4)" stroke="#000" strokeWidth="2" />
            <circle cx="40.5" cy="35.5" r="3" fill="#DC2626" />
            <circle cx="59.5" cy="35.5" r="3" fill="#DC2626" />
            <rect x="18" y="50" width="64" height="34" rx="2" fill="#F5F5F4" stroke="#44403C" strokeWidth="2" />
            <line x1="24" y1="60" x2="52" y2="60" stroke="#DC2626" strokeWidth="2" />
            <rect x="32" y="84" width="36" height="14" rx="2" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'conehead_zombie':
      return (
        <div className="relative w-14 h-16 flex flex-col items-center animate-zombie-sway">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(234,88,12,0.4)]">
            {/* Orange Traffic Cone */}
            <polygon points="50,4 34,42 66,42" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
            <rect x="28" y="42" width="44" height="6" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />
            <polygon points="50,14 42,34 58,34" fill="#F97316" />
            <line x1="38" y1="28" x2="62" y2="28" stroke="#FFF" strokeWidth="3" />
            {/* Zombie Face */}
            <circle cx="50" cy="56" r="20" fill="#86EFAC" stroke="#166534" strokeWidth="2.5" />
            <circle cx="42" cy="54" r="3.5" fill="#EF4444" />
            <circle cx="58" cy="54" r="3.5" fill="#EF4444" />
            <path d="M 44 68 Q 50 72 56 68" stroke="#064E3B" strokeWidth="2" fill="none" />
            <rect x="36" y="76" width="28" height="22" fill="#3B82F6" rx="2" />
          </svg>
        </div>
      );

    case 'buckethead_zombie':
      return (
        <div className="relative w-14 h-16 flex flex-col items-center animate-zombie-sway">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(100,116,139,0.5)]">
            {/* Metal Bucket */}
            <polygon points="32,10 68,10 64,44 36,44" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
            <ellipse cx="50" cy="10" rx="18" ry="4" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
            <path d="M 30 40 Q 50 20 70 40" stroke="#475569" strokeWidth="2.5" fill="none" />
            {/* Zombie Face */}
            <circle cx="50" cy="58" r="20" fill="#86EFAC" stroke="#166534" strokeWidth="2.5" />
            <circle cx="42" cy="56" r="3.5" fill="#EF4444" />
            <circle cx="58" cy="56" r="3.5" fill="#EF4444" />
            <rect x="36" y="78" width="28" height="20" fill="#475569" rx="2" />
          </svg>
        </div>
      );

    case 'dolphin_zombie':
      return (
        <div className="relative w-16 h-16 flex flex-col items-center animate-zombie-sway">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(2,132,199,0.5)]">
            {/* Dolphin Mount */}
            <path d="M 10 70 Q 45 42 90 65 Q 65 92 10 70 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
            <polygon points="50,52 58,35 64,54" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
            {/* Zombie Rider with Snorkel */}
            <circle cx="42" cy="34" r="15" fill="#86EFAC" stroke="#166534" strokeWidth="2" />
            <rect x="36" y="28" width="16" height="10" rx="2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
            <line x1="48" y1="28" x2="48" y2="12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'balloon_zombie':
      return (
        <div className="relative w-14 h-16 flex flex-col items-center animate-float-gentle">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(239,68,68,0.5)]">
            <circle cx="50" cy="22" r="18" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
            <polygon points="46,40 54,40 50,44" fill="#991B1B" />
            <line x1="50" y1="44" x2="50" y2="60" stroke="#FFF" strokeWidth="1.5" />
            <circle cx="50" cy="68" r="13" fill="#86EFAC" stroke="#166534" strokeWidth="1.5" />
            <circle cx="46" cy="66" r="2.5" fill="#DC2626" />
            <circle cx="54" cy="66" r="2.5" fill="#DC2626" />
            <rect x="42" y="80" width="16" height="16" fill="#3B82F6" rx="2" />
          </svg>
        </div>
      );

    case 'iron_gate_zombie':
      return (
        <div className="relative w-16 h-16 flex flex-col items-center animate-zombie-sway">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(30,41,59,0.6)]">
            <circle cx="45" cy="40" r="18" fill="#86EFAC" stroke="#166534" strokeWidth="2" />
            <rect x="34" y="22" width="48" height="68" rx="3" fill="#475569" stroke="#0F172A" strokeWidth="3" />
            <line x1="46" y1="22" x2="46" y2="90" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="58" y1="22" x2="58" y2="90" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="70" y1="22" x2="70" y2="90" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="34" y1="42" x2="82" y2="42" stroke="#94A3B8" strokeWidth="2" />
            <line x1="34" y1="62" x2="82" y2="62" stroke="#94A3B8" strokeWidth="2" />
          </svg>
        </div>
      );

    default:
      if (enemy.isBoss) {
        return (
          <div className="relative w-20 h-20 flex flex-col items-center animate-zombie-sway">
            {/* Glowing Boss Red Aura */}
            <div className="absolute inset-0 rounded-full bg-red-600/30 blur-md animate-pulse" />
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(239,68,68,0.7)]">
              {/* Tyrant Beast Skull */}
              <ellipse cx="50" cy="50" rx="32" ry="34" fill="#7F1D1D" stroke="#450A0A" strokeWidth="4" />
              {/* Horns */}
              <path d="M 22 34 Q 10 10 28 6 Q 30 20 34 30 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
              <path d="M 78 34 Q 90 10 72 6 Q 70 20 66 30 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
              {/* Glowing Demonic Eyes */}
              <circle cx="36" cy="46" r="6" fill="#FDE047" stroke="#DC2626" strokeWidth="2" />
              <circle cx="64" cy="46" r="6" fill="#FDE047" stroke="#DC2626" strokeWidth="2" />
              <circle cx="36" cy="46" r="2.5" fill="#991B1B" />
              <circle cx="64" cy="46" r="2.5" fill="#991B1B" />
              {/* Fangs & Jaw */}
              <ellipse cx="50" cy="68" rx="20" ry="12" fill="#1C1917" />
              <polygon points="38,62 42,70 46,62" fill="#FFF" />
              <polygon points="46,62 50,72 54,62" fill="#FFF" />
              <polygon points="54,62 58,70 62,62" fill="#FFF" />
            </svg>
          </div>
        );
      }

      return (
        <div className="relative w-13 h-15 flex flex-col items-center animate-zombie-sway">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(16,185,129,0.3)]">
            {/* Standard Zombie */}
            <circle cx="50" cy="44" r="22" fill="#86EFAC" stroke="#166534" strokeWidth="2.5" />
            <circle cx="42" cy="42" r="3.5" fill="#DC2626" />
            <circle cx="58" cy="42" r="3.5" fill="#DC2626" />
            <circle cx="41" cy="41" r="1" fill="#FFF" />
            <circle cx="57" cy="41" r="1" fill="#FFF" />
            <path d="M 44 56 Q 50 60 56 56" stroke="#064E3B" strokeWidth="2" fill="none" />
            {/* Suit & Tie */}
            <rect x="36" y="66" width="28" height="26" fill="#475569" rx="3" stroke="#1E293B" strokeWidth="2" />
            <polygon points="50,68 53,82 50,86 47,82" fill="#DC2626" />
          </svg>
        </div>
      );
  }
};

export const ProjectileVisual: React.FC<{ proj: Projectile }> = ({ proj }) => {
  switch (proj.type) {
    case 'fire_pea':
      return (
        <div className="relative w-7 h-7 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-orange-500/50 blur-sm animate-pulse" />
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
            <defs>
              <radialGradient id="fireBallGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#DC2626" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="36" fill="url(#fireBallGrad)" />
            {/* Trailing Fire Sparks */}
            <path d="M 18 50 Q 6 42 2 50 Q 8 58 18 50 Z" fill="#EF4444" />
          </svg>
        </div>
      );

    case 'melon':
      return (
        <div className="relative w-8 h-8 flex items-center justify-center animate-spin" style={{ animationDuration: '0.8s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(22,163,74,0.5)]">
            <ellipse cx="50" cy="50" rx="42" ry="34" fill="#22C55E" stroke="#14532D" strokeWidth="4" />
            <path d="M 20 40 Q 50 48 80 40" stroke="#052E16" strokeWidth="4" fill="none" />
            <path d="M 20 60 Q 50 68 80 60" stroke="#052E16" strokeWidth="4" fill="none" />
          </svg>
        </div>
      );

    default:
      return (
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-400/40 blur-xs" />
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_6px_rgba(34,197,94,0.7)]">
            <defs>
              <radialGradient id="peaGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#BBF7D0" />
                <stop offset="60%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#15803D" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#peaGrad)" stroke="#166534" strokeWidth="2" />
          </svg>
        </div>
      );
  }
};
