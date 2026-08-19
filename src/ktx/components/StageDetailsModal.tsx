import React from 'react';
import { motion } from 'motion/react';
import { STAGES } from '../data/initialData';
import { soundManager } from '../utils/audio';
import { Calendar, Swords, X, Skull, CheckCircle2 } from 'lucide-react';

interface StageDetailsModalProps {
  currentStageId: number;
  currentDay: number;
  onClose: () => void;
  onChallengeStageBoss?: (stageId: number) => void;
}

export const StageDetailsModal: React.FC<StageDetailsModalProps> = ({
  currentStageId,
  currentDay,
  onClose,
  onChallengeStageBoss
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-cyan-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter shadow-md">
          Tiến Trình 5 Giai Đoạn & Đột Phá Cốt Truyện
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-neutral-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Các Giai Đoạn Tiến Hóa Thế Giới (Vòng 1 - 5)
              </h3>
              <p className="text-xs text-neutral-400">
                Đánh bại Trùm Giai Đoạn để mở khóa cốt truyện tiếp theo, tăng tỉ lệ rơi đồ và nhận Thần Khảm
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.play('click');
              onClose();
            }}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stages List */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 max-h-[62vh]">
          {STAGES.map((stage) => {
            const isCurrent = stage.id === currentStageId;
            const isPast = stage.id < currentStageId;

            return (
              <div
                key={stage.id}
                className={`p-3.5 border transition-all rounded-xs ${
                  isCurrent
                    ? 'bg-neutral-900/90 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : isPast
                    ? 'bg-neutral-950/60 border-neutral-800 opacity-70'
                    : 'bg-neutral-950 border-neutral-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-xs border flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? 'bg-cyan-500 text-neutral-950 border-cyan-400 font-black'
                        : isPast
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}>
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : `0${stage.id}`}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase flex items-center gap-2">
                        <span>{stage.name}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 bg-cyan-950 border border-cyan-500/60 text-cyan-300 text-[10px] font-bold animate-pulse">
                            ĐANG DIỄN RA
                          </span>
                        )}
                      </h4>
                      <div className="text-xs text-neutral-400">{stage.timeFrame} (Ngày {stage.minDay} - {stage.maxDay})</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-rose-400">Nguy hiểm: {'★'.repeat(stage.dangerLevel)}</span>
                    <span className="text-amber-300 font-bold">Thưởng: +{(stage.bonusLootMultiplier * 100 - 100).toFixed(0)}%</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 mb-2.5 leading-relaxed bg-neutral-950/60 p-2 border border-neutral-800 rounded-xs">
                  {stage.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-neutral-950 p-2.5 border border-neutral-800 rounded-xs mb-2.5">
                  <div>
                    <span className="text-rose-400 uppercase font-bold block mb-1 text-[10px]">Sự Kiện & Trùm Giai Đoạn:</span>
                    <div className="text-neutral-300">{stage.worldEvent} • Trùm: <strong className="text-rose-400 font-bold">{stage.stageBoss}</strong></div>
                  </div>
                  <div>
                    <span className="text-cyan-400 uppercase font-bold block mb-1 text-[10px]">Đột Biến Quái Vật:</span>
                    <div className="text-neutral-300">{stage.zombieMutations.join(', ')}</div>
                  </div>
                </div>

                {/* Challenge Boss Action for Active or Re-challenge */}
                {onChallengeStageBoss && (
                  <div className="flex justify-end pt-1">
                    {isCurrent ? (
                      <button
                        onClick={() => {
                          soundManager.play('danger');
                          onClose();
                          onChallengeStageBoss(stage.id);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-600 hover:to-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.4)] cursor-pointer transition-all rounded-xs"
                      >
                        <Swords className="w-4 h-4" />
                        <span>KHIÊU CHIẾN TRÙM GIAI ĐOẠN ĐỂ ĐỘT PHÁ CỐT TRUYỆN</span>
                      </button>
                    ) : isPast ? (
                      <button
                        onClick={() => {
                          soundManager.play('click');
                          onClose();
                          onChallengeStageBoss(stage.id);
                        }}
                        className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-bold text-xs uppercase flex items-center gap-1.5 border border-neutral-800 cursor-pointer rounded-xs"
                      >
                        <Skull className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Khiêu chiến lại Trùm 0{stage.id}</span>
                      </button>
                    ) : (
                      <div className="text-xs text-neutral-500 font-mono italic">
                        Cần vượt qua Giai đoạn 0{stage.id - 1} để mở khóa
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
