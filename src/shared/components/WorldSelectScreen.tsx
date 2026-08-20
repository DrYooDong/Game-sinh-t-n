import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Shield,
  Sprout,
  Users,
  Flame,
  Swords,
  Radio,
  Tv,
  Globe,
  Zap,
  Sparkles,
  Play,
  Award,
  Volume2,
  VolumeX,
  Maximize2,
  Terminal,
  ChevronRight,
  Layers,
  Sparkle,
  Car,
  Hammer,
  Package,
  Compass
} from 'lucide-react';
import { WasmStatusBadge } from './WasmStatusBadge';

interface WorldSelectScreenProps {
  onSelectWorld: (worldId: 'ktx' | 'pvz' | 'pvz2' | 'highway') => void;
}

export const WorldSelectScreen: React.FC<WorldSelectScreenProps> = ({ onSelectWorld }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('vi');
  const [, setHoveredWorld] = useState<'ktx' | 'pvz' | 'pvz2' | 'highway' | null>(null);

  const handleSelect = (worldId: 'ktx' | 'pvz' | 'pvz2' | 'highway') => {
    soundManager.play('level_up');
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onSelectWorld(worldId);
    }, 250);
  };

  const handleToggleMute = () => {
    const nextM = soundManager.toggleMute();
    setIsMuted(nextM);
  };

  const handleToggleLang = () => {
    soundManager.play('click');
    setCurrentLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const handleToggleFullscreen = () => {
    soundManager.play('click');
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-3 sm:p-5 md:p-6 font-mono relative overflow-x-hidden select-none">
      
      {/* Dynamic Cyberpunk Grid & Nebula Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(16,185,129,0.14),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_90%,rgba(168,85,247,0.16),transparent_50%)] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Global Utility Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pb-2 border-b border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
          <span className="text-[11px] font-bold tracking-widest text-cyan-300 uppercase flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>MULTIVERSE MATRIX PORTAL // QUADRUPLE REALMS #08</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* WebAssembly Native C++ Engine Badge */}
          <WasmStatusBadge />

          {/* Language Switcher */}
          <button
            onClick={handleToggleLang}
            className="px-2.5 py-1 bg-neutral-900/90 hover:bg-neutral-800 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-xs font-bold rounded-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            title="Chuyển đổi ngôn ngữ / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentLang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-1.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white rounded-xs cursor-pointer transition-all"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white rounded-xs cursor-pointer transition-all hidden sm:block"
            title="Toàn màn hình"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title & Hero Banner */}
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center text-center z-10 pt-2 sm:pt-4">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1 bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 text-xs font-black uppercase tracking-widest rounded-full mb-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>{currentLang === 'vi' ? 'HỆ THỐNG MÔ PHỎNG SINH TỒN ĐA VŨ TRỤ EX' : 'MULTIVERSE SURVIVAL SIMULATION ENGINE EX'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-purple-400 drop-shadow-[0_4px_25px_rgba(6,182,212,0.4)] mb-1"
        >
          {currentLang === 'vi' ? 'CHỌN THẾ GIỚI SINH TỒN' : 'SELECT SURVIVAL REALM'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed px-2"
        >
          {currentLang === 'vi'
            ? 'Mỗi chiều không gian sở hữu lối chơi, hệ thống chế tạo/thiên phú thức tỉnh và cốt truyện hoàn toàn độc lập. Hãy chọn thế giới để dấn thân:'
            : 'Each dimension features unique combat loops, awakened talents, deckbuilding mechanics, and story arcs. Choose your deployment realm below:'}
        </motion.p>
      </header>

      {/* World Selection Portals (Quadruple Hero Cards Grid) */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-5 my-4 z-10">
        
        {/* WORLD 1: KÝ TÚC XÁ SINH TỒN RPG (ISEKAI DORMITORY) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onMouseEnter={() => setHoveredWorld('ktx')}
          onMouseLeave={() => setHoveredWorld(null)}
          onClick={() => handleSelect('ktx')}
          className="group relative bg-neutral-900/95 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-sm p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/35 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />

          <div>
            {/* Top Status Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="px-2 py-0.5 bg-cyan-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider rounded-xs flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                <Shield className="w-3 h-3" />
                <span>{currentLang === 'vi' ? 'THẾ GIỚI 01 • KTX' : 'REALM 01 • DORM'}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-500/50 px-1.5 py-0.5 font-bold uppercase rounded-xs">
                <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>Tactical RPG</span>
              </div>
            </div>

            {/* Title & Protagonist */}
            <div className="space-y-2.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-cyan-950 to-neutral-900 border-2 border-cyan-500 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                  🏢
                </div>
                <div>
                  <h2 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wide leading-tight">
                    {currentLang === 'vi' ? 'Ký Túc Xá Sinh Tồn' : 'Dormitory Survival'}
                  </h2>
                  <p className="text-[10px] text-cyan-400 font-bold">
                    {currentLang === 'vi' ? 'Tiết Mộc • Chúa Tể (SSS)' : 'Tiet Moc • Lord SSS'}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-neutral-300 leading-relaxed bg-neutral-950/80 p-2.5 border border-neutral-800 rounded-xs min-h-[58px]">
                {currentLang === 'vi'
                  ? 'Cố thủ phòng 200 trước Zombie tàng hình. Dùng Tiền Chúa Tể cường hóa pháo đài & 5 Bạn Cùng Phòng!'
                  : 'Fortify Room 200 against stealth zombies. Utilize Lord Coins to forge god relics & survive!'}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-4 font-mono">
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Flame className="w-3 h-3 text-rose-400 shrink-0" />
                <span>5 Vòng Tận Thế</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Users className="w-3 h-3 text-amber-400 shrink-0" />
                <span>100 Cư Dân KTX</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Swords className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>Lò Rèn Vô Hạn</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Radio className="w-3 h-3 text-purple-400 shrink-0" />
                <span>Đài Quân Sự</span>
              </div>
            </div>
          </div>

          {/* Action Deploy Button */}
          <button
            onClick={() => handleSelect('ktx')}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{currentLang === 'vi' ? 'VÀO KÝ TÚC XÁ' : 'ENTER ROOM 200'}</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* WORLD 2: PVZ PHẦN 1 • QUỐC VẬN THỰC VẬT (REAL-TIME DEFENSE) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onMouseEnter={() => setHoveredWorld('pvz')}
          onMouseLeave={() => setHoveredWorld(null)}
          onClick={() => handleSelect('pvz')}
          className="group relative bg-neutral-900/95 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-sm p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/35 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent" />

          <div>
            {/* Top Status Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="px-2 py-0.5 bg-emerald-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider rounded-xs flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                <Sprout className="w-3 h-3" />
                <span>{currentLang === 'vi' ? 'THẾ GIỚI 02 • PVZ 1' : 'REALM 02 • PVZ 1'}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 px-1.5 py-0.5 font-bold uppercase rounded-xs animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span>Real-Time Grid</span>
              </div>
            </div>

            {/* Title & Protagonist */}
            <div className="space-y-2.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-emerald-950 to-neutral-900 border-2 border-emerald-500 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                  🌻
                </div>
                <div>
                  <h2 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors uppercase tracking-wide leading-tight">
                    {currentLang === 'vi' ? 'Quốc Vận: Sân Vườn' : 'National Destiny 1'}
                  </h2>
                  <p className="text-[10px] text-emerald-400 font-bold">
                    {currentLang === 'vi' ? 'Tuyết Mộc • Nông Dân Dave' : 'Tuyet Moc • Farmer Dave'}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-neutral-300 leading-relaxed bg-neutral-950/80 p-2.5 border border-neutral-800 rounded-xs min-h-[58px]">
                {currentLang === 'vi'
                  ? 'Phát sóng trực tiếp 10 tỷ người! Kích hoạt Sân Vườn, trồng Đậu Pháo & chỉ huy 40 Zombie Cầm Xẻng càn quét!'
                  : 'Live streamed worldwide! Activate Dave Sanctum, plant Peashooters & command 40 Zombie shovel warriors!'}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-4 font-mono">
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Thủ 5 Hàng</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Tv className="w-3 h-3 text-rose-400 shrink-0" />
                <span>Live Bình Luận</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Buff Quốc Gia</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Award className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>Zombie Cầm Xẻng</span>
              </div>
            </div>
          </div>

          {/* Action Deploy Button */}
          <button
            onClick={() => handleSelect('pvz')}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-neutral-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{currentLang === 'vi' ? 'VÀO PVZ PHẦN 1' : 'ENTER PVZ PART 1'}</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* WORLD 3: PVZ PHẦN 2 • KỶ NGUYÊN THẦN BÀI (CARD MASTER & DUNGEON ARCS) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onMouseEnter={() => setHoveredWorld('pvz2')}
          onMouseLeave={() => setHoveredWorld(null)}
          onClick={() => handleSelect('pvz2')}
          className="group relative bg-neutral-900/95 border-2 border-purple-500/50 hover:border-purple-400 rounded-sm p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent" />

          <div>
            {/* Top Status Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider rounded-xs flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                <Sparkle className="w-3 h-3" />
                <span>{currentLang === 'vi' ? 'THẾ GIỚI 03 • PVZ 2' : 'REALM 03 • PVZ 2'}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-purple-300 bg-purple-950/80 border border-purple-500/50 px-1.5 py-0.5 font-bold uppercase rounded-xs">
                <Layers className="w-3 h-3 text-pink-400 animate-pulse" />
                <span>Card Master</span>
              </div>
            </div>

            {/* Title & Protagonist */}
            <div className="space-y-2.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-purple-950 to-neutral-900 border-2 border-purple-500 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                  🃏
                </div>
                <div>
                  <h2 className="text-base font-black text-white group-hover:text-purple-300 transition-colors uppercase tracking-wide leading-tight">
                    {currentLang === 'vi' ? 'Kỷ Nguyên Thần Bài' : 'Card Destiny Era'}
                  </h2>
                  <p className="text-[10px] text-purple-400 font-bold">
                    {currentLang === 'vi' ? 'Tuyết Mộc • Thẻ Pi (SSS)' : 'Tuyet Moc • Master Pi'}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-neutral-300 leading-relaxed bg-neutral-950/80 p-2.5 border border-neutral-800 rounded-xs min-h-[58px]">
                {currentLang === 'vi'
                  ? 'Bí cảnh Khe Nứt, Boss Bạch Tuộc cấp 61. Dung hợp Zombie Bóng Bay, Xạ Thủ Nuốt Súng & Gacha thẻ bài!'
                  : 'Conquer 5 Dungeons & Lv.61 Octopus Boss! Fuse Balloon Zombie, Gatling Peashooter & summon cards!'}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-4 font-mono">
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                <span>5 Bí Cảnh Truyện</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Hạt Năng Lượng</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Swords className="w-3 h-3 text-pink-400 shrink-0" />
                <span>Nhập Thể Biến Hình</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Award className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>Gacha x10 & Thẻ Pi</span>
              </div>
            </div>
          </div>

          {/* Action Deploy Button */}
          <button
            onClick={() => handleSelect('pvz2')}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 hover:from-purple-400 hover:to-pink-500 text-neutral-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{currentLang === 'vi' ? 'VÀO PVZ PHẦN 2' : 'ENTER PVZ PART 2'}</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* WORLD 4: SINH TỒN TRÊN ĐƯỜNG CAO TỐC (HIGHWAY SURVIVAL RPG) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onMouseEnter={() => setHoveredWorld('highway')}
          onMouseLeave={() => setHoveredWorld(null)}
          onClick={() => handleSelect('highway')}
          className="group relative bg-neutral-900/95 border-2 border-amber-500/50 hover:border-amber-400 rounded-sm p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/25 rounded-full blur-3xl group-hover:bg-amber-500/40 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-transparent" />

          <div>
            {/* Top Status Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider rounded-xs flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                <Compass className="w-3 h-3" />
                <span>{currentLang === 'vi' ? 'THẾ GIỚI 04 • CAO TỐC' : 'REALM 04 • HIGHWAY'}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/80 border border-amber-500/50 px-1.5 py-0.5 font-bold uppercase rounded-xs">
                <Car className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>Highway Sim</span>
              </div>
            </div>

            {/* Title & Protagonist */}
            <div className="space-y-2.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-amber-950 to-neutral-900 border-2 border-amber-500 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                  🚐
                </div>
                <div>
                  <h2 className="text-base font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-wide leading-tight">
                    {currentLang === 'vi' ? 'Đường Cao Tốc' : 'Highway Survival'}
                  </h2>
                  <p className="text-[10px] text-amber-400 font-bold">
                    {currentLang === 'vi' ? 'Tuyết Mộc • 10 Phát Nhập Hồn' : 'Tuyet Moc • 10th Craft Soul'}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-neutral-300 leading-relaxed bg-neutral-950/80 p-2.5 border border-neutral-800 rounded-xs min-h-[58px]">
                {currentLang === 'vi'
                  ? 'Lái xe van cũ trên hoang mạc vô tận. Kích hoạt thiên phú 10 Phát Nhập Hồn rèn thần trang, nhặt rương & săn thú!'
                  : 'Drive scrap van across infinite wasteland. Awaken 10th Craft Soul to forge god equipment & hunt beasts!'}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-4 font-mono">
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Car className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Độ Xe Van Sang RV</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Hammer className="w-3 h-3 text-orange-400 shrink-0" />
                <span>10 Phát Nhập Hồn</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Package className="w-3 h-3 text-yellow-400 shrink-0" />
                <span>Rương & Chợ 10K</span>
              </div>
              <div className="flex items-center gap-1 p-1.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs">
                <Flame className="w-3 h-3 text-rose-400 shrink-0" />
                <span>Bão Cát & Quái Thú</span>
              </div>
            </div>
          </div>

          {/* Action Deploy Button */}
          <button
            onClick={() => handleSelect('highway')}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 hover:from-amber-400 hover:to-orange-500 text-neutral-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{currentLang === 'vi' ? 'VÀO ĐƯỜNG CAO TỐC' : 'ENTER HIGHWAY REALM'}</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </main>

      {/* System Status Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800/80 pt-2 z-10 gap-2 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{currentLang === 'vi' ? 'Hệ thống tự động lưu trữ độc lập cho từng thế giới (Local Storage)' : 'Individual Auto-Save Active For Each Realm'}</span>
        </div>
        <div className="text-cyan-400 font-bold tracking-wider">
          SURVIVAL RPG UNIVERSE ENGINE v4.0 // 4 REALMS ACTIVE // BUILD 2026
        </div>
      </footer>
    </div>
  );
};

