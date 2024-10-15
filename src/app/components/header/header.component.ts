import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isModalOpen: boolean = true;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
