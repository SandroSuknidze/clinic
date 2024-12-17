import {Component, EventEmitter, Output, inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent {
    private formBuilder = inject(FormBuilder);
    private toastr = inject(ToastrService);
    private apiService = inject(ApiService);

    @Output() toggle = new EventEmitter<void>();

    toggleModal() {
        this.toggle.emit();
    }

    email: string = '';
    password: string = '';
    private emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

    private loading = false;

    loginForm = this.formBuilder.group({
        email: ['',
            {
                validators: [
                    Validators.required,
                    Validators.email,
                    Validators.maxLength(255),
                    Validators.pattern(this.emailPattern)
                ],
                updateOn: 'change'
            }

        ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    });

    getErrorMessage(controlName: string): string {
        const control = this.loginForm.get(controlName);

        if (control?.errors && control.touched) {
            if (control.errors['required']) {
                return '*სავალდებულოა';
            }
            if (control.errors['minlength']) {
                if (controlName === 'password') {
                    return '*პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს';
                }
            }
            if (control.errors['maxlength']) {
                return '*ველი არ უნდა აღემატებოდეს 255 სიმბოლოს';
            }
            if (control.errors['email'] || control.errors['pattern']) {
                return '*არასწორი ფორმატი';
            }
        }
        return '';
    }

    onLogin() {
        if (this.loginForm.valid && !this.loading) {
            this.loading = true;

            console.log(this.loginForm.value);

            this.apiService.post('Users/login', this.loginForm.value).subscribe({
                next: (response) => {
                    this.toastr.success('ავტორიზაცია წარმატებით დასრულდა!', 'წარმატება!',);
                    console.log('User logined:', response);
                    this.loginForm.reset();
                },
                error: (error) => {
                    this.toastr.error(error.error.errorMessage || 'არასწორი ფორმა', 'შეცდომა');
                    this.loading = false;
                },
                complete: () => {
                    this.loading = false;
                }
            })
        } else if (!this.loginForm.valid) {
            this.toastr.error('არასწორი ფორმა', 'Form Invalid');
            this.loading = false;
        }
    }

    onResetPassword(): void {
        console.log('Password reset initiated for:', this.email);
    }
}
