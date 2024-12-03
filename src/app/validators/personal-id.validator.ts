import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, debounceTime, first, map, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function personalIdExistsValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return control.valueChanges.pipe(
            debounceTime(1000),
            switchMap((value) => authService.checkPersonalIdExists(value).pipe(
                map((personalIdExists) => (personalIdExists ? { personalIdExists: true } : null))
            )),
            first()
        );
    };
}