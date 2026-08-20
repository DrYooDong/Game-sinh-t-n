import { PVZ_PLANT_ASSETS, PVZ_ZOMBIE_ASSETS, PVZ_LAWN_ASSETS, PVZ_PROJECTILE_ASSETS, PVZ_UI_ASSETS } from '../data/pvzAssetMap';

class ImageCacheManager {
  private cache: Map<string, HTMLImageElement> = new Map();
  private loadStatus: Map<string, 'loading' | 'loaded' | 'error'> = new Map();

  constructor() {
    this.preloadAll();
  }

  public preload(src: string): HTMLImageElement {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    const img = new Image();
    this.loadStatus.set(src, 'loading');
    img.onload = () => {
      this.loadStatus.set(src, 'loaded');
    };
    img.onerror = () => {
      this.loadStatus.set(src, 'error');
    };
    img.src = src;
    this.cache.set(src, img);
    return img;
  }

  public getImage(src: string | undefined): HTMLImageElement | null {
    if (!src) return null;
    const cached = this.cache.get(src);
    if (cached) {
      if (this.loadStatus.get(src) === 'loaded') {
        return cached;
      }
      return null;
    }
    this.preload(src);
    return null;
  }

  public isLoaded(src: string): boolean {
    return this.loadStatus.get(src) === 'loaded';
  }

  public preloadAll(): void {
    Object.values(PVZ_PLANT_ASSETS).forEach(url => this.preload(url));
    Object.values(PVZ_ZOMBIE_ASSETS).forEach(url => this.preload(url));
    Object.values(PVZ_LAWN_ASSETS).forEach(url => this.preload(url));
    Object.values(PVZ_PROJECTILE_ASSETS).forEach(url => this.preload(url));
    Object.values(PVZ_UI_ASSETS).forEach(url => this.preload(url));
  }
}

export const imageCache = new ImageCacheManager();
