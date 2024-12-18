import {Component, EventEmitter, Output, inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../services/api.service";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent {
    private formBuilder = inject(FormBuilder);
    private toastr = inject(ToastrService);
    private apiService = inject(ApiService);
    private authService = inject(AuthService);
    private router = inject(Router);

    email: string = '';
    password: string = '';
    private emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

    private loading = false;
    protected loadingForgot = false;

    public loginView = true;

    @Output() toggle = new EventEmitter<void>();

    toggleModal() {
        this.toggle.emit();
    }

    toggleView() {
        this.loginView = !this.loginView;
    }



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

    forgotForm = this.formBuilder.group({
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
                    this.authService.handleRegistrationResponse(response);
                    this.toastr.success('ავტორიზაცია წარმატებით დასრულდა!', 'წარმატება!');
                    console.log('User logined:', response);
                    this.loginForm.reset();
                    this.router.navigate(['/']);
                    this.toggleModal();
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

    onForgotPassword() {
        if (this.loadingForgot) {
            return;
        }
        if (this.forgotForm.valid && !this.loadingForgot) {
            this.loadingForgot = true;


            console.log(this.forgotForm.value);

            // this.apiService.post('Users/forgot-password', this.forgotForm.value).subscribe({
            //     next: (response) => {
            //         this.toastr.success('შეტყობინება წარმატებით გამოიგზავნა თქვენს მითითებულ მეილზე', 'წარმატება!',);
            //         console.log('forgot:', response);
            //         this.forgotForm.reset();
            //     },
            //     error: (error) => {
            //         this.toastr.error(error.error.errorMessage || 'არასწორი ფორმა', 'შეცდომა');
            //     },
            // })
            setTimeout(() => {
                this.loadingForgot = false;
            }, 20000)
        } else if (!this.forgotForm.valid) {
            this.toastr.error('არასწორი ფორმა', 'შეცდომა');
        }

    }

}
