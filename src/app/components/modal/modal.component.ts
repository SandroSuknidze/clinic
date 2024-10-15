import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Output() toggle = new EventEmitter<void>();

  toggleModal() {
    this.toggle.emit();
  }
}
