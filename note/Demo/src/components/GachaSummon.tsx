import React, { useState } from 'react';
import { PlayerProfile, CardDefinition } from '../types/game';
import { ALL_CARDS } from '../data/cardsData';
import { CardVisual } from './CardVisual';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GachaSummonModalProps {
  player: PlayerProfile;
  onSummon: (costDiamonds: number, count: number, results: CardDefinition[]) => void;
  onClose?: () => void;
}

export const GachaSummon: React.FC<GachaSummonModalProps> = ({ player, onSummon }) => {
  const [activeBanner, setActiveBanner] = useState<'limited' | 'standard'>('limited');
  const [summonResults, setSummonResults] = useState<CardDefinition[] | null>(null);
  const [isSummoningAnimation, setIsSummoningAnimation] = useState(false);

  // Gacha Pull Mechanics
  const performSummon = (count: number) => {
    const cost = count === 1 ? 15 : 135; // 10% discount on x10
    if (player.diamonds < cost) {
      alert('Không đủ Kim Cương 💎! Bạn có thể vào Cửa Hàng VIP để nạp thêm hoặc nhận qua Vé Chiến Dịch.');
      return;
    }

    sound.playPowerup();
    setIsSummoningAnimation(true);
    setSummonResults(null);

    setTimeout(() => {
      const results: CardDefinition[] = [];
      const ssAndPiCards = ALL_CARDS.filter(c => c.rarity === 'Pi' || c.rarity === 'SS' || c.rarity === 'S');
      const standardPool = ALL_CARDS;

      for (let i = 0; i < count; i++) {
        // Pity check or high rarity chance
        const isLucky = Math.random() < 0.25 || (player.gachaPityCount + i) >= 10;
        if (isLucky) {
          const picked = ssAndPiCards[Math.floor(Math.random() * ssAndPiCards.length)];
          results.push(picked);
        } else {
          const picked = standardPool[Math.floor(Math.random() * standardPool.length)];
          results.push(picked);
        }
      }

      setIsSummoningAnimation(false);
      setSummonResults(results);
      onSummon(cost, count, results);

      // Trigger Celebration Confetti if Pi or SS card dropped
      if (results.some(c => c.rarity === 'Pi' || c.rarity === 'SS' || c.rarity === 'S')) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn select-none">
      {/* Banner Selection & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/80 via-emerald-950/90 to-black p-5 rounded-2xl border-2 border-purple-500/50 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow">
              HOT GACHA VIP
            </span>
            <span className="text-xs text-purple-300 font-mono">
              Bảo hiểm Pity: {10 - (player.gachaPityCount % 10)}/10 lượt tiếp theo chắc chắn có Thẻ S+
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>🔮</span> Vòng Quay Vận Mệnh Thần Cấp
          </h2>
          <p className="text-xs text-purple-200/80 mt-0.5">
            Cơ hội chiêu mộ Thẻ Pi Cấp Thần & Thần Khí Nuốt Chửng biến hình tối thượng!
          </p>
        </div>

        {/* Currency Display & Tab Switch */}
        <div className="flex items-center gap-3">
          <div className="bg-black/60 px-4 py-2 rounded-xl border border-cyan-500/50 flex items-center gap-2 shadow-lg">
            <span className="text-lg">💎</span>
            <div>
              <p className="text-[10px] text-cyan-300 uppercase font-bold">Kim Cương</p>
              <p className="text-base font-black text-cyan-100">{player.diamonds}</p>
            </div>
          </div>

          <div className="flex bg-black/50 p-1 rounded-xl border border-purple-700/50">
            <button
              onClick={() => setActiveBanner('limited')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeBanner === 'limited'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              ⭐ Giới Hạn Pi
            </button>
            <button
              onClick={() => setActiveBanner('standard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeBanner === 'standard'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              🌿 Thường Niên
            </button>
          </div>
        </div>
      </div>

      {/* Main Banner Showcase Poster */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-yellow-500/60 bg-gradient-to-b from-purple-950 via-slate-950 to-black p-6 md:p-10 shadow-[0_0_30px_rgba(168,85,247,0.3)] min-h-[380px] flex flex-col justify-between">
        {/* Background Aura */}
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Featured Card Badges */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
              Tỷ Lệ Rơi x500%
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500 mt-2 drop-shadow">
              HẠT DẺ BẤT HOẠI SỐ 0 & TIỂU THÔN S+
            </h3>
            <p className="text-sm text-neutral-300 max-w-lg mt-1">
              Chiêu mộ ngay siêu thẻ Pi lăn nghiền nát ngàn quái vật và vũ khí tối thượng của Tuyết Mộc!
            </p>
          </div>

          <div className="flex gap-3">
            <div className="transform hover:scale-105 transition">
              <CardVisual card={ALL_CARDS.find(c => c.id === 'giant_walnut')!} compact={true} />
            </div>
            <div className="transform hover:scale-105 transition">
              <CardVisual card={ALL_CARDS.find(c => c.id === 'peashooter_devourer')!} compact={true} />
            </div>
          </div>
        </div>

        {/* Summon Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {/* Summon x1 */}
          <button
            disabled={isSummoningAnimation}
            onClick={() => performSummon(1)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-black text-sm shadow-xl border border-blue-400/60 flex items-center justify-center gap-2 transform active:scale-95 transition disabled:opacity-50"
          >
            <span>✨ Chiêu Mộ x1</span>
            <span className="bg-black/40 px-2 py-0.5 rounded-md text-cyan-300 text-xs border border-cyan-400/40">
              💎 15
            </span>
          </button>

          {/* Summon x10 with discount */}
          <button
            disabled={isSummoningAnimation}
            onClick={() => performSummon(10)}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-black text-base shadow-[0_0_25px_rgba(245,158,11,0.6)] border-2 border-yellow-200 flex items-center justify-center gap-2 transform active:scale-95 transition disabled:opacity-50 animate-pulse"
          >
            <span>👑 Chiêu Mộ x10 (Ưu Đãi -10%)</span>
            <span className="bg-neutral-950 text-yellow-300 px-2.5 py-0.5 rounded-md text-sm border border-yellow-500/50">
              💎 135
            </span>
          </button>
        </div>
      </div>

      {/* Cinematic Summoning Animation Overlay */}
      {isSummoningAnimation && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-t-amber-400 border-r-purple-500 border-b-emerald-400 border-l-cyan-400 animate-spin shadow-[0_0_50px_rgba(234,179,8,0.8)]" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce">
              🔮
            </span>
            <p className="mt-6 text-xl font-black text-amber-300 uppercase tracking-widest animate-pulse">
              Đang Kết Nối Không Gian Chiêu Mộ...
            </p>
          </div>
        </div>
      )}

      {/* Gacha Results Showcase Dialog */}
      {summonResults && (
        <div className="bg-black/90 p-6 md:p-8 rounded-3xl border-2 border-amber-500/80 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-yellow-400 flex items-center gap-2">
                <span>🎉</span> KẾT QUẢ CHIÊU MỘ THÀNH CÔNG
              </h3>
              <p className="text-xs text-neutral-400">
                Thẻ mới đã tự động lưu vào Kho Trang Bị & Thẻ Trùng được chuyển hóa thành Tinh Hồn cấp bậc tương ứng!
              </p>
            </div>
            <button
              onClick={() => setSummonResults(null)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition"
            >
              Thu Nhận Tất Cả
            </button>
          </div>

          {/* Grid of Results */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            {summonResults.map((card, idx) => (
              <div key={idx} className="animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardVisual card={card} compact={false} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => performSummon(summonResults.length)}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black rounded-xl text-sm shadow-lg hover:brightness-110 transition"
            >
              Quay Tiếp x{summonResults.length}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
