import React from 'react';
import { PlayerProfile, CardDefinition } from '../types/game';
import { ALL_CARDS } from '../data/cardsData';
import { CardVisual } from './CardVisual';
import { sound } from '../utils/audio';

interface DeckBuilderProps {
  player: PlayerProfile;
  onToggleDeckCard: (cardId: string) => void;
  onAutoOptimizeDeck: () => void;
}

export const DeckBuilder: React.FC<DeckBuilderProps> = ({
  player,
  onToggleDeckCard,
  onAutoOptimizeDeck
}) => {
  const maxSlots = 7;
  const activeDeckCards = player.activeDeck
    .map((id) => ALL_CARDS.find((c) => c.id === id))
    .filter((c): c is CardDefinition => Boolean(c));

  const availableCards = ALL_CARDS.filter((c) => player.unlockedCards.includes(c.id));

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-emerald-50 animate-fadeIn select-none">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-900/30 border border-emerald-700/50 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-950/80 text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-800/60">
                🃏 BỘ BÀI CHIẾN ĐẤU
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                Ô XUẤT TRẬN: {player.activeDeck.length}/{maxSlots}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-emerald-100 mt-2">
              Sắp Xếp Đội Hình Thẻ Bài
            </h2>
            <p className="text-emerald-300/80 text-sm mt-1">
              Chọn tối đa 7 lá bài tối ưu nhất để mang vào chiến dịch tiêu diệt quái vật Bí Cảnh.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playPlantFood();
              onAutoOptimizeDeck();
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-3 rounded-2xl shadow-[0_4px_0_rgb(5,150,105)] transition whitespace-nowrap"
          >
            <span>⚡</span>
            <span>Tự Động Tối Ưu Đội Hình</span>
          </button>
        </div>
      </div>

      {/* Active Battle Slots (Top Row) */}
      <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-5 shadow-2xl space-y-3">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
          <span>⚔️ Đội Hình Xuất Trận Hiện Tại ({player.activeDeck.length}/{maxSlots})</span>
        </h3>

        <div className="flex flex-wrap gap-3 min-h-[120px] p-3.5 bg-black/40 rounded-2xl border border-emerald-800/40 items-center">
          {activeDeckCards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                sound.playClick();
                onToggleDeckCard(card.id);
              }}
              className="relative cursor-pointer transition transform hover:scale-105 group"
            >
              <CardVisual card={card} compact level={player.cardLevels[card.id] || 1} />
              <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow">
                ✕
              </div>
            </div>
          ))}

          {Array.from({ length: Math.max(0, maxSlots - activeDeckCards.length) }).map((_, i) => (
            <div
              key={i}
              className="w-20 h-28 rounded-2xl border-2 border-dashed border-emerald-800/50 flex flex-col items-center justify-center text-emerald-500/60 text-xs font-bold gap-1 bg-emerald-950/20"
            >
              <span>➕</span>
              <span>Trống</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Unlocked Cards Pool (Bottom Grid) */}
      <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-5 shadow-2xl space-y-3">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
          📦 Kho Thẻ Linh Đã Mở Khóa (Nhấn để thêm/bỏ)
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
          {availableCards.map((card) => {
            const isEquipped = player.activeDeck.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => {
                  sound.playClick();
                  onToggleDeckCard(card.id);
                }}
                className={`relative cursor-pointer transition transform hover:scale-105 ${
                  isEquipped ? 'ring-2 ring-emerald-400 rounded-2xl' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <CardVisual card={card} compact level={player.cardLevels[card.id] || 1} />
                {isEquipped && (
                  <div className="absolute top-1 left-1 bg-emerald-500 text-neutral-950 text-[9px] font-extrabold px-1 rounded shadow">
                    ĐÃ CHỌN
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
