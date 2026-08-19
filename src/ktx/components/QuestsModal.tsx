import React from 'react';
import { motion } from 'motion/react';
import { Quest } from '../types';
import { soundManager } from '../utils/audio';
import { Scroll, X, CheckCircle2, Sparkles, Trophy, BookOpen, AlertCircle } from 'lucide-react';

interface QuestsModalProps {
  quests: Quest[];
  onClaimQuest: (questId: string) => void;
  onClose: () => void;
}

export const QuestsModal: React.FC<QuestsModalProps> = ({
  quests,
  onClaimQuest,
  onClose
}) => {
  const [tab, setTab] = React.useState<'quests' | 'laws'>('quests');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-cyan-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Nhiệm Vụ & Luật Lệ Thế Giới
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Scroll className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Nhiệm Vụ Tân Thủ & Quy Tắc Sinh Tồn
              </h3>
              <p className="text-[10px] text-neutral-400">
                Hoàn thành để nhận EXP và Tinh Thể Dị Biến dùng nâng cấp kỹ năng
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

        {/* Tab switcher */}
        <div className="flex gap-1 mb-3 border-b border-neutral-800 pb-2 text-[10px]">
          <button
            onClick={() => setTab('quests')}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              tab === 'quests'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            NHIỆM VỤ SINH TỒN ({quests.filter((q) => !q.claimed).length})
          </button>
          <button
            onClick={() => setTab('laws')}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              tab === 'laws'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            LUẬT LỆ HỆ THỐNG KÝ TÚC XÁ
          </button>
        </div>

        {/* Tab 1: Quests List */}
        {tab === 'quests' && (
          <div className="overflow-y-auto space-y-2 flex-1 pr-1 max-h-[55vh]">
            {quests.map((quest) => {
              const isCompleted = quest.progress >= quest.targetProgress;
              const isClaimed = quest.claimed;

              return (
                <div
                  key={quest.id}
                  className={`p-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    isClaimed
                      ? 'bg-neutral-950 border-neutral-900 opacity-60'
                      : isCompleted
                      ? 'bg-neutral-900 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.15)]'
                      : 'bg-neutral-900/80 border-neutral-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white uppercase">{quest.title}</span>
                      <span className="text-[9px] px-1 bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                        {quest.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400">{quest.description}</p>
                    
                    {/* Progress */}
                    <div className="flex items-center gap-2 text-[10px] font-mono mt-1">
                      <span className="text-neutral-400">Tiến độ:</span>
                      <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 transition-all duration-300"
                          style={{ width: `${Math.min(100, (quest.progress / quest.targetProgress) * 100)}%` }}
                        />
                      </div>
                      <span className="text-cyan-400 font-bold">{quest.progress}/{quest.targetProgress}</span>
                    </div>

                    <div className="text-[10px] text-amber-300">
                      Phần thưởng: +{quest.rewardExp} EXP • +{quest.rewardPoints} Tinh Thể Dị Biến 💎
                    </div>
                  </div>

                  <button
                    disabled={!isCompleted || isClaimed}
                    onClick={() => {
                      soundManager.play('level_up');
                      onClaimQuest(quest.id);
                    }}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all shrink-0 ${
                      isClaimed
                        ? 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                        : isCompleted
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                    }`}
                  >
                    {isClaimed ? 'Đã Nhận' : isCompleted ? 'Nhận Thưởng' : 'Chưa Xong'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Laws & Rules */}
        {tab === 'laws' && (
          <div className="p-3.5 bg-neutral-900 border border-neutral-800 space-y-2.5 text-xs overflow-y-auto max-h-[55vh]">
            <div className="text-cyan-400 font-bold uppercase border-b border-neutral-800 pb-1.5">
              CẨM NANG LUẬT SINH TỒN THẾ GIỚI MỚI
            </div>
            <div className="space-y-2 text-[11px] text-neutral-300 leading-relaxed">
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                <strong className="text-white block mb-0.5">1. QUY TẮC DỊCH CHUYỂN & KHU VỰC AN TOÀN</strong>
                Toàn bộ 100 người bị dịch chuyển ngẫu nhiên vào 7 tầng KTX. Phòng 304 là Khu Vực An Toàn Tuyệt Đối, nơi người chơi nghỉ ngơi để hồi phục sinh lực và bảo dưỡng trang bị.
              </div>
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                <strong className="text-white block mb-0.5">2. TIẾN TRÌNH CÁC GIAI ĐOẠN (PHASES)</strong>
                Thế giới được chia thành 4 giai đoạn lớn (Tuần 1-2, Tuần 3-4, Tháng 2-3, Tháng 4+). Mỗi khi qua giai đoạn mới, zombie sẽ tiến hóa đột biến nhưng tỉ lệ rơi vật phẩm quý và tinh thể sẽ tăng tương ứng.
              </div>
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                <strong className="text-white block mb-0.5">3. VÔ HẠN TRÍCH XUẤT & PHÂN BỔ THUỘC TÍNH</strong>
                Người chơi sở hữu kỹ năng Thiên Phú có thể trích xuất vĩnh viễn chỉ số của quái vật sau khi tiêu diệt và dùng Tinh Thể Dị Biến để nâng cấp cấp bậc kỹ năng.
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
