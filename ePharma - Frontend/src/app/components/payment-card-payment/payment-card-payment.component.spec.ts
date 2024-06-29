import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardPaymentComponent } from './payment-card-payment.component';

describe('PaymentCardPaymentComponent', () => {
  let component: PaymentCardPaymentComponent;
  let fixture: ComponentFixture<PaymentCardPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCardPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
