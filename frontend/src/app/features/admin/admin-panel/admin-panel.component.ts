import { Component, input, output } from '@angular/core';
import { DangerZone } from '../../../core/models/zone.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  zones = input.required<DangerZone[]>();
  remove = output<number>();
}
