import React, { useState } from 'react';
import { PlayerProfile, StoryArc } from '../types/game';
import { STORY_ARCS } from '../data/storyData';
import { sound } from '../utils/audio';
import { PvZIcon } from './CardVisual';
import { ALL_CARDS } from '../data/cardsData';

interface StageMapProps {
  player: PlayerProfile;
  onSelectStage: (arcId: number) => void;
  onStartBattle: (arcId: number) => void;
  onViewStory: (arcId: number) => void;
  onOpenDeck: () => void;
}

interface StageMetadata {
  arcId: number;
  stageCode: string;
  threatLevel: string;
  threatColor: string;
  threatStars: number;
  environment: string;
  envIcon: string;
  mutationEffect: string;
  recommendedPower: number;
  enemyHighlights: string[];
  bannerBg: string;
}

const STAGE_METAS: Record<number, StageMetadata> = {
  1: {
    arcId: 1,
    stageCode: 'SECTOR-01',
    threatLevel: 'CẤP I • NGUY CƠ BAN ĐẦU',
    threatColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60',
    threatStars: 1,
    environment: 'Sân Thượng Tòa Cao Tầng • Gió Cuốn',
    envIcon: '🏢',
    mutationEffect: 'Gió mạnh nhẹ - Zombie chạy nhanh hơn 15% ở làn 1 & 4.',
    recommendedPower: 100,
    enemyHighlights: ['basic_zombie', 'rooftop_runner', 'conehead_mutant'],
    bannerBg: 'from-emerald-950 via-slate-900 to-teal-950'
  },
  2: {
    arcId: 2,
    stageCode: 'SECTOR-02',
    threatLevel: 'CẤP II • BÃO TỪ TRƯỜNG',
    threatColor: 'text-yellow-400 border-yellow-500/40 bg-yellow-950/60',
    threatStars: 2,
    environment: 'Khe Nứt Đại Địa • Động Đất & Sấm Sét',
    envIcon: '⚡',
    mutationEffect: 'Bão từ - Tăng hiệu quả Nấm Nam Châm, Zombie mang xà beng tăng 50% giáp.',
    recommendedPower: 250,
    enemyHighlights: ['shield_zombie', 'balloon_zombie_mob', 'iron_buckethead'],
    bannerBg: 'from-yellow-950 via-slate-900 to-amber-950'
  },
  3: {
    arcId: 3,
    stageCode: 'SECTOR-03',
    threatLevel: 'CẤP III • ĐẦM LẦY AXIT',
    threatColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60',
    threatStars: 3,
    environment: 'Hồ Nước Vực Thẳm • Thủy Quái & Độc Tố',
    envIcon: '🌊',
    mutationEffect: 'Chiến trường Nước - Cần Rong Biển Bắt Ma & Thuyền Lá để bảo vệ các làn trung tâm.',
    recommendedPower: 450,
    enemyHighlights: ['diver_zombie', 'dolphin_rider', 'tentacle_abyss_fiend'],
    bannerBg: 'from-cyan-950 via-slate-900 to-blue-950'
  },
  4: {
    arcId: 4,
    stageCode: 'SECTOR-04',
    threatLevel: 'CẤP IV • THIẾT GIÁP HUYẾT NGỤC',
    threatColor: 'text-purple-400 border-purple-500/40 bg-purple-950/60',
    threatStars: 4,
    environment: 'Pháo Đài Huyết Ngục • Quân Đột Biến Bạo Chúa',
    envIcon: '🏰',
    mutationEffect: 'Thiết giáp hạng nặng - Quái vật trang bị súng chống tăng và máy xúc bọc thép.',
    recommendedPower: 700,
    enemyHighlights: ['catapult_zombie', 'gargantuar_tyrant', 'imp_cannon'],
    bannerBg: 'from-purple-950 via-stone-900 to-red-950'
  },
  5: {
    arcId: 5,
    stageCode: 'SECTOR-05',
    threatLevel: 'CẤP V • TỬ THẦN TÀ THẦN',
    threatColor: 'text-red-400 border-red-500/40 bg-red-950/60',
    threatStars: 5,
    environment: 'Rừng Rậm Hắc Ám • Ma Thụ Hỗn Mang',
    envIcon: '💀',
    mutationEffect: 'Ma vụ hắc ám - Tà Thần liên tục triệu hồi quái vật và phá hủy các ô phòng thủ.',
    recommendedPower: 1000,
    enemyHighlights: ['cult_priest_zombie', 'chomper_dragon_boss', 'zomboss_prime'],
    bannerBg: 'from-red-950 via-neutral-900 to-black'
  }
};

