import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { equals } from './equals';

@Directive({
  selector: '[valEquals]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualsDirective,
      multi: true,
    },
  ],
})
export class EqualsDirective implements Validator {
  readonly valEquals = input.required<string>();

  validate(control: AbstractControl): ValidationErrors | null {
    const comparison = this.valEquals();

    return equals(comparison)(control);
  }
}
