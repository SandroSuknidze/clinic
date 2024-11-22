import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { emailExistsValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);


  private emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';


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
    ], personalNumber: [
      '',
      [Validators.required, Validators.min(10000000000), Validators.max(99999999999)],
    ],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
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
    }
    return '';
  }
  onSubmit() {
    console.log(this.profileForm.value);
    console.log(this.profileForm.status);
  }
}
