import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { PersonalFinances } from '../shared/models/personal-finances.interface';
import { MatTable } from '@angular/material/table';
import { DataService } from '../services/data.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.scss'],
})
export class WalletDashboardComponent implements OnInit {
  public personalFinances: any;
  private currentUserId: string = '';
  displayedColumns: string[] = ['item', 'quantity', 'remove'];

  @ViewChild(MatTable) table: MatTable<PeriodicElement> | null = null;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly dataService: DataService
  ) {}

  onFormItemCreate($event: { expense_name: string; expense_cost: number }) {
    $event.expense_cost = $event.expense_cost * 100;
    this.firebaseService.addExpenses($event, this.currentUserId).then(() => {
      this.getPersonalFinances(this.currentUserId);
    });
  }

  getPersonalFinances(currentUserId: string) {
    this.firebaseService.getPersonalFinances(currentUserId).then((res) => {
      this.personalFinances = res[0];
    });
  }
  removeItem(i: { expense_name: string; expense_cost: number }) {
    this.firebaseService.removeExpenses(i, this.currentUserId).then(() => {
      this.getPersonalFinances(this.currentUserId);
    });
  }

  ngOnInit(): void {
    this.dataService.userId$.subscribe((id: string) => {
      this.currentUserId = id;
      this.getPersonalFinances(this.currentUserId);
    });
  }
}
