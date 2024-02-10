import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletDashboardComponent } from './wallet-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { WalletDashboardCreateItemComponent } from './wallet-dashboard-create-item/wallet-dashboard-create-item.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: WalletDashboardComponent,
  },
];
@NgModule({
  declarations: [WalletDashboardComponent, WalletDashboardCreateItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [FirebaseService],
})
export class WalletDashboardModule {}
