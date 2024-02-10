import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PasswordMatchValidator } from 'src/app/shared/validators/password-match.validator';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-authentication-register',
  templateUrl: './authentication-register.component.html',
  styleUrls: ['./authentication-register.component.scss'],
})
export class AuthenticationRegisterComponent implements OnInit {
  public registerForm: FormGroup = this.formBuilder.group({});
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  submitForm() {
    this.authService.signUp(this.registerForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            PasswordValidator.strong,
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            PasswordValidator.strong,
          ],
        ],
      },
      {
        validators: PasswordMatchValidator.verify,
      }
    );
  }
}
