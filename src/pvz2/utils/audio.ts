// High-Fidelity Web Audio Engine for Plants vs Zombies with PopCap Original Sound Effects & Synth Fallback

type SfxCategory = 
  | 'sun' | 'pea_shoot' | 'fire_shoot' | 'melon_throw' | 'hit_splat' | 'explosion'
  | 'plant' | 'shovel' | 'chomp' | 'groan' | 'zombie_die' | 'lawn_mower'
  | 'huge_wave' | 'victory' | 'game_over' | 'newspaper_rage' | 'click' | 'plant_food'
  | 'magnet' | 'watering' | 'coin';

class PvzSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: number | null = null;
  private currentBgmTheme: string | null = null;
  private audioBufferCache: Map<string, AudioBuffer> = new Map();
  private loadingPromises: Map<string, Promise<AudioBuffer | null>> = new Map();

  // Registry of original PopCap sound files
  private readonly soundFiles: Record<string, string[]> = {
    sun: ['points.ogg'],
    pea_shoot: ['throw.ogg', 'throw2.ogg'],
    fire_shoot: ['ignite.ogg', 'throw.ogg'],
    melon_throw: ['throw.ogg', 'bowling.ogg'],
    hit_splat: ['splat.ogg', 'splat2.ogg', 'splat3.ogg'],
    explosion: ['cherrybomb.ogg', 'jalapeno.ogg', 'doomshroom.ogg'],
    plant: ['plant.ogg', 'plant2.ogg'],
    shovel: ['shovel.ogg'],
    chomp: ['chomp.ogg', 'chomp2.ogg', 'chompsoft.ogg'],
    groan: ['groan.ogg', 'groan2.ogg', 'groan3.ogg', 'groan4.ogg', 'groan5.ogg', 'groan6.ogg'],
    zombie_die: ['limbs_pop.ogg', 'falling.ogg'],
    lawn_mower: ['lawnmower.ogg'],
    huge_wave: ['hugewave.ogg', 'siren.ogg', 'awooga.ogg'],
    victory: ['winmusic.ogg', 'tada.ogg'],
    game_over: ['losemusic.ogg', 'scream.ogg'],
    newspaper_rage: ['newspaper_rip.ogg', 'newspaper_rarrgh.ogg'],
    click: ['bleep.ogg', 'tap.ogg', 'click.ogg', 'seedlift.ogg'],
    plant_food: ['readysetplant.ogg', 'plantgrow.ogg'],
    magnet: ['magnetshroom.ogg'],
    watering: ['plant_water.ogg'],
    coin: ['coin.ogg', 'diamond.ogg']
  };

  constructor() {
    // Lazy preload common essential SFX in background
    if (typeof window !== 'undefined') {
      window.addEventListener('click', () => this.initContext(), { once: true });
      window.addEventListener('keydown', () => this.initContext(), { once: true });
    }
  }

  public initContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private async loadAudioBuffer(fileName: string): Promise<AudioBuffer | null> {
    if (this.audioBufferCache.has(fileName)) {
      return this.audioBufferCache.get(fileName)!;
    }
    if (this.loadingPromises.has(fileName)) {
      return this.loadingPromises.get(fileName)!;
    }

    const promise = (async () => {
      try {
        const url = `/pvz_assets/sounds/${fileName}`;
        const response = await fetch(url);
        if (!response.ok) return null;
        const arrayBuffer = await response.arrayBuffer();
        const ctx = this.initContext();
        if (!ctx) return null;
        const decoded = await ctx.decodeAudioData(arrayBuffer);
        this.audioBufferCache.set(fileName, decoded);
        return decoded;
      } catch {
        return null;
      }
    })();

    this.loadingPromises.set(fileName, promise);
    return promise;
  }

  public async playOriginalSfx(category: SfxCategory, volume: number = 0.5, pitchVariance: number = 0.06): Promise<boolean> {
    if (this.isMuted) return false;
    const ctx = this.initContext();
    if (!ctx) return false;

    const fileList = this.soundFiles[category];
    if (!fileList || fileList.length === 0) return false;

    // Pick a random variant
    const randomFile = fileList[Math.floor(Math.random() * fileList.length)];
    const buffer = await this.loadAudioBuffer(randomFile);

    if (buffer) {
      try {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        // Pitch variation (e.g. 0.94x to 1.06x speed/pitch) for natural sound
        if (pitchVariance > 0) {
          const rate = 1.0 + (Math.random() * 2 - 1) * pitchVariance;
          source.playbackRate.value = rate;
        }

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- Sound FX Triggers with Original PopCap SFX and Synth Fallback ---

  public playSunPickup() {
    this.playOriginalSfx('sun', 0.6).then(success => {
      if (!success) this.fallbackSunPickup();
    });
  }

  public playPeaShoot() {
    this.playOriginalSfx('pea_shoot', 0.45).then(success => {
      if (!success) this.fallbackPeaShoot();
    });
  }

  public playFirePeaShoot() {
    this.playOriginalSfx('fire_shoot', 0.5).then(success => {
      if (!success) this.fallbackFirePeaShoot();
    });
  }

  public playMelonThrow() {
    this.playOriginalSfx('melon_throw', 0.55).then(success => {
      if (!success) this.fallbackMelonThrow();
    });
  }

  public playHitSplat() {
    this.playOriginalSfx('hit_splat', 0.4).then(success => {
      if (!success) this.fallbackHitSplat();
    });
  }

  public playPlant() {
    this.playOriginalSfx('plant', 0.6).then(success => {
      if (!success) this.fallbackSunPickup();
    });
  }

  public playShovel() {
    this.playOriginalSfx('shovel', 0.6).then(success => {
      if (!success) this.playClick();
    });
  }

  public playChomp() {
    this.playOriginalSfx('chomp', 0.5);
  }

  public playZombieGroan() {
    this.playOriginalSfx('groan', 0.4);
  }

  public playZombieDie() {
    this.playOriginalSfx('zombie_die', 0.5);
  }

  public playExplosion() {
    this.playOriginalSfx('explosion', 0.7).then(success => {
      if (!success) this.fallbackExplosion();
    });
  }

  public playLawnMower() {
    this.playOriginalSfx('lawn_mower', 0.75);
  }

  public playHugeWave() {
    this.playOriginalSfx('huge_wave', 0.8);
  }

  public playPlantFood() {
    this.playOriginalSfx('plant_food', 0.6).then(success => {
      if (!success) this.fallbackPlantFood();
    });
  }

  public playMagnetClink() {
    this.playOriginalSfx('magnet', 0.5).then(success => {
      if (!success) this.fallbackMagnetClink();
    });
  }

  public playWateringCan() {
    this.playOriginalSfx('watering', 0.5).then(success => {
      if (!success) this.fallbackWateringCan();
    });
  }

  public playNewspaperRage() {
    this.playOriginalSfx('newspaper_rage', 0.65).then(success => {
      if (!success) this.fallbackNewspaperRage();
    });
  }

  public playClick() {
    this.playOriginalSfx('click', 0.35).then(success => {
      if (!success) this.fallbackClick();
    });
  }

  public playPowerup() {
    this.playPlantFood();
  }

  public playVictory() {
    this.playOriginalSfx('victory', 0.7).then(success => {
      if (!success) this.fallbackVictory();
    });
  }

  public playGameOver() {
    this.playOriginalSfx('game_over', 0.75);
  }

  // --- Fallback Procedural Synthesizers ---

  private fallbackSunPickup() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.18);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  private fallbackPeaShoot() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  private fallbackFirePeaShoot() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  private fallbackMelonThrow() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  private fallbackHitSplat() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.06);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  private fallbackExplosion() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.5);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  private fallbackPlantFood() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [440, 554.37, 659.25, 880, 1108.73].forEach((freq, i) => {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + i * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.25);
    });
  }

  private fallbackMagnetClink() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.1);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  private fallbackWateringCan() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [600, 750, 900, 1050].forEach((freq, idx) => {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.05;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    });
  }

  private fallbackNewspaperRage() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.3);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  private fallbackClick() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  private fallbackVictory() {
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((f, idx) => {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.12;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  // --- Background Music Arpeggiator ---
  public startBGM(theme: string = 'grasswalk') {
    if (this.isMuted) return;
    if (this.currentBgmTheme === theme && this.bgmInterval !== null) return;
    this.stopBGM();
    this.currentBgmTheme = theme;

    const ctx = this.initContext();
    if (!ctx) return;

    const scale = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];
    const pattern = [0, 2, 4, 2, 3, 5, 4, 2, 0, 4, 7, 4, 2, 1, 0, 2];
    let step = 0;

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted) return;
      const actx = this.initContext();
      if (!actx) return;
      const now = actx.currentTime;
      const noteFreq = scale[pattern[step % pattern.length] % scale.length];

      const osc = actx.createOscillator();
      const gain = actx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq * 0.5, now);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(actx.destination);
      osc.start(now);
      osc.stop(now + 0.28);

      step++;
    }, 280);
  }

  public stopBGM() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
      this.currentBgmTheme = null;
    }
  }
}

export const sound = new PvzSoundEngine();
