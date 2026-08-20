import React from 'react';
import { PlayerProfile, BattlePassTier } from '../types/game';
import { BATTLE_PASS_TIERS } from '../data/monetizationData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface BattlePassProps {
  player: PlayerProfile;
  onClaimFreeTier: (tierLevel: number, reward: any) => void;
  onClaimPremiumTier: (tierLevel: number, reward: any) => void;
  onUnlockPremiumPass: () => void;
}

export const BattlePass: React.FC<BattlePassProps> = ({
  player,
  onClaimFreeTier,
  onClaimPremiumTier,
  onUnlockPremiumPass
}) => {
  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn select-none">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/60 bg-gradient-to-r from-purple-950 via-indigo-950 to-black p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow">
                SEASON 1: VẬN MỆNH TRỖI DẬY
              </span>
              <span className="text-xs text-purple-300 font-mono">
                Cấp Vé: {player.passLevel}/10
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              Vé Chiến Dịch Sinh Tồn (Battle Pass)
            </h2>
            <p className="text-xs text-purple-200/80 mt-1 max-w-xl">
              Hoàn thành các ải sinh tồn và nhiệm vụ hàng ngày để tích lũy EXP Vé. Mở khóa Thẻ Pi Cấp Thần Bức Tường Hạt Dẻ và hàng nghìn Kim Cương!
            </p>

            {/* EXP Progress Bar */}
            <div className="mt-4 max-w-md">
              <div className="flex justify-between text-xs font-bold text-purple-200 mb-1">
                <span>Tiến Độ Cấp {player.passLevel}</span>
                <span>{player.passExp} / 2500 EXP</span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-purple-700/50 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (player.passExp / 2500) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Premium Pass Status / Buy Action */}
          <div className="bg-black/60 p-4 rounded-2xl border border-purple-500/40 flex flex-col items-center text-center min-w-[220px]">
            {player.hasPremiumPass ? (
              <div className="flex flex-col items-center">
                <span className="text-3xl animate-bounce">👑</span>
                <p className="text-sm font-black text-amber-400 mt-1">ĐÃ MỞ KHÓA PASS VIP</p>
                <p className="text-[10px] text-purple-300">Được nhận toàn bộ phần thưởng Thượng Đỉnh!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-3xl">🎫</span>
                <p className="text-sm font-black text-white mt-1">Vé Thượng Đỉnh VIP</p>
                <p className="text-[10px] text-neutral-400 mb-3">Mở khóa nhánh thưởng x10 giá trị</p>
                <button
                  onClick={() => {
                    sound.playPowerup();
                    onUnlockPremiumPass();
                  }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.5)] transition active:scale-95"
                >
                  Mở Khóa Vé VIP ($9.99)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rewards Track Grid */}
      <div className="bg-black/80 rounded-3xl p-5 md:p-6 border border-purple-900/60 shadow-xl overflow-x-auto">
        <h3 className="text-base font-black text-purple-300 mb-4 flex items-center gap-2">
          <span>🎁</span> LỘ TRÌNH PHẦN THƯỞNG 10 TẦNG
        </h3>

        <div className="min-w-[700px] flex flex-col gap-4">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 text-[11px] font-black uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-2">
            <div className="col-span-2">Cấp Độ</div>
            <div className="col-span-5 text-emerald-400">Nhánh Miễn Phí (Free Pass)</div>
            <div className="col-span-5 text-amber-400">Nhánh VIP (Premium Pass)</div>
          </div>

          {/* Tier Rows */}
          {BATTLE_PASS_TIERS.map((tier) => {
            const isUnlocked = player.passLevel >= tier.level;
            const isFreeClaimed = player.claimedFreePassTiers.includes(tier.level);
            const isPremiumClaimed = player.claimedPremiumPassTiers.includes(tier.level);

            return (
              <div
                key={tier.level}
                className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl border transition ${
                  isUnlocked
                    ? 'bg-purple-950/20 border-purple-800/60'
                    : 'bg-neutral-950/40 border-neutral-900 opacity-70'
                }`}
              >
                {/* Level indicator */}
                <div className="col-span-2 flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm border ${
                    isUnlocked ? 'bg-purple-600 text-white border-purple-400' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                  }`}>
                    {tier.level}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">{tier.requiredExp} EXP</span>
                </div>

                {/* Free Reward */}
                <div className="col-span-5 flex items-center justify-between bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40">
                  <span className="text-xs font-bold text-emerald-200 truncate">
                    {tier.freeReward.label}
                  </span>

                  {isFreeClaimed ? (
                    <span className="text-[10px] text-neutral-400 font-bold bg-black/40 px-2 py-0.5 rounded">
                      ĐÃ NHẬN
                    </span>
                  ) : (
                    <button
                      disabled={!isUnlocked}
                      onClick={() => {
                        sound.playPlant();
                        onClaimFreeTier(tier.level, tier.freeReward);
                        confetti({ particleCount: 30, spread: 50 });
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold text-[11px] rounded-lg transition"
                    >
                      Nhận
                    </button>
                  )}
                </div>

                {/* Premium Reward */}
                <div className="col-span-5 flex items-center justify-between bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/40">
                  <span className="text-xs font-bold text-amber-200 truncate">
                    {tier.premiumReward.label}
                  </span>

                  {isPremiumClaimed ? (
                    <span className="text-[10px] text-neutral-400 font-bold bg-black/40 px-2 py-0.5 rounded">
                      ĐÃ NHẬN
                    </span>
                  ) : (
                    <button
                      disabled={!isUnlocked || !player.hasPremiumPass}
                      onClick={() => {
                        sound.playPowerup();
                        onClaimPremiumTier(tier.level, tier.premiumReward);
                        confetti({ particleCount: 60, spread: 70 });
                      }}
                      className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-black text-[11px] rounded-lg transition"
                    >
                      {player.hasPremiumPass ? 'Nhận VIP' : 'Cần VIP'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
