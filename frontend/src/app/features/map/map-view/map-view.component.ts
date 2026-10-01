import { Component, ElementRef, NgZone, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { HAZARD_COLORS } from '../../../core/constants/hazard.constants';
import { DangerZone, LatLng } from '../../../core/models/zone.model';
import { MapsLoaderService } from '../../../core/services/maps-loader.service';

/** Componente "tonto": solo pinta el mapa y emite eventos. */
@Component({
  selector: 'app-map-view',
  standalone: true,
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent {
  private loader = inject(MapsLoaderService);
  private zone = inject(NgZone);

  zones = input.required<DangerZone[]>();
  userPosition = input.required<LatLng>();
  mapClick = output<LatLng>();
  userMoved = output<LatLng>();

  private mapEl = viewChild.required<ElementRef<HTMLDivElement>>('mapEl');
  private ready = signal(false);
  private map!: google.maps.Map;
  private marker!: google.maps.Marker;
  private circles: google.maps.Circle[] = [];

  constructor() {
    effect(() => {
      if (!this.ready()) return;
      const pos = this.userPosition();
      this.marker.setPosition(pos);
      this.map.panTo(pos);
    });
    effect(() => {
      if (!this.ready()) return;
      this.drawZones(this.zones());
    });
    this.init();
  }

  private async init(): Promise<void> {
    await this.loader.load();
    const start = this.userPosition();

    this.map = new google.maps.Map(this.mapEl().nativeElement, {
      center: start, zoom: 13, streetViewControl: false,
    });

    this.marker = new google.maps.Marker({
      position: start, map: this.map, draggable: true,
      title: 'Tu posición (arrástrame para simular)',
      icon: {
        path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: '#2563eb',
        fillOpacity: 1, strokeColor: '#fff', strokeWeight: 3,
      },
    });

    this.marker.addListener('dragend', (e: google.maps.MapMouseEvent) =>
      this.zone.run(() => this.userMoved.emit({ lat: e.latLng!.lat(), lng: e.latLng!.lng() })),
    );
    this.map.addListener('click', (e: google.maps.MapMouseEvent) =>
      this.zone.run(() => this.mapClick.emit({ lat: e.latLng!.lat(), lng: e.latLng!.lng() })),
    );

    this.ready.set(true);
  }

  private drawZones(zones: DangerZone[]): void {
    this.circles.forEach((c) => c.setMap(null));
    this.circles = zones.map(
      (z) =>
        new google.maps.Circle({
          map: this.map, center: { lat: z.lat, lng: z.lng }, radius: z.radius,
          strokeColor: HAZARD_COLORS[z.type], fillColor: HAZARD_COLORS[z.type],
          fillOpacity: 0.25, strokeWeight: 2, clickable: false,
        }),
    );
  }
}
