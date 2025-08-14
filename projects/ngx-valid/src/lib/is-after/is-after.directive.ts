import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { isAfter, IsAfterOptions } from './is-after';

@Directive({
  selector: '[valIsAfter]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IsAfterDirective,
      multi: true,
    },
  ],
})
export class IsAfterDirective implements Validator {
  readonly valIsAfter = input<string | Date>();
  readonly valIsAfterOptions = input<IsAfterOptions>({});

  validate(control: AbstractControl): ValidationErrors | null {
    const comparisonDate = this.valIsAfter();
    const options = this.valIsAfterOptions();

    const finalOptions: IsAfterOptions = {
      ...options,
      comparisonDate: comparisonDate || options.comparisonDate,
    };

    return isAfter(finalOptions)(control);
  }
}
