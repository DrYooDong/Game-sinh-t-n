import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill, TalentNode, Companion, SkillTier } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Zap,
  Flame,
  Shield,
  X,
  Plus,
  GitMerge,
  Crown,
  ChevronRight,
  TrendingUp,
  Brain
} from 'lucide-react';

interface SkillEvolutionModalProps {
  playerSkill: Skill;
  companion: Companion;
  talents: TalentNode[];
  mutationPoints: number;
  onUpgradeSkillTier: () => void;
  onFuseSkills: (fusedSkill: Skill) => void;
  onAllocateTalent: (talentId: string) => void;
  onClose: () => void;
}

export const SkillEvolutionModal: React.FC<SkillEvolutionModalProps> = ({
  playerSkill,
  companion,
  talents,
  mutationPoints,
  onUpgradeSkillTier,
  onFuseSkills,
  onAllocateTalent,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'tier' | 'fusion' | 'talents'>('tier');
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'warrior' | 'mage' | 'leader' | 'immortal'>('all');

  const tierUpgradeCost = {
    C: 3,
    B: 5,
    A: 8,
    S: 12,
    SS: 18,
    SSS: 25,
    EX: 0
  }[playerSkill.tier] || 5;

  const nextTierMap: Record<SkillTier, SkillTier> = {
    F: 'E',
    E: 'D',
    D: 'C',
    C: 'B',
    B: 'A',
    A: 'S',
    S: 'SS',
    SS: 'SSS',
    SSS: 'EX',
    EX: 'EX'
  };

  const nextTier = nextTierMap[playerSkill.tier];
  const canBreakthrough = playerSkill.tier !== 'EX' && mutationPoints >= tierUpgradeCost;

  // Handle Skill Fusion
  const handleFuse = () => {
    if (mutationPoints < 10) return;
    soundManager.play('level_up');
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });

    const fusedName = `${playerSkill.name.split('(')[0]} × ${companion.skill.name.split('(')[0]} (Dung Hợp EX)`;
    const newFusedSkill: Skill = {
      id: `fused_${Date.now()}`,
      name: fusedName,
      tier: 'EX',
      description: `[SIÊU KỸ NĂNG DUNG HỢP]: Kết hợp sức mạnh của [${playerSkill.name}] và [${companion.skill.name}]. Gây sát thương huỷ diệt cực đại, hồi phục 100% HP/MP và trích xuất vĩnh viễn toàn bộ thuộc tính đối thủ!`,
      icon: '🌌⚡',
      mpCost: 18,
      cooldownTurns: 2,
      effectType: 'extract',
      power: playerSkill.power + companion.skill.power + 100,
      level: 1,
      maxLevel: 10,
      flavor: 'Sự hòa quyện tuyệt đối của hai linh hồn đồng đội sinh tử!',
      isFused: true,
      fusionParents: [playerSkill.name, companion.skill.name]
    };

    onFuseSkills(newFusedSkill);
  };

  const filteredTalents = talents.filter((t) => {
    if (selectedBranch === 'all') return true;
    return t.tree === selectedBranch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-4xl bg-neutral-950 border-2 border-purple-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-purple-600 text-white px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Đột Phá Kỹ Năng & Cây Thiên Phú
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Tiến Hóa Thiên Phú & Dung Hợp Kỹ Năng
              </h3>
              <p className="text-[10px] text-neutral-400">
                Sử dụng Tinh Thể Dị Biến để nâng rank kỹ năng, mở khóa Siêu Kỹ Năng EX và học Thiên Phú
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1">
              <span>💎 Tinh Thể Dị Biến:</span>
              <span className="text-amber-300 font-bold">{mutationPoints}</span>
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
        </div>

        {/* Tab switchers */}
        <div className="flex gap-1 border-b border-neutral-800 pb-2 mb-3 text-[10px]">
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('tier');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'tier'
                ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            ĐỘT PHÁ CẤP BẬC (RANK [{playerSkill.tier}])
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('fusion');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'fusion'
                ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            DUNG HỢP SIÊU KỸ NĂNG (FUSION EX) ✨
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('talents');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'talents'
                ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            CÂY THIÊN PHÚ (4 NHÁNH)
          </button>
        </div>

        {/* Tab 1: Tier Breakthrough */}
        {activeTab === 'tier' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-y-auto max-h-[55vh]">
            <div className="p-4 bg-neutral-900 border-2 border-purple-500/40 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-300 uppercase">Kỹ Năng Đang Kích Hoạt</span>
                <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-500 font-bold uppercase">
                  RANK [{playerSkill.tier}]
                </span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <span className="text-3xl">{playerSkill.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{playerSkill.name}</h4>
                  <div className="text-[10px] text-cyan-300 font-mono">
                    Tiêu hao: {playerSkill.mpCost} MP • Hồi chiêu: {playerSkill.cooldownTurns} lượt • Sức mạnh: {playerSkill.power}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-300 bg-neutral-950 p-2.5 border border-neutral-800 leading-relaxed">
                {playerSkill.description}
              </p>
            </div>

            {/* Next Rank Preview */}
            {playerSkill.tier !== 'EX' ? (
              <div className="p-4 bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase text-xs">Đột Phá Lên Rank Kế Tiếp:</span>
                    <span className="text-xs px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-500 font-bold uppercase">
                      RANK [{nextTier}]
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    Tăng +35% Sát thương/Hiệu lực, giảm 1 MP tiêu hao và tăng tỉ lệ trích xuất chỉ số vĩnh viễn.
                  </div>
                  <div className="text-[10px] text-amber-300 mt-1">
                    Chi phí đột phá: {tierUpgradeCost} Tinh Thể Dị Biến (Bạn có: {mutationPoints})
                  </div>
                </div>

                <button
                  disabled={!canBreakthrough}
                  onClick={() => {
                    soundManager.play('level_up');
                    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
                    onUpgradeSkillTier();
                  }}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest border transition-all shrink-0 ${
                    canBreakthrough
                      ? 'bg-purple-600 hover:bg-purple-500 text-white border-purple-700 cursor-pointer shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                      : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                  }`}
                >
                  Đột Phá Rank [{nextTier}]
                </button>
              </div>
            ) : (
              <div className="p-3 bg-neutral-900 border border-amber-500/40 text-center text-xs text-amber-300 font-bold">
                👑 KỸ NĂNG ĐÃ ĐẠT CẤP ĐỘ THẦN THOẠI VÔ CỰC (RANK EX)!
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Skill Fusion */}
        {activeTab === 'fusion' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-y-auto max-h-[55vh]">
            <div className="p-3 bg-neutral-900 border border-purple-500/40 text-xs">
              <div className="flex items-center gap-2 text-purple-300 font-bold mb-1">
                <GitMerge className="w-4 h-4 animate-pulse" />
                <span>CƠ CHẾ DUNG HỢP THIÊN PHÚ THẾ KỶ</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Hợp nhất linh hồn và kỹ năng thức tỉnh của Bạn cùng Đồng Đội để khai sinh ra Siêu Kỹ Năng Đột Phá Cấp Thần (Rank EX). Yêu cầu 10 Tinh Thể Dị Biến.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-950 border border-cyan-500/40">
                <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">KỸ NĂNG CỦA BẠN:</div>
                <div className="flex items-center gap-2 font-bold text-white text-xs">
                  <span>{playerSkill.icon}</span>
                  <span>{playerSkill.name}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-950 border border-rose-500/40">
                <div className="text-[10px] text-rose-400 font-bold uppercase mb-1">KỸ NĂNG ĐỒNG ĐỘI ({companion.name}):</div>
                <div className="flex items-center gap-2 font-bold text-white text-xs">
                  <span>{companion.skill.icon}</span>
                  <span>{companion.skill.name}</span>
                </div>
              </div>
            </div>

            <button
              disabled={mutationPoints < 10}
              onClick={handleFuse}
              className={`w-full py-3 text-xs font-bold uppercase tracking-widest border transition-all ${
                mutationPoints >= 10
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-purple-400 cursor-pointer shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
              }`}
            >
              {mutationPoints >= 10
                ? 'HỢP NHẤT DUNG HỢP KỸ NĂNG (TỐN 10 TINH THỂ 💎)'
                : 'CẦN 10 TINH THỂ DỊ BIẾN ĐỂ DUNG HỢP'}
            </button>
          </div>
        )}

        {/* Tab 3: Talents Tree */}
        {activeTab === 'talents' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter branches */}
            <div className="flex gap-1 mb-2 text-[9px] overflow-x-auto">
              {(['all', 'warrior', 'mage', 'leader', 'immortal'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBranch(b)}
                  className={`px-2 py-0.5 border uppercase cursor-pointer ${
                    selectedBranch === b
                      ? 'bg-purple-950 border-purple-400 text-purple-200 font-bold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}
                >
                  {b === 'all' && 'Tất Cả (4 Nhánh)'}
                  {b === 'warrior' && '⚔️ Chiến Thần'}
                  {b === 'mage' && '🔮 Ma Đạo'}
                  {b === 'leader' && '👑 Lãnh Tụ'}
                  {b === 'immortal' && '🛡️ Bất Tử'}
                </button>
              ))}
            </div>

            {/* Talents List */}
            <div className="overflow-y-auto space-y-2 flex-1 pr-1 max-h-[50vh]">
              {filteredTalents.map((talent) => {
                const canLearn = talent.level < talent.maxLevel && mutationPoints >= talent.costPoints;
                const isMax = talent.level >= talent.maxLevel;

                return (
                  <div
                    key={talent.id}
                    className="p-3 bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-lg shrink-0">
                        {talent.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white uppercase text-xs">{talent.name}</span>
                          <span className="text-[9px] px-1 bg-purple-950 border border-purple-500/40 text-purple-300 font-bold uppercase">
                            CẤP {talent.level}/{talent.maxLevel}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-300 mt-0.5">{talent.description}</p>
                        {!isMax && (
                          <div className="text-[9px] text-amber-300 mt-0.5">
                            Chi phí: {talent.costPoints} Tinh Thể Dị Biến
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      disabled={!canLearn || isMax}
                      onClick={() => {
                        soundManager.play('level_up');
                        onAllocateTalent(talent.id);
                      }}
                      className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all shrink-0 ${
                        isMax
                          ? 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                          : canLearn
                          ? 'bg-purple-600 hover:bg-purple-500 text-white border-purple-700 cursor-pointer shadow-[0_0_8px_rgba(147,51,234,0.3)]'
                          : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                      }`}
                    >
                      {isMax ? 'Tối Đa' : 'Học Điểm'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
