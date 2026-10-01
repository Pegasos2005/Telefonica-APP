import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HAZARD_TYPES } from '../../../core/constants/hazard.constants';
import { ZoneFormValue } from '../../../core/models/zone.model';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-zone-form-dialog',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './zone-form-dialog.component.html',
  styleUrl: './zone-form-dialog.component.scss',
})
export class ZoneFormDialogComponent {
  created = output<ZoneFormValue>();
  closed = output<void>();

  hazardTypes = HAZARD_TYPES;
  form: ZoneFormValue = { type: 'Incendio', radius: 1000, desc: '' };

  submit(): void {
    this.created.emit({
      ...this.form,
      radius: Math.max(50, this.form.radius),
      desc: this.form.desc.trim(),
    });
  }
}
