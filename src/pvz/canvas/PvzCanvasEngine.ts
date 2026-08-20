import {
  PlacedPlant,
  ActiveZombie,
  Projectile,
  SunDrop,
  DamagePopup,
  LawnMowerState
} from '../types';
import {
  RenderContext,
  drawBackground,
  drawLawnMowers,
  drawPlants,
  drawZombies,
  drawProjectiles,
  drawSunDrops,
  drawDamagePopups,
  drawWeatherAndAtmosphere
} from './drawHelpers';

export interface PvzCanvasEngineOptions {
  canvas: HTMLCanvasElement;
  onCellClick: (row: number, col: number) => void;
  onSunClick: (sunId: string, value: number) => void;
  onPlantClick?: (plant: PlacedPlant) => void;
}

export class PvzCanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animId: number = 0;
  private isRunning: boolean = false;
  private startTime: number = Date.now();

  // Coordinates mapping
  public rows: number = 3;
  public cols: number = 6;
  public gridLeft: number = 60;
  public gridTop: number = 28;
  public cellWidth: number = 100;
  public cellHeight: number = 100;

  // Mouse tracking
  private hoverRow: number | null = null;
  private hoverCol: number | null = null;

  // External Game States
  public plants: PlacedPlant[] = [];
  public zombies: ActiveZombie[] = [];
  public projectiles: Projectile[] = [];
  public sunDrops: SunDrop[] = [];
  public damagePopups: DamagePopup[] = [];
  public lawnMowerStates: LawnMowerState[] = [];

  public selectedPlantId: string | null = null;
  public isShovelActive: boolean = false;
  public isPlantFoodPrimed: boolean = false;
  public isWateringCanActive: boolean = false;
  public isPossessionMode: boolean = false;
  public weatherCondition?: 'clear' | 'fog' | 'night' | 'acid_rain' = 'clear';
  public currentWaveIndex: number = 0;
  public activeJalapenoRows: number[] = [];
  public nuclearExplosionEffect: boolean = false;

  private onCellClick: (row: number, col: number) => void;
  private onSunClick: (sunId: string, value: number) => void;
  private onPlantClick?: (plant: PlacedPlant) => void;

  constructor(options: PvzCanvasEngineOptions) {
    this.canvas = options.canvas;
    const context = this.canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Cannot get 2D canvas context');
    this.ctx = context;

    this.onCellClick = options.onCellClick;
    this.onSunClick = options.onSunClick;
    this.onPlantClick = options.onPlantClick;

    this.setupEventListeners();
    this.handleResize();
  }

  public updateDimensions(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.handleResize();
  }

  public handleResize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set internal canvas resolution for crisp retina display
    this.canvas.width = Math.floor(rect.width * dpr);
    this.canvas.height = Math.floor(rect.height * dpr);

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    this.gridLeft = Math.max(50, Math.floor(w * 0.08));
    this.gridTop = 26;

    const availableW = w - this.gridLeft - 10;
    const availableH = h - this.gridTop - 10;

    this.cellWidth = Math.floor(availableW / this.cols);
    this.cellHeight = Math.floor(availableH / this.rows);
  }

  private setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= this.gridLeft && y >= this.gridTop) {
        const col = Math.floor((x - this.gridLeft) / this.cellWidth);
        const row = Math.floor((y - this.gridTop) / this.cellHeight);
        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
          this.hoverRow = row;
          this.hoverCol = col;
          return;
        }
      }
      this.hoverRow = null;
      this.hoverCol = null;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoverRow = null;
      this.hoverCol = null;
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 1. Check Sun Drops click first
      for (const sun of this.sunDrops) {
        const sunX = this.gridLeft + sun.col * this.cellWidth + this.cellWidth / 2;
        const sunY = this.gridTop + sun.row * this.cellHeight + this.cellHeight / 2;
        const dist = Math.hypot(x - sunX, y - sunY);
        if (dist <= 30) {
          this.onSunClick(sun.id, sun.value);
          return;
        }
      }

      // 2. Check Grid cell click
      if (x >= this.gridLeft && y >= this.gridTop) {
        const col = Math.floor((x - this.gridLeft) / this.cellWidth);
        const row = Math.floor((y - this.gridTop) / this.cellHeight);
        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
          const plant = this.plants.find((p) => p.row === row && p.col === col);
          if (plant && (this.isPlantFoodPrimed || this.isWateringCanActive) && this.onPlantClick) {
            this.onPlantClick(plant);
          } else {
            this.onCellClick(row, col);
          }
        }
      }
    });
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const render = () => {
      if (!this.isRunning) return;
      this.draw();
      this.animId = requestAnimationFrame(render);
    };
    this.animId = requestAnimationFrame(render);
  }

  public stop() {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
  }

  private draw() {
    const rect = this.canvas.getBoundingClientRect();
    const time = (Date.now() - this.startTime) / 1000;

    const rc: RenderContext = {
      ctx: this.ctx,
      width: rect.width,
      height: rect.height,
      rows: this.rows,
      cols: this.cols,
      cellWidth: this.cellWidth,
      cellHeight: this.cellHeight,
      gridLeft: this.gridLeft,
      gridTop: this.gridTop,
      hoverRow: this.hoverRow,
      hoverCol: this.hoverCol,
      selectedPlantId: this.selectedPlantId,
      isShovelActive: this.isShovelActive,
      isPlantFoodPrimed: this.isPlantFoodPrimed,
      isWateringCanActive: this.isWateringCanActive,
      isPossessionMode: this.isPossessionMode,
      weatherCondition: this.weatherCondition,
      currentWaveIndex: this.currentWaveIndex,
      activeJalapenoRows: this.activeJalapenoRows,
      nuclearExplosionEffect: this.nuclearExplosionEffect,
      time
    };

    // 1. Draw Background turf & fire lanes
    drawBackground(rc);

    // 2. Draw Lawnmowers
    drawLawnMowers(rc, this.lawnMowerStates);

    // 3. Draw Plants
    drawPlants(rc, this.plants);

    // 4. Draw Zombies
    drawZombies(rc, this.zombies);

    // 5. Draw Projectiles
    drawProjectiles(rc, this.projectiles);

    // 6. Draw Sun Drops
    drawSunDrops(rc, this.sunDrops);

    // 7. Draw Floating Damage Numbers
    drawDamagePopups(rc, this.damagePopups);

    // 8. Weather & Atmospheric Shroud
    drawWeatherAndAtmosphere(rc);
  }
}
