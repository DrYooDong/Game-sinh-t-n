import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/audio';
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
  Award
} from 'lucide-react';

interface WorldSelectScreenProps {
  onSelectWorld: (worldId: 'ktx' | 'pvz') => void;
}

export const WorldSelectScreen: React.FC<WorldSelectScreenProps> = ({ onSelectWorld }) => {
  const handleSelect = (worldId: 'ktx' | 'pvz') => {
    soundManager.play('click');
    onSelectWorld(worldId);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-between p-4 sm:p-8 font-mono relative overflow-hidden select-none">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(225,29,72,0.1),transparent_60%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Header */}
      <header className="w-full max-w-6xl flex flex-col items-center text-center z-10 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>HỆ THỐNG MÔ PHỎNG SINH TỒN ĐA VŨ TRỤ</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-neutral-100 to-emerald-400 drop-shadow-md mb-2"
        >
          CHỌN THẾ GIỚI SINH TỒN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-neutral-400 max-w-2xl"
        >
          Mỗi thế giới sở hữu cơ chế sinh tồn, thiên phú thức tỉnh và kịch bản cốt truyện hoàn toàn độc lập. Hãy chọn chiều không gian bạn muốn dấn thân:
        </motion.p>
      </header>

      {/* World Selection Cards */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 my-6 z-10">
        {/* WORLD 1: KÝ TÚC XÁ SINH TỒN RPG */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onClick={() => handleSelect('ktx')}
          className="group relative bg-neutral-900/90 border-2 border-cyan-500/40 hover:border-cyan-400 rounded-xs p-6 shadow-2xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          {/* Glowing Ambient Corner */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all" />

          {/* Top Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="px-2.5 py-1 bg-cyan-500 text-neutral-950 text-[11px] font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-md">
              <Shield className="w-3.5 h-3.5" />
              <span>THẾ GIỚI 01 • ISEKAI KÝ TÚC XÁ</span>
            </div>
            <span className="text-[11px] text-cyan-400 bg-cyan-950 border border-cyan-800/80 px-2 py-0.5 font-bold">
              Turn-based RPG
            </span>
          </div>

          {/* Main Title & Hero Info */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xs bg-cyan-950 border border-cyan-500 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
                🏢
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors uppercase">
                  Ký Túc Xá Sinh Tồn RPG
                </h2>
                <p className="text-xs text-cyan-400/80 font-bold">
                  Nhân Vật Chính: Tiết Mộc • Thiên Phú Chúa Tể (SSS)
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/70 p-3 border border-neutral-800 rounded-xs">
              100 sinh viên bị kéo vào KTX hoang tàn đầy Zombie tàng hình và ác quỷ. Tiết Mộc cùng hoa khôi Tinh Thần cố thủ phòng 200, dùng Tiền Chúa Tể cường hóa vạn vật, xây pháo đài Kẻ Phân Tách Không Gian và chinh phục 5 vòng tận thế đến cõi Minh Phủ.
            </p>
          </div>

          {/* Key Features List */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-6">
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Flame className="w-4 h-4 text-rose-400 shrink-0" />
              <span>5 Giai Đoạn & Boss Đột Phá</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <span>5 Bạn Cùng Phòng + 100 Cư Dân</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Swords className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Vô Hạn Trích Xuất & Rèn Đồ</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Radio className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Đài Phát Thanh 107.5MHz</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => handleSelect('ktx')}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-neutral-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>TIẾN VÀO KÝ TÚC XÁ PHÒNG 200</span>
          </button>
        </motion.div>

        {/* WORLD 2: VẬN MỆNH QUỐC GIA - VƯỜN SINH TỒN */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.015, y: -4 }}
          onClick={() => handleSelect('pvz')}
          className="group relative bg-neutral-900/90 border-2 border-emerald-500/40 hover:border-emerald-400 rounded-xs p-6 shadow-2xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          {/* Glowing Ambient Corner */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all" />

          {/* Top Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="px-2.5 py-1 bg-emerald-500 text-neutral-950 text-[11px] font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-md">
              <Sprout className="w-3.5 h-3.5" />
              <span>THẾ GIỚI 02 • QUỐC VẬN THỰC VẬT</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950 border border-emerald-800/80 px-2 py-0.5 font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Real-Time Defense (MỚI)</span>
            </div>
          </div>

          {/* Main Title & Hero Info */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xs bg-emerald-950 border border-emerald-500 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
                🌻
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase">
                  Vận Mệnh Quốc Gia: Vườn Cây
                </h2>
                <p className="text-xs text-emerald-400/80 font-bold">
                  Nhân Vật Chính: Tuyết Mộc • Sân Vườn Bác Sĩ Đép
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/70 p-3 border border-neutral-800 rounded-xs">
              Mỗi quốc gia chọn 1 đại diện tham gia trò chơi vận mệnh phát sóng trực tiếp cho 10 tỷ người. Tuyết Mộc chọn nghề Nông Dân, kích hoạt hệ thống Sân Vườn Bác Sĩ, triệu hồi Đậu Pháo, Hoa Hướng Dương và quân đoàn Thây Ma càn quét tận thế.
            </p>
          </div>

          {/* Key Features List */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-6">
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Chiến Đấu Thời Gian Thực (Real-Time)</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Tv className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Phòng Live Stream Hồ Ca & Lý Băng</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Buff Quốc Gia & Tăng Lãnh Thổ</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Quân Đoàn 40 Thây Ma Cầm Xẻng</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => handleSelect('pvz')}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-neutral-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer rounded-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>TIẾN VÀO TRÒ CHƠI VẬN MỆNH QUỐC GIA</span>
          </button>
        </motion.div>
      </main>

      {/* Footer System Status */}
      <footer className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-900 pt-3 z-10 gap-2">
        <div>Hệ Thống Tự Động Lưu Dữ Liệu Riêng Biệt Cho Từng Thế Giới (Auto-Save Active)</div>
        <div className="text-cyan-500/80 font-bold">Ký Túc Xá Sinh Tồn RPG Engine v2.5</div>
      </footer>
    </div>
  );
};
