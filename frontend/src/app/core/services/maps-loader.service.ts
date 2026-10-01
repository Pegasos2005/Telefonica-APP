import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MapsLoaderService {
  private promise?: Promise<void>;

  load(): Promise<void> {
    if (!this.promise) {
      this.promise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}`;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('No se pudo cargar Google Maps'));
        document.head.appendChild(s);
      });
    }
    return this.promise;
  }
}
