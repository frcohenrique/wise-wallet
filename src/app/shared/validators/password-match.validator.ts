import { FormControl } from '@angular/forms';
import { ValidationResult } from './password.validator';

export class PasswordMatchValidator {
  public static verify(control: FormControl | any): ValidationResult {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password === confirmPassword) {
      return { passwordMismatch: false };
    } else {
      control.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
  }
}
