import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {emailExistsValidator} from "../../../validators/email.validator";
import {personalIdExistsValidator} from "../../../validators/personal-id.validator";
import {UserRole} from "../../../enums/user-role.enum";
import {fileTypeValidator} from "../../../validators/file-type.validator";

@Component({
    selector: 'app-doctor-register',
    templateUrl: './doctor-register.component.html',
    styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent {
    private formBuilder = inject(FormBuilder);
    private authService = inject(AuthService);
    private apiService = inject(ApiService);
    private toastr = inject(ToastrService);

    @ViewChild('avatarFileInput') avatarFileInput!: ElementRef<HTMLInputElement>;
    @ViewChild('bioFileInput') bioFileInput!: ElementRef<HTMLInputElement>;

    private emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

    private loading = false;

    showDropdown: boolean = false;
    categories: string[] = ['ანესთეზიოლოგი', 'თერაპევტი', 'პედიატრი', 'ნევროლოგი', 'ნევრაზია', 'სტომატოლოგი']; // Static categories
    filteredCategories: string[] = [];

    avatarFileName: string = '';
    bioFileName: string = '';


    profileForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(255)]],
        lastName: ['', [Validators.required, Validators.maxLength(255)]],
        email: ['',
            {
                // validators: [
                //     Validators.required,
                //     Validators.email,
                //     Validators.maxLength(255),
                //     Validators.pattern(this.emailPattern)
                // ],
                // asyncValidators: [emailExistsValidator(this.authService)],
                // updateOn: 'change'
            }
        ], personalId: [
            '',
            // {
            //     validators: [Validators.required, Validators.min(10000000000), Validators.max(99999999999)],
            //     asyncValidators: [personalIdExistsValidator(this.authService)],
            //     updateOn: 'change'
            // }
        ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        category: ['', [Validators.required, Validators.maxLength(255)]],
        avatar: [null as File | null, [Validators.required, fileTypeValidator(['image/jpeg', 'image/png'])]],
        bio: [null as File | null, [Validators.required, fileTypeValidator(['text/csv'])]],
        role: [UserRole.Doctor]
    });


    getErrorMessage(controlName: string): string {
        const control = this.profileForm.get(controlName);

        if (control?.errors && control.touched) {
            if (control.errors['required']) {
                return '*სავალდებულოა';
            }
            if (control.errors['minlength']) {
                if (controlName === 'password') {
                    return '*პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს';
                }
            }
            if (control.errors['min']) {
                return '*პერსონალური ნომერი უნდა შეიცავდეს 11 ციფრს'
            }
            if (control.errors['max']) {
                return '*პერსონალური ნომერი უნდა შეიცავდეს 11 ციფრს'
            }
            if (control.errors['maxlength']) {
                return '*ველი არ უნდა აღემატებოდეს 255 სიმბოლოს';
            }
            if (control.errors['email'] || control.errors['pattern']) {
                return '*არასწორი ფორმატი';
            }
            if (control.errors['emailExists']) {
                return '*ეს ელ-ფოსტა უკვე გამოყენებულია';
            }
            if (control.errors['personalIdExists']) {
                return '*ეს პირადი ნომერი უკვე გამოყენებულია';
            }
            if (control.errors['fileSizeExceeded']) {
                return '*ფაილის ზომა არ უნდა აღემატებოდეს 2 MB-ს';
            }
            if (control.errors['invalidDimensions']) {
                return '*სურათი არ უნდა აღემატებოდეს 1000x1000 ზომას';
            }
            if (control.errors['invalidFileType']) {
                return controlName === 'avatar'
                    ? '*გთხოვთ ატვირთოთ სწორი სურათი'
                    : '*გთხოვთ ატვირთოთ სწორი CSV ფაილი';
            }
        }
        return '';
    }

    hideDropdown() {
        setTimeout(() => {
            this.showDropdown = false;
        }, 100);
    }

    selectCategory(category: string) {
        this.profileForm.controls['category'].setValue(category);
        this.showDropdown = false;
        this.filterCategories();
    }

    filterCategories() {
        setTimeout(() => {
            const query = this.profileForm.controls['category'].value?.toLowerCase();
            if (query) {
                this.filteredCategories = this.categories.filter(category =>
                    category.toLowerCase().startsWith(query.toLowerCase())
                );
            } else {
                this.filteredCategories = this.categories;
            }
        }, 100);

    }

    onFileSelected(event: Event, type: 'avatar' | 'bio'): void {
        const input = event.target as HTMLInputElement;
        const control = this.profileForm.get(type);


        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const maxFileSize = 2 * 1024 * 1024;

            if (file.size > maxFileSize) {
                control?.setErrors({fileSizeExceeded: true});
                return;
            }

            if (type === 'avatar') {
                this.profileForm.patchValue({avatar: file})
                this.avatarFileName = file.name;
            } else if (type === 'bio') {
                this.profileForm.patchValue({bio: file})
                this.bioFileName = file.name;
            }

            control?.setValue(file);
            control?.setErrors(null);

            control?.markAsTouched();
            control?.updateValueAndValidity();
        } else {
            control?.setValue(null);
            control?.setErrors({required: true});
        }
        // console.log(this.profileForm.value);

    }


    triggerFileInput(type: 'avatar' | 'bio'): void {
        if (type === 'avatar') {
            this.avatarFileInput.nativeElement.click();
        } else if (type === 'bio') {
            this.bioFileInput.nativeElement.click();
        }
    }


    // fetchCategories() {
    //     this.apiService.get('Categories').subscribe({
    //         next: (data:any) => {
    //             this.categories = data.map((category: { name: any; }) => category.name);
    //             console.log('Categories:', data);
    //         },
    //         error: (error) => {
    //             console.error('Error fetching categories:', error);
    //         }
    //     });
    // }

    onSubmit() {
        if (this.profileForm.valid && !this.loading) {
            this.loading = true;

            console.log(this.profileForm.value);

            this.apiService.post('Users/register', this.profileForm.value).subscribe({
                next: (response) => {
                    this.toastr.success('რეგისტრაცია წარმატებით დასრულდა!', 'წარმატება!',);
                    console.log('User registered:', response);
                    this.profileForm.reset();
                },
                error: (error) => {
                    this.toastr.error(error.error.errorMessage || 'არასწორი ფორმა', 'შეცდომა');
                    console.error('Error registering user:', error);
                    this.loading = false;
                },
                complete: () => {
                    this.loading = false;
                }
            })
        } else if (!this.profileForm.valid) {
            this.toastr.error('არასწორი ფორმა', 'Form Invalid');
            this.loading = false;
        }
    }
}
