import { Directive, Input, Attribute, OnChanges } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { MainService } from '../services';
import { NG_VALIDATORS } from '@angular/forms';
import { IdentityType } from '../enums';
import { BasicPersonDto } from '../models/basic-person.model';

@Directive({
  selector: '[identityValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IdentityValidatorDirective,
      multi: true
    }
  ]
})
export class IdentityValidatorDirective implements OnChanges {

  @Input()
  personId: number;
  @Input()
  identityType: number;
  @Input()
  isCheckDuplicate: any = true;
  validator: ValidatorFn;
  oldValue: string;

  constructor(private mainService: MainService) {

  }

  ngOnChanges(){
    if(this.isCheckDuplicate && this.isCheckDuplicate == 'false')
      this.isCheckDuplicate = false
  }
  validate(c: AbstractControl) {
    const value = c.value;
    // if (this.oldValue != value) {
    if (value) {
      var identityNumber = value;
      while (identityNumber.charAt(0) === '0' && identityNumber.length > 0) {
        identityNumber = identityNumber.substr(1);
      }
      if (identityNumber != "") {
        if (identityNumber.length < 6 || (this.identityType == IdentityType.TZ && (!Number(identityNumber) || !this.validId(identityNumber)))) {
          setTimeout(() => { c.setErrors({ validIdentity: true }) }, 10);
        }
        if (this.isCheckDuplicate) {
          this.mainService.checkExistIdentity(identityNumber, this.personId).subscribe(res => {
            if (res)
              c.setErrors({ duplicateIdentity: true });
          });
        }
         
       
      }
      else
        setTimeout(() => { c.setErrors({ validIdentity: true }) }, 10);
    }
    //}
    //this.oldValue = c.value;
  };

  validId(id: string): boolean {
    if (!id)
      return true;

    var iIDLength = id.length,
      i,
      iID = id;
    if (iIDLength > 9)
      return false;
    if (iIDLength < 9) {
      for (i = 0; i < 9 - iIDLength; i++) {
        iID = "0" + iID;
      }
      iIDLength = 9;
    }
    if (iID == "000000000")
      return false;
    var iCount = 0,
      iCurrent,
      iTemp;

    for (i = 2; i < iIDLength + 2; i++) {
      iTemp = parseInt(iID.substr(i - 2, 1)) * 1;
      if (iTemp != 0) {
        iCurrent = ((i % 2) + 1) * iTemp;
        iCount += iCurrent > 9 ? 1 + iCurrent % 10 : iCurrent;
      }
    }
    return ((iCount % 10 === 0) == true);
  };
}
