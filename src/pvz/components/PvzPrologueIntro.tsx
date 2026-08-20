import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { Sprout, Tv, Users, ShieldAlert, Sparkles, ChevronRight, Globe } from 'lucide-react';

interface PvzPrologueIntroProps {
  onComplete?: () => void;
  onClose?: () => void;
}

export const PvzPrologueIntro: React.FC<PvzPrologueIntroProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState<number>(0);

  const finishPrologue = () => {
    if (onClose) onClose();
    else if (onComplete) onComplete();
  };

  const storySteps = [
    {
      title: 'DỊCH CHUYỂN BẤT NGỜ & TRÒ CHƠI VẬN MỆNH TOÀN CẦU',
      subtitle: 'Tất cả cư dân Lam Tinh chú ý! Trò chơi Vận Mệnh Quốc Gia chính thức bắt đầu!',
      icon: '🌍',
      content:
        'Tuyết Mộc vừa mua một đống hạt giống rau củ tại siêu thị thì đột nhiên biến mất tại chỗ. Trong đầu 10 tỷ người vang lên thông báo: Mỗi quốc gia sẽ ngẫu nhiên cử 1 đại diện tham gia trò chơi sinh tử. Mọi diễn biến được phát sóng trực tiếp cho toàn thế giới theo dõi!'
    },
    {
      title: '70 PHÚT DỪNG THỜI GIAN & LỰA CHỌN NGHỀ NGHIỆP',
      subtitle: 'Phòng livestream Hoa Quốc chấn động trước lựa chọn của Tuyết Mộc',
      icon: '👨‍🌾',
      content:
        'Tuyết Mộc xuất hiện giữa con phố đầy Zombie nhưng thời gian đang bị đóng băng 70 phút. Trong khi các tuyển thủ nước ngoài chọn Súng, Kiếm, Khiên, Tuyết Mộc kích hoạt "Hệ Thống Sân Vườn Bác Sĩ Dave" và lập tức chọn nghề NÔNG DÂN. Cả thế giới sững sờ cho rằng Hoa Quốc sắp diệt vong!'
    },
    {
      title: 'GÓI QUÀ TÂN THỦ & CHIẾC XẺNG DIỆT QUÁI',
      subtitle: 'Mở ra Thẻ Hoa Hướng Dương và Chiếc Xẻng Sắt',
      icon: '🌻',
      content:
        'Dùng chiếc xẻng sắt đập bay đầu zombie đầu tiên, Tuyết Mộc thu được 50 Ánh Nắng và 10 Năng Lượng. Anh triển khai mảnh đất 10m² của Sân Vườn, ném hạt giống xuống đất: Một cây Hoa Hướng Dương mọc lên và nhả ra Mặt Trời nhỏ cung cấp năng lượng vô hạn!'
    },
    {
      title: 'ĐẬU PHÁO LIÊN THANH & ĐỘI QUÂN THÂY MA',
      subtitle: 'Quân đoàn thực vật và thây ma chính thức xuất trận',
      icon: '🟢',
      content:
        'Đậu Pháo bắn nát bầy Zombie chỉ sau 3 phát! Cứ mỗi xác zombie chôn vào đất lại mọc lên Thây Ma chướng ngại cầm xẻng bảo vệ chủ nhân. Từ một con phố nhỏ, Tuyết Mộc sẵn sàng quét sạch ngày tận thế, mang lại tuổi thọ và đất đai màu mỡ cho toàn thể quốc dân!'
    },
    {
      title: 'VĨNH HẰNG GIA VIÊN & CHIẾN DỊCH 7 CHƯƠNG',
      subtitle: 'Dẫn dắt Cửu Châu vươn lên vị thế Bá Chủ Toàn Cầu',
      icon: '👑',
      content:
        'Vượt qua 7 chương chiến dịch: từ Cổng Công Viên, Siêu Thị Tiện Lợi, Ga Tàu Điện Ngầm, Đại Học Nông Nghiệp, đối đầu Yamamoto Sakura Quốc, trảm sát Trùm Vua Sư Tử và chiết xuất Huyết Thanh Thanh Tẩy cứu rỗi toàn thể nhân loại!'
    }
  ];

  const currentStory = storySteps[step];

  const handleNext = () => {
    soundManager.play('click');
    if (step < storySteps.length - 1) {
      setStep(step + 1);
    } else {
      soundManager.play('level_up');
      finishPrologue();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-emerald-500/60 p-6 shadow-2xl text-neutral-100 flex flex-col relative rounded-xs overflow-hidden"
      >
        {/* Top Glowing Header Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

        {/* Live Broadcast Badge */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="text-xs font-black text-rose-400 uppercase tracking-widest">
              TRỰC TIẾP QUỐC VẬN • 1.4 TỶ NGƯỜI XEM
            </span>
          </div>

          <div className="text-xs text-neutral-400 font-bold">
            TIỂU DẪN {step + 1}/{storySteps.length}
          </div>
        </div>

        {/* Story Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 my-2"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xs bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                {currentStory.icon}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                  {currentStory.title}
                </h3>
                <p className="text-xs text-emerald-400 font-bold">{currentStory.subtitle}</p>
              </div>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xs text-xs sm:text-sm text-neutral-300 leading-relaxed min-h-[120px]">
              {currentStory.content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicator and Action Button */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-neutral-800">
          <div className="flex items-center gap-1.5">
            {storySteps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-emerald-400' : 'w-2 bg-neutral-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 rounded-xs shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer transition-all"
          >
            <span>{step === storySteps.length - 1 ? 'BẮT ĐẦU VẬN MỆNH QUỐC GIA' : 'TIẾP TỤC'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
