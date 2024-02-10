import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDashboardCreateItemComponent } from './wallet-dashboard-create-item.component';

describe('WalletDashboardCreateItemComponent', () => {
  let component: WalletDashboardCreateItemComponent;
  let fixture: ComponentFixture<WalletDashboardCreateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletDashboardCreateItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletDashboardCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
