import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { COMMENTATORS_FEED } from '../data/pvzData';
import { NationalStats } from '../types';
import { Tv, Globe, Trophy, Award, X, Sparkles, Flag } from 'lucide-react';

interface PvzNationalBroadcastModalProps {
  nationalStats: NationalStats;
  currentWave?: number;
  totalWaves?: number;
  onClose: () => void;
}

export const PvzNationalBroadcastModal: React.FC<PvzNationalBroadcastModalProps> = ({
  nationalStats,
  currentWave,
  totalWaves,
  onClose
}) => {
  const rankingTable = [
    { rank: 1, country: 'Cửu Châu (Hoa Quốc)', representative: 'Tuyết Mộc', score: '38,500 pts', status: 'Dẫn Đầu Thế Giới (Sân Vườn Đép)' },
    { rank: 2, country: 'Mỹ Quốc', representative: 'John Miller', score: '14,200 pts', status: 'Bị Zombie Bao Vây' },
    { rank: 3, country: 'Đại Nhật Đế Quốc', representative: 'Tanaka Ken', score: '11,800 pts', status: 'Vỡ Phòng Tuyến' },
    { rank: 4, country: 'Nước Anh Tam', representative: 'Singh Kumar', score: '4,500 pts', status: '0.001% Dân Số Nhiễm Bệnh' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-emerald-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-950 border border-rose-500/60 flex items-center justify-center text-rose-400 text-lg rounded-xs">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>PHÒNG PHÁT SÓNG TRỰC TIẾP VẬN MỆNH QUỐC GIA</span>
                <span className="px-1.5 py-0.2 bg-rose-950 text-rose-400 border border-rose-800 text-[10px] animate-pulse">
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                1.4 Tỷ Người Dân Đang Theo Dõi Trực Tiếp Tuyết Mộc Thi Đấu
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

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-4 flex-1 pr-1">
          {/* National Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-neutral-900/90 border border-emerald-500/40 p-3 rounded-xs flex flex-col justify-between">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Lãnh Thổ Thưởng:</span>
              <span className="text-xl font-black text-emerald-400">+{nationalStats.territoryKm2} km²</span>
              <span className="text-[10px] text-neutral-400">Sinh ra từ hư không</span>
            </div>

            <div className="bg-neutral-900/90 border border-cyan-500/40 p-3 rounded-xs flex flex-col justify-between">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Tuổi Thọ Toàn Dân:</span>
              <span className="text-xl font-black text-cyan-400">+{nationalStats.populationLifeBonusMonths} Tháng</span>
              <span className="text-[10px] text-neutral-400">Kháng virus zombie</span>
            </div>

            <div className="bg-neutral-900/90 border border-amber-500/40 p-3 rounded-xs flex flex-col justify-between">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Sức Mạnh Toàn Dân:</span>
              <span className="text-xl font-black text-amber-400">+{nationalStats.nationalStrengthBonusPct}% Sức Mạnh</span>
              <span className="text-[10px] text-neutral-400">Đoàn kết dân tộc</span>
            </div>
          </div>

          {/* Commentator Feed Section */}
          <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-xs space-y-2.5">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BÀN BÌNH LUẬN CHUYÊN GIA & KHÁN GIẢ</span>
            </h4>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {COMMENTATORS_FEED.map((cmt) => (
                <div key={cmt.id} className="bg-neutral-950/70 p-2 border border-neutral-800 rounded-xs text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{cmt.avatar}</span>
                    <span className="font-bold text-white">{cmt.author}</span>
                    {cmt.badge && (
                      <span className="text-[9px] bg-neutral-800 text-neutral-300 px-1 rounded-xs">
                        {cmt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-300 leading-relaxed pl-5">{cmt.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* World Ranking Table */}
          <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-xs space-y-2.5">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>BẢNG XẾP HẠNG QUỐC VẬN THẾ GIỚI</span>
            </h4>

            <div className="space-y-1.5">
              {rankingTable.map((row) => (
                <div
                  key={row.rank}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-2 text-xs border rounded-xs gap-1 ${
                    row.rank === 1
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-xs flex items-center justify-center font-black ${
                      row.rank === 1 ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {row.rank}
                    </span>
                    <span className="text-white font-bold">{row.country}</span>
                    <span className="text-neutral-400">({row.representative})</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-amber-400">{row.score}</span>
                    <span className="italic">{row.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
