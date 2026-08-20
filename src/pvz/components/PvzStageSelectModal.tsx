import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PVZ_WAVES, PVZ_PLANTS, PVZ_ZOMBIES } from '../data/pvzData';
import { PvzWave } from '../types';
import { Map, MapPin, CheckCircle2, Lock, Play, X, Shield, Award, Sparkles, Star, ChevronRight, ChevronLeft, Skull } from 'lucide-react';

interface PvzStageSelectModalProps {
  currentWaveIndex: number;
  maxUnlockedWave: number;
  onSelectWave: (waveIndex: number) => void;
  onClose: () => void;
}

const WORLD_MAP_THEMES = [
  {
    worldId: 0,
    name: 'THẾ GIỚI 1: ĐÔ THỊ TÂN THỦ',
    subtitle: 'Ancient Egypt Style • Đô Thị Khởi Nguyên',
    bgGradient: 'from-amber-950/80 via-neutral-950/95 to-emerald-950/80 border-amber-500/60',
    icon: '🏙️',
    color: 'text-amber-400',
    accentBg: 'bg-amber-950/60',
    borderColor: 'border-amber-500/50'
  },
  {
    worldId: 1,
    name: 'THẾ GIỚI 2: SIÊU THỊ TIỆN LỢI & NẮP CỐNG',
    subtitle: 'Pirate Seas Style • Chiến Trường Vùng Vịnh',
    bgGradient: 'from-orange-950/80 via-neutral-950/95 to-amber-950/80 border-orange-500/60',
    icon: '🏪',
    color: 'text-orange-400',
    accentBg: 'bg-orange-950/60',
    borderColor: 'border-orange-500/50'
  },
  {
    worldId: 2,
    name: 'THẾ GIỚI 3: HẦM TÀU ĐIỆN NGẦM THỨ 5',
    subtitle: 'Wild West Style • Đường Ray Huyết Nguyệt',
    bgGradient: 'from-cyan-950/80 via-neutral-950/95 to-blue-950/80 border-cyan-500/60',
    icon: '🚇',
    color: 'text-cyan-400',
    accentBg: 'bg-cyan-950/60',
    borderColor: 'border-cyan-500/50'
  },
  {
    worldId: 3,
    name: 'THẾ GIỚI 4: VIỆN NÔNG NGHIỆP LƯƠNG TỬ HỒ',
    subtitle: 'Far Future Style • Nhà Kính Công Nghệ Cao',
    bgGradient: 'from-emerald-950/80 via-neutral-950/95 to-teal-950/80 border-emerald-500/60',
    icon: '🧪',
    color: 'text-emerald-400',
    accentBg: 'bg-emerald-950/60',
    borderColor: 'border-emerald-500/50'
  },
  {
    worldId: 4,
    name: 'THẾ GIỚI 5: VƯỜN THỰC NGHIỆM BÀO TỬ',
    subtitle: 'Dark Ages Style • Vùng Dịch Biến Dị Tối Thượng',
    bgGradient: 'from-purple-950/80 via-neutral-950/95 to-fuchsia-950/80 border-purple-500/60',
    icon: '☣️',
    color: 'text-purple-400',
    accentBg: 'bg-purple-950/60',
    borderColor: 'border-purple-500/50'
  },
  {
    worldId: 5,
    name: 'THẾ GIỚI 6: ĐẠI CHIẾN SÂN VẬN ĐỘNG',
    subtitle: 'Big Wave Beach Style • Đấu Trường Sinh Tử',
    bgGradient: 'from-rose-950/80 via-neutral-950/95 to-red-950/80 border-rose-500/60',
    icon: '🏟️',
    color: 'text-rose-400',
    accentBg: 'bg-rose-950/60',
    borderColor: 'border-rose-500/50'
  },
  {
    worldId: 6,
    name: 'THẾ GIỚI 7: PHÁO ĐÀI QUỐC VẬN BẤT DIỆT',
    subtitle: 'Modern Day Boss Realm • Trận Chiến Đỉnh Cao',
    bgGradient: 'from-yellow-950/80 via-neutral-950/95 to-amber-950/80 border-yellow-400/80',
    icon: '🏰',
    color: 'text-yellow-300',
    accentBg: 'bg-yellow-950/60',
    borderColor: 'border-yellow-400/70'
  }
];

