import React from 'react';
import { GameView, PlayerProfile } from '../types/game';
import { STORY_ARCS } from '../data/storyData';
import { sound } from '../utils/audio';

interface TopBarProps {
  player: PlayerProfile;
  currentView: GameView;
  isAudioMuted: boolean;
  onSelectView: (view: GameView) => void;
  onSelectArc: (arcId: number) => void;
  onToggleAudio: () => void;
  onReturnToWorldSelect?: () => void;
  onOpenAlmanac?: () => void;
  onOpenCrazyDaveShop?: () => void;
  onOpenMinigames?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  player,
  currentView,
  isAudioMuted,
  onSelectView,
  onSelectArc,
  onToggleAudio,
  onReturnToWorldSelect,
  onOpenAlmanac,
  onOpenCrazyDaveShop,
  onOpenMinigames
}) => {
  return (
    <header className="w-full bg-[#0a1a0f]/95 border-b border-emerald-800/50 sticky top-0 z-50 backdrop-blur-md px-3 py-2.5 md:px-6 md:py-3.5 select-none text-emerald-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Brand / Title */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3">
            {onReturnToWorldSelect && (
              <button
                onClick={onReturnToWorldSelect}
                className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/60 hover:border-emerald-400 text-emerald-300 text-xs font-bold rounded-lg flex items-center gap-1 shadow-md transition-all cursor-pointer"
                title="Quay lại Cổng Chọn Thế Giới"
              >
                <span>🌌</span>
                <span className="hidden sm:inline">Cổng Vũ Trụ</span>
              </button>
            )}
            <div className="bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] flex-shrink-0 text-xl">
              🌱
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black tracking-tight uppercase text-emerald-100 leading-tight">
                PvZ: Vận Mệnh Quốc Gia 2
              </h1>
              <p className="text-[10px] text-emerald-400 font-mono tracking-wider">
                TUYẾT MỘC • THẦN BÀI SÂN VƯỜN [BÍ CẢNH]
              </p>
            </div>
          </div>

          {/* Quick Audio Mute button on Mobile */}
          <button
            onClick={onToggleAudio}
            className="md:hidden p-2 rounded-xl bg-black/40 border border-emerald-700/40 text-sm"
          >
            {isAudioMuted ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Center: Bento Resource Stats Readout */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
          {/* Level */}
          <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-800/50 text-center min-w-[70px]">
            <p className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Cấp Độ</p>
            <p className="text-sm md:text-base font-black text-emerald-300">Lv.{player.level}</p>
          </div>

          {/* Diamonds 💎 (VIP Currency) */}
          <div className="bg-gradient-to-r from-blue-950/80 to-purple-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/60 text-center min-w-[80px] shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <p className="text-[9px] uppercase tracking-widest text-cyan-400 font-black">Kim Cương</p>
            <p className="text-sm md:text-base font-black text-cyan-200">💎 {player.diamonds}</p>
          </div>

          {/* Sunlight ☀️ */}
          <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-800/50 text-center min-w-[75px]">
            <p className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Mặt Trời</p>
            <p className="text-sm md:text-base font-black text-yellow-400">☀️ {player.sunlight}</p>
          </div>

          {/* Spirit Souls 🔮 */}
          <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-800/50 text-center min-w-[75px]">
            <p className="text-[9px] uppercase tracking-widest text-purple-400 font-bold">Tinh Hồn</p>
            <p className="text-sm md:text-base font-black text-purple-300">🔮 {player.spiritSouls}</p>
          </div>

          {/* Plant Food 🍃 */}
          <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-800/50 text-center min-w-[70px]">
            <p className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Hạt NL</p>
            <p className="text-sm md:text-base font-black text-emerald-300">🍃 {player.plantFood}/5</p>
          </div>
        </div>

        {/* Right: Navigation Tabs & Audio */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {[
            { view: 'stage_map' as GameView, label: 'Bản Đồ', icon: '🗺️' },
            { view: 'battle' as GameView, label: 'Sinh Tồn', icon: '⚔️' },
            { view: 'endless' as GameView, label: 'Vô Tận', icon: '🔥', highlight: 'border-red-500 text-red-300' },
            { view: 'gacha' as GameView, label: 'Chiêu Mộ', icon: '🔮', highlight: 'border-purple-400 text-purple-300' },
            { view: 'pass' as GameView, label: 'Battle Pass', icon: '🎫', highlight: 'border-amber-400 text-amber-300' },
            { view: 'shop' as GameView, label: 'Shop VIP', icon: '👑', highlight: 'border-yellow-400 text-yellow-300' },
            { view: 'story' as GameView, label: 'Truyện', icon: '📖' },
            { view: 'deck' as GameView, label: 'Trang Bị', icon: '🃏' },
            { view: 'camp' as GameView, label: 'Hậu Cứ', icon: '🏰' },
            { view: 'fusion' as GameView, label: 'Nhập Thể', icon: '🧬' }
          ].map((tab) => (
            <button
              key={tab.view}
              onClick={() => {
                sound.playClick();
                onSelectView(tab.view);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                currentView === tab.view
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_2px_10px_rgba(16,185,129,0.4)]'
                  : `bg-emerald-950/40 ${tab.highlight || 'text-emerald-300/80 border-emerald-800/40'} hover:text-white hover:bg-emerald-900/40`
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}

          {/* Quick PopCap Modal Buttons */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAlmanac?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-950/60 hover:bg-amber-900 border border-amber-500/60 text-amber-300 shadow-sm transition whitespace-nowrap"
            title="Tra Cứu Bách Khoa Toàn Thư Cây & Zombie"
          >
            <span>📖</span>
            <span className="hidden sm:inline">Almanac</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenCrazyDaveShop?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-yellow-950/80 hover:bg-yellow-900 border border-yellow-400 text-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.3)] transition whitespace-nowrap"
            title="Tiệm Tạp Hóa Crazy Dave"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Dave Shop</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenMinigames?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-purple-950/80 hover:bg-purple-900 border border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)] transition whitespace-nowrap"
            title="Phòng Chơi Mini-Games: Vasebreaker, Bowling, I Zombie"
          >
            <span>🎮</span>
            <span className="hidden sm:inline">Minigames</span>
          </button>

          {/* Desktop Audio Toggle */}
          <button
            onClick={onToggleAudio}
            className="hidden md:flex items-center justify-center p-2 rounded-xl bg-black/40 border border-emerald-800/50 text-sm hover:bg-emerald-900/30 transition text-emerald-300"
            title="Bật/Tắt Âm Thanh"
          >
            {isAudioMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>

      {/* Story Arc Quick Selector Bar (Visible when on Story/Battle View) */}
      {(currentView === 'story' || currentView === 'battle') && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-emerald-900/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-500 whitespace-nowrap">
            GIAI ĐOẠN:
          </span>
          {STORY_ARCS.map((arc) => {
            const isSelected = player.currentArcId === arc.id;
            const isCompleted = player.completedArcs.includes(arc.id);

            return (
              <button
                key={arc.id}
                onClick={() => {
                  sound.playClick();
                  onSelectArc(arc.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/50'
                    : 'bg-black/40 text-emerald-400/60 border-emerald-900/40 hover:text-emerald-200'
                }`}
              >
                <span>{isCompleted ? '✅' : '📍'}</span>
                <span>{arc.title}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
