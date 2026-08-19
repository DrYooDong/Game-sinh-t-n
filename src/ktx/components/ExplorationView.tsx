import React from 'react';
import { LocationArea, StagePhase } from '../types';
import { soundManager } from '../utils/audio';
import {
  Compass,
  Search,
  Swords,
  Shield,
  BedDouble,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
  Heart,
  ShieldAlert,
  BookOpen
} from 'lucide-react';

interface ExplorationViewProps {
  locations: LocationArea[];
  currentLocationId: string;
  onSelectLocation: (locId: string) => void;
  onScavenge: (loc: LocationArea) => void;
  onFightZombie: (loc: LocationArea) => void;
  onRestInRoom: () => void;
  onOpenDefense: () => void;
  onOpenCodex: () => void;
  currentStage: StagePhase;
  stamina: number;
  foodCount: number;
  waterCount: number;
}

export const ExplorationView: React.FC<ExplorationViewProps> = ({
  locations,
  currentLocationId,
  onSelectLocation,
  onScavenge,
  onFightZombie,
  onRestInRoom,
  onOpenDefense,
  onOpenCodex,
  currentStage,
  stamina,
  foodCount,
  waterCount
}) => {
  const currentLoc = locations.find((l) => l.id === currentLocationId) || locations[0];

  const getDangerStars = (danger: number) => {
    return '★'.repeat(danger);
  };

  return (
    <div className="space-y-3 font-mono">
      {/* 1. Active Location Card (Tactical Exploration HUD) */}
      <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-sm shadow-md relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-rose-500 to-transparent"></div>

        {/* Location Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-950 border-2 border-cyan-500 rounded-sm flex items-center justify-center text-3xl shadow-[0_0_10px_rgba(6,182,212,0.3)] shrink-0">
              {currentLoc.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold px-2 py-0.5 uppercase rounded-xs">
                  {currentLoc.floor}
                </span>
                <h3 className="text-base font-black text-white uppercase tracking-wide">
                  {currentLoc.name}
                </h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                {currentLoc.description}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-neutral-400 shrink-0 bg-neutral-950 px-3 py-1.5 border border-neutral-800 rounded-xs">
            <div>Độ nguy hiểm: <span className="text-rose-400 font-black tracking-widest">{getDangerStars(currentLoc.danger)}</span></div>
            <div>Tiến độ khám phá: <span className="text-cyan-400 font-black">{currentLoc.exploredPercentage}%</span></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 mb-3">
          <div className="h-2 bg-neutral-950 rounded-sm border border-neutral-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300"
              style={{ width: `${currentLoc.exploredPercentage}%` }}
            />
          </div>
        </div>

        {/* Possible drops & Threats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-neutral-950 p-3 border border-neutral-800 rounded-xs mb-4">
          <div>
            <span className="text-neutral-500 uppercase font-bold block mb-1 text-[10px]">Chiến lợi phẩm có thể nhặt:</span>
            <div className="text-amber-300 font-bold leading-relaxed">{currentLoc.possibleLoots.join(' • ')}</div>
          </div>
          <div>
            <span className="text-neutral-500 uppercase font-bold block mb-1 text-[10px]">Xác sống thường gặp:</span>
            <div className="text-rose-400 font-bold leading-relaxed">{currentLoc.zombieTypes.join(' • ')}</div>
          </div>
        </div>

        {/* Action Controls for Current Location */}
        <div>
          {currentLoc.id === 'loc_room_304' ? (
            /* Safe Room Rest Action */
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                id="btn_rest_safe_room"
                onClick={onRestInRoom}
                className="w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-widest border-b-4 border-emerald-900 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)] rounded-xs"
              >
                <BedDouble className="w-5 h-5" />
                <span>Nghỉ Ngơi Qua Ngày (Hồi Phục Sinh Lực)</span>
              </button>
              <div className="text-xs text-neutral-300 bg-neutral-950 px-3.5 py-2.5 border border-neutral-800 shrink-0 rounded-xs">
                Tiêu hao: <strong className="text-amber-300">1 Thức Ăn ({foodCount})</strong> + <strong className="text-cyan-300">1 Nước ({waterCount})</strong>
              </div>
            </div>
          ) : (
            /* Scavenge & Combat Actions */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="btn_scavenge_location"
                disabled={stamina < 15}
                onClick={() => {
                  soundManager.play('click');
                  onScavenge(currentLoc);
                }}
                className={`py-3 px-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 border-b-4 transition-all rounded-xs ${
                  stamina >= 15
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-cyan-900 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Lục Soát Tài Nguyên (-15 SP)</span>
              </button>

              <button
                id="btn_fight_zombie"
                disabled={stamina < 10}
                onClick={() => {
                  soundManager.play('click');
                  onFightZombie(currentLoc);
                }}
                className={`py-3 px-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 border-b-4 transition-all rounded-xs ${
                  stamina >= 10
                    ? 'bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-600 hover:to-red-500 text-white border-rose-950 cursor-pointer shadow-[0_0_12px_rgba(225,29,72,0.4)]'
                    : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>Săn Zombie & Diệt Quái (-10 SP)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Strategic Centers Quick Access Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => {
            soundManager.play('click');
            onOpenDefense();
          }}
          className="p-3 bg-neutral-900/90 hover:bg-cyan-950/40 border border-neutral-800 hover:border-cyan-500/60 text-left flex items-center gap-3 cursor-pointer transition-all shadow-md rounded-sm group"
        >
          <div className="w-10 h-10 bg-neutral-950 border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0 rounded-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-cyan-300">Phòng Tuyến & Đêm Sóng Quái</div>
            <div className="text-xs text-neutral-400 mt-0.5">Nâng cấp tháp UV, bẫy điện & thủ đài ban đêm</div>
          </div>
        </button>

        <button
          onClick={() => {
            soundManager.play('click');
            onOpenCodex();
          }}
          className="p-3 bg-neutral-900/90 hover:bg-indigo-950/40 border border-neutral-800 hover:border-indigo-500/60 text-left flex items-center gap-3 cursor-pointer transition-all shadow-md rounded-sm group"
        >
          <div className="w-10 h-10 bg-neutral-950 border border-indigo-500/40 group-hover:border-indigo-400 flex items-center justify-center text-indigo-400 shrink-0 rounded-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-indigo-300">Bách Khoa KTX & Nhật Ký</div>
            <div className="text-xs text-neutral-400 mt-0.5">Tra cứu điểm yếu zombie & giải mã thế giới</div>
          </div>
        </button>
      </div>

      {/* 2. 7 Floors Dormitory Selector */}
      <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-sm shadow-md">
        <div className="flex justify-between items-center text-xs font-bold text-cyan-400 uppercase border-b border-neutral-800 pb-2 mb-3">
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" /> Bản Đồ 7 Tầng Ký Túc Xá Sinh Tồn
          </span>
          <span className="text-xs text-neutral-400 font-normal">Nhấp để di chuyển khu vực</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {locations.map((loc) => {
            const isCurrent = loc.id === currentLocationId;
            return (
              <div
                key={loc.id}
                onClick={() => {
                  soundManager.play('click');
                  onSelectLocation(loc.id);
                }}
                className={`p-3 border transition-all cursor-pointer flex items-center justify-between gap-3 rounded-xs ${
                  isCurrent
                    ? 'bg-cyan-950/50 border-l-4 border-cyan-400 border-neutral-700 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-2xl">{loc.icon}</span>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-cyan-400 uppercase font-bold">{loc.floor}</span>
                      <span className="text-xs sm:text-sm font-bold text-white truncate">{loc.name}</span>
                    </div>
                    <div className="text-xs text-neutral-400 truncate mt-0.5">
                      Nguy hiểm: <span className="text-rose-400 font-bold">{getDangerStars(loc.danger)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-xs ${
                    loc.exploredPercentage >= 100
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    {loc.exploredPercentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
