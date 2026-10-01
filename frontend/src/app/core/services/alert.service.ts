import { Injectable, computed, inject } from '@angular/core';
import { ZoneAlert } from '../models/zone.model';
import { distanceMeters } from '../utils/geo.utils';
import { LocationService } from './location.service';
import { ZoneService } from './zone.service';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private zones = inject(ZoneService);
  private location = inject(LocationService);

  /** Zonas en las que está el usuario ahora mismo, de más cerca a más lejos del epicentro */
  readonly activeAlerts = computed<ZoneAlert[]>(() => {
    const pos = this.location.position();
    return this.zones
      .zones()
      .map((zone) => ({ zone, distance: distanceMeters(pos, zone) }))
      .filter((a) => a.distance <= a.zone.radius)
      .sort((a, b) => a.distance - b.distance);
  });
}
