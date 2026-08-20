import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RadioTransmission } from '../types';
import { soundManager } from '../utils/audio';
import { Language, t } from '../utils/i18n';
import { X, Radio, Signal, Volume2, ShieldCheck, Zap, RefreshCw, Send, Lock } from 'lucide-react';

interface RadioTransceiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  transmissions: RadioTransmission[];
  onScanFrequency: () => void;
  lang?: Language;
}

export const RadioTransceiverModal: React.FC<RadioTransceiverModalProps> = ({
  isOpen,
  onClose,
  transmissions,
  onScanFrequency,
  lang = 'vi'
}) => {
  const [selectedTx, setSelectedTx] = useState<RadioTransmission>(transmissions[0]);
  const [frequency, setFrequency] = useState('107.5');
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleScan = () => {
    soundManager.play('click');
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScanFrequency();
      soundManager.play('level_up');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-mono">
      <div className="relative w-full max-w-4xl bg-neutral-950 border-2 border-cyan-500/60 p-4 sm:p-6 shadow-[0_0_60px_rgba(6,182,212,0.2)] text-neutral-100 max-h-[90vh] flex flex-col">
        
        {/* Top Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          {t('radio.title', lang)}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 mt-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-900 border border-cyan-500/60 flex items-center justify-center text-cyan-400">
              <Signal className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-cyan-300 uppercase tracking-wide">
                {lang === 'vi' ? 'KÊNH LIÊN LẠC THẾ GIỚI KTX PHONG VƯƠNG' : 'WORLDWIDE PIONEER RADIO NETWORK'}
              </h2>
              <p className="text-[11px] text-neutral-400">
                {lang === 'vi' ? 'Tần số phát sóng' : 'Band'}: <strong className="text-white font-bold">{frequency} MHz</strong> | {lang === 'vi' ? 'Trạng thái' : 'Status'}: <span className="text-emerald-400 font-bold">{lang === 'vi' ? 'ĐÃ KẾT NỐI HỘI TƯƠNG TRỢ' : 'CONNECTED TO ALLIANCE'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.play('click');
              onClose();
            }}
            className="p-1.5 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 overflow-y-auto pr-1 text-xs">
          
          {/* Channel Transmissions List */}
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span className="font-bold text-cyan-400 uppercase">Tín Hiệu Phát Hiện</span>
              <button
                disabled={isScanning}
                onClick={handleScan}
                className="text-[10px] px-2 py-0.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                Dò Tần Số
              </button>
            </div>

            <div className="space-y-1.5">
              {transmissions.map((tx) => {
                const isSelected = (selectedTx?.id || transmissions[0]?.id) === tx.id;

                return (
                  <button
                    key={tx.id}
                    onClick={() => {
                      soundManager.play('click');
                      setSelectedTx(tx);
                    }}
                    className={`w-full p-2.5 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-sm'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-cyan-300">{tx.sender}</span>
                      <span className="text-[10px] text-neutral-500">{tx.frequency}</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate mt-0.5">{tx.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Message Detail */}
          {(() => {
            const currentTx = selectedTx || transmissions[0] || {
              id: 'tx_default',
              sender: 'Hội Tương Trợ',
              rank: 'Kênh Công Cộng',
              frequency: '107.5 MHz',
              title: 'Không có tín hiệu',
              message: 'Đang dò tìm tín hiệu vô tuyến từ các tòa tháp...',
              timestamp: '00:00',
              secretIntel: ''
            };

            return (
              <div className="p-4 bg-neutral-900 border border-neutral-800 md:col-span-2 space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase">{currentTx.title}</h3>
                      <p className="text-[11px] text-cyan-400">
                        Người gửi: <strong>{currentTx.sender}</strong> ({currentTx.rank})
                      </p>
                    </div>
                    <span className="text-[10px] text-neutral-500">{currentTx.timestamp}</span>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 text-neutral-300 leading-relaxed text-xs">
                    {currentTx.message}
                  </div>

                  {currentTx.secretIntel && (
                    <div className="p-3 bg-amber-950/40 border border-amber-500/40 space-y-1">
                      <div className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1.5">
                        <Lock className="w-3 h-3" /> Tình Báo Tuyệt Mật Giải Mã:
                      </div>
                      <p className="text-[11px] text-amber-200">{currentTx.secretIntel}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 flex items-center justify-between">
                  <span>Quy tắc: Không tiết lộ tên thật hoặc vị trí tòa KTX chính thức.</span>
                  <span className="text-emerald-400 font-bold uppercase">Tín hiệu ổn định (98%)</span>
                </div>
              </div>
            );
          })()}

        </div>

      </div>
    </div>
  );
};
