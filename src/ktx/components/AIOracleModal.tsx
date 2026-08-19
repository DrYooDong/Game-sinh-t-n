import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Companion, Skill, StagePhase } from '../types';
import { requestCompanionChat, requestDynamicEvent } from '../utils/gemini';
import { soundManager } from '../utils/audio';
import { Bot, Sparkles, Send, X, MessageSquare, Brain, HeartHandshake, ShieldAlert, Zap } from 'lucide-react';

interface AIOracleModalProps {
  companion: Companion;
  playerSkill: Skill;
  currentStage: StagePhase;
  currentDay: number;
  sanity: number;
  onBoostSanity: (amount: number) => void;
  onClose: () => void;
}

export const AIOracleModal: React.FC<AIOracleModalProps> = ({
  companion,
  playerSkill,
  currentStage,
  currentDay,
  sanity,
  onBoostSanity,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'companion' | 'oracle'>('companion');
  const [messages, setMessages] = useState<Array<{ sender: 'player' | 'companion' | 'system'; text: string; time: string }>>([
    {
      sender: 'companion',
      text: `"Chào bạn tôi! Hôm nay là Ngày ${currentDay} của ${currentStage.name}. Cứ nói cho tớ biết nếu cậu cần bàn chiến thuật hay chia sẻ điều gì nhé!"`,
      time: '00:00'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputVal.trim() || loading) return;
    soundManager.play('click');

    const userText = inputVal.trim();
    setInputVal('');
    const timeStr = new Date().toLocaleTimeString().slice(3, 8);

    setMessages((prev) => [...prev, { sender: 'player', text: userText, time: timeStr }]);
    setLoading(true);

    try {
      const response = await requestCompanionChat({
        companionName: companion.name,
        companionSkill: companion.skill.name,
        message: userText,
        day: currentDay,
        stage: currentStage.name,
        sanity
      });

      soundManager.play('item_get');
      setMessages((prev) => [
        ...prev,
        {
          sender: 'companion',
          text: response.reply,
          time: new Date().toLocaleTimeString().slice(3, 8)
        }
      ]);

      if (response.sanityBoost) {
        onBoostSanity(response.sanityBoost);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'companion',
          text: 'Tớ hơi căng thẳng một chút, nhưng tớ luôn tin tưởng cậu!',
          time: new Date().toLocaleTimeString().slice(3, 8)
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-cyan-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Trí Tuệ Cố Vấn & Tâm Tình Đồng Đội
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Trò Chuyện Cùng {companion.name}
              </h3>
              <p className="text-[10px] text-neutral-400">
                Giao lưu tăng điểm Tinh Thần (+Sanity) và nhận lời khuyên chiến thuật
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.play('click');
              onClose();
            }}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Box */}
        <div className="flex-1 overflow-y-auto space-y-2 p-3 bg-neutral-900 border border-neutral-800 min-h-[250px] max-h-[45vh] mb-3 text-xs">
          {messages.map((m, idx) => {
            const isPlayer = m.sender === 'player';
            return (
              <div
                key={idx}
                className={`flex flex-col ${isPlayer ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[9px] text-neutral-500 mb-0.5">
                  {isPlayer ? 'Bạn' : companion.name} • {m.time}
                </div>
                <div
                  className={`p-2.5 max-w-[85%] border text-[11px] leading-relaxed ${
                    isPlayer
                      ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-100'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-200'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="text-[10px] text-cyan-400 animate-pulse">
              {companion.name} đang suy nghĩ hồi đáp...
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Nói chuyện với ${companion.name}...`}
            className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            disabled={loading || !inputVal.trim()}
            onClick={handleSendMessage}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              !loading && inputVal.trim()
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-800 cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
