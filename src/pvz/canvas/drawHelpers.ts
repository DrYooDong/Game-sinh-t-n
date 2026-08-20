import { PlacedPlant, ActiveZombie, Projectile, SunDrop, DamagePopup, LawnMowerState, PlantData, ZombieData } from '../types';
import { PVZ_PLANTS, PVZ_ZOMBIES } from '../data/pvzData';

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  rows: number;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  gridLeft: number;
  gridTop: number;
  hoverRow: number | null;
  hoverCol: number | null;
  selectedPlantId: string | null;
  isShovelActive: boolean;
  isPlantFoodPrimed: boolean;
  isWateringCanActive: boolean;
  isPossessionMode: boolean;
  weatherCondition?: 'clear' | 'fog' | 'night' | 'acid_rain';
  currentWaveIndex: number;
  activeJalapenoRows: number[];
  nuclearExplosionEffect?: boolean;
  time: number; // in seconds
}

// Stage themes colors
export const STAGE_CANVAS_THEMES = [
  {
    name: 'Đường Phố Tân Thủ',
    grassA: '#143d22',
    grassB: '#0f311a',
    gridLine: 'rgba(52, 211, 153, 0.15)',
    ambient: 'rgba(16, 185, 129, 0.05)',
    mowerBg: '#0a1d12'
  },
  {
    name: 'Bãi Đỗ Siêu Thị',
    grassA: '#2d2417',
    grassB: '#221a10',
    gridLine: 'rgba(245, 158, 11, 0.15)',
    ambient: 'rgba(217, 119, 6, 0.05)',
    mowerBg: '#18130b'
  },
  {
    name: 'Hầm Tàu Điện Ngầm',
    grassA: '#0d2538',
    grassB: '#091c2b',
    gridLine: 'rgba(6, 182, 212, 0.15)',
    ambient: 'rgba(14, 165, 233, 0.05)',
    mowerBg: '#06131e'
  },
  {
    name: 'Viện Nông Nghiệp Công Nghệ Cao',
    grassA: '#12382a',
    grassB: '#0c281e',
    gridLine: 'rgba(16, 185, 129, 0.18)',
    ambient: 'rgba(20, 184, 166, 0.05)',
    mowerBg: '#071b14'
  },
  {
    name: 'Vườn Thực Nghiệm Bào Tử Biến Dị',
    grassA: '#2b1338',
    grassB: '#200e2b',
    gridLine: 'rgba(217, 70, 239, 0.2)',
    ambient: 'rgba(168, 85, 247, 0.08)',
    mowerBg: '#160820'
  },
  {
    name: 'Đại Chiến Sân Vận Động',
    grassA: '#381619',
    grassB: '#2b0f12',
    gridLine: 'rgba(244, 63, 94, 0.2)',
    ambient: 'rgba(225, 29, 72, 0.06)',
    mowerBg: '#1c080a'
  },
  {
    name: 'Pháo Đài Quốc Vận Bất Diệt',
    grassA: '#1a1f3d',
    grassB: '#12162c',
    gridLine: 'rgba(250, 204, 21, 0.25)',
    ambient: 'rgba(234, 179, 8, 0.07)',
    mowerBg: '#0c0f20'
  }
];

