import { Injectable, signal } from '@angular/core';
import { DangerZone, NewZone } from '../models/zone.model';

/**
 * Prototipo con localStorage. Para escalar, solo hay que cambiar
 * la implementación interna (Firestore, HTTP...) y mantener esta API.
 */
@Injectable({ providedIn: 'root' })
export class ZoneService {
  private readonly KEY = 'zones';
  private _zones = signal<DangerZone[]>(this.load());
  readonly zones = this._zones.asReadonly();

  constructor() {
    // sincroniza entre pestañas (admin en una, usuario en otra)
    window.addEventListener('storage', (e) => {
      if (e.key === this.KEY) this._zones.set(this.load());
    });
  }

  add(zone: NewZone): void {
    const now = Date.now();
    this._zones.update((list) => [...list, { ...zone, id: now, time: now }]);
    this.persist();
  }

  remove(id: number): void {
    this._zones.update((list) => list.filter((z) => z.id !== id));
    this.persist();
  }

  private load(): DangerZone[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(this.KEY, JSON.stringify(this._zones()));
  }
}
