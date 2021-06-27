import {FormGroup} from '@angular/forms';

export function ConfirmPasswordValidator(group: FormGroup) {
  const password = group.get('newPassword').value;
  const rePassword = group.get('confirmPassword').value;
  return rePassword === password  ? null : {notMatchPassword: true};
}
