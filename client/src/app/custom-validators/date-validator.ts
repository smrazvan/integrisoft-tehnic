import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const start = control.get('startDate');
  const end = control.get('endDate');
  // console.log('AAAAAAAA');
  // console.log(start?.value.toDate() < end?.value.toDate());
  if (!start || !end) return { dateValid: false };
  return start.value !== null &&
    end.value !== null &&
    start.value.toDate() < end.value.toDate()
    ? null
    : { errors: { message: 'Start date cant be bigger than end date' } };
};
