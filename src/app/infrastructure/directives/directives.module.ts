import { NgModule } from "@angular/core";
import { PhoneValidatorDirective } from './phone-validator.directive'
import { IdentityValidatorDirective } from './identity-validator.directive'
import { DigitsOnlyDirective } from './digits-only.directive';
import { MinMaxValidatorDirective } from './min-max-validator.directive';

export const SHARED_DIRECTIVES = [
  PhoneValidatorDirective,
  IdentityValidatorDirective,
  DigitsOnlyDirective,
  MinMaxValidatorDirective
]

@NgModule({
  declarations: [...SHARED_DIRECTIVES],
  exports: [...SHARED_DIRECTIVES]
})
export class SharedDirectivesModule { }
