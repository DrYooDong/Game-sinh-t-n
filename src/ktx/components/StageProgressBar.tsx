import React from 'react';
import { StagePhase } from '../types';
import { ShieldAlert, Flame, Calendar, Sparkles, Skull, Info, Clock, AlertTriangle } from 'lucide-react';
import { Language, t } from '../utils/i18n';

interface StageProgressBarProps {
  currentStage: StagePhase;
  currentDay: number;
  onOpenStageDetails: () => void;
  lang?: Language;
}

export const StageProgressBar: React.FC<StageProgressBarProps> = ({
  currentStage,
  currentDay,
  onOpenStageDetails,
  lang = 'vi'
}) => {
  // Calculate progress in current stage
  const daysInStage = currentStage.maxDay - currentStage.minDay + 1;
  const daysPassed = Math.min(daysInStage, currentDay - currentStage.minDay + 1);
  const progressPercent = Math.min(100, Math.max(5, (daysPassed / daysInStage) * 100));

  const getDangerBadge = (level: number) => {
    switch (level) {
      case 1:
        return {
          text: lang === 'vi' ? 'CẤP 1 - TÂN THỦ THÍCH NGHI' : 'TIER 1 - ADAPTATION',
          color: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
        };
      case 2:
        return {
          text: lang === 'vi' ? 'CẤP 2 - BIẾN DỊ & KHAN HIẾM' : 'TIER 2 - SCARCITY & MUTATION',
          color: 'bg-amber-950/40 text-amber-400 border-amber-500/40'
        };
      case 3:
      case 4:
        return {
          text: lang === 'vi' ? 'CẤP 4 - HUYẾT NGUYỆT ĐỘT BIẾN' : 'TIER 4 - CRIMSON BLOOD MOON',
          color: 'bg-rose-950/40 text-rose-400 border-rose-500/40'
        };
      case 5:
      default:
        return {
          text: lang === 'vi' ? 'CẤP 5 - CỔNG THỜI KHÔNG BÙNG PHÁT' : 'TIER 5 - SPATIAL RIFT OUTBREAK',
          color: 'bg-purple-950/40 text-purple-400 border-purple-500/40'
        };
    }
  };

  const badge = getDangerBadge(currentStage.dangerLevel);

  return (
    <div className="w-full bg-neutral-900/80 border border-neutral-800 p-2.5 sm:p-3 relative overflow-hidden font-mono">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-800 pb-2 mb-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neutral-800 border border-cyan-500/40 rounded-sm flex items-center justify-center text-cyan-400 font-bold text-sm">
            0{currentStage.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {currentStage.name}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-sm border uppercase ${badge.color}`}>
                {badge.text}
              </span>
            </div>
            <p className="text-[10px] text-neutral-400">
              {lang === 'vi' ? 'Khung thời gian' : 'Timeframe'}: <span className="text-neutral-200">{currentStage.timeFrame}</span> | {lang === 'vi' ? 'Mức nguy hiểm' : 'Danger'}: <span className="text-rose-400">{'★'.repeat(currentStage.dangerLevel)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-[10px] px-2 py-0.5 bg-amber-950/30 border border-amber-500/30 text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{lang === 'vi' ? 'Thưởng rơi đồ' : 'Loot Bonus'}: +{(currentStage.bonusLootMultiplier * 100 - 100).toFixed(0)}%</span>
          </div>

          <button
            onClick={onOpenStageDetails}
            className="text-[10px] px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-all cursor-pointer"
          >
            <Info className="w-3 h-3" /> {lang === 'vi' ? 'Chi tiết giai đoạn' : 'Stage Details'}
          </button>
        </div>
      </div>

      {/* Progress Bar (High Density Style) */}
      <div className="space-y-1 mb-2">
        <div className="flex justify-between text-[10px] text-neutral-400">
          <span>{lang === 'vi' ? `TIẾN ĐỘ GIAI ĐOẠN (${t('app.day', lang)} ${currentDay})` : `STAGE PROGRESS (${t('app.day', lang)} ${currentDay})`}</span>
          <span className="text-cyan-400">
            {currentDay <= currentStage.maxDay
              ? (lang === 'vi' ? `CÒN ${currentStage.maxDay - currentDay + 1} NGÀY TỚI ĐỢT BIẾN CỐ MỚI` : `${currentStage.maxDay - currentDay + 1} DAYS UNTIL NEXT DISASTER WAVE`)
              : (lang === 'vi' ? 'ĐÃ ĐẠT ĐỈNH ĐIỂM GIAI ĐOẠN' : 'REACHED STAGE CLIMAX')}
          </span>
        </div>
        <div className="h-2 bg-neutral-950 rounded-full border border-neutral-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              currentStage.id >= 3
                ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]'
                : currentStage.id === 2
                ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Upcoming Event Alert Banner (High Density Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-1.5 bg-red-950/20 border-l-2 border-red-600 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0" />
          <span className="text-red-400 font-bold uppercase">{lang === 'vi' ? 'Sự kiện sắp tới:' : 'Upcoming Event:'}</span>
          <span className="text-neutral-300">{currentStage.worldEvent}</span>
        </div>
        <div className="flex items-center gap-3 text-neutral-400 shrink-0">
          <span>{lang === 'vi' ? 'Đột biến' : 'Mutations'}: <strong className="text-neutral-200">{currentStage.zombieMutations.join(', ')}</strong></span>
          <span>{lang === 'vi' ? 'Trùm' : 'Boss'}: <strong className="text-rose-400">{currentStage.stageBoss}</strong></span>
        </div>
      </div>
    </div>
  );
};
