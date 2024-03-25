import { AbstractControl, ValidatorFn } from '@angular/forms';

export class StringValidators {
  public static isControlsSame(
    controlNameA: string,
    controlNameB: string
  ): ValidatorFn {
    return (control: AbstractControl) => {
      const valueA = control.get(controlNameA)?.value;
      const valueB = control.get(controlNameB)?.value;
      const isValid = valueA && valueB && valueA === valueB;
      return isValid
        ? null
        : {
            isControlsSame: {
              valueA,
              valueB,
            },
          };
    };
  }
}
