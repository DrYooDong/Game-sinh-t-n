import React, { useState } from 'react';
import { StoryArc, StoryChoice } from '../types/game';
import { CharacterAvatar } from './Avatars';
import { sound } from '../utils/audio';

interface StoryDialogProps {
  arc: StoryArc;
  onStartBattle: () => void;
  onChoiceReward: (choice: StoryChoice) => void;
  onSkipStory: () => void;
}

export const StoryDialog: React.FC<StoryDialogProps> = ({
  arc,
  onStartBattle,
  onChoiceReward,
  onSkipStory
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [chosenOption, setChosenOption] = useState<string | null>(null);

  const step = arc.storyDialogs[currentStepIndex];
  const isLastStep = currentStepIndex >= arc.storyDialogs.length - 1;

  const handleNext = () => {
    sound.playClick();
    if (isLastStep) {
      onStartBattle();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
      setChosenOption(null);
    }
  };

  const handleSelectChoice = (choice: StoryChoice) => {
    sound.playSunPickup();
    setChosenOption(choice.outcomeText);
    onChoiceReward(choice);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 text-emerald-50 select-none animate-fadeIn">
      {/* Bento Top Header Banner */}
      <div className="bg-emerald-900/30 border border-emerald-700/50 p-4 md:p-5 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] text-2xl flex-shrink-0">
            📖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                {arc.title}
              </span>
              <span className="text-[10px] text-emerald-500 font-mono">
                HỒI THOẠI: {currentStepIndex + 1}/{arc.storyDialogs.length}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-emerald-100 mt-1">
              {arc.subtitle}
            </h2>
          </div>
        </div>

        <button
          onClick={onSkipStory}
          className="text-xs text-emerald-400 hover:text-white bg-black/40 hover:bg-emerald-900/50 px-4 py-2 rounded-xl border border-emerald-700/50 transition font-bold"
        >
          Bỏ Qua Cốt Truyện ⏩
        </button>
      </div>

      {/* Main Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Bento: Character & Environment Tile */}
        <section className="lg:col-span-4 bg-emerald-900/20 border border-emerald-800/50 rounded-3xl p-5 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-800/50 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              Nhân Vật & Vị Trí
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">SECTOR 7</span>
          </div>

          {/* Character Profile Box */}
          <div className="flex items-center gap-3 bg-black/40 p-3.5 rounded-2xl border border-emerald-700/30">
            <CharacterAvatar
              avatarId={step.speakerAvatar}
              expression={step.expression}
              className="w-16 h-16 rounded-2xl shadow-md ring-2 ring-emerald-500/60"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-emerald-400 font-mono uppercase tracking-wider">Nhân vật đang nói</p>
              <h4 className="text-base font-black text-emerald-200 truncate">{step.speakerName}</h4>
              <p className="text-[11px] text-yellow-400 font-medium italic truncate">{step.speakerRole}</p>
            </div>
          </div>

          {/* Status Bars (HP / MP / Sun Power) */}
          <div className="flex flex-col gap-3">
            <div className="bg-black/40 p-3 rounded-xl border border-emerald-700/30">
              <div className="flex justify-between items-center text-[10px] text-emerald-400 mb-1">
                <span className="font-mono uppercase">Sinh Lực (HP)</span>
                <span className="font-mono text-emerald-300">1,850/2,000</span>
              </div>
              <div className="w-full h-2.5 bg-emerald-950 rounded-full overflow-hidden">
                <div className="w-[90%] h-full bg-gradient-to-r from-emerald-600 to-green-400"></div>
              </div>
            </div>

            <div className="bg-black/40 p-3 rounded-xl border border-emerald-700/30">
              <div className="flex justify-between items-center text-[10px] text-emerald-400 mb-1">
                <span className="font-mono uppercase">Năng Lượng Thần Thụ (MP)</span>
                <span className="font-mono text-blue-300">320/400</span>
              </div>
              <div className="w-full h-2.5 bg-emerald-950 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-gradient-to-r from-blue-600 to-teal-400"></div>
              </div>
            </div>
          </div>

          {/* Equipment / Perks Bento Compartments */}
          <div className="mt-auto space-y-2 pt-2 border-t border-emerald-800/40">
            <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">
              Bí Cảnh & Trang Bị Hiện Tại
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-emerald-800/30 rounded-xl flex flex-col items-center justify-center border border-emerald-700/40 text-lg" title="Bình tưới">
                🚰
              </div>
              <div className="aspect-square bg-emerald-800/30 rounded-xl flex flex-col items-center justify-center border border-emerald-700/40 text-lg" title="Thẻ bài">
                🃏
              </div>
              <div className="aspect-square bg-emerald-800/30 rounded-xl flex flex-col items-center justify-center border border-emerald-700/40 text-lg" title="Khí cầu">
                🎈
              </div>
            </div>
          </div>
        </section>

        {/* Right Bento: Dialogue & Narrative Log */}
        <section className="lg:col-span-8 bg-emerald-950/60 border border-emerald-800/50 rounded-3xl p-5 md:p-6 flex flex-col justify-between shadow-2xl space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-emerald-800/50 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                Cốt Truyện & Nhật Ký Bí Cảnh
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">
                {arc.backgroundTheme}
              </span>
            </div>

            {/* Context Story Description */}
            <div className="bg-black/30 border-l-2 border-emerald-500 pl-3.5 py-2.5 rounded-r-xl">
              <p className="text-[10px] font-mono not-italic text-emerald-400 uppercase">
                Bối Cảnh Trận Địa:
              </p>
              <p className="text-xs text-emerald-200/90 leading-relaxed font-sans mt-0.5">
                {arc.description}
              </p>
            </div>

            {/* Live Character Dialogue Bubble */}
            <div className="bg-black/50 border border-emerald-700/40 rounded-2xl p-4 md:p-5 shadow-inner space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-300">
                  {step.speakerName}
                </span>
                <span className="text-[10px] text-emerald-500 font-mono">
                  • [{step.speakerRole}]
                </span>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-emerald-100 font-medium italic">
                “{step.dialogue}”
              </p>
            </div>

            {/* Tactical Choices Branch */}
            {step.choices && step.choices.length > 0 && !chosenOption && (
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
                  ⚡ Quyết Định Chiến Lược Của Tuyết Mộc:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {step.choices.map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectChoice(choice)}
                      className="text-left bg-emerald-900/30 hover:bg-emerald-800/40 border border-emerald-700/50 hover:border-yellow-400 p-3 rounded-2xl text-xs md:text-sm font-semibold text-emerald-100 transition shadow"
                    >
                      👉 {choice.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chosen outcome notification */}
            {chosenOption && (
              <div className="p-3 bg-emerald-900/40 border border-yellow-500/50 rounded-2xl text-yellow-200 text-xs md:text-sm font-semibold animate-fadeIn flex items-center gap-2">
                <span>✨</span>
                <span>{chosenOption}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-emerald-800/50 flex justify-end">
            <button
              onClick={handleNext}
              className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_4px_0_rgb(5,150,105)] flex items-center justify-center gap-2"
            >
              {isLastStep ? (
                <>
                  <span>Vào Trận Chiến Đấu</span>
                  <span>⚔️</span>
                </>
              ) : (
                <>
                  <span>Tiếp Tục Cốt Truyện</span>
                  <span>➡️</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
