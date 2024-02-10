import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationLoginComponent } from './authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from './authentication-register/authentication-register.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    AuthenticationLoginComponent,
    AuthenticationRegisterComponent,
  ],
  imports: [CommonModule],
  exports: [AuthenticationComponent],
})
export class AuthenticationModule {}
