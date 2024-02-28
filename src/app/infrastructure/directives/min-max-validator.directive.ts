import { Directive, Input, Attribute } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { MainService } from '../services';
import { NG_VALIDATORS } from '@angular/forms';
import { IdentityType } from '../enums';
import { BasicPersonDto } from '../models/basic-person.model';

@Directive({
  selector: '[minMaxValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinMaxValidatorDirective,
      multi: true
    }
  ]
})
export class MinMaxValidatorDirective {

  @Input()
  min: number;
  @Input()
  max: number;
  validator: ValidatorFn;

  constructor() {
  }

  validate(c: AbstractControl) {
    const value = c.value;
    if (!isNaN(value)) {
      if ((!isNaN(this.min) && value < this.min) || (!isNaN(this.max) && value > this.max)) {
        return {
          valid: false,
          minMaxValidator: {
            valid: false,
            error: 'מבנה השדה אינו תקין'
          }
        };
      }
    }
    return null;
  }
}
