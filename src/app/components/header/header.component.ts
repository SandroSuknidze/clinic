import {Component, inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    private formBuilder = inject(FormBuilder);
    protected authService = inject(AuthService);

    isModalOpen: boolean = false;

    searchForm = this.formBuilder.group({
        name: [''],
        category: [''],
    });

    items: any[] = [
        { id: 1, name: 'Apple', category: 'Fruit' },
        { id: 2, name: 'Carrot', category: 'Vegetable' },
        { id: 3, name: 'Banana', category: 'Fruit' },
        { id: 4, name: 'Tomato', category: 'Vegetable' },
        { id: 5, name: 'Grapes', category: 'Fruit' },
        { id: 6, name: 'Potato', category: 'Vegetable' },
    ];

    filteredItems: any[] = [];

    constructor() {
        // Initially show all items
        this.filteredItems = this.items;

        // Listen to changes in form and filter items dynamically
        this.searchForm.valueChanges.subscribe(() => this.filterItems());
    }

    filterItems(): void {
        // @ts-ignore
        const { name, category } = this.searchForm.value;

        // Apply filters
        this.filteredItems = this.items.filter((item) => {
            const matchesName = name
                ? item.name.toLowerCase().includes(name.toLowerCase())
                : true;

            const matchesCategory = category
                ? item.category.toLowerCase().includes(category.toLowerCase())
                : true;

            // Combine both conditions
            return matchesName && matchesCategory;
        });
    }




    toggleModal() {
        this.isModalOpen = !this.isModalOpen;
    }







}
