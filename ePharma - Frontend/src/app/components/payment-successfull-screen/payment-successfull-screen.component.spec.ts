import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessfullScreenComponent } from './payment-successfull-screen.component';

describe('PaymentSuccessfullScreenComponent', () => {
  let component: PaymentSuccessfullScreenComponent;
  let fixture: ComponentFixture<PaymentSuccessfullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSuccessfullScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessfullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
