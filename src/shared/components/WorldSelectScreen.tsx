import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Languages,
  Maximize2,
  Minimize2,
  Cpu,
  Activity,
  Layers,
  Terminal,
  ChevronRight,
  Crosshair,
  ShieldCheck,
  Bot
} from 'lucide-react';

interface WorldSelectScreenProps {
  onSelectWorld: (worldId: 'ktx' | 'pvz') => void;
}

export const WorldSelectScreen: React.FC<WorldSelectScreenProps> = ({ onSelectWorld }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('vi');
  const [hoveredWorld, setHoveredWorld] = useState<'ktx' | 'pvz' | null>(null);

  const handleSelect = (worldId: 'ktx' | 'pvz') => {
    soundManager.play('level_up');
    confetti({
      particleCount: 80,
      spread: 70,
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-3 sm:p-6 md:p-8 font-mono relative overflow-x-hidden select-none">
      
      {/* Dynamic Cyberpunk Grid & Nebula Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(16,185,129,0.14),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_90%,rgba(244,63,94,0.14),transparent_50%)] pointer-events-none" />

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
            <span>MULTIVERSE MATRIX PORTAL // NODE #07</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
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
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center text-center z-10 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1 bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 text-xs font-black uppercase tracking-widest rounded-full mb-3 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>{currentLang === 'vi' ? 'HỆ THỐNG MÔ PHỎNG SINH TỒN ĐA VŨ TRỤ EX' : 'MULTIVERSE SURVIVAL SIMULATION ENGINE EX'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-neutral-100 to-emerald-400 drop-shadow-[0_4px_25px_rgba(6,182,212,0.4)] mb-3"
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
            ? 'Mỗi chiều không gian sở hữu hệ thống chiến đấu, thiên phú thức tỉnh độc nhất, chuỗi nhiệm vụ và quy tắc sinh tồn hoàn toàn độc lập. Hãy chọn thế giới bạn muốn dấn thân:'
            : 'Each dimension features independent combat mechanics, unique awakened talents, survival codex rules, and storyline quests. Choose your deployment realm below:'}
        </motion.p>
      </header>

      {/* World Selection Portals (Dual Hero Cards) */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 my-6 z-10">
        
        {/* WORLD 1: KÝ TÚC XÁ SINH TỒN RPG (ISEKAI DORMITORY) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onMouseEnter={() => setHoveredWorld('ktx')}
          onMouseLeave={() => setHoveredWorld(null)}
          onClick={() => handleSelect('ktx')}
          className="group relative bg-neutral-900/95 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-sm p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          {/* Animated Neon Ambient Light */}
          <div className="absolute -top-28 -right-28 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/35 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />

          {/* Top Status Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="px-3 py-1 bg-cyan-500 text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <Shield className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'THẾ GIỚI 01 • ISEKAI KÝ TÚC XÁ' : 'REALM 01 • ISEKAI DORMITORY'}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-cyan-400 bg-cyan-950/80 border border-cyan-500/50 px-2.5 py-0.5 font-bold uppercase rounded-xs">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Tactical RPG</span>
            </div>
          </div>

          {/* Main Title & Hero Banner */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-cyan-950 to-neutral-900 border-2 border-cyan-500 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                🏢
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wide">
                  {currentLang === 'vi' ? 'Ký Túc Xá Sinh Tồn RPG' : 'Dormitory Survival RPG'}
                </h2>
                <p className="text-xs text-cyan-400 font-bold mt-0.5">
                  {currentLang === 'vi' ? 'Nhân Vật Chính: Tiết Mộc • Thiên Phú Chúa Tể (SSS)' : 'Protagonist: Tiet Moc • Lord Awakening (SSS)'}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/80 p-3.5 border border-neutral-800 rounded-xs">
              {currentLang === 'vi'
                ? '100 sinh viên bị dịch chuyển vào KTX hoang tàn ngập tràn Zombie tàng hình & quỷ dữ. Tiết Mộc cùng hoa khôi Tinh Thần cố thủ phòng 200, dùng Tiền Chúa Tể cường hóa vạn vật, xây pháo đài Kẻ Phân Tách Không Gian và chinh phục 5 vòng tận thế!'
                : '100 students transmigrated into an apocalyptic dormitory infested with stealth zombies. Fortify Room 200, utilize Lord Coins to evolve all facilities, forge god-tier relics, and lead the survivors through 5 disaster waves!'}
            </p>
          </div>

          {/* Key Features Matrix Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs mb-6 font-mono">
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-cyan-500/40 transition-colors">
              <Flame className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{currentLang === 'vi' ? '5 Giai Đoạn & Boss Đột Phá' : '5 Stages & Boss Raids'}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-cyan-500/40 transition-colors">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{currentLang === 'vi' ? '5 Bạn Cùng Phòng + 100 Cư Dân' : '5 Roommates + 100 Tenants'}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-cyan-500/40 transition-colors">
              <Swords className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{currentLang === 'vi' ? 'Vô Hạn Trích Xuất & Lò Rèn' : 'Infinite Extraction & Forge'}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-cyan-500/40 transition-colors">
              <Radio className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{currentLang === 'vi' ? 'Đài Radio Quân Sự 107.5MHz' : '107.5MHz Military Radio'}</span>
            </div>
          </div>

          {/* Action Deploy Button */}
          <button
            onClick={() => handleSelect('ktx')}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{currentLang === 'vi' ? 'TIẾN VÀO KÝ TÚC XÁ PHÒNG 200' : 'LAUNCH DORMITORY ROOM 200'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* WORLD 2: VẬN MỆNH QUỐC GIA - VƯỜN THỰC VẬT SINH TỒN */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onMouseEnter={() => setHoveredWorld('pvz')}
          onMouseLeave={() => setHoveredWorld(null)}
          onClick={() => handleSelect('pvz')}
          className="group relative bg-neutral-900/95 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-sm p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          {/* Animated Neon Ambient Light */}
          <div className="absolute -top-28 -right-28 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/35 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent" />

          {/* Top Status Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="px-3 py-1 bg-emerald-500 text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
              <Sprout className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'THẾ GIỚI 02 • QUỐC VẬN THỰC VẬT' : 'REALM 02 • NATIONAL DESTINY FLORA'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-0.5 font-bold uppercase rounded-xs animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>Real-Time Defense</span>
            </div>
          </div>

          {/* Main Title & Hero Banner */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-emerald-950 to-neutral-900 border-2 border-emerald-500 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                🌻
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase tracking-wide">
                  {currentLang === 'vi' ? 'Vận Mệnh Quốc Gia: Vườn Cây' : 'National Destiny: Plant Citadel'}
                </h2>
                <p className="text-xs text-emerald-400 font-bold mt-0.5">
                  {currentLang === 'vi' ? 'Nhân Vật Chính: Tuyết Mộc • Sân Vườn Bác Sĩ Đép' : 'Protagonist: Tuyet Moc • Crazy Dave Sanctum'}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/80 p-3.5 border border-neutral-800 rounded-xs">
              {currentLang === 'vi'
                ? 'Mỗi quốc gia cử 1 đại diện tham gia trò chơi vận mệnh phát sóng trực tiếp cho 10 tỷ người. Tuyết Mộc chọn nghề Nông Dân, kích hoạt Sân Vườn Bác Sĩ Đép, triệu hồi Đậu Pháo, Hoa Hướng Dương và quân đoàn 40 Thây Ma càn quét tận thế!'
                : 'Broadcasted live to 10 billion spectators! Chosen as the national champion, activate the Plant Sanctum, cultivate Peashooters, Sunflowers, and command the 40-Zombie Shovel Brigade to defend your homeland!'}
            </p>
          </div>

          {/* Key Features Matrix Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs mb-6 font-mono">
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-emerald-500/40 transition-colors">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{currentLang === 'vi' ? 'Thủ Thành Thời Gian Thực (Real-Time)' : 'Real-Time Grid Combat'}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-emerald-500/40 transition-colors">
              <Tv className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{currentLang === 'vi' ? 'Live Stream Hồ Ca & Lý Băng' : 'Live Stream Studio & Commentary'}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-emerald-500/40 transition-colors">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentLang === 'vi' ? 'Buff Quốc Gia & Tăng Lãnh Thổ' : 'National Buffs & Territory Expansion'}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 rounded-xs group-hover:border-emerald-500/40 transition-colors">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{currentLang === 'vi' ? 'Quân Đoàn 40 Thây Ma Cầm Xẻng' : '40-Zombie Shovel Squad'}</span>
            </div>
          </div>

          {/* Action Deploy Button */}
          <button
            onClick={() => handleSelect('pvz')}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-neutral-950 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{currentLang === 'vi' ? 'TIẾN VÀO TRÒ CHƠI VẬN MỆNH QUỐC GIA' : 'ENTER NATIONAL DESTINY ARENA'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </main>

      {/* System Status Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800/80 pt-3 z-10 gap-2 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{currentLang === 'vi' ? 'Hệ thống tự động lưu trữ độc lập cho từng thế giới' : 'Individual Auto-Save Active For Each Realm'}</span>
        </div>
        <div className="text-cyan-400 font-bold tracking-wider">
          SURVIVAL RPG UNIVERSE ENGINE v3.0 // BUILD 2026
        </div>
      </footer>
    </div>
  );
};
