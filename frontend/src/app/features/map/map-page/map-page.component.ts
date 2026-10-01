import { Component, OnInit, inject, signal } from '@angular/core';
import { LatLng, ZoneFormValue } from '../../../core/models/zone.model';
import { AlertService } from '../../../core/services/alert.service';
import { AuthService } from '../../../core/services/auth.service';
import { LocationService } from '../../../core/services/location.service';
import { ZoneService } from '../../../core/services/zone.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AdminPanelComponent } from '../../admin/admin-panel/admin-panel.component';
import { LoginDialogComponent } from '../../admin/login-dialog/login-dialog.component';
import { ZoneFormDialogComponent } from '../../admin/zone-form-dialog/zone-form-dialog.component';
import { AlertBannerComponent } from '../../alerts/alert-banner/alert-banner.component';
import { MapViewComponent } from '../map-view/map-view.component';

/** Componente "inteligente": orquesta servicios y componentes. */
@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    HeaderComponent, MapViewComponent, AlertBannerComponent,
    AdminPanelComponent, LoginDialogComponent, ZoneFormDialogComponent,
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent implements OnInit {
  readonly auth = inject(AuthService);
  readonly zones = inject(ZoneService);
  readonly location = inject(LocationService);
  readonly alerts = inject(AlertService);

  showLogin = signal(false);
  pendingPos = signal<LatLng | null>(null);

  ngOnInit(): void {
    this.location.detect();
  }

  onHeaderClick(): void {
    this.auth.isAdmin() ? this.auth.logout() : this.showLogin.set(true);
  }

  onMapClick(pos: LatLng): void {
    if (this.auth.isAdmin()) this.pendingPos.set(pos);
  }

  onZoneCreated(form: ZoneFormValue): void {
    const pos = this.pendingPos();
    if (pos) this.zones.add({ ...form, ...pos });
    this.pendingPos.set(null);
  }
}