export function drawBackground(rc: RenderContext) {
  const { ctx, width, height, rows, cols, cellWidth, cellHeight, gridLeft, gridTop, currentWaveIndex, time } = rc;
  const theme = STAGE_CANVAS_THEMES[currentWaveIndex % STAGE_CANVAS_THEMES.length] || STAGE_CANVAS_THEMES[0];

  // Base background fill
  ctx.fillStyle = '#080c10';
  ctx.fillRect(0, 0, width, height);

  // Draw Lawnmower sidebar lane
  ctx.fillStyle = theme.mowerBg;
  ctx.fillRect(0, gridTop, gridLeft, rows * cellHeight);

  // Mower separator line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gridLeft, gridTop);
  ctx.lineTo(gridLeft, gridTop + rows * cellHeight);
  ctx.stroke();

  // Draw Lawn Tiles
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = gridLeft + c * cellWidth;
      const y = gridTop + r * cellHeight;
      const isAlt = (r + c) % 2 === 0;

      // Checkerboard grass tile
      ctx.fillStyle = isAlt ? theme.grassA : theme.grassB;
      ctx.fillRect(x, y, cellWidth, cellHeight);

      // Subtle grass stripe texture
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let s = 4; s < cellHeight; s += 8) {
        ctx.beginPath();
        ctx.moveTo(x, y + s);
        ctx.lineTo(x + cellWidth, y + s);
        ctx.stroke();
      }

      // Tile border
      ctx.strokeStyle = theme.gridLine;
      ctx.strokeRect(x, y, cellWidth, cellHeight);

      // Coordinate marker
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.font = '9px monospace';
      ctx.fillText(`${r + 1},${c + 1}`, x + 4, y + 12);
    }
  }

  // Draw Jalapeno Fire Lanes
  rc.activeJalapenoRows.forEach((r) => {
    const y = gridTop + r * cellHeight;
    ctx.save();
    const grad = ctx.createLinearGradient(gridLeft, y, gridLeft + cols * cellWidth, y);
    grad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
    grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.95)');
    grad.addColorStop(1, 'rgba(239, 68, 68, 0.85)');
    ctx.fillStyle = grad;
    ctx.fillRect(gridLeft, y, cols * cellWidth, cellHeight);

    // Fire sparks
    for (let i = 0; i < 20; i++) {
      const sparkX = gridLeft + (Math.sin(time * 10 + i * 23) * 0.5 + 0.5) * cols * cellWidth;
      const sparkY = y + (Math.cos(time * 8 + i * 17) * 0.4 + 0.5) * cellHeight;
      ctx.fillStyle = '#fffb7d';
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 3 + Math.sin(time * 12 + i) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  // Cell Hover Highlight
  if (rc.hoverRow !== null && rc.hoverCol !== null && rc.hoverRow >= 0 && rc.hoverRow < rows && rc.hoverCol >= 0 && rc.hoverCol < cols) {
    const hx = gridLeft + rc.hoverCol * cellWidth;
    const hy = gridTop + rc.hoverRow * cellHeight;
    ctx.save();

    if (rc.isPossessionMode) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
    } else if (rc.isShovelActive) {
      ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
    } else if (rc.isPlantFoodPrimed) {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
    } else if (rc.isWateringCanActive) {
      ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
    } else if (rc.selectedPlantId) {
      ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2;
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
    }

    ctx.fillRect(hx, hy, cellWidth, cellHeight);
    ctx.strokeRect(hx, hy, cellWidth, cellHeight);
    ctx.restore();
  }
}

export function drawLawnMowers(rc: RenderContext, mowers: LawnMowerState[]) {
  const { ctx, gridLeft, gridTop, cellHeight, cellWidth, cols } = rc;

  mowers.forEach((mower) => {
    const cy = gridTop + mower.row * cellHeight + cellHeight / 2;
    let cx = gridLeft / 2;

    if (mower.isTriggered && mower.active) {
      cx = gridLeft + (mower.colPosition / cols) * (cols * cellWidth);
    }

    if (!mower.active && !mower.isTriggered) {
      // Inactive / broken slot
      ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('XÂM NHẬP', gridLeft / 2, cy + 4);
      return;
    }

    // Draw Lawnmower
    ctx.save();
    ctx.font = mower.isTriggered ? '28px sans-serif' : '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (mower.isTriggered) {
      // Rush effect trails
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.arc(cx - 15, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('🚜💨', cx, cy);
    } else {
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 8;
      ctx.fillText('🚜', cx, cy);
    }
    ctx.restore();
  });
}

