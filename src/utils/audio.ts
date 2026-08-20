// Enhanced Audio Controller with Original PopCap SFX and Procedural Synthesizer Fallback

export type AudioEventType = 
  | 'click' | 'system_alert' | 'level_up' | 'item_get' 
  | 'attack' | 'skill' | 'craft' | 'rest' | 'danger' | 'victory';

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private audioBufferCache: Map<string, AudioBuffer> = new Map();
  private loadingPromises: Map<string, Promise<AudioBuffer | null>> = new Map();

  private readonly sfxMapping: Record<AudioEventType, string[]> = {
    click: ['bleep.ogg', 'tap.ogg'],
    system_alert: ['awooga.ogg', 'readysetplant.ogg'],
    level_up: ['winmusic.ogg', 'tada.ogg'],
    item_get: ['points.ogg', 'coin.ogg', 'diamond.ogg'],
    attack: ['throw.ogg', 'splat.ogg', 'splat2.ogg'],
    skill: ['cherrybomb.ogg', 'plantgrow.ogg'],
    craft: ['shovel.ogg', 'plant.ogg'],
    rest: ['plant_water.ogg'],
    danger: ['hugewave.ogg', 'siren.ogg', 'awooga.ogg'],
    victory: ['winmusic.ogg', 'tada.ogg']
  };

  private initCtx(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
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
        const response = await fetch(`/pvz_assets/sounds/${fileName}`);
        if (!response.ok) return null;
        const arrayBuffer = await response.arrayBuffer();
        const ctx = this.initCtx();
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

  private async playOriginalAudio(type: AudioEventType): Promise<boolean> {
    const list = this.sfxMapping[type];
    if (!list || list.length === 0) return false;
    const file = list[Math.floor(Math.random() * list.length)];
    const buffer = await this.loadAudioBuffer(file);
    const ctx = this.initCtx();
    if (buffer && ctx) {
      try {
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.playbackRate.value = 0.96 + Math.random() * 0.08;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.55, ctx.currentTime);
        src.connect(gain);
        gain.connect(ctx.destination);
        src.start(0);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  public play(type: AudioEventType) {
    if (this.isMuted) return;
    this.playOriginalAudio(type).then(success => {
      if (!success) {
        this.fallbackPlay(type);
      }
    });
  }

  private fallbackPlay(type: AudioEventType) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      switch (type) {
        case 'click': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }

        case 'system_alert': {
          [440, 880, 1320].forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.07);
            gain.gain.setValueAtTime(0.15, now + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.18);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.07);
            osc.stop(now + i * 0.07 + 0.18);
          });
          break;
        }

        case 'level_up': {
          const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
          notes.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + i * 0.09);
            gain.gain.setValueAtTime(0.18, now + i * 0.09);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.09);
            osc.stop(now + i * 0.09 + 0.35);
          });
          break;
        }

        case 'item_get': {
          [880, 1174.66, 1760].forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.08);
            gain.gain.setValueAtTime(0.15, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.25);
          });
          break;
        }

        case 'attack': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(250, now);
          osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.12);
          break;
        }

        case 'skill': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
          break;
        }

        case 'craft': {
          [900, 300].forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = idx === 0 ? 'sine' : 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
          });
          break;
        }

        case 'rest': {
          [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.12);
            gain.gain.setValueAtTime(0.12, now + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.4);
          });
          break;
        }

        case 'danger': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(850, now);
          osc.frequency.linearRampToValueAtTime(450, now + 0.25);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.28);
          break;
        }

        case 'victory': {
          [440, 554.37, 659.25, 880].forEach((f, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + i * 0.1);
            gain.gain.setValueAtTime(0.2, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.4);
          });
          break;
        }
      }
    } catch {
      // Audio playback fails gracefully if browser blocks autoplay
    }
  }
}

export const soundManager = new SoundController();
