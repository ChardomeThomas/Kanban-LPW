import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isBefore, parse } from 'date-fns';

export class DateValidators {
  public static get isDateLessToday(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value) {
        const valueAsDate = parse(control.value, 'yyyy-MM-dd', new Date());
        const isValid = isBefore(valueAsDate, new Date());
        return isValid ? null : { isDateLessToday: control.value };
      } else {
        return null;
      }
    };
  }
}
