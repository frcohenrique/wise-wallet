import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PersonalFinances } from '../shared/models/personal-finances.interface';

interface PersonalFinanceData {
  expenses?: { expense_name: string; expense_cost: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  async getPersonalFinances(userId: string) {
    const querySnapshot: any = await this.db
      .collection('personal_finance', (ref) => ref.where('owner', '==', userId))
      .get()
      .toPromise();

    const finances: PersonalFinances[] = [];
    try {
      querySnapshot.forEach((doc: any) => {
        const finance: PersonalFinances = doc.data();
        finance.id = doc.id;
        finances.push(finance);
      });
    } catch (e) {
      console.error(e);
    }
    return finances;
  }

  async removeExpenses(
    data: { expense_name: string; expense_cost: number },
    userId: string
  ) {
    const personalFinanceRef = this.db
      .collection('personal_finance')
      .doc(userId);

    try {
      const personalFinanceDoc = await personalFinanceRef.get().toPromise();
      const personalFinanceData =
        personalFinanceDoc?.data() as PersonalFinanceData;

      if (
        personalFinanceDoc?.exists &&
        personalFinanceData &&
        personalFinanceData.expenses
      ) {
        const updatedExpenses = personalFinanceData.expenses.filter(
          (expense) => {
            return (
              expense.expense_name !== data.expense_name ||
              expense.expense_cost !== data.expense_cost
            );
          }
        );
        await personalFinanceRef.update({ expenses: updatedExpenses });
      } else {
        console.error(
          'Documento não encontrado ou o array de despesas não está presente.'
        );
      }
    } catch (error) {
      console.error('Erro ao remover despesa:', error);
    }
  }

  async addExpenses(
    data: { expense_name: string; expense_cost: number },
    userId: string
  ) {
    const personalFinanceRef = this.db
      .collection('personal_finance')
      .doc(userId);

    try {
      const personalFinanceDoc = await personalFinanceRef.get().toPromise();
      const personalFinanceData =
        personalFinanceDoc?.data() as PersonalFinanceData;

      if (!personalFinanceDoc?.exists) {
        await personalFinanceRef.set({ owner: userId, expenses: [data] });
      } else {
        await personalFinanceRef.set(
          { expenses: [...(personalFinanceData?.expenses || []), data] },
          { merge: true }
        );
      }

    } catch (error) {
      console.error('Erro ao adicionar/atualizar despesa:', error);
    }
  }
}
