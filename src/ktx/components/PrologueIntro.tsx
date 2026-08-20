import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_POOL, INITIAL_ITEMS } from '../data/initialData';
import { Skill, SkillTier } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Shield, Swords, Zap, RefreshCw, ArrowRight, User, HeartHandshake } from 'lucide-react';

interface PrologueIntroProps {
  onComplete: (data: {
    playerName: string;
    companionName: string;
    companionGender: 'male' | 'female';
    playerSkill: Skill;
    companionSkill: Skill;
  }) => void;
}

export const PrologueIntro: React.FC<PrologueIntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [playerName, setPlayerName] = useState('Tiết Mộc');
  const [companionName, setCompanionName] = useState('Tinh Thần');
  const [companionGender, setCompanionGender] = useState<'male' | 'female'>('female');
  
  // Random skills
  const [playerSkill, setPlayerSkill] = useState<Skill>(SKILL_POOL[0]); // SSS Thiên Phú Chúa Tể
  const [companionSkill, setCompanionSkill] = useState<Skill>(SKILL_POOL[6]); // A Thanh Linh Kiếm Quyết
  const [isRolling, setIsRolling] = useState(false);

  const rollSkills = () => {
    soundManager.play('skill');
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomSkillP = SKILL_POOL[Math.floor(Math.random() * SKILL_POOL.length)];
      const randomSkillC = SKILL_POOL[Math.floor(Math.random() * SKILL_POOL.length)];
      setPlayerSkill(randomSkillP);
      setCompanionSkill(randomSkillC);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setIsRolling(false);
        soundManager.play('level_up');
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }, 80);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-mono">
      <div className="relative w-full max-w-3xl bg-neutral-950 border-2 border-cyan-500/50 p-6 md:p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-neutral-100">
        
        {/* Top Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Hệ Thống Dịch Chuyển Toàn Cầu
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-5 mt-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                THẾ GIỚI SINH TỒN: KÝ TÚC XÁ ZOMBIE #100
              </h1>
              <p className="text-[10px] text-cyan-400">
                GIAI ĐOẠN KHỞI TẠO DỮ LIỆU THỰC TẠI
              </p>
            </div>
          </div>
          <div className="text-right text-[10px] text-neutral-400">
            <div>BƯỚC: 0{step}/03</div>
            <div className="text-emerald-400 font-bold uppercase">ĐANG KẾT NỐI</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
              {/* STEP 1: Cốt truyện & Biến cố dịch chuyển */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <div className="p-4 bg-neutral-900/90 border border-neutral-800 text-xs leading-relaxed text-neutral-300 space-y-3">
                <p className="text-amber-300 font-bold uppercase flex items-center gap-1.5 border-b border-amber-500/20 pb-1.5">
                  <Sparkles className="w-4 h-4" /> [CHƯƠNG 1: KHỞI ĐẦU HỖN LOẠN – THỨC TỈNH THIÊN PHÚ CHÚA TỂ]
                </p>
                <p>
                  Tiếng chuông báo động rền vang như xé toạc màng nhĩ. <strong>Tuyết Mộc</strong> mở choàng mắt trong căn phòng ký túc xá 200 ẩm mốc. Ngồi co ro ở góc giường tầng ọp ẹp là <strong>Tinh Thần</strong> – hoa khôi nổi tiếng lạnh lùng của lớp đang kinh hoàng tột độ.
                </p>
                <div className="bg-cyan-950/60 border-l-4 border-cyan-400 p-2.5 text-cyan-200 text-[11px] font-mono space-y-1">
                  <div className="font-bold text-cyan-300">★ [KÍCH HOẠT THIÊN PHÚ ẨN: CHÚA TỂ DUNG HỢP (CẤP 1)]</div>
                  <div>• Duy trì trạng thái nghỉ ngơi / ngủ để sản sinh <strong>Tiền Chúa Tể</strong> (40 xu/giờ).</div>
                  <div>• Tiền Chúa Tể có thể cường hóa, tái cấu trúc và dung hợp vạn vật trong ký túc xá!</div>
                  <div className="text-emerald-300 font-bold">• Đồng đội chất lượng cao Tinh Thần gia tăng: <strong>+96% tốc độ sản xuất</strong>!</div>
                </div>
                <p>
                  *RẦM!* Tên côn đồ <strong>Vương Đại Tráng</strong> dẫn đàn em đá mạnh vào cánh cửa gỗ mục nát phòng 200 hòng cướp đoạt gói quà tân thủ. Tuyết Mộc lập tức kích hoạt Tiền Chúa Tể: <em>"Cường hóa Cửa Gỗ -&gt; Cửa Hợp Kim Ánh Kim!"</em>. Một tia sáng lam quét qua, cánh cửa biến thành khối kim loại lạnh lẽo, hất văng Vương Đại Tráng gãy xương ống chân!
                </p>
                <p className="text-rose-400 text-[11px]">
                  Còi báo động rít lên: Màn đêm buông xuống, đợt Zombie sơ cấp tràn vào hành lang xé toạc các phòng yếu ớt... Cuộc đại chiến sinh tồn chính thức bắt đầu!
                </p>
              </div>

              <div className="text-right pt-2">
                <button
                  id="btn_prologue_next_1"
                  onClick={() => {
                    soundManager.play('click');
                    setStep(2);
                  }}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest text-xs border-b-4 border-cyan-800 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 ml-auto"
                >
                  <span>Tiếp Tục Thiết Lập Nhân Vật</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Tên nhân vật & Bạn đồng hành */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Player Profile */}
                <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase">
                    <User className="w-4 h-4" /> Nhân Vật Của Bạn
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1 uppercase">Tên của bạn:</label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value || 'Tiết Mộc')}
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 text-white font-bold focus:border-cyan-400 focus:outline-none"
                      placeholder="Nhập tên nhân vật..."
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    Cương vị: Trưởng phòng 200. Sở hữu Thiên Phú Chúa Tể, ngủ để cường hóa vạn vật và dẫn dắt KTX Phong Vương.
                  </p>
                </div>

                {/* Companion Profile */}
                <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold uppercase">
                    <HeartHandshake className="w-4 h-4" /> Bạn Thân Cùng Dịch Chuyển
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1 uppercase">Tên bạn thân:</label>
                    <input
                      type="text"
                      value={companionName}
                      onChange={(e) => setCompanionName(e.target.value || 'Thế Anh')}
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 text-white font-bold focus:border-rose-400 focus:outline-none"
                      placeholder="Tên bạn thân..."
                    />
                  </div>
                  <div className="flex gap-2 items-center pt-1">
                    <label className="text-[10px] text-neutral-400 uppercase">Giới tính:</label>
                    <button
                      type="button"
                      onClick={() => setCompanionGender('male')}
                      className={`px-3 py-1 text-[10px] uppercase font-bold border transition-all cursor-pointer ${
                        companionGender === 'male' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Nam (Chiến hữu)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompanionGender('female')}
                      className={`px-3 py-1 text-[10px] uppercase font-bold border transition-all cursor-pointer ${
                        companionGender === 'female' ? 'bg-rose-600 border-rose-400 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Nữ (Bạn cùng phòng)
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white text-xs uppercase"
                >
                  Quay lại
                </button>
                <button
                  id="btn_prologue_next_2"
                  onClick={() => {
                    soundManager.play('click');
                    setStep(3);
                    rollSkills();
                  }}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest text-xs border-b-4 border-cyan-800 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
                >
                  <span>Thức Tỉnh Kỹ Năng & Mở Quà</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Gacha kỹ năng & Quà tân thủ */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
                  QUY TRÌNH THỨC TỈNH KỸ NĂNG TÂN THỦ
                </h3>
                <p className="text-[10px] text-neutral-400">
                  Mỗi người chơi và đồng đội sẽ ngẫu nhiên nhận Kỹ Năng Thiên Phú phân cấp từ Cấp F đến Cấp SSS Thần Thoại.
                </p>
              </div>

              {/* Skills Display Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Player Awakened Skill */}
                <div className="p-3 bg-neutral-900 border-2 border-cyan-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] px-1.5 py-0.2 bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold uppercase">
                      KỸ NĂNG [{playerSkill.tier}]
                    </span>
                    <span className="text-[10px] text-neutral-400">{playerName}</span>
                  </div>
                  <div className="flex items-center gap-2.5 my-1">
                    <span className="text-2xl">{playerSkill.icon}</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs">{playerSkill.name}</h4>
                      <p className="text-[10px] text-cyan-300 font-mono">Tiêu hao: {playerSkill.mpCost} MP | Hồi chiêu: {playerSkill.cooldownTurns} lượt</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-300 bg-neutral-950 p-2 border border-neutral-800 leading-relaxed">
                    {playerSkill.description}
                  </p>
                </div>

                {/* Companion Awakened Skill */}
                <div className="p-3 bg-neutral-900 border-2 border-rose-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] px-1.5 py-0.2 bg-rose-950 border border-rose-400 text-rose-300 font-bold uppercase">
                      KỸ NĂNG [{companionSkill.tier}]
                    </span>
                    <span className="text-[10px] text-neutral-400">{companionName}</span>
                  </div>
                  <div className="flex items-center gap-2.5 my-1">
                    <span className="text-2xl">{companionSkill.icon}</span>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs">{companionSkill.name}</h4>
                      <p className="text-[10px] text-rose-300 font-mono">Tiêu hao: {companionSkill.mpCost} MP | Hồi chiêu: {companionSkill.cooldownTurns} lượt</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-300 bg-neutral-950 p-2 border border-neutral-800 leading-relaxed">
                    {companionSkill.description}
                  </p>
                </div>
              </div>

              {/* Starter Pack Loot Preview */}
              <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-400 flex items-center gap-1 uppercase">
                    <Shield className="w-3 h-3" /> Gói Quà Tân Thủ Kèm Theo:
                  </span>
                  <span className="text-emerald-400 uppercase font-bold">ĐÃ ĐƯA VÀO TÚI ĐỒ</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
                  {INITIAL_ITEMS.map((item) => (
                    <div key={item.id} className="bg-neutral-950 border border-neutral-800 p-1.5 text-center" title={`${item.name} x${item.quantity}`}>
                      <div className="text-lg">{item.icon}</div>
                      <div className="text-[9px] text-neutral-300 truncate mt-0.5">{item.name}</div>
                      <div className="text-[9px] text-cyan-400 font-bold">x{item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={isRolling}
                  onClick={rollSkills}
                  className="w-full sm:w-auto px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-bold text-neutral-200 flex items-center justify-center gap-2 transition-all cursor-pointer uppercase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin text-cyan-400' : ''}`} />
                  Quay Lại Kỹ Năng (Reroll)
                </button>

                <button
                  id="btn_start_survival_game"
                  disabled={isRolling}
                  onClick={() => {
                    soundManager.play('level_up');
                    onComplete({
                      playerName,
                      companionName,
                      companionGender,
                      playerSkill,
                      companionSkill
                    });
                  }}
                  className="w-full sm:w-auto px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs border-b-4 border-emerald-800 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                >
                  <Swords className="w-4 h-4" /> BẮT ĐẦU SINH TỒN KÝ TÚC XÁ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
