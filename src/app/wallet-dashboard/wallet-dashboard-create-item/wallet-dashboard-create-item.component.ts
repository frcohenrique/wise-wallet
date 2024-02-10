import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet-dashboard-create-item',
  templateUrl: './wallet-dashboard-create-item.component.html',
  styleUrls: ['./wallet-dashboard-create-item.component.scss'],
})
export class WalletDashboardCreateItemComponent implements OnInit {
  @Output('formItemCreate') createItemForm = new EventEmitter<{
    expense_name: string;
    expense_cost: number;
  }>();

  public itemForm: FormGroup = this.formBuilder.group({});
  public errorMsg: string = '';

  constructor(private readonly formBuilder: FormBuilder) {}

  submitForm() {
    this.createItemForm.emit(this.itemForm.value);
    this.itemForm.reset();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      expense_name: ['', [Validators.required]],
      expense_cost: ['', [Validators.required]],
    });
  }
}
