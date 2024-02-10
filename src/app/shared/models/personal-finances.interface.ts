export interface PersonalFinances {
  expenses: [{ expense_name: string; expense_cost: number }];
  id: string;
  salary: number;
  savings: number;
}
