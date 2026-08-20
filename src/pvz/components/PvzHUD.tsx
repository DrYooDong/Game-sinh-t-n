import React from 'react';
import { soundManager } from '../../utils/audio';
import { LiveComment, SurvivalStats, WavePhase } from '../types';
import {
  Sun,
  Zap,
  RotateCcw,
  Sparkles,
  Shield,
  Activity,
  Tent,
  Tv,
  Crosshair,
  Award,
  BookOpen,
  ShoppingBag
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
  // Plant Food & Tools
  plantFoodCount: number;
  maxPlantFood: number;
  isPlantFoodPrimed: boolean;
  onTogglePlantFood: () => void;
  hasWateringCan: boolean;
  isWateringCanActive: boolean;
  onToggleWateringCan: () => void;
  isPossessionMode: boolean;
  onTogglePossession: () => void;
  // Modals
  onOpenStageSelect: () => void;
  onOpenPathology: () => void;
  onOpenBroadcast: () => void;
  onOpenDaveShop: () => void;
  onOpenCompanions: () => void;
  onOpenSurvivalCamp: () => void;
  onOpenTactics: () => void;
  onOpenCodex: () => void;
  onReturnToWorldSelect: () => void;
  currentComment: LiveComment;
  // Wave Progress
  waveProgressPct: number;
  currentPhaseTitle?: string;
  phases?: WavePhase[];
  survivalStats: SurvivalStats;
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
  plantFoodCount,
  maxPlantFood,
  isPlantFoodPrimed,
  onTogglePlantFood,
  hasWateringCan,
  isWateringCanActive,
  onToggleWateringCan,
  isPossessionMode,
  onTogglePossession,
  onOpenStageSelect,
  onOpenPathology,
  onOpenBroadcast,
  onOpenDaveShop,
  onOpenCompanions,
  onOpenSurvivalCamp,
  onOpenTactics,
  onOpenCodex,
  onReturnToWorldSelect,
  currentComment,
  waveProgressPct,
  currentPhaseTitle,
  phases = [],
  survivalStats
}) => {
  return (
    <header className="w-full bg-neutral-950/95 border-b-2 border-emerald-500/40 p-2 sm:p-2.5 font-mono select-none sticky top-0 z-30 backdrop-blur-md shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Top Row: Navigation + Resources + Combat Tools */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Return & World Map Stage Button */}
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
              className="flex items-center gap-2 bg-gradient-to-r from-neutral-900 to-emerald-950 border border-emerald-500 hover:border-emerald-300 px-2.5 py-1 rounded-xs cursor-pointer text-left transition-all shadow-[0_0_10px_rgba(16,185,129,0.25)] group"
              title="Nhấn để mở Bản Đồ Thế Giới PvZ2"
            >
              <div className="w-7 h-7 bg-emerald-950 border border-emerald-400 flex items-center justify-center text-sm font-black text-emerald-300 group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">Thế Giới 0{currentWave + 1}</span>
                  <span className="text-[9px] px-1 py-0.1 bg-emerald-950 text-emerald-300 border border-emerald-700">
                    {stageName.split('&')[0]}
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 font-bold truncate max-w-[130px]">
                  {chapterTitle.split(':')[0]}
                </div>
              </div>
            </button>
          </div>

          {/* Center Resources: Sunlight, Energy, Beast Cores */}
          <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-3 py-1 rounded-xs shadow-inner text-xs">
            {/* Sun Counter with golden glow */}
            <div className="flex items-center gap-1.5 text-amber-300 font-black" title="Ánh Nắng">
              <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-sm font-black text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">{sunlight}</span>
            </div>

            <div className="w-px h-3.5 bg-neutral-700" />

            <div className="flex items-center gap-1 text-cyan-300 font-black" title="Năng Lượng Di Tích">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{energy}</span>
            </div>

            <div className="w-px h-3.5 bg-neutral-700" />

            <div className="flex items-center gap-1 text-fuchsia-300 font-black" title="Tinh Hạch Ma Thú">
              <span>🔮</span>
              <span>{beastCores}</span>
            </div>

            <div className="w-px h-3.5 bg-neutral-700" />

            {/* Shovel */}
            <button
              onClick={() => {
                soundManager.play('click');
                onToggleShovel();
              }}
              className={`px-2 py-0.5 text-xs font-bold flex items-center gap-1 rounded-xs border cursor-pointer transition-all ${
                isShovelActive
                  ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_10px_rgba(225,29,72,0.6)] animate-pulse'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border-neutral-600'
              }`}
              title="Dùng xẻng đào bỏ cây"
            >
              <span>🛠️</span>
            </button>
          </div>

          {/* Combat Tools: Plant Food + Golden Watering Can + Possession */}
          <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 p-1 rounded-xs">
            {/* Plant Food Slot Button */}
            <button
              disabled={plantFoodCount <= 0}
              onClick={() => {
                soundManager.play('level_up');
                onTogglePlantFood();
              }}
              className={`px-2.5 py-1 text-xs font-black flex items-center gap-1.5 rounded-xs border transition-all cursor-pointer ${
                isPlantFoodPrimed
                  ? 'bg-emerald-600 text-white border-emerald-300 ring-2 ring-emerald-400 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                  : plantFoodCount > 0
                  ? 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-600 cursor-not-allowed opacity-50'
              }`}
              title="Hạt Năng Lượng: Nhấp rồi chọn cây để kích hoạt Chiêu Cuối!"
            >
              <span className="text-sm">⚡🌿</span>
              <span>{plantFoodCount}/{maxPlantFood}</span>
            </button>

            {/* Golden Watering Can */}
            {hasWateringCan && (
              <button
                onClick={() => {
                  soundManager.play('click');
                  onToggleWateringCan();
                }}
                className={`px-2 py-1 text-xs font-black flex items-center gap-1 rounded-xs border transition-all cursor-pointer ${
                  isWateringCanActive
                    ? 'bg-cyan-600 text-white border-cyan-300 ring-2 ring-cyan-400 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                    : 'bg-cyan-950/80 hover:bg-cyan-900 border-cyan-500/60 text-cyan-300'
                }`}
                title="Bình Tưới Vàng: Hồi phục 100% HP và tăng 50% tốc đánh cho cây!"
              >
                <span>🫖✨</span>
              </button>
            )}

            {/* Possession Mode */}
            <button
              onClick={() => {
                soundManager.play('attack');
                onTogglePossession();
              }}
              className={`px-2 py-1 text-xs font-black flex items-center gap-1 rounded-xs border transition-all cursor-pointer ${
                isPossessionMode
                  ? 'bg-red-600 text-white border-red-300 ring-2 ring-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]'
                  : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-600 text-neutral-300'
              }`}
              title="Chế Độ Nhập Thể: Tuyết Mộc trực tiếp ngắm bắn súng Laze thủ công!"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nhập Thể</span>
            </button>
          </div>

          {/* Right Action Modals */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                soundManager.play('click');
                onOpenSurvivalCamp();
              }}
              className="px-2 py-1 bg-teal-950/80 hover:bg-teal-900 border border-teal-500/60 text-teal-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Trại Sinh Tồn Vĩnh Hằng Gia Viên & Phân Công Đồng Đội"
            >
              <Tent className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Trại Sinh Tồn</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenDaveShop();
              }}
              className="px-2 py-1 bg-amber-950/70 hover:bg-amber-900 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Cửa Hàng Bác Sĩ Dave & Mở Rộng Đất"
            >
              <span>👨‍🌾</span>
              <span className="hidden lg:inline">Cửa Hàng</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenCompanions();
              }}
              className="px-2 py-1 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Đồng Đội Vĩnh Hằng Gia Viên"
            >
              <span>👥</span>
              <span className="hidden lg:inline">Đồng Đội</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenPathology();
              }}
              className="px-2 py-1 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Phân Tích Bệnh Lý Virus"
            >
              <span>🔬</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenTactics();
              }}
              className="px-2 py-1 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/50 text-purple-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer shadow-sm"
              title="Chiến Thuật"
            >
              <span>🎯</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenCodex();
              }}
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-bold flex items-center gap-1 rounded-xs cursor-pointer"
              title="Bách Khoa Cốt Truyện"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                soundManager.play('click');
                onOpenBroadcast();
              }}
              className="px-2 py-1 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/60 text-rose-300 text-xs font-bold flex items-center gap-1.5 rounded-xs cursor-pointer shadow-[0_0_10px_rgba(225,29,72,0.3)]"
              title="Phòng phát sóng quốc gia 1.4 tỷ người"
            >
              <Tv className="w-3.5 h-3.5 text-rose-400" />
              <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
              <span className="hidden sm:inline">1.4 Tỷ Live</span>
            </button>
          </div>
        </div>

        {/* Middle Row: Classic PvZ2 Wave Progress Bar with Moving Zombie Head & Flag Pins */}
        <div className="flex items-center gap-3 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-xs text-xs shadow-inner">
          <span className="text-[11px] font-bold text-neutral-400 shrink-0 uppercase tracking-wider flex items-center gap-1">
            <span>Tiến Trình:</span>
            {currentPhaseTitle && (
              <span className="text-amber-400 font-bold max-w-[180px] truncate">
                [{currentPhaseTitle}]
              </span>
            )}
          </span>

          {/* Progress Bar with PvZ2 Flag Indicators and Moving Zombie Head */}
          <div className="flex-1 h-3.5 bg-neutral-950 border border-neutral-700 rounded-full overflow-visible relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, waveProgressPct))}%` }}
            />

            {/* Moving Zombie Head Tracker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-sm drop-shadow-[0_0_6px_rgba(239,68,68,0.8)] transition-all duration-300"
              style={{ left: `${Math.min(98, Math.max(2, waveProgressPct))}%` }}
              title="Vị trí quái vật"
            >
              🧟
            </div>

            {/* Wave Flag Indicators on the bar */}
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none text-[9px] font-bold">
              <span className="text-neutral-500">Bắt Đầu</span>
              <span className="text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">🚩 Đợt 1</span>
              <span className="text-rose-400 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">🦁 Boss Wave</span>
            </div>
          </div>

          <div className="text-[11px] font-black text-white shrink-0">
            {Math.round(waveProgressPct)}%
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