export const StageMap: React.FC<StageMapProps> = ({
  player,
  onSelectStage,
  onStartBattle,
  onViewStory,
  onOpenDeck
}) => {
  const [selectedArcId, setSelectedArcId] = useState<number>(player.currentArcId || 1);

  const selectedArc = STORY_ARCS.find((a) => a.id === selectedArcId) || STORY_ARCS[0];
  const meta = STAGE_METAS[selectedArcId] || STAGE_METAS[1];

  const isUnlocked = selectedArc.id === 1 || player.completedArcs.includes(selectedArc.id - 1) || player.completedArcs.includes(selectedArc.id);
  const isCompleted = player.completedArcs.includes(selectedArc.id);
  const isCurrent = player.currentArcId === selectedArc.id;

  const totalCompleted = player.completedArcs.length;
  const totalStars = player.completedArcs.length * 3;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-emerald-50 select-none animate-fadeIn">
      {/* Top Expedition Status Dashboard Bar */}
      <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-3xl p-4 md:p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex-shrink-0">
            🗺️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 font-bold">
                CHIẾN DỊCH SINH TỒN THEO MÀN
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                TIẾN TRÌNH: {totalCompleted}/5 KHU VỰC
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-emerald-100 tracking-tight mt-0.5 uppercase">
              Bản Đồ Thám Hiểm Bí Cảnh Toàn Cầu
            </h2>
          </div>
        </div>

        {/* Global Stats Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-black/40 px-3.5 py-2 rounded-2xl border border-emerald-800/50 flex items-center gap-2">
            <span className="text-yellow-400 text-base">⭐</span>
            <div>
              <p className="text-[9px] uppercase font-mono text-emerald-500 font-bold">Sao Sinh Tồn</p>
              <p className="text-sm font-black text-yellow-300">{totalStars}/15 Sao</p>
            </div>
          </div>

          <div className="bg-black/40 px-3.5 py-2 rounded-2xl border border-emerald-800/50 flex items-center gap-2">
            <span className="text-emerald-400 text-base">🌱</span>
            <div>
              <p className="text-[9px] uppercase font-mono text-emerald-500 font-bold">Thẻ Đã Mở</p>
              <p className="text-sm font-black text-emerald-300">{player.unlockedCards.length} Thẻ Linh</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenDeck();
            }}
            className="bg-emerald-800/40 hover:bg-emerald-700/60 border border-emerald-600/60 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 text-emerald-200"
          >
            <span>🃏</span>
            <span>Chỉnh Bộ Bài ({player.activeDeck.length}/7)</span>
          </button>
        </div>
      </div>

      {/* Interactive Stage Map Node Pathway */}
      <div className="bg-black/50 border border-emerald-800/50 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono flex items-center gap-2">
              <span>📍</span>
              <span>LỘ TRÌNH THÁM HIỂM CÁC PHÂN KHU (SECTORS 01 - 05)</span>
            </h3>
            <span className="text-[11px] text-emerald-500 font-mono">
              NHẤP ĐỂ CHỌN MÀN CHƠI
            </span>
          </div>

          {/* Node Track Horizontal Scroller */}
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-4 pt-2 px-2 scrollbar-thin">
            {STORY_ARCS.map((arc, index) => {
              const nodeMeta = STAGE_METAS[arc.id] || STAGE_METAS[1];
              const nodeUnlocked = arc.id === 1 || player.completedArcs.includes(arc.id - 1) || player.completedArcs.includes(arc.id);
              const nodeCompleted = player.completedArcs.includes(arc.id);
              const isNodeSelected = selectedArcId === arc.id;

              return (
                <div key={arc.id} className="flex items-center flex-shrink-0">
                  {/* Stage Node Box */}
                  <button
                    disabled={!nodeUnlocked}
                    onClick={() => {
                      sound.playClick();
                      setSelectedArcId(arc.id);
                      onSelectStage(arc.id);
                    }}
                    className={`relative w-44 md:w-52 p-4 rounded-3xl border-2 transition-all transform text-left flex flex-col justify-between h-44 ${
                      isNodeSelected
                        ? 'border-yellow-400 bg-emerald-900/50 shadow-[0_0_25px_rgba(234,179,8,0.35)] scale-105 ring-2 ring-yellow-400/40 z-20'
                        : nodeCompleted
                        ? 'border-emerald-600/60 bg-emerald-950/40 hover:bg-emerald-900/30 hover:border-emerald-400'
                        : nodeUnlocked
                        ? 'border-emerald-800/80 bg-black/60 hover:bg-emerald-950/50 hover:border-emerald-600'
                        : 'border-neutral-800 bg-neutral-950/80 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {/* Top Row: Stage Code & Status */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-black/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                        {nodeMeta.stageCode}
                      </span>
                      {nodeCompleted ? (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                          <span>⭐⭐⭐</span>
                        </span>
                      ) : nodeUnlocked ? (
                        <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-2 py-0.5 rounded-full border border-yellow-500/40 animate-pulse">
                          ĐANG MỞ
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-500">🔒 Khóa</span>
                      )}
                    </div>

                    {/* Center Icon & Stage Name */}
                    <div className="my-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{nodeMeta.envIcon}</span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-black text-emerald-100 truncate leading-tight">
                            Màn {arc.id}: {arc.title.replace(/^Giai Đoạn \d+:\s*/, '')}
                          </h4>
                          <p className="text-[10px] text-emerald-400/80 truncate font-mono mt-0.5">
                            {nodeMeta.environment.split('•')[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status & Danger Rating */}
                    <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-500">
                        Đe dọa: {'⭐'.repeat(nodeMeta.threatStars)}
                      </span>
                      <span className="text-yellow-400 font-bold">
                        +{arc.rewardSun}☀️
                      </span>
                    </div>

                    {/* Active Selected Badge Pointer */}
                    {isNodeSelected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md font-mono tracking-wider">
                        ĐANG CHỌN
                      </div>
                    )}
                  </button>

                  {/* Connector Line between Nodes */}
                  {index < STORY_ARCS.length - 1 && (
                    <div className="w-6 md:w-10 h-1 bg-emerald-900/60 mx-1 relative flex items-center justify-center">
                      <div
                        className={`h-1 w-full ${
                          player.completedArcs.includes(arc.id)
                            ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                            : 'bg-emerald-950'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Stage Tactical Briefing Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tactical Briefing & Environment Hazards */}
        <div className="lg:col-span-7 bg-emerald-950/40 border border-emerald-800/60 rounded-3xl p-6 shadow-2xl space-y-4">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-emerald-800/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-950/60 px-2.5 py-0.5 rounded-md border border-yellow-700/50">
                  {meta.stageCode}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${meta.threatColor}`}>
                  {meta.threatLevel}
                </span>
              </div>
              <h3 className="text-2xl font-black text-emerald-100 mt-1">
                {selectedArc.title}
              </h3>
              <p className="text-xs text-yellow-400/90 font-medium italic">
                “{selectedArc.subtitle}”
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-[10px] font-mono uppercase text-emerald-500 block">Thời Lượng Màn</span>
              <span className="text-base font-black text-emerald-300 font-mono">
                ⏱️ {selectedArc.battleConfig.durationSec} Giây Sinh Tồn
              </span>
            </div>
          </div>

          {/* Stage Narrative Context */}
          <div className="bg-black/40 p-4 rounded-2xl border border-emerald-700/40 space-y-1.5">
            <p className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">
              📜 Bối Cảnh Chiến Dịch Sinh Tồn:
            </p>
            <p className="text-xs md:text-sm text-emerald-200/90 leading-relaxed">
              {selectedArc.description}
            </p>
            <p className="text-xs text-yellow-300/80 italic font-mono pt-1">
              ⚡ Tóm tắt: {selectedArc.arcSummary}
            </p>
          </div>

          {/* Environmental Hazard & Mutation */}
          <div className="bg-emerald-900/30 p-4 rounded-2xl border border-emerald-600/40 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 font-mono">
              <span className="text-lg">{meta.envIcon}</span>
              <span>ĐỘT BIẾN MÔI TRƯỜNG & HIỆU ỨNG CHIẾN TRƯỜNG:</span>
            </div>
            <p className="text-xs text-emerald-100 font-sans leading-relaxed">
              {meta.mutationEffect}
            </p>
          </div>

          {/* Survival Mission 3-Star Objectives */}
          <div className="space-y-2 pt-1">
            <p className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold">
              🎯 MỤC TIÊU ĐÁNH GIÁ 3 SAO SINH TỒN:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-black/40 p-2.5 rounded-xl border border-emerald-800/40 text-xs flex items-center gap-2">
                <span className="text-yellow-400 text-base">⭐</span>
                <span className="text-emerald-200">Sống sót đến hết thời gian</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-emerald-800/40 text-xs flex items-center gap-2">
                <span className="text-yellow-400 text-base">⭐</span>
                <span className="text-emerald-200">Máu căn cứ trên 50%</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-emerald-800/40 text-xs flex items-center gap-2">
                <span className="text-yellow-400 text-base">⭐</span>
                <span className="text-emerald-200">Tiêu diệt toàn bộ đợt Boss</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Enemy Radar, Rewards & Action Launch Box */}
        <div className="lg:col-span-5 bg-emerald-950/40 border border-emerald-800/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Hostile Radar Intel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-800/50 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono flex items-center gap-2">
                  <span>📡</span>
                  <span>RADAR DÒ TÌM MA THÚ</span>
                </h4>
                <span className="text-[10px] text-red-400 font-mono font-bold animate-pulse">
                  NGUY CƠ CAO
                </span>
              </div>

              <div className="bg-black/40 p-3.5 rounded-2xl border border-emerald-800/40 space-y-2">
                <p className="text-[11px] text-emerald-300/80 font-mono">
                  Các chủng loại Zombie & Ma Thú trinh sát phát hiện:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedArc.battleConfig.waves.flatMap((w) => w.enemies.map((e) => e.enemyTypeId)).filter((v, i, a) => a.indexOf(v) === i).map((eId) => (
                    <span
                      key={eId}
                      className="bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-xs px-2.5 py-1 rounded-xl font-mono flex items-center gap-1.5"
                    >
                      <span>🧟</span>
                      <span className="capitalize">{eId.replace(/_/g, ' ')}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Guaranteed Drops / Loot */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono flex items-center gap-2">
                <span>🎁</span>
                <span>CHIẾN LỢI PHẨM HOÀN THÀNH MÀN</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 p-3 rounded-2xl border border-emerald-800/50 text-center">
                  <p className="text-[10px] font-mono text-emerald-500 uppercase font-bold">Nắng Thu Thập</p>
                  <p className="text-lg font-black text-yellow-400">☀️ +{selectedArc.rewardSun}</p>
                </div>
                <div className="bg-black/40 p-3 rounded-2xl border border-emerald-800/50 text-center">
                  <p className="text-[10px] font-mono text-emerald-500 uppercase font-bold">Tinh Hồn Bí Cảnh</p>
                  <p className="text-lg font-black text-purple-300">🔮 +{selectedArc.rewardSouls}</p>
                </div>
              </div>

              {selectedArc.unlockCardIds && selectedArc.unlockCardIds.length > 0 && (
                <div className="bg-emerald-900/30 p-3 rounded-2xl border border-emerald-700/50">
                  <p className="text-[10px] font-mono text-yellow-400 uppercase font-bold mb-1">
                    ✨ Thẻ Linh Mới Sẽ Thu Nạp:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedArc.unlockCardIds.map((cId) => {
                      const cardDef = ALL_CARDS.find((c) => c.id === cId);
                      return (
                        <div
                          key={cId}
                          className="bg-black/60 px-2.5 py-1 rounded-xl border border-emerald-600/50 text-xs font-bold text-emerald-200 flex items-center gap-1.5"
                        >
                          <PvZIcon type={cardDef?.iconType || 'peashooter'} className="w-5 h-5" />
                          <span>{cardDef?.vietnameseTitle || cId}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Deploy Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-emerald-800/50">
            {isUnlocked ? (
              <>
                <button
                  onClick={() => {
                    sound.playVictory();
                    onStartBattle(selectedArc.id);
                  }}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base rounded-2xl shadow-[0_4px_0_rgb(5,150,105)] transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <span>XUẤT TRẬN SINH TỒN NGAY</span>
                  <span>⚔️</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onViewStory(selectedArc.id);
                    }}
                    className="py-2.5 bg-black/40 hover:bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-xs font-bold text-emerald-300 transition flex items-center justify-center gap-1.5"
                  >
                    <span>📖</span>
                    <span>Xem Cốt Truyện</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenDeck();
                    }}
                    className="py-2.5 bg-black/40 hover:bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-xs font-bold text-emerald-300 transition flex items-center justify-center gap-1.5"
                  >
                    <span>🃏</span>
                    <span>Đổi Đội Hình</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 bg-neutral-900/80 border border-neutral-700 rounded-2xl text-center text-xs font-bold text-neutral-400">
                🔒 Vượt qua Màn {selectedArc.id - 1} để mở khóa khu vực sinh tồn này!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
