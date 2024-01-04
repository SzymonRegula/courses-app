import { AbstractControl, ValidationErrors } from '@angular/forms';

export function authorValidator(
  control: AbstractControl
): ValidationErrors | null {
  const authorRegex = /^[A-Za-z0-9 ]+$/;
  const isValid = authorRegex.test(control.value);
  return isValid ? null : { invalidAuthor: true };
}
