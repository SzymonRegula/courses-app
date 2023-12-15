import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = emailRegex.test(control.value);
  return isValid ? null : { invalidEmail: true };
}
