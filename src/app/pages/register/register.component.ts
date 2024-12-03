import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { emailExistsValidator } from '../../validators/email.validator';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from '../../enums/user-role.enum';
import { personalIdExistsValidator } from '../../validators/personal-id.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);


  private emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  private throttledSendCode = false;

  private loading = false;



  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }


  profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255)]],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['',
      {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(255),
          Validators.pattern(this.emailPattern)
        ],
        asyncValidators: [emailExistsValidator(this.authService)],
        updateOn: 'change'
      }
    ], personalId: [
      '',
      {
        validators: [Validators.required, Validators.min(10000000000), Validators.max(99999999999)],
        asyncValidators: [personalIdExistsValidator(this.authService)],
        updateOn: 'change'
      }
    ],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    activationCode: ['', [Validators.required, Validators.maxLength(255)]],
    role: [UserRole.User]
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
    }
    return '';
  }
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
          if (error.error.errorCode === 'INVALID_CODE') {
            this.toastr.error('აქტივაციის კოდი არასწორია', 'შეცდომა');
          } else {
            this.toastr.error(error.error.errorMessage || 'არასწორი ფორმა', 'შეცდომა');
          }
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



  sendEmailConfirmation() {

    if (this.profileForm.get('email')?.errors) {
      return;

    }
    if (this.throttledSendCode) {
      return;
    }

    console.log('Sending email confirmation...');

    this.throttledSendCode = true;

    setTimeout(() => this.throttledSendCode = false, 20000)

    const email = this.profileForm.value.email ?? '';

    this.authService.sendEmailConfirmation(email).pipe().subscribe({
      next: () => {
        this.toastr.success('ვერიფიკაციის კოდი წარმატებით გამოიგზავნა თქვენს მეილზე!!!');
      },
      error: () => {
        this.toastr.error('ვერიფიკაციის კოდი ვერ გაიგზავნა');
      }
    })
  }

}
