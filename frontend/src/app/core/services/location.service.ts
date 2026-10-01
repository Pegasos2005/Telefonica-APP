import { Injectable, signal } from '@angular/core';
import { DEFAULT_POSITION } from '../constants/hazard.constants';
import { LatLng } from '../models/zone.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private _position = signal<LatLng>(DEFAULT_POSITION);
  readonly position = this._position.asReadonly();

  detect(): void {
    navigator.geolocation?.getCurrentPosition(
      (p) => this._position.set({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => {},
      { enableHighAccuracy: true },
    );
  }

  /** También se usa para simular la posición arrastrando el marcador */
  set(pos: LatLng): void {
    this._position.set(pos);
  }
}
