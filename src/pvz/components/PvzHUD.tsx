import React from 'react';
import { soundManager } from '../../utils/audio';
import { LiveComment } from '../types';
import {
  Sun,
  Zap,
  Globe,
  Tv,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
  Map,
  Activity,
  Dna
} from 'lucide-react';

interface PvzHUDProps {
  sunlight: number;
  energy: number;
  beastCores: number;
  playerLevel: number;
  currentWave: number;
  totalWaves: number;
  stageName: string;
  chapterTitle: string;
  isShovelActive: boolean;
  onToggleShovel: () => void;
  onOpenStageSelect: () => void;
  onOpenPathology: () => void;
  onOpenBroadcast: () => void;
  onOpenDaveShop: () => void;
  onOpenCompanions: () => void;
  onOpenTactics: () => void;
  onOpenCodex: () => void;
  onReturnToWorldSelect: () => void;
  currentComment: LiveComment;
}

export const PvzHUD: React.FC<PvzHUDProps> = ({
  sunlight,
  energy,
  beastCores,
  playerLevel,
  currentWave,
  totalWaves,
  stageName,
  chapterTitle,
  isShovelActive,
  onToggleShovel,
  onOpenStageSelect,
  onOpenPathology,
  onOpenBroadcast,
  onOpenDaveShop,
  onOpenCompanions,
  onOpenTactics,
  onOpenCodex,
  onReturnToWorldSelect,
  currentComment
}) => {
  return (
    <header className="w-full bg-neutral-950/95 border-b border-emerald-500/30 p-2 sm:p-2.5 font-mono select-none sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Top Row: Navigation + Resources + Live Info */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Return & Player Profile */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.play('click');
                onReturnToWorldSelect();
              }}
              className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-bold uppercase flex items-center gap-1.5 rounded-xs cursor-pointer transition-all shadow-sm"
              title="Quay lại chọn thế giới"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Thế Giới</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenStageSelect();
              }}
              className="flex items-center gap-2 bg-neutral-900 border border-emerald-500/50 hover:border-emerald-400 px-2.5 py-1 rounded-xs cursor-pointer text-left transition-all"
              title="Nhấn để mở Bản Đồ Chiến Dịch 7 Chương"
            >
              <div className="w-7 h-7 bg-emerald-950 border border-emerald-500 flex items-center justify-center text-sm font-black text-emerald-400">
                🗺️
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">Vòng 0{currentWave + 1}</span>
                  <span className="text-[9px] px-1 py-0.1 bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {stageName.split('&')[0]}
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 font-bold truncate max-w-[140px]">
                  {chapterTitle.split(':')[0]}
                </div>
              </div>
            </button>
          </div>

          {/* Center: Sunlight & Energy & Beast Cores Resources */}
          <div className="flex items-center gap-2.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xs shadow-inner text-xs">
            <div className="flex items-center gap-1 text-amber-300 font-black">
              <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>{sunlight}</span>
            </div>

            <div className="w-px h-3.5 bg-neutral-700" />

            <div className="flex items-center gap-1 text-cyan-300 font-black">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{energy}</span>
            </div>

            <div className="w-px h-3.5 bg-neutral-700" />

            <div className="flex items-center gap-1 text-fuchsia-300 font-black" title="Tinh Hạch Ma Thú từ Mèo Cam & Boss">
              <span>🔮</span>
              <span>{beastCores}</span>
            </div>

            <div className="w-px h-3.5 bg-neutral-700" />

            <button
              onClick={() => {
                soundManager.play('click');
                onToggleShovel();
              }}
              className={`px-2 py-0.5 text-xs font-bold flex items-center gap-1 rounded-xs border cursor-pointer transition-all ${
                isShovelActive
                  ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border-neutral-600'
              }`}
              title="Dùng xẻng đào bỏ cây"
            >
              <span>🛠️</span>
              <span className="hidden md:inline">Xẻng</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                soundManager.play('click');
                onOpenPathology();
              }}
              className="px-2 py-1 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Phân Tích Bệnh Lý & DNA Virus"
            >
              <span>🔬</span>
              <span className="hidden lg:inline">Bệnh Lý</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenDaveShop();
              }}
              className="px-2 py-1 bg-amber-950/70 hover:bg-amber-900 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Cửa Hàng Bác Sĩ Dave"
            >
              <span>👨‍🌾</span>
              <span className="hidden lg:inline">Cửa Hàng Dave</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenCompanions();
              }}
              className="px-2 py-1 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Đồng Đội Vĩnh Hằng Gia Viên & Đường Tướng Quân"
            >
              <span>👥</span>
              <span className="hidden lg:inline">Đồng Đội</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenTactics();
              }}
              className="px-2 py-1 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/50 text-purple-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Chiến Thuật Quân Đoàn"
            >
              <span>🎯</span>
              <span className="hidden lg:inline">Chiến Thuật</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenCodex();
              }}
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer"
              title="Bách Khoa Cốt Truyện 7 Chương"
            >
              <span>📖</span>
              <span className="hidden md:inline">Bách Khoa</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenBroadcast();
              }}
              className="px-2 py-1 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/60 text-rose-300 text-xs font-bold flex items-center gap-1.5 rounded-xs cursor-pointer shadow-[0_0_10px_rgba(225,29,72,0.2)]"
              title="Phòng phát sóng quốc gia"
            >
              <Tv className="w-3.5 h-3.5 text-rose-400" />
              <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
              <span className="hidden sm:inline">1.4 Tỷ Live</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Live Commentator Marquee Ticker */}
        <div className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-800/80 px-2.5 py-1 rounded-xs text-[11px] overflow-hidden">
          <div className="flex items-center gap-1 text-rose-400 font-black shrink-0 uppercase tracking-wider">
            <span>{currentComment.avatar}</span>
            <span>{currentComment.author}:</span>
          </div>
          <div className="text-neutral-300 truncate font-mono">
            "{currentComment.text}"
          </div>
        </div>
      </div>
    </header>
  );
};
