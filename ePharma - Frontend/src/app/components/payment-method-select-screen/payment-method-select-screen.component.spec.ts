import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodSelectScreenComponent } from './payment-method-select-screen.component';

describe('PaymentMethodSelectScreenComponent', () => {
  let component: PaymentMethodSelectScreenComponent;
  let fixture: ComponentFixture<PaymentMethodSelectScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodSelectScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodSelectScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
