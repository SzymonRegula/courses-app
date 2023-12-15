import { Directive } from '@angular/core';
import {
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';
import { emailValidator } from '../utils/email.validator';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator(control);
  }
}
