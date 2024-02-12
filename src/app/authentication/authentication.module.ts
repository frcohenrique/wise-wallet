import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationLoginComponent } from './authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from './authentication-register/authentication-register.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AuthenticationComponent,
    AuthenticationLoginComponent,
    AuthenticationRegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    RouterModule,
  ],
  exports: [
    AuthenticationComponent,
    AuthenticationLoginComponent,
    AuthenticationRegisterComponent,
  ],
})
export class AuthenticationModule {}
