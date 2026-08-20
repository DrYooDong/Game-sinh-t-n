import React, { useEffect, useRef } from 'react';
import { PlacedPlant, ActiveZombie, Projectile, SunDrop, PlantId, DamagePopup, LawnMowerState } from '../types';
import { PvzCanvasEngine } from '../canvas/PvzCanvasEngine';
import { soundManager } from '../../utils/audio';

interface PvzGameBoardProps {
  plants: PlacedPlant[];
  zombies: ActiveZombie[];
  projectiles: Projectile[];
  sunDrops: SunDrop[];
  damagePopups: DamagePopup[];
  lawnMowerStates: LawnMowerState[];
  selectedPlantId: PlantId | null;
  isShovelActive: boolean;
  isPlantFoodPrimed: boolean;
  isWateringCanActive: boolean;
  isPossessionMode: boolean;
  onCellClick: (row: number, col: number) => void;
  onPlantClick?: (plant: PlacedPlant) => void;
  onCollectSun: (sunId: string, value: number) => void;
  onManualFire?: (row: number, col: number) => void;
  currentWaveIndex: number;
  nuclearExplosionEffect?: boolean;
  weatherCondition?: 'clear' | 'fog' | 'night' | 'acid_rain';
  rows?: number;
  cols?: number;
  activeJalapenoRows?: number[];
}

const STAGE_TITLES = [
  '🏙️ ĐÔ THỊ TÂN THỦ & CÔNG VIÊN',
  '🏪 BÃI ĐỖ SIÊU THỊ TIỆN LỢI',
  '🚇 HẦM TÀU ĐIỆN NGẦM THỨ 5',
  '🧪 VIỆN NÔNG NGHIỆP CÔNG NGHỆ CAO',
  '☣️ VƯỜN THỰC NGHIỆM BÀO TỬ BIẾN DỊ',
  '🏟️ ĐẠI CHIẾN SÂN VẬN ĐỘNG',
  '🏰 PHÁO ĐÀI QUỐC VẬN BẤT DIỆT'
];

export const PvzGameBoard: React.FC<PvzGameBoardProps> = ({
  plants,
  zombies,
  projectiles,
  sunDrops,
  damagePopups,
  lawnMowerStates,
  selectedPlantId,
  isShovelActive,
  isPlantFoodPrimed,
  isWateringCanActive,
  isPossessionMode,
  onCellClick,
  onPlantClick,
  onCollectSun,
  onManualFire,
  currentWaveIndex,
  nuclearExplosionEffect = false,
  weatherCondition = 'clear',
  rows = 3,
  cols = 6,
  activeJalapenoRows = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<PvzCanvasEngine | null>(null);

  // Initialize Canvas Engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new PvzCanvasEngine({
      canvas: canvasRef.current,
      onCellClick: (r, c) => {
        if (isPossessionMode && onManualFire) {
          onManualFire(r, c);
        } else {
          onCellClick(r, c);
        }
      },
      onSunClick: (sunId, val) => {
        soundManager.play('item_get');
        onCollectSun(sunId, val);
      },
      onPlantClick
    });

    engineRef.current = engine;
    engine.start();

    const handleResize = () => engine.handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.stop();
    };
  }, []);

  // Synchronize state props to Canvas Engine
  useEffect(() => {
    if (!engineRef.current) return;
    const eng = engineRef.current;
    eng.plants = plants;
    eng.zombies = zombies;
    eng.projectiles = projectiles;
    eng.sunDrops = sunDrops;
    eng.damagePopups = damagePopups;
    eng.lawnMowerStates = lawnMowerStates;
    eng.selectedPlantId = selectedPlantId;
    eng.isShovelActive = isShovelActive;
    eng.isPlantFoodPrimed = isPlantFoodPrimed;
    eng.isWateringCanActive = isWateringCanActive;
    eng.isPossessionMode = isPossessionMode;
    eng.weatherCondition = weatherCondition;
    eng.currentWaveIndex = currentWaveIndex;
    eng.activeJalapenoRows = activeJalapenoRows;
    eng.nuclearExplosionEffect = nuclearExplosionEffect;
  }, [
    plants,
    zombies,
    projectiles,
    sunDrops,
    damagePopups,
    lawnMowerStates,
    selectedPlantId,
    isShovelActive,
    isPlantFoodPrimed,
    isWateringCanActive,
    isPossessionMode,
    weatherCondition,
    currentWaveIndex,
    activeJalapenoRows,
    nuclearExplosionEffect
  ]);

  // Update dimensions
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateDimensions(rows, cols);
    }
  }, [rows, cols]);

  const stageTitle = STAGE_TITLES[currentWaveIndex % STAGE_TITLES.length] || STAGE_TITLES[0];
  const boardHeight = rows >= 5 ? 'h-[380px] sm:h-[460px]' : rows === 4 ? 'h-[340px] sm:h-[410px]' : 'h-[300px] sm:h-[360px]';

  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-950/90 border-2 border-emerald-500/40 p-2 sm:p-3 rounded-xs font-mono relative select-none shadow-2xl backdrop-blur-md">
      {/* Top stage info bar */}
      <div className="flex items-center justify-between px-2 mb-2 text-xs font-bold text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 rounded-xs text-[10px] tracking-wider uppercase font-black">
            {stageTitle}
          </span>
          <span className="text-neutral-500 hidden sm:inline">• Canvas 60 FPS • {rows} Hàng × {cols} Cột</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          {weatherCondition === 'fog' && (
            <span className="px-1.5 py-0.2 bg-purple-950 text-purple-300 border border-purple-600 rounded-xs flex items-center gap-1 animate-pulse">
              <span>🟣 Sương Mù Bào Tử</span>
            </span>
          )}
          {weatherCondition === 'night' && (
            <span className="px-1.5 py-0.2 bg-blue-950 text-blue-300 border border-blue-600 rounded-xs flex items-center gap-1">
              <span>🌙 Ban Đêm</span>
            </span>
          )}
          <span className="text-amber-400 font-bold hidden md:inline">🌱 PvZ2 Engine Active</span>
        </div>
      </div>

      {/* HTML5 Canvas Render Board */}
      <div className={`w-full ${boardHeight} relative rounded-xs overflow-hidden border border-neutral-800 shadow-inner bg-black`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-pointer touch-none"
        />
      </div>
    </div>
  );
};
