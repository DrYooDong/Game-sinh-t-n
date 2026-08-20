import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { StoryEvent } from '../types';
import { Tv, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';

interface PvzStoryEventModalProps {
  event: StoryEvent;
  onClose: () => void;
}

export const PvzStoryEventModal: React.FC<PvzStoryEventModalProps> = ({ event, onClose }) => {
  useEffect(() => {
    if (event.soundEffect && event.soundEffect !== 'dialogue') {
      soundManager.play(event.soundEffect as any);
    } else {
      soundManager.play('system_alert');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        soundManager.play('click');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-emerald-500/70 p-5 sm:p-6 shadow-[0_0_40px_rgba(16,185,129,0.35)] text-neutral-100 flex flex-col relative rounded-xs overflow-hidden"
      >
        {/* Top Glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

        {/* Live Broadcast Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5" />
              DIỄN BIẾN CỐT TRUYỆN TRỰC TIẾP
            </span>
          </div>

          {event.badge && (
            <span className="px-2.5 py-0.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-bold text-[10px] uppercase rounded-xs tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {event.badge}
            </span>
          )}
        </div>

        {/* Main Character / Speaker Row */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xs bg-neutral-900 border-2 ${
              event.portraitBorderColor || 'border-emerald-500'
            } flex items-center justify-center text-3xl sm:text-4xl shadow-lg shrink-0`}
          >
            {event.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                {event.speaker}
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 bg-neutral-800 text-neutral-300 rounded-xs border border-neutral-700">
                {event.speakerRole}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-emerald-400 mt-1 uppercase tracking-wider">
              {event.title}
            </h4>
            {event.subtitle && (
              <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{event.subtitle}</p>
            )}
          </div>
        </div>

        {/* Dialogue Box */}
        <div className="space-y-2.5 bg-neutral-900/90 border border-neutral-800 p-4 rounded-xs text-xs sm:text-sm text-neutral-200 leading-relaxed max-h-[42vh] overflow-y-auto">
          {event.dialogue.map((line, idx) => {
            const isSpeaker = line.includes(':');
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 text-neutral-300"
              >
                <span className="text-emerald-500 mt-1 shrink-0 font-bold">›</span>
                <p className="flex-1">
                  {isSpeaker ? (
                    <>
                      <strong className="text-emerald-300 font-bold">{line.split(':')[0]}:</strong>
                      <span className="text-neutral-200">{line.substring(line.indexOf(':') + 1)}</span>
                    </>
                  ) : (
                    line
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* System Notice / Advice */}
        {event.systemNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xs flex items-center gap-2 text-[11px] text-emerald-300"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{event.systemNotice}</span>
          </motion.div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-800">
          <span className="text-[10px] text-neutral-500 hidden sm:inline-block">
            Nhấn [Space] hoặc [Enter] để tiếp tục
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                soundManager.play('click');
                onClose();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer transition-all w-full sm:w-auto"
            >
              <span>TIẾP TỤC CHIẾN ĐẤU</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
