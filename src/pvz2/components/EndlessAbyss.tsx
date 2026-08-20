import React, { useState } from 'react';
import { PlayerProfile } from '../types/game';
import { MOCK_LEADERBOARD, LeaderboardEntry } from '../data/monetizationData';
import { CharacterAvatar } from './Avatars';
import { sound } from '../utils/audio';

interface EndlessAbyssProps {
  player: PlayerProfile;
  onStartEndlessBattle: () => void;
}

export const EndlessAbyss: React.FC<EndlessAbyssProps> = ({
  player,
  onStartEndlessBattle
}) => {
  const [activeTab, setActiveTab] = useState<'arena' | 'ranking' | 'rewards'>('arena');

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn select-none">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-red-600/70 bg-gradient-to-r from-red-950 via-slate-950 to-black p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow animate-pulse">
                ĐẤU TRƯỜNG ĐỈNH CAO
              </span>
              <span className="text-xs text-red-300 font-mono">
                Xếp Hạng Quốc Tế Mùa 1
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2 flex items-center gap-2">
              <span>🔥</span> Vực Thẳm Vô Tận (Endless Abyss)
            </h2>
            <p className="text-xs text-neutral-300 mt-1 max-w-xl">
              Thách thức các đợt sóng Zombie bất tận không có điểm dừng! Quái vật tăng cấp máu và hỏa lực theo từng Wave. Sống sót càng lâu, thứ hạng và phần thưởng Kim Cương tuần càng cao!
            </p>
          </div>

          {/* User Highscore Quick Card */}
          <div className="bg-black/70 p-5 rounded-2xl border border-red-500/50 flex flex-col items-center text-center min-w-[220px]">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Kỷ Lục Của Bạn</p>
            <p className="text-3xl font-black text-red-400 mt-1">Wave {player.endlessWaveRecord || 0}</p>
            <p className="text-xs text-amber-300 font-bold mt-0.5">Điểm: {player.endlessScore || 0}</p>
            <button
              onClick={() => {
                sound.playClick();
                onStartEndlessBattle();
              }}
              className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.6)] transition active:scale-95 animate-pulse"
            >
              ⚔️ Xuất Kích Vô Tận
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'arena', label: '🏟️ Đấu Trường & Quy Tắc' },
          { id: 'ranking', label: '🏆 Bảng Xếp Hạng Top 100' },
          { id: 'rewards', label: '💎 Thưởng Tuần' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition border ${
              activeTab === tab.id
                ? 'bg-red-600 text-white border-red-400 shadow-md'
                : 'bg-black/40 text-neutral-300 border-neutral-800 hover:bg-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Arena Overview Tab */}
      {activeTab === 'arena' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-neutral-950/80 p-5 rounded-2xl border border-red-900/50">
            <div className="text-2xl mb-2">🌊</div>
            <h4 className="text-sm font-black text-white">Sóng Quái Vô Hạn</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Cứ mỗi 5 Wave, một Boss Bạo Chúa Đột Biến sẽ xuất hiện với thanh máu gấp 3 lần.
            </p>
          </div>

          <div className="bg-neutral-950/80 p-5 rounded-2xl border border-red-900/50">
            <div className="text-2xl mb-2">🧬</div>
            <h4 className="text-sm font-black text-white">Đột Biến Roguelike</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Nhận thêm 1 Nâng Cấp Sinh Tồn sau mỗi 3 Wave vượt qua thành công để gia tăng hỏa lực.
            </p>
          </div>

          <div className="bg-neutral-950/80 p-5 rounded-2xl border border-red-900/50">
            <div className="text-2xl mb-2">👑</div>
            <h4 className="text-sm font-black text-white">Vinh Danh Toàn Cầu</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Top 10 người chơi cao nhất mỗi tuần nhận danh hiệu Độc Quyền và 1,000 Kim Cương 💎!
            </p>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'ranking' && (
        <div className="bg-black/80 rounded-3xl p-5 md:p-6 border border-neutral-800 shadow-xl overflow-x-auto">
          <div className="min-w-[650px] flex flex-col gap-3">
            <div className="grid grid-cols-12 gap-2 text-xs font-black uppercase text-neutral-400 border-b border-neutral-800 pb-2">
              <div className="col-span-2 text-center">Hạng</div>
              <div className="col-span-5">Người Chơi</div>
              <div className="col-span-3 text-center">Kỷ Lục Wave</div>
              <div className="col-span-2 text-right">Điểm Số</div>
            </div>

            {MOCK_LEADERBOARD.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl border transition ${
                  entry.rank === 1
                    ? 'bg-amber-950/30 border-amber-500/60 shadow-lg'
                    : entry.rank === 2
                    ? 'bg-slate-900/40 border-slate-600/50'
                    : entry.rank === 3
                    ? 'bg-amber-900/20 border-amber-700/40'
                    : 'bg-neutral-950/40 border-neutral-900'
                }`}
              >
                {/* Rank Badge */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                    entry.rank === 1 ? 'bg-amber-400 text-black shadow-[0_0_10px_rgba(245,158,11,0.8)]' :
                    entry.rank === 2 ? 'bg-slate-300 text-black' :
                    entry.rank === 3 ? 'bg-amber-700 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                  </span>
                </div>

                {/* Player Profile */}
                <div className="col-span-5 flex items-center gap-3">
                  <CharacterAvatar avatarId={entry.avatar} className="w-10 h-10 flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-black text-white flex items-center gap-1.5 truncate">
                      <span>{entry.country}</span>
                      <span className="truncate">{entry.playerName}</span>
                      {entry.vipTag && (
                        <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded font-black">
                          {entry.vipTag}
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-neutral-400">{entry.title}</p>
                  </div>
                </div>

                {/* Wave Reached */}
                <div className="col-span-3 text-center">
                  <span className="text-xs font-black text-red-400 bg-red-950/50 px-2.5 py-1 rounded-lg border border-red-800/40">
                    Wave {entry.waveReached}
                  </span>
                </div>

                {/* Score */}
                <div className="col-span-2 text-right">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-b from-amber-950/60 to-black p-5 rounded-2xl border border-amber-500/60 text-center">
            <span className="text-3xl">🥇</span>
            <h4 className="text-base font-black text-amber-400 mt-2">Hạng 1 (Quán Quân)</h4>
            <p className="text-xs text-neutral-300 mt-1">💎 1,500 Kim Cương + Danh hiệu Thần Thoại + Khung Avatar Hỏa Long</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900/60 to-black p-5 rounded-2xl border border-slate-500/60 text-center">
            <span className="text-3xl">🥈</span>
            <h4 className="text-base font-black text-slate-200 mt-2">Hạng 2 - 3 (Á Quân)</h4>
            <p className="text-xs text-neutral-300 mt-1">💎 800 Kim Cương + Khung Avatar Bạch Kim</p>
          </div>

          <div className="bg-gradient-to-b from-purple-950/60 to-black p-5 rounded-2xl border border-purple-500/60 text-center">
            <span className="text-3xl">🎖️</span>
            <h4 className="text-base font-black text-purple-300 mt-2">Hạng 4 - 10</h4>
            <p className="text-xs text-neutral-300 mt-1">💎 400 Kim Cương + 1,000 Tinh Hồn</p>
          </div>
        </div>
      )}
    </div>
  );
};
