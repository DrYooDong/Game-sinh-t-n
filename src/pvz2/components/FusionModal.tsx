import React from 'react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/audio';

interface FusionModalProps {
  player: PlayerProfile;
  onSelectFusion: (fusionId: string) => void;
}

export const FusionModal: React.FC<FusionModalProps> = ({
  player,
  onSelectFusion
}) => {
  const fusions = [
    {
      id: 'balloon_zombie',
      name: 'Nhập Thể: Zombie Bóng Bay',
      subtitle: 'Khinh Khí Cầu Mặt Quỷ & Không Kích',
      icon: '🎈',
      description: 'Cho phép Tuyết Mộc bay lơ lửng trên không trung, hoàn toàn miễn nhiễm với các đòn quét dưới mặt đất của quái vật và thả bom đậu diện rộng.',
      unlockedAtArc: 2,
      effect: '+150% Tốc độ di chuyển và Thả mưa bom đậu gây 400 sát thương khi kích hoạt.'
    },
    {
      id: 'asparagus_jet',
      name: 'Nhập Thể: Chiến Cơ Măng Tây',
      subtitle: 'Oanh Tạc Cơ Tốc Độ Siêu Thanh',
      icon: '🚀',
      description: 'Dung hợp với tiêm kích Măng Tây, bay lượn với vận tốc chóng mặt và phóng ra các chùm tên lửa măng tây xuyên thấu toàn màn hình.',
      unlockedAtArc: 4,
      effect: 'Xuyên giáp 100% và giảm 50% thời gian hồi chiêu thẻ bài toàn trận.'
    },
    {
      id: 'gatling_peashooter',
      name: 'Nhập Thể: Thiết Giáp Tiểu Thôn',
      subtitle: 'Cỗ Máy Xả Đạn Gatling Vô Tận',
      icon: '🔫',
      description: 'Tiểu Thôn biến hình thành bộ giáp Gatling hạng nặng bao bọc Tuyết Mộc, bắn liên thanh 200 viên đạn đậu siêu nhiệt nung chảy mọi phòng tuyến.',
      unlockedAtArc: 1,
      effect: 'Tăng 300% sát thương đạn đậu và tự động đốt cháy đạn thành lửa.'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-emerald-50 animate-fadeIn select-none">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-900/30 border border-emerald-700/50 p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-950/80 text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-800/60">
            🧬 CƠ CHẾ ĐẶC BIỆT
          </span>
          <span className="text-xs text-emerald-400 font-mono">
            KỸ NĂNG ĐỘC QUYỀN CỦA TUYẾT MỘC
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-emerald-100 mt-2">
          Cơ Chế Nhập Thể Thần Bí
        </h2>
        <p className="text-emerald-300/80 text-sm mt-1 max-w-2xl">
          Tuyết Mộc có thể trực tiếp dung hợp linh hồn với các thẻ bài thực vật và zombie đặc biệt để thay đổi dạng chiến đấu và kích hoạt các năng lực phi thường trên chiến trường.
        </p>
      </div>

      {/* Fusion Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {fusions.map((item) => {
          const isUnlocked = player.currentArcId >= item.unlockedAtArc;
          const isEquipped = player.equippedFusion === item.id || (!player.equippedFusion && item.id === 'balloon_zombie');

          return (
            <div
              key={item.id}
              className={`relative rounded-3xl p-6 border flex flex-col justify-between shadow-2xl transition-all ${
                isEquipped
                  ? 'bg-emerald-900/40 border-emerald-400 ring-2 ring-emerald-400/50'
                  : 'bg-emerald-950/40 border-emerald-800/50 hover:border-emerald-600/60'
              } ${!isUnlocked ? 'opacity-50 grayscale' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl p-3.5 bg-black/40 rounded-2xl border border-emerald-700/50 shadow-inner">
                    {item.icon}
                  </span>
                  {isEquipped && (
                    <span className="text-xs bg-emerald-500 text-neutral-950 font-black px-2.5 py-1 rounded-full">
                      ĐANG TRANG BỊ
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-emerald-200">{item.name}</h3>
                <p className="text-xs text-emerald-400 font-mono mb-3">{item.subtitle}</p>

                <p className="text-xs text-emerald-300/80 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="bg-black/40 p-3.5 rounded-2xl border border-emerald-700/40 text-xs text-emerald-300 font-medium">
                  ⚡ Hiệu ứng: {item.effect}
                </div>
              </div>

              <div className="mt-5">
                {isUnlocked ? (
                  <button
                    onClick={() => {
                      sound.playPlantFood();
                      onSelectFusion(item.id);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition shadow ${
                      isEquipped
                        ? 'bg-black/40 text-emerald-600/50 border border-emerald-900/30 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_3px_0_rgb(5,150,105)]'
                    }`}
                  >
                    {isEquipped ? 'Đang Dung Hợp' : 'Kích Hoạt Nhập Thể'}
                  </button>
                ) : (
                  <div className="text-center py-2 text-xs text-red-400 font-bold bg-black/40 rounded-xl border border-red-900/50">
                    🔒 Mở khóa ở Giai Đoạn {item.unlockedAtArc}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
