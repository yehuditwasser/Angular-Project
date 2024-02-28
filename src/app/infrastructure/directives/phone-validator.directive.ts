import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { PhoneValidator } from '../validators/phone.validator';

@Directive({
  selector: '[phone][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneValidator,
      multi: true
    }
  ]
})

export class PhoneValidatorDirective { }
