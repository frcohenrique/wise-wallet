import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: ['./authentication-login.component.scss'],
})
export class AuthenticationLoginComponent implements OnInit {
  public loginForm: FormGroup = this.formBuilder.group({});
  public errorMsg: string = '';
  public hide: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  submitForm() {
    this.authService.signIn(this.loginForm.value).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        switch (error.code) {
          case 'auth/invalid-login-credentials':
            this.errorMsg =
              'Credenciais de login inválidas. Por favor, verifique seu e-mail e senha.';
        }
        console.error(error.code);
      }
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
