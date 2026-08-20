import React, { useState } from 'react';
import { Cpu, Zap, Activity, CheckCircle, X, Play, RefreshCw, Layers } from 'lucide-react';
import { wasmBridge, WasmBenchmarkResult } from '../wasm/WasmBridge';

export const WasmStatusBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState<WasmBenchmarkResult | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const status = wasmBridge.getStatus();

  const handleRunBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      const res = wasmBridge.runBenchmark(200000);
      setBenchmarkResult(res);
      setIsBenchmarking(false);
    }, 150);
  };

  return (
    <>
      {/* Interactive Toolbar Badge */}
      <button
        onClick={() => {
          setIsOpen(true);
          if (!benchmarkResult) handleRunBenchmark();
        }}
        className="px-2.5 py-1 bg-neutral-900/90 hover:bg-neutral-800 border border-emerald-500/60 hover:border-emerald-400 text-emerald-300 text-xs font-bold rounded-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)] select-none"
        title="WebAssembly (Wasm) Native C++ Core Engine Status"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline font-mono">WASM C++ BRIDGE</span>
      </button>

      {/* Modal Inspector */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border-2 border-emerald-500/60 w-full max-w-xl rounded-sm p-5 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] font-mono text-neutral-100 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  WEBASSEMBLY (WASM) C++ NATIVE CORE
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Connection Status Panel */}
            <div className="bg-neutral-950/80 border border-neutral-800 p-3 rounded-xs mb-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Trạng Thái Kết Nối (Connection):</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  ĐANG KẾT NỐI (ACTIVE)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Phiên Bản Engine C++:</span>
                <span className="text-cyan-300 font-bold">{status.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Thư Mục Nguồn C++:</span>
                <span className="text-purple-300 font-bold">cpp/ (KTX, PvZ 1, PvZ 2)</span>
              </div>
            </div>

            {/* Live Benchmark Section */}
            <div className="bg-neutral-950/80 border border-emerald-500/30 p-4 rounded-xs mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-neutral-300 font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-400" />
                  HIỆU NĂNG THỰC THI (200,000 PHÉP TÍNH TOÁN)
                </span>
                <button
                  onClick={handleRunBenchmark}
                  disabled={isBenchmarking}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-neutral-950 text-xs font-black rounded-xs flex items-center gap-1 cursor-pointer transition-all shadow-md"
                >
                  <RefreshCw className={`w-3 h-3 ${isBenchmarking ? 'animate-spin' : ''}`} />
                  <span>{isBenchmarking ? 'Đang đo...' : 'Đo lại'}</span>
                </button>
              </div>

              {benchmarkResult && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-neutral-900 p-2.5 border border-neutral-800 rounded-xs">
                    <p className="text-[10px] text-neutral-400 uppercase">Thời Gian C++ Wasm</p>
                    <p className="text-lg font-black text-emerald-400 mt-1 font-mono">
                      {benchmarkResult.wasmTimeUs} µs
                    </p>
                    <span className="text-[10px] text-emerald-500/80">Siêu nhanh (Microseconds)</span>
                  </div>
                  <div className="bg-neutral-900 p-2.5 border border-neutral-800 rounded-xs">
                    <p className="text-[10px] text-neutral-400 uppercase">Tốc Độ Xử Lý</p>
                    <p className="text-lg font-black text-cyan-300 mt-1 font-mono">
                      ~{benchmarkResult.speedupMultiplier}x
                    </p>
                    <span className="text-[10px] text-cyan-500/80">Tối ưu Native Memory</span>
                  </div>
                </div>
              )}
            </div>

            {/* Exported C++ Bindings Matrix */}
            <div className="space-y-1.5 text-[11px] text-neutral-300">
              <p className="font-bold text-neutral-400 text-xs uppercase flex items-center gap-1 mb-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Các Module C++ Đang Đồng Bộ:</span>
              </p>
              <div className="p-2 bg-neutral-950/60 border border-neutral-800/80 rounded-xs flex items-center justify-between">
                <span>🏢 KTX: Tính Sản Lượng Tiền Chúa Tể & Sát Thương Pháo Đài</span>
                <span className="text-emerald-400 font-bold">ktx_calculate_*</span>
              </div>
              <div className="p-2 bg-neutral-950/60 border border-neutral-800/80 rounded-xs flex items-center justify-between">
                <span>🌻 PvZ 1: Tính Giảm Trừ Giáp & Nổ Bom Anh Đào 3x3</span>
                <span className="text-emerald-400 font-bold">pvz1_calculate_*</span>
              </div>
              <div className="p-2 bg-neutral-950/60 border border-neutral-800/80 rounded-xs flex items-center justify-between">
                <span>🃏 PvZ 2: Thuật Toán Bảo Hiểm Gacha Pity & Dung Hợp</span>
                <span className="text-emerald-400 font-bold">pvz2_roll_gacha_*</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
