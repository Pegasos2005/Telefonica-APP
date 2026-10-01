import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ZoneAlert } from '../../../core/models/zone.model';
import { DistancePipe } from '../../../shared/pipes/distance.pipe';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [DistancePipe, DatePipe],
  templateUrl: './alert-banner.component.html',
  styleUrl: './alert-banner.component.scss',
})
export class AlertBannerComponent {
  alerts = input.required<ZoneAlert[]>();
}
