import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reservation-desc-modal',
  templateUrl: './reservation-desc-modal.component.html',
  styleUrl: './reservation-desc-modal.component.css'
})
export class ReservationDescModalComponent {
    private toastr = inject(ToastrService);
    @Output() toggle = new EventEmitter<void>();
    @Output() reservationMade = new EventEmitter<string>();
    @Input() description: string = '';


    toggleModal() {
        this.toggle.emit();
    }

    handleReservationClick() {
        if (this.description.length > 255) {
            this.toastr.error('Description must be less than 255 characters');
            return;
        }
        this.reservationMade.emit(this.description);
    }

}
