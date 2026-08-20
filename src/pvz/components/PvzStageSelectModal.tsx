import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PVZ_WAVES } from '../data/pvzData';
import { PvzWave } from '../types';
import { Map, MapPin, CheckCircle2, Lock, Play, X, Shield, Award } from 'lucide-react';

interface PvzStageSelectModalProps {
  currentWaveIndex: number;
  maxUnlockedWave: number;
  onSelectWave: (waveIndex: number) => void;
  onClose: () => void;
}

export const PvzStageSelectModal: React.FC<PvzStageSelectModalProps> = ({
  currentWaveIndex,
  maxUnlockedWave,
  onSelectWave,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-4xl bg-neutral-950 border-2 border-emerald-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-950 border border-emerald-500 flex items-center justify-center text-xl rounded-xs">
              🗺️
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>BẢN ĐỒ CHIẾN DỊCH VẬN MỆNH QUỐC GIA (7 CHƯƠNG)</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Chọn màn chơi chiến dịch để tiến công, phòng ngự và thu thập tài nguyên Quốc Vận
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

        {/* Stage List */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 max-h-[60vh]">
          {PVZ_WAVES.map((stage, idx) => {
            const isUnlocked = idx <= maxUnlockedWave;
            const isCurrent = idx === currentWaveIndex;
            const isPassed = idx < maxUnlockedWave;

            return (
              <div
                key={stage.waveNumber}
                className={`p-4 border rounded-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : isUnlocked
                    ? 'bg-neutral-900 border-neutral-700 hover:border-emerald-500/60'
                    : 'bg-neutral-950 border-neutral-800 opacity-50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-12 h-12 flex items-center justify-center text-xl font-black rounded-xs shrink-0 border ${
                      isCurrent
                        ? 'bg-emerald-600 text-neutral-950 border-emerald-300'
                        : isUnlocked
                        ? 'bg-neutral-950 text-emerald-400 border-neutral-700'
                        : 'bg-neutral-950 text-neutral-600 border-neutral-800'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : isUnlocked ? (
                      `0${stage.waveNumber}`
                    ) : (
                      <Lock className="w-5 h-5 text-neutral-600" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 bg-neutral-800 text-amber-300 border border-neutral-700 font-bold uppercase">
                        {stage.chapterTitle.split(':')[0]}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-white">{stage.name}</h4>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-bold mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{stage.stageName}</span>
                    </div>

                    <p className="text-xs text-neutral-300 mt-1">{stage.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-amber-300 font-bold mt-2 pt-2 border-t border-neutral-800/80">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Shield className="w-3 h-3" />
                        <span>Thưởng Lãnh Thổ: +{stage.nationalReward.territoryBonusKm2} km²</span>
                      </span>
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Award className="w-3 h-3" />
                        <span>Sức Mạnh Toàn Dân: +{stage.nationalReward.statBonusPct}%</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        soundManager.play('click');
                        onSelectWave(idx);
                        onClose();
                      }}
                      className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-emerald-500 text-neutral-950 shadow-[0_0_12px_rgba(16,185,129,0.5)] hover:bg-emerald-400'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCurrent ? 'ĐANG CHƠI' : 'TIẾN CÔNG'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xs">
                      <Lock className="w-3.5 h-3.5" />
                      <span>CHƯA MỞ KHÓA</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