export function drawPlants(rc: RenderContext, plants: PlacedPlant[]) {
  const { ctx, gridLeft, gridTop, cellWidth, cellHeight, time } = rc;

  plants.forEach((plant) => {
    const pDef = PVZ_PLANTS.find((p) => p.id === plant.plantId);
    if (!pDef) return;

    const cx = gridLeft + plant.col * cellWidth + cellWidth / 2;
    let cy = gridTop + plant.row * cellHeight + cellHeight / 2 + 4;

    ctx.save();

    // Squash leap offset
    if (plant.state === 'squash_jump') {
      cy -= 25;
    }

    // Plant Food / Golden Watering Overcharge Aura
    if (plant.isOvercharged || plant.isUltActive) {
      ctx.save();
      const auraGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 32);
      auraGrad.addColorStop(0, 'rgba(52, 211, 153, 0.7)');
      auraGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Sunflower gentle pulse
    if (plant.plantId === 'plant_sunflower' || plant.plantId === 'plant_twin_sunflower') {
      const sunPulse = (Math.sin(time * 4) + 1) * 0.15 + 0.1;
      const sunGlow = ctx.createRadialGradient(cx, cy, 8, cx, cy, 28);
      sunGlow.addColorStop(0, `rgba(251, 191, 36, ${sunPulse})`);
      sunGlow.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fill();
    }

    // Torchwood Flaming Light
    if (plant.plantId === 'plant_torchwood') {
      const fireGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 30);
      fireGlow.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
      fireGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = fireGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pumpkin Shell Armor ring
    if (plant.hasPumpkinShell) {
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, cellWidth * 0.38, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Plant Swaying Animation
    const swayAngle = Math.sin(time * 3 + plant.col * 1.5 + plant.row) * 0.06;
    ctx.translate(cx, cy);
    ctx.rotate(swayAngle);

    // Draw Plant Icon / Emoji
    ctx.font = `${Math.min(cellWidth, cellHeight) * 0.52}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText(pDef.icon, 0, 0);

    ctx.restore();

    // Draw Plant HP Bar
    const hpBarWidth = cellWidth * 0.7;
    const hpBarHeight = 4;
    const hpBarX = cx - hpBarWidth / 2;
    const hpBarY = gridTop + plant.row * cellHeight + 6;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);

    const hpPct = Math.max(0, plant.hp / plant.maxHp);
    ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#eab308' : '#ef4444';
    ctx.fillRect(hpBarX, hpBarY, hpBarWidth * hpPct, hpBarHeight);

    // Pumpkin Shell HP Bar
    if (plant.hasPumpkinShell && plant.pumpkinHp !== undefined) {
      const pMax = plant.pumpkinMaxHp || 900;
      const pPct = Math.max(0, plant.pumpkinHp / pMax);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(hpBarX, hpBarY + 5, hpBarWidth * pPct, 3);
    }

    // Chomper Digesting / Magnet Status icons
    if (plant.plantId === 'plant_chomper' && plant.state === 'chomper_digesting') {
      ctx.fillStyle = '#a855f7';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⏳ Đang nhai', cx, cy + cellHeight * 0.35);
    }
  });
}

export function drawZombies(rc: RenderContext, zombies: ActiveZombie[]) {
  const { ctx, gridLeft, gridTop, cellWidth, cellHeight, cols, time } = rc;

  zombies.forEach((zombie) => {
    const zDef = PVZ_ZOMBIES[zombie.zombieId] || PVZ_ZOMBIES.zombie_normal;
    const cx = gridLeft + (zombie.colPosition / cols) * (cols * cellWidth);
    let cy = gridTop + zombie.row * cellHeight + cellHeight / 2 + 4;

    const isSlowed = (zombie.slowTimerSec || 0) > 0;
    const isFrozen = (zombie.freezeTimerSec || 0) > 0;
    const isEnraged = !!zombie.isEnraged;
    const isFlying = !!zombie.isFlying;
    const isDigging = !!zombie.isDigging;
    const isCharmed = !!zombie.isCharmed;

    if (isFlying) cy -= 18;
    if (isDigging) cy += 12;

    ctx.save();

    // Hypno Heart Glow or Enraged Fire Aura
    if (isCharmed) {
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 12;
    } else if (isEnraged) {
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 14;
    } else if (isFrozen) {
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
    }

    // Walking / Bobbing Cycle
    const bob = isFrozen ? 0 : Math.sin(time * 6 + zombie.colPosition * 4) * 3;
    ctx.translate(cx, cy + bob);

    if (isCharmed || zombie.isWalkingBackwards) {
      ctx.scale(-1, 1);
    }

    // Draw Zombie Icon
    const size = zDef.isBoss ? cellHeight * 0.75 : cellHeight * 0.55;
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isDigging) {
      ctx.fillText('⛏️💨', 0, 0);
    } else {
      ctx.fillText(zDef.icon, 0, 0);
    }

    ctx.restore();

    // 3-Layer Zombie HP Bar (Body + Helm + Shield)
    const hpWidth = Math.min(50, cellWidth * 0.7);
    const hpHeight = 5;
    const hpX = cx - hpWidth / 2;
    const hpY = cy - cellHeight * 0.42;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(hpX - 1, hpY - 1, hpWidth + 2, hpHeight + 2);

    const totalMax = (zombie.bodyMaxHp || 100) + (zombie.helmMaxHp || 0) + (zombie.shieldMaxHp || 0);
    let curX = hpX;

    // 1. Body (Red/Pink)
    const bodyW = (Math.max(0, zombie.bodyHp) / totalMax) * hpWidth;
    ctx.fillStyle = isCharmed ? '#f472b6' : zDef.isBoss ? '#dc2626' : '#ef4444';
    ctx.fillRect(curX, hpY, bodyW, hpHeight);
    curX += bodyW;

    // 2. Helm (Amber/Yellow)
    if (zombie.helmHp > 0) {
      const helmW = (zombie.helmHp / totalMax) * hpWidth;
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(curX, hpY, helmW, hpHeight);
      curX += helmW;
    }

    // 3. Shield (Cyan/Fuchsia)
    if (zombie.shieldHp > 0) {
      const shieldW = (zombie.shieldHp / totalMax) * hpWidth;
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(curX, hpY, shieldW, hpHeight);
    }

    // Status Badges below HP
    let badgeText = '';
    if (isFrozen) badgeText += '🧊 ';
    else if (isSlowed) badgeText += '❄️ ';
    if (isEnraged) badgeText += '🔥 ';
    if (isCharmed) badgeText += '💖 ';
    if (zombie.hasPole) badgeText += '🦯 ';
    if (zombie.hasPogo) badgeText += '🦘 ';
    if (isFlying) badgeText += '🎈 ';

    if (badgeText) {
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(badgeText, cx, hpY - 4);
    }
  });
}

export function drawProjectiles(rc: RenderContext, projectiles: Projectile[]) {
  const { ctx, gridLeft, gridTop, cellWidth, cellHeight, cols } = rc;

  projectiles.forEach((proj) => {
    const cx = gridLeft + (proj.colPosition / cols) * (cols * cellWidth);
    const cy = gridTop + proj.row * cellHeight + cellHeight / 2;

    ctx.save();

    if (proj.type === 'ice_pea') {
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#bae6fd';
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❄️', cx, cy);
    } else if (proj.type === 'melon_ice') {
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 12;
      ctx.fillText('🍉❄️', cx, cy);
    } else if (proj.type === 'fume_wave') {
      ctx.fillStyle = 'rgba(217, 70, 239, 0.7)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 14, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💨', cx, cy);
    } else if (proj.type === 'lightning') {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(cx - 15, cy + (Math.random() - 0.5) * 8);
      ctx.lineTo(cx, cy + (Math.random() - 0.5) * 8);
      ctx.lineTo(cx + 15, cy + (Math.random() - 0.5) * 8);
      ctx.stroke();
    } else if (proj.type === 'fireball') {
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🔥', cx, cy);
    } else if (proj.type === 'gatling') {
      ctx.fillStyle = '#84cc16';
      ctx.shadowColor = '#4d7c0f';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Default Pea Bullet
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, 6.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });
}

export function drawSunDrops(rc: RenderContext, suns: SunDrop[]) {
  const { ctx, gridLeft, gridTop, cellWidth, cellHeight, time } = rc;

  suns.forEach((sun) => {
    const cx = gridLeft + sun.col * cellWidth + cellWidth / 2;
    const cy = gridTop + sun.row * cellHeight + cellHeight / 2;

    ctx.save();
    // Sun rays rotation
    const rot = time * 2 + sun.col;
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    // Glowing Radial Halo
    const halo = ctx.createRadialGradient(0, 0, 8, 0, 0, 24);
    halo.addColorStop(0, 'rgba(252, 211, 77, 0.9)');
    halo.addColorStop(0.6, 'rgba(245, 158, 11, 0.6)');
    halo.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();

    // Sun center
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 12;
    ctx.fillText('☀️', 0, 0);

    ctx.restore();
  });
}

export function drawDamagePopups(rc: RenderContext, popups: DamagePopup[]) {
  const { ctx, gridLeft, gridTop, cellWidth, cellHeight, cols } = rc;
  const now = Date.now();

  popups.forEach((pop) => {
    const elapsed = (now - pop.createdAt) / 1000;
    if (elapsed > 0.9) return;

    const cx = gridLeft + (pop.colPosition / cols) * (cols * cellWidth);
    const cy = gridTop + pop.row * cellHeight + cellHeight * 0.3 - elapsed * 30;
    const alpha = Math.max(0, 1 - elapsed / 0.9);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = pop.isCrit ? 'bold 15px monospace' : 'bold 12px monospace';
    ctx.textAlign = 'center';

    // Shadow outline
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.lineWidth = 3;
    ctx.strokeText(pop.text, cx, cy);

    ctx.fillStyle = pop.color.includes('rose')
      ? '#f43f5e'
      : pop.color.includes('cyan')
      ? '#38bdf8'
      : pop.color.includes('amber')
      ? '#fbbf24'
      : pop.color.includes('purple')
      ? '#c084fc'
      : '#34d399';
    ctx.fillText(pop.text, cx, cy);

    ctx.restore();
  });
}

export function drawWeatherAndAtmosphere(rc: RenderContext) {
  const { ctx, width, height, weatherCondition, nuclearExplosionEffect, time } = rc;

  if (nuclearExplosionEffect) {
    ctx.save();
    ctx.fillStyle = 'rgba(168, 85, 247, 0.45)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f3e8ff';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 20;
    ctx.fillText('☢️ NỔ HẠT NHÂN NẤM DIỆT THẾ!', width / 2, height / 2);
    ctx.restore();
  }

  if (weatherCondition === 'fog') {
    ctx.save();
    const fogGrad = ctx.createLinearGradient(width * 0.4, 0, width, 0);
    fogGrad.addColorStop(0, 'rgba(88, 28, 135, 0)');
    fogGrad.addColorStop(0.5, 'rgba(88, 28, 135, 0.7)');
    fogGrad.addColorStop(1, 'rgba(88, 28, 135, 0.92)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(width * 0.4, 0, width * 0.6, height);
    ctx.restore();
  }

  if (weatherCondition === 'night') {
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}
