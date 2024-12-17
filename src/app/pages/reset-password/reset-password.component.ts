import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {PasswordMatchValidator} from "../../validators/password-match.validator";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
    token: string = '';
    password: string = '';
    confirmPassword: string = '';
    isTokenValid: boolean = false;
    errorMessage: string = '';

    private formBuilder = inject(FormBuilder);
    private toastr = inject(ToastrService)

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        // Get the 'token' query parameter
        this.route.queryParams.subscribe((params) => {
            this.token = params['token'];
            if (this.token) {
                this.validateToken();
            } else {
                this.errorMessage = 'Token is missing.';
            }
        });
    }

    resetPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        },
        {validators: PasswordMatchValidator('password', 'confirmPassword')}
    );


    getErrorMessage(controlName: string): string {
        const control = this.resetPasswordForm.get(controlName);

        if (control?.errors && control.touched) {
            if (control.errors['required']) {
                return '*სავალდებულოა';
            }
            if (control.errors['minlength']) {
                return '*პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს';
            }
            if (control.errors['maxlength']) {
                return '*ველი არ უნდა აღემატებოდეს 255 სიმბოლოს';
            }
            if (control.errors['passwordMismatch']) {
                return '*პაროლები არ ემთხვევა';
            }
        }
        return '';
    }

    validateToken(): void {
        this.http
            .post('/User/validate-token', {token: this.token})
            .subscribe({
                next: (response) => {
                    console.log('Token is valid:', response);
                    this.isTokenValid = true;
                },
                error: (error) => {
                    console.error('Invalid token:', error);
                    this.errorMessage = 'Invalid or expired token.';
                },
            });
    }

    onSubmit(): void {
        this.http
            .post('/User/reset-password', {
                token: this.token,
                newPassword: this.password,
            })
            .subscribe({
                next: () => {
                    this.toastr.success('პაროლი წარმატებით შეიცვალა!', 'წარმატება!',);
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    console.error('Error resetting password:', error);
                    this.toastr.error(error.error.errorMessage || 'დაფიქსირდა შეცდომა', 'შეცდომა');
                },
            });
    }
}