export const PvzStageSelectModal: React.FC<PvzStageSelectModalProps> = ({
  currentWaveIndex,
  maxUnlockedWave,
  onSelectWave,
  onClose
}) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(currentWaveIndex);

  const selectedWave = PVZ_WAVES[selectedNodeIndex] || PVZ_WAVES[0];
  const selectedTheme = WORLD_MAP_THEMES[selectedNodeIndex % WORLD_MAP_THEMES.length];
  const isSelectedUnlocked = selectedNodeIndex <= maxUnlockedWave;
  const isSelectedPassed = selectedNodeIndex < maxUnlockedWave;

  // Extract preview zombies from wave spawns
  const uniqueZombieIds = Array.from(new Set(selectedWave.zombieSpawns.map((s) => s.zombieId)));
  const previewZombies = uniqueZombieIds.map((zid) => PVZ_ZOMBIES[zid]).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className={`w-full max-w-5xl bg-neutral-950 border-2 ${selectedTheme.borderColor} p-3 sm:p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[92vh] relative rounded-xs bg-gradient-to-b ${selectedTheme.bgGradient}`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/90 pb-2.5 mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-neutral-900 border border-amber-500 flex items-center justify-center text-xl rounded-xs shadow-md">
              🗺️
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-black text-white uppercase flex items-center gap-2 tracking-wider">
                <span>BẢN ĐỒ THẾ GIỚI CHIẾN DỊCH (PVZ2 WORLD MAP)</span>
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-400">
                Hành trình Vận Mệnh Quốc Gia qua 7 Thế Giới tàn tích Isekai
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.play('click');
              onClose();
            }}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer rounded-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PvZ2 World Path Node Map Progression */}
        <div className="bg-neutral-950/90 border border-neutral-800 p-3 rounded-xs mb-3 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tiến Trình Phiêu Lưu: {maxUnlockedWave + 1} / {PVZ_WAVES.length} Thế Giới Đã Mở</span>
            </span>
            <span className="text-[11px] text-neutral-400 font-bold">
              Nhấp vào Node để xem chi tiết
            </span>
          </div>

          {/* Connected World Nodes Track */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto py-2 px-1">
            {PVZ_WAVES.map((wave, idx) => {
              const isUnlocked = idx <= maxUnlockedWave;
              const isSelected = idx === selectedNodeIndex;
              const isCurrent = idx === currentWaveIndex;
              const isPassed = idx < maxUnlockedWave;
              const theme = WORLD_MAP_THEMES[idx % WORLD_MAP_THEMES.length];

              return (
                <React.Fragment key={wave.waveNumber}>
                  {/* Stage Node */}
                  <motion.button
                    whileHover={{ scale: isUnlocked ? 1.08 : 1.0 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      soundManager.play('click');
                      setSelectedNodeIndex(idx);
                    }}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-xs border-2 transition-all cursor-pointer min-w-[70px] sm:min-w-[95px] ${
                      isSelected
                        ? `${theme.borderColor} ${theme.accentBg} ring-2 ring-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]`
                        : isCurrent
                        ? 'bg-emerald-950/80 border-emerald-400'
                        : isUnlocked
                        ? 'bg-neutral-900 border-neutral-700 hover:border-neutral-500'
                        : 'bg-neutral-950/80 border-neutral-800 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {/* Stars Badge for cleared worlds */}
                    <div className="flex items-center gap-0.5 text-[8px] sm:text-[10px] text-amber-400 mb-1">
                      {isPassed ? (
                        <>
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                        </>
                      ) : isCurrent ? (
                        <span className="text-[9px] text-emerald-300 font-black animate-pulse">ĐANG ĐẤU</span>
                      ) : (
                        <span className="text-[9px] text-neutral-600">CHƯA QUA</span>
                      )}
                    </div>

                    {/* Node Center Icon */}
                    <div className="text-xl sm:text-2xl my-0.5">
                      {!isUnlocked ? '🔒' : isPassed ? '⭐' : theme.icon}
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-black text-white mt-0.5">
                      W{wave.waveNumber}
                    </div>

                    <div className="text-[8px] sm:text-[9px] text-neutral-400 truncate max-w-[65px] sm:max-w-[85px] text-center">
                      {wave.stageName.split(' ')[0]}
                    </div>
                  </motion.button>

                  {/* Connecting Line between nodes */}
                  {idx < PVZ_WAVES.length - 1 && (
                    <div
                      className={`h-1 flex-1 min-w-[12px] sm:min-w-[20px] rounded-full transition-all ${
                        idx < maxUnlockedWave ? 'bg-gradient-to-r from-amber-400 to-emerald-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-neutral-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected World Stage Detail Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 overflow-y-auto">
          {/* Left 2 Cols: World Details & Info */}
          <div className="md:col-span-2 bg-neutral-950/80 border border-neutral-800 p-3 sm:p-4 rounded-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-amber-950 border border-amber-600 text-amber-300 text-[10px] font-black uppercase rounded-xs">
                  {selectedWave.chapterTitle.split(':')[0]}
                </span>
                <span className="text-xs font-bold text-neutral-400">
                  Thời lượng: {selectedWave.totalDurationSec} giây
                </span>
              </div>

              <h4 className="text-sm sm:text-lg font-black text-white mb-1 flex items-center gap-2">
                <span>{selectedTheme.icon}</span>
                <span>{selectedWave.name}</span>
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-bold mb-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>{selectedWave.stageName}</span>
              </div>

              <p className="text-xs text-neutral-300 bg-neutral-900/90 border border-neutral-800/80 p-2.5 rounded-xs leading-relaxed mb-3">
                {selectedWave.description}
              </p>

              {/* National Rewards Preview */}
              <div className="border-t border-neutral-800/80 pt-2 mb-3">
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block mb-1.5">
                  🏆 Phần Thưởng Quốc Vận Khi Vượt Màn:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-emerald-950/40 border border-emerald-600/40 p-2 rounded-xs flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[10px] text-neutral-400">Lãnh Thổ Hoa Quốc</div>
                      <div className="font-black text-emerald-300">+{selectedWave.nationalReward.territoryBonusKm2} km²</div>
                    </div>
                  </div>
                  <div className="bg-cyan-950/40 border border-cyan-600/40 p-2 rounded-xs flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-[10px] text-neutral-400">Thể Chất Toàn Dân</div>
                      <div className="font-black text-cyan-300">+{selectedWave.nationalReward.statBonusPct}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Wave Button */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              {isSelectedUnlocked ? (
                <button
                  onClick={() => {
                    soundManager.play('victory');
                    onSelectWave(selectedNodeIndex);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.6)] cursor-pointer transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{selectedNodeIndex === currentWaveIndex ? 'TIẾP TỤC CHIẾN ĐẤU' : 'TIẾN CÔNG MÀN NÀY'}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs text-neutral-500 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xs">
                  <Lock className="w-4 h-4" />
                  <span>CẦN VƯỢT THẾ GIỚI {selectedNodeIndex} ĐỂ MỞ KHÓA</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Col: Zombie Threat Lineup in this Stage */}
          <div className="bg-neutral-950/80 border border-neutral-800 p-3 sm:p-4 rounded-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-rose-400 uppercase tracking-wider mb-2">
                <Skull className="w-4 h-4" />
                <span>Đội Hình Quái Vật Xuất Hiện ({previewZombies.length})</span>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[220px] pr-1">
                {previewZombies.map((zombie) => (
                  <div
                    key={zombie.id}
                    className={`p-2 bg-neutral-900/90 border rounded-xs flex items-center gap-2.5 ${
                      zombie.isBoss ? 'border-rose-500/60 bg-rose-950/20' : 'border-neutral-800'
                    }`}
                  >
                    <span className="text-2xl">{zombie.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black text-white truncate flex items-center gap-1">
                        <span>{zombie.name}</span>
                        {zombie.isBoss && <span className="text-[9px] px-1 bg-rose-600 text-white rounded-xs">BOSS</span>}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate">{zombie.title}</div>
                      <div className="text-[10px] text-amber-300 mt-0.5">HP: {zombie.maxHp} • Dmg: {zombie.attackDmg}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-neutral-500 text-center mt-2 pt-2 border-t border-neutral-800/80">
              💡 Mẹo: Dùng Bách Khoa Cốt Truyện để xem khắc chế từng loại Zombie!
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
