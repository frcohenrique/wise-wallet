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
  public editSalary: boolean = false;
  public editSavings: boolean = false;
  public salary: number = 0;
  public savings: number = 0;
  public personalFinances: any;
  private currentUserId: string = '';
  displayedColumns: string[] = ['item', 'quantity', 'remove'];

  @ViewChild(MatTable) table: MatTable<PeriodicElement> | null = null;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly dataService: DataService
  ) {}

  onFormItemCreate($event: { expense_name: string; expense_cost: number }) {
    this.firebaseService.addExpenses($event, this.currentUserId).then(() => {
      this.getPersonalFinances(this.currentUserId);
    });
  }

  getPersonalFinances(currentUserId: string) {
    this.firebaseService.getPersonalFinances(currentUserId).then((res: any) => {
      if (res[0]) {
        res = res[0];
        this.setPersonalFinances(res);
        this.calculateTotalExpenseAndRemainingBalance(res);
      }
    });
  }

  setPersonalFinances(res: any) {
    this.personalFinances = res;
    if (res.savings) {
      this.savings = res.savings;
    }
    if (res.salary) {
      this.salary = res.salary;
    }
  }

  calculateTotalExpenseAndRemainingBalance(res: any) {
    if (res.expenses && res.expenses.length > 0) {
      const totalExpense = res.expenses.reduce(
        (acc: number, value: { expense_cost: any }) => {
          return acc + parseInt(value.expense_cost);
        },
        0
      );

      res.total_expense = totalExpense;
      res.remaining_balance = this.salary - totalExpense - this.savings;
    }
  }

  updateFinancialData(salary: number, savings: number) {
    this.firebaseService
      .updateFinancialData(salary, savings, this.currentUserId)
      .then(() => {
        this.getPersonalFinances(this.currentUserId);
      });
  }

  removeItem(i: { expense_name: string; expense_cost: number }) {
    this.firebaseService.removeExpenses(i, this.currentUserId).then(() => {
      this.getPersonalFinances(this.currentUserId);
    });
  }

  onEditSalary($event: any) {
    if (this.editSalary) this.editSalary = false;
    else this.editSalary = true;

    switch ($event.target.textContent) {
      case 'check':
        this.personalFinances.salary = this.salary;
        this.updateFinancialData(
          this.personalFinances.salary,
          this.personalFinances.savings
        );
        break;
      case 'cancel':
        this.salary = this.personalFinances.salary;
        break;
    }
  }

  onEditSavings($event: any) {
    if (this.editSavings) this.editSavings = false;
    else this.editSavings = true;
    switch ($event.target.textContent) {
      case 'check':
        this.personalFinances.savings = this.savings;
        this.updateFinancialData(
          this.personalFinances.salary,
          this.personalFinances.savings
        );
        break;
      case 'cancel':
        this.savings = this.personalFinances.savings;
        break;
    }
  }

  ngOnInit(): void {
    this.dataService.userId$.subscribe((id: string) => {
      this.currentUserId = id;
      this.getPersonalFinances(this.currentUserId);
    });
  }
}
