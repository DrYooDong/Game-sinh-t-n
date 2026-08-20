import React from 'react';

interface AvatarProps {
  avatarId: string;
  expression?: 'normal' | 'angry' | 'smug' | 'shocked' | 'determined' | 'funny';
  className?: string;
}

export const CharacterAvatar: React.FC<AvatarProps> = ({
  avatarId,
  expression = 'normal',
  className = 'w-16 h-16'
}) => {
  switch (avatarId) {
    case 'tuyet_moc':
      return (
        <div className={`relative rounded-2xl overflow-hidden border-2 border-emerald-400/90 bg-gradient-to-b from-teal-900 via-slate-900 to-emerald-950 shadow-[0_0_15px_rgba(16,185,129,0.4)] ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="tmHalo" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#065F46" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="tmHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            {/* Background Mystic Card Matrix Aura */}
            <circle cx="50" cy="50" r="45" fill="url(#tmHalo)" />
            <path d="M 15 20 L 85 80" stroke="#10B981" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />

            {/* Anime Hair - Spiky & Sleek with Emerald Highlights */}
            <path d="M 22 45 Q 26 12 50 10 Q 74 12 78 45 Q 70 26 50 22 Q 30 26 22 45 Z" fill="url(#tmHair)" />
            <path d="M 28 28 Q 45 16 62 25 Q 50 28 32 26 Z" fill="#10B981" />
            <path d="M 44 14 L 48 30 L 40 24 Z" fill="#34D399" />

            {/* Face Skin */}
            <ellipse cx="50" cy="54" rx="23" ry="25" fill="#FFE4E6" />
            {/* Soft Shadow under Hair */}
            <path d="M 28 40 Q 50 34 72 40 Q 50 36 28 40 Z" fill="#FECDD3" />

            {/* Eyes Expression Handling */}
            {expression === 'shocked' ? (
              <>
                <circle cx="40" cy="50" r="6" fill="#FFF" stroke="#0F172A" strokeWidth="2" />
                <circle cx="40" cy="50" r="2.5" fill="#0D9488" />
                <circle cx="60" cy="50" r="6" fill="#FFF" stroke="#0F172A" strokeWidth="2" />
                <circle cx="60" cy="50" r="2.5" fill="#0D9488" />
              </>
            ) : expression === 'angry' ? (
              <>
                <path d="M 32 44 L 46 49" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <path d="M 68 44 L 54 49" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="40" cy="52" rx="4" ry="5" fill="#0F172A" />
                <circle cx="41" cy="51" r="1.5" fill="#10B981" />
                <ellipse cx="60" cy="52" rx="4" ry="5" fill="#0F172A" />
                <circle cx="59" cy="51" r="1.5" fill="#10B981" />
              </>
            ) : (
              <>
                <ellipse cx="40" cy="50" rx="4.5" ry="6" fill="#0F172A" />
                <circle cx="41" cy="48" r="2" fill="#10B981" />
                <circle cx="39" cy="46" r="1" fill="#FFF" />
                <ellipse cx="60" cy="50" rx="4.5" ry="6" fill="#0F172A" />
                <circle cx="61" cy="48" r="2" fill="#10B981" />
                <circle cx="59" cy="46" r="1" fill="#FFF" />
              </>
            )}

            {/* Mouth */}
            {expression === 'determined' ? (
              <path d="M 44 68 L 56 68" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
            ) : expression === 'shocked' ? (
              <ellipse cx="50" cy="68" rx="4" ry="5" fill="#991B1B" />
            ) : (
              <path d="M 44 66 Q 50 72 56 66" stroke="#991B1B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}

            {/* Card Master Golden Leaf Badge */}
            <circle cx="24" cy="74" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
            <polygon points="24,68 27,74 24,78 21,74" fill="#78350F" />
          </svg>
        </div>
      );

    case 'tieu_thon':
      return (
        <div className={`relative rounded-2xl overflow-hidden border-2 border-green-400/90 bg-gradient-to-b from-green-950 via-emerald-900 to-slate-950 shadow-[0_0_15px_rgba(34,197,94,0.4)] ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#15803D" opacity="0.3" />
            {/* Peashooter Head with Red Ninja Bandana */}
            <circle cx="48" cy="48" r="26" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
            <ellipse cx="76" cy="48" rx="14" ry="10" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
            <circle cx="82" cy="48" r="6" fill="#052E16" />
            <circle cx="81" cy="48" r="2.5" fill="#86EFAC" />

            {/* Red Bad-Boy Headband with metallic buckle */}
            <path d="M 30 36 Q 52 28 72 38" stroke="#DC2626" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 26 38 L 14 46" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
            <rect x="46" y="30" width="8" height="6" fill="#FBBF24" rx="1" />

            {/* Smug Bad-Boy Eyes */}
            <path d="M 40 43 L 56 45" stroke="#000" strokeWidth="2.5" />
            <ellipse cx="48" cy="46" rx="4.5" ry="5.5" fill="#FFF" stroke="#000" strokeWidth="1.5" />
            <circle cx="50" cy="46" r="2.8" fill="#052E16" />
            <circle cx="49" cy="44.5" r="1.2" fill="#FFF" />
          </svg>
        </div>
      );

    case 'nhi_gia':
      return (
        <div className={`relative rounded-2xl overflow-hidden border-2 border-pink-400/90 bg-gradient-to-b from-pink-950 via-slate-900 to-neutral-950 shadow-[0_0_15px_rgba(244,114,182,0.4)] ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#DB2777" opacity="0.2" />
            {/* Newspaper Zombie Face with Glasses */}
            <circle cx="48" cy="42" r="25" fill="#86EFAC" stroke="#166534" strokeWidth="2.5" />
            <rect x="32" y="36" width="13" height="12" rx="2" fill="rgba(255,255,255,0.4)" stroke="#000" strokeWidth="2" />
            <rect x="51" y="36" width="13" height="12" rx="2" fill="rgba(255,255,255,0.4)" stroke="#000" strokeWidth="2" />
            <line x1="45" y1="41" x2="51" y2="41" stroke="#000" strokeWidth="2" />
            <circle cx="38" cy="42" r="3.5" fill="#DC2626" />
            <circle cx="57" cy="42" r="3.5" fill="#DC2626" />
            <circle cx="37" cy="40.5" r="1" fill="#FFF" />
            <circle cx="56" cy="40.5" r="1" fill="#FFF" />

            {/* Newspaper Mask/Shield */}
            <rect x="18" y="60" width="64" height="32" rx="3" fill="#F5F5F4" stroke="#44403C" strokeWidth="2" />
            <rect x="22" y="64" width="56" height="5" fill="#DC2626" />
            <line x1="24" y1="74" x2="72" y2="74" stroke="#78716C" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'la_quan':
      return (
        <div className={`relative rounded-2xl overflow-hidden border-2 border-amber-500/90 bg-gradient-to-b from-amber-950 via-stone-900 to-neutral-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="56" rx="25" ry="26" fill="#FED7AA" />
            <path d="M 22 36 Q 45 12 78 28 Q 70 42 22 36 Z" fill="#15803D" stroke="#14532D" strokeWidth="2" />
            <circle cx="40" cy="30" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            {/* Scar & Battle-Hardened Veteran Stare */}
            <line x1="58" y1="42" x2="66" y2="60" stroke="#B91C1C" strokeWidth="2.5" />
            <ellipse cx="40" cy="52" rx="4" ry="4" fill="#1C1917" />
            <ellipse cx="60" cy="52" rx="4" ry="4" fill="#1C1917" />
            <path d="M 38 70 Q 50 78 62 70" stroke="#78350F" strokeWidth="3.5" fill="none" strokeDasharray="2 2" />
          </svg>
        </div>
      );

    case 'yosuke':
      return (
        <div className={`relative rounded-2xl overflow-hidden border-2 border-red-500/90 bg-gradient-to-b from-red-950 via-slate-900 to-black shadow-[0_0_15px_rgba(239,68,68,0.4)] ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="18" r="8" fill="#1E293B" />
            <ellipse cx="50" cy="54" rx="24" ry="26" fill="#FEE2E2" />
            <rect x="24" y="34" width="52" height="12" fill="#FFF" stroke="#DC2626" strokeWidth="2" />
            <circle cx="50" cy="40" r="4" fill="#DC2626" />
            {/* Samurai Eyes */}
            <path d="M 32 46 L 46 51" stroke="#000" strokeWidth="3" />
            <path d="M 68 46 L 54 51" stroke="#000" strokeWidth="3" />
            <circle cx="40" cy="53" r="3.5" fill="#000" />
            <circle cx="60" cy="53" r="3.5" fill="#000" />
            {/* Watermelon Fanatic Emblem */}
            <path d="M 22 74 Q 32 86 42 74 Z" fill="#22C55E" />
            <path d="M 25 74 Q 32 82 39 74 Z" fill="#EF4444" />
          </svg>
        </div>
      );

    case 'ta_giao':
      return (
        <div className={`relative rounded-2xl overflow-hidden border-2 border-rose-500/90 bg-gradient-to-b from-rose-950 via-purple-950 to-black shadow-[0_0_15px_rgba(244,63,94,0.4)] ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 20 48 Q 28 10 50 8 Q 72 10 80 48 Q 65 28 50 24 Q 35 28 20 48 Z" fill="#881337" />
            <ellipse cx="50" cy="54" rx="23" ry="25" fill="#FFF1F2" />
            <ellipse cx="39" cy="50" rx="4.5" ry="6" fill="#E11D48" />
            <ellipse cx="61" cy="50" rx="4.5" ry="6" fill="#E11D48" />
            <circle cx="40" cy="48" r="1.5" fill="#FFF" />
            <circle cx="62" cy="48" r="1.5" fill="#FFF" />
            {/* Vampire Fang */}
            <polygon points="56,66 58,72 60,66" fill="#FFF" />
          </svg>
        </div>
      );

    case 'vo_nang':
      return (
        <div className={`relative rounded-2xl overflow-hidden border-2 border-red-700/90 bg-gradient-to-b from-red-950 via-zinc-950 to-black shadow-[0_0_15px_rgba(185,28,28,0.5)] ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="54" rx="27" ry="29" fill="#9A3412" />
            <circle cx="26" cy="24" r="11" fill="#78350F" />
            <circle cx="74" cy="24" r="11" fill="#78350F" />
            <circle cx="38" cy="48" r="6" fill="#EF4444" />
            <circle cx="62" cy="48" r="6" fill="#EF4444" />
            <path d="M 36 68 Q 50 60 64 68" stroke="#450A0A" strokeWidth="5" fill="none" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center rounded-2xl bg-emerald-800 text-white font-bold shadow-md ${className}`}>
          👤
        </div>
      );
  }
};
