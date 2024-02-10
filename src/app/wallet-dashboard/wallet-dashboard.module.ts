import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletDashboardComponent } from './wallet-dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WalletDashboardComponent,
  },
];
@NgModule({
  declarations: [WalletDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WalletDashboardModule {}
