import React from 'react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/audio';

interface CampHubProps {
  player: PlayerProfile;
  onUpgradeCamp: (facility: keyof PlayerProfile['campUpgrades'], costSouls: number) => void;
  onCollectDailySupplies: () => void;
  onRefillWateringCan: () => void;
}

export const CampHub: React.FC<CampHubProps> = ({
  player,
  onUpgradeCamp,
  onCollectDailySupplies,
  onRefillWateringCan
}) => {
  const laQuanCost = (player.campUpgrades.laQuanHeadquarters + 1) * 150;
  const tuyetTinhCost = (player.campUpgrades.tuyetTinhScouts + 1) * 120;
  const yosukeCost = (player.campUpgrades.yosukeDojo + 1) * 200;
  const gardenCost = (player.campUpgrades.goldenGarden + 1) * 180;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-emerald-50 animate-fadeIn select-none">
      {/* Camp Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-900/30 border border-emerald-700/50 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-950/80 text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-800/60">
                🏰 CỨ ĐIỂM HẬU PHƯƠNG
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                PHỤ TRÁCH: LA QUÂN & TUYẾT TĨNH
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-emerald-100 mt-2">
              Trại Sinh Tồn Tuyết Mộc
            </h2>
            <p className="text-emerald-300/80 text-sm mt-1 max-w-xl">
              Cứ điểm an toàn được giải cứu từ tay Bạo Chúa Vô Năng. Nơi cung cấp nguồn Ánh Sáng Mặt Trời, Tinh Hồn thám thính và huấn luyện thẻ linh.
            </p>
          </div>

          {/* Quick Supply Drop */}
          <button
            onClick={() => {
              sound.playSunPickup();
              onCollectDailySupplies();
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl shadow-[0_4px_0_rgb(5,150,105)] transition transform active:scale-95 whitespace-nowrap"
          >
            <span>📦</span>
            <span>Nhận Tiếp Tế Hậu Cần</span>
          </button>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. La Quân Headquarters */}
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-emerald-700/50 flex items-center justify-center text-2xl">
                🎖️
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-200">Tổng Bộ Hậu Cần La Quân</h3>
                <p className="text-xs text-emerald-400 font-mono">Cấp độ: {player.campUpgrades.laQuanHeadquarters}</p>
              </div>
            </div>
            <span className="text-xs bg-black/40 text-yellow-400 px-2.5 py-1 rounded-xl font-bold border border-emerald-800/50">
              +{player.campUpgrades.laQuanHeadquarters * 50} ☀️ / trận
            </span>
          </div>

          <p className="text-xs text-emerald-300/80 leading-relaxed bg-black/30 p-3 rounded-2xl border border-emerald-900/40">
            La Quân phụ trách phân bổ lương thực và súng đạn tịch thu, tự động tăng lượng Ánh Sáng Mặt Trời khởi đầu cho Tuyết Mộc trong mọi trận chiến.
          </p>

          <button
            disabled={player.spiritSouls < laQuanCost}
            onClick={() => {
              sound.playClick();
              onUpgradeCamp('laQuanHeadquarters', laQuanCost);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition border flex items-center justify-center gap-2 ${
              player.spiritSouls >= laQuanCost
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_3px_0_rgb(5,150,105)]'
                : 'bg-black/40 text-emerald-600/40 border-emerald-900/30 opacity-60'
            }`}
          >
            <span>Nâng Cấp Hậu Cần</span>
            <span>(Phí: {laQuanCost} 🔮)</span>
          </button>
        </div>

        {/* 2. Tuyết Tĩnh Scouts */}
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-emerald-700/50 flex items-center justify-center text-2xl">
                🐇
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-200">Đội Trinh Sát Tuyết Tĩnh</h3>
                <p className="text-xs text-emerald-400 font-mono">Cấp độ: {player.campUpgrades.tuyetTinhScouts}</p>
              </div>
            </div>
            <span className="text-xs bg-black/40 text-purple-300 px-2.5 py-1 rounded-xl font-bold border border-emerald-800/50">
              +{player.campUpgrades.tuyetTinhScouts * 40} 🔮 / chiến dịch
            </span>
          </div>

          <p className="text-xs text-emerald-300/80 leading-relaxed bg-black/30 p-3 rounded-2xl border border-emerald-900/40">
            Tuyết Tĩnh sử dụng Thẻ Linh Hồn "Thỏ Nhỏ" (Cấp C, hỗ trợ) thám thính các vùng Bí Cảnh nguy hiểm, mang về lượng lớn Tinh Hồn và vật phẩm quý hiếm.
          </p>

          <button
            disabled={player.spiritSouls < tuyetTinhCost}
            onClick={() => {
              sound.playClick();
              onUpgradeCamp('tuyetTinhScouts', tuyetTinhCost);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition border flex items-center justify-center gap-2 ${
              player.spiritSouls >= tuyetTinhCost
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_3px_0_rgb(5,150,105)]'
                : 'bg-black/40 text-emerald-600/40 border-emerald-900/30 opacity-60'
            }`}
          >
            <span>Nâng Cấp Đội Trinh Sát</span>
            <span>(Phí: {tuyetTinhCost} 🔮)</span>
          </button>
        </div>

        {/* 3. Yagu Yosuke Dojo */}
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-emerald-700/50 flex items-center justify-center text-2xl">
                ⚔️
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-200">Võ Đường Samurai Yosuke</h3>
                <p className="text-xs text-emerald-400 font-mono">Cấp độ: {player.campUpgrades.yosukeDojo}</p>
              </div>
            </div>
            <span className="text-xs bg-black/40 text-red-300 px-2.5 py-1 rounded-xl font-bold border border-emerald-800/50">
              +{(player.campUpgrades.yosukeDojo * 15)}% Sát thương Pháo Dưa Hấu
            </span>
          </div>

          <p className="text-xs text-emerald-300/80 leading-relaxed bg-black/30 p-3 rounded-2xl border border-emerald-900/40">
            Kiếm sĩ Samurai cuồng dưa hấu huấn luyện các thẻ bài chiến đấu, tăng uy lực đạn Dưa Hấu và phản xạ cận chiến chống ma thú cấp cao.
          </p>

          <button
            disabled={player.spiritSouls < yosukeCost}
            onClick={() => {
              sound.playClick();
              onUpgradeCamp('yosukeDojo', yosukeCost);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition border flex items-center justify-center gap-2 ${
              player.spiritSouls >= yosukeCost
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_3px_0_rgb(5,150,105)]'
                : 'bg-black/40 text-emerald-600/40 border-emerald-900/30 opacity-60'
            }`}
          >
            <span>Nâng Cấp Võ Đường</span>
            <span>(Phí: {yosukeCost} 🔮)</span>
          </button>
        </div>

        {/* 4. Golden Watering Can & Garden */}
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-emerald-700/50 flex items-center justify-center text-2xl">
                🚰
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-200">Vườn Bác Sĩ & Bình Tưới Vàng</h3>
                <p className="text-xs text-emerald-400 font-mono">Số lần tưới còn lại: {player.goldenWateringCharges}</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playWateringCan();
                onRefillWateringCan();
              }}
              className="text-xs bg-yellow-500 text-neutral-950 px-3 py-1 rounded-xl font-black hover:bg-yellow-400 transition shadow"
            >
              Nạp Đầy Nước Vô Hạn 💧
            </button>
          </div>

          <p className="text-xs text-emerald-300/80 leading-relaxed bg-black/30 p-3 rounded-2xl border border-emerald-900/40">
            Bình Tưới Vàng - cổ vật thần kỳ cung cấp dòng nước Vô Hạn giúp thanh tẩy virus và chữa lành ngay lập tức toàn bộ thẻ bài trên chiến trường.
          </p>

          <button
            disabled={player.spiritSouls < gardenCost}
            onClick={() => {
              sound.playClick();
              onUpgradeCamp('goldenGarden', gardenCost);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition border flex items-center justify-center gap-2 ${
              player.spiritSouls >= gardenCost
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_3px_0_rgb(5,150,105)]'
                : 'bg-black/40 text-emerald-600/40 border-emerald-900/30 opacity-60'
            }`}
          >
            <span>Mở Rộng Vườn Bác Sĩ</span>
            <span>(Phí: {gardenCost} 🔮)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
