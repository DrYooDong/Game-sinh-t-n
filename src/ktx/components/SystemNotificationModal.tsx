import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SystemNotification } from '../types';
import { soundManager } from '../utils/audio';
import { AlertTriangle, Sparkles, Trophy, BookOpen, ShieldAlert, X, Bell } from 'lucide-react';

interface SystemNotificationModalProps {
  notification: SystemNotification | null;
  history: SystemNotification[];
  onClose: () => void;
  onOpenHistory?: () => void;
}

export const SystemNotificationModal: React.FC<SystemNotificationModalProps> = ({
  notification,
  history,
  onClose
}) => {
  const [showHistory, setShowHistory] = React.useState(false);

  if (!notification && !showHistory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono">
      <AnimatePresence mode="wait">
        {!showHistory && notification ? (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-neutral-950/98 border-2 border-cyan-500 p-6 sm:p-8 relative shadow-[0_0_80px_rgba(6,182,212,0.3)] text-neutral-100 rounded-sm"
          >
            {/* System Badge */}
            <div className="absolute -top-4 left-7 bg-gradient-to-r from-cyan-500 to-blue-600 text-neutral-950 px-4 py-1 text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-1.5 rounded-xs">
              <Sparkles className="w-3.5 h-3.5 fill-neutral-950" />
              <span>THÔNG BÁO HỆ THỐNG TOÀN KHÔNG GIAN</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.play('click');
                onClose();
              }}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer rounded-sm"
              title="Đóng thông báo"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <div className="mt-3">
              <div className="text-[11px] text-cyan-400 font-mono uppercase tracking-widest mb-1 flex items-center gap-2">
                <span>[TIÊU ĐIỂM SỰ KIỆN]</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400">{notification.timestamp}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide leading-snug">
                {notification.title}
              </h2>
              <div className="h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent mt-2 mb-4"></div>
            </div>

            {/* Content Body */}
            <div className="my-4 p-4 sm:p-5 bg-neutral-900/90 border border-neutral-800 text-sm sm:text-base leading-relaxed sm:leading-loose text-neutral-200 whitespace-pre-line font-sans selection:bg-cyan-500 selection:text-neutral-950 max-h-[50vh] overflow-y-auto">
              {notification.message}
            </div>

            {/* Footer buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-900">
              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setShowHistory(true);
                }}
                className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-all cursor-pointer uppercase font-mono py-1"
              >
                <Bell className="w-4 h-4 text-amber-400" /> Xem lịch sử sự kiện ({history.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black uppercase tracking-widest text-sm border-b-4 border-cyan-900 transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                {notification.actionLabel || 'XÁC NHẬN (F)'}
              </button>
            </div>
          </motion.div>
        ) : (
          /* History View */
          <motion.div
            key="history-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl bg-neutral-950/98 border-2 border-cyan-500/60 p-6 sm:p-7 shadow-[0_0_60px_rgba(6,182,212,0.25)] relative text-neutral-100 flex flex-col max-h-[85vh] rounded-sm"
          >
            <div className="absolute -top-4 left-7 bg-cyan-500 text-neutral-950 px-4 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Bell className="w-3.5 h-3.5 fill-neutral-950" />
              <span>NHẬT KÝ THÔNG BÁO THẾ GIỚI</span>
            </div>

            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 mt-2">
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                Lịch Sử Sự Kiện ({history.length} mục)
              </h3>
              <button
                onClick={() => {
                  soundManager.play('click');
                  setShowHistory(false);
                  if (!notification) onClose();
                }}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {history.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-sm">Chưa có thông báo nào được ghi nhận.</div>
              ) : (
                history.map((h) => (
                  <div key={h.id} className="p-4 bg-neutral-900/90 border border-neutral-800 text-sm space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-cyan-400 text-sm">{h.title}</span>
                      <span className="text-neutral-500 font-mono text-xs">{h.timestamp}</span>
                    </div>
                    <p className="text-neutral-200 whitespace-pre-line text-xs sm:text-sm leading-relaxed">{h.message}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
