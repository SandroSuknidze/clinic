import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, debounceTime, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function emailExistsValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return authService.checkEmailExists(control.value).pipe(
            debounceTime(3000),
            map(emailExists => emailExists ? { emailExists: true } : null)
        );
    };
}