import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrl: './category-list-item.component.css'
})
export class CategoryListItemComponent {
  value: number = 5;

  @Input() doctor!: Doctor;
  @Input() index!: number;

}
