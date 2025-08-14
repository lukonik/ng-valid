import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { isBefore } from './is-before';

@Directive({
  selector: '[valIsBefore]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IsBeforeDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class IsBeforeDirective implements Validator {
  @Input('valIsBefore') comparisonDate?: string | Date = new Date();

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = isBefore({ comparisonDate: this.comparisonDate });
    return validator(control);
  }
}
