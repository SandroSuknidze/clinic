import { Component, inject } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Doctor } from '../../models/doctor';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    private formBuilder = inject(FormBuilder);
    protected authService = inject(AuthService);

    isModalOpen: boolean = false;
    showResults: boolean = false;

    searchForm = this.formBuilder.group({
        name: [''],
        category: [''],
    });

    doctors: Doctor[] = [];

    constructor(private doctorService: DoctorService) {
        this.searchForm.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(() => this.searchDoctors());
    }
    searchDoctors(): void {
        const { name, category } = this.searchForm.value;

        if (!name && !category) {
            this.doctors = [];
            return;
        }

        this.doctorService.getDoctors(name, category).subscribe((doctors) => {
            this.doctors = doctors;
            this.showResults = true;
        });
    }

    handleBlur(): void {
        setTimeout(() => {
            this.showResults = false;
        }, 200);
    }

    handleFocus(): void {
        setTimeout(() => {
            if (this.doctors.length > 0) {
                this.showResults = true;
            }
        }, 200);
    }

    toggleModal() {
        this.isModalOpen = !this.isModalOpen;
    }

}
