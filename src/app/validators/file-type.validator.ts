import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value as File;
        if (!file) {
            return null;
        }

        const fileType = file.type;
        if (!allowedTypes.includes(fileType)) {
            return { invalidFileType: true };
        }

        return null;
    };
}
