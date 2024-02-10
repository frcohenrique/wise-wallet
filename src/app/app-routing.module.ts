import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLoginComponent } from './authentication/authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from './authentication/authentication-register/authentication-register.component';

const routes: Routes = [
  {
    path: 'authentication/login',
    pathMatch: 'full',
    component: AuthenticationLoginComponent,
  },
  {
    path: 'authentication/register',
    pathMatch: 'full',
    component: AuthenticationRegisterComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./wallet-dashboard/wallet-dashboard.module').then(
        (m) => m.WalletDashboardModule
      ),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./shared/miscellaneous/miscellaneous.module').then(
        (m) => m.MiscellaneousModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./shared/miscellaneous/miscellaneous.module').then(
        (m) => m.MiscellaneousModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
