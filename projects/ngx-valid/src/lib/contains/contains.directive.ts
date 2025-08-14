import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { contains, ContainsOptions } from './contains';

@Directive({
  selector: '[valContains]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ContainsDirective,
      multi: true,
    },
  ],
})
export class ContainsDirective implements Validator {
  readonly valContains = input.required<string>();
  readonly valContainsOptions = input<ContainsOptions>({});

  validate(control: AbstractControl): ValidationErrors | null {
    const element = this.valContains();
    const options = this.valContainsOptions();

    return contains(element, options)(control);
  }
}
