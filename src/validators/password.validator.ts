import { FormControl, FormGroup } from '@angular/forms';
import {AbstractControl} from '@angular/forms';

export class PasswordValidator {

  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }
    return {
      areEqual: true
    };
  }
  static pswdPatternValidation(control: FormControl) {
    let pswdPattern:boolean;
    const validPasswordRegEx = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");// Password must be minimum of 6 characters, 1 number , 1 alphabet and 1 special character
    pswdPattern = validPasswordRegEx.test(control.value);
      if(pswdPattern){
         return null;
      }else{
         return {
      'invalidpswd': true
      };
   }

 
}
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('newPswdFormControl').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPswdFormControl').value; // to get value in input tag
     if(password != confirmPassword && password!=''&&  confirmPassword!='') {
        // console.log('false');
         AC.get('confirmPswdFormControl').setErrors( { MatchPassword: true } )
     } 
     
     else {
      console.log('true');
       // return null
      }
 }
}
