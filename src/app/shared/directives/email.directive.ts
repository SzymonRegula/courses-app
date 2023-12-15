import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[emailValidator]',
  providers: [
    /*Add your code here*/
  ],
})
export class EmailValidatorDirective implements Validator {
  // Add your code here
  validate(control: AbstractControl): ValidationErrors | null {
    // Add your validation logic here
    return null;
  }
}
