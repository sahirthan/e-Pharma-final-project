import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-card-payment',
  templateUrl: './payment-card-payment.component.html',
  styleUrls: ['./payment-card-payment.component.css']
})
export class PaymentCardPaymentComponent implements OnInit {

  payNowForm?: FormGroup<any>;
  orderDetails: string = '';
  pay_method: string = 'Card Payment';
  userId!: number;

  constructor(public cartService: CartService, private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router,private orderService:OrderService) { }

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.user_id;

    this.activeRoute.queryParams.subscribe(params => {
      this.orderDetails = params['orderDetails'];
    });

    this.payNowForm = this.fb.group({
      date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
      location: new FormControl('', [Validators.required]),
      price: new FormControl(this.cartService.cartTotalPrice, [Validators.required]),
      productname: new FormControl(this.orderDetails, [Validators.required]),
      status: new FormControl('Confirm', [Validators.required]),
      user_id: new FormControl(this.userId, [Validators.required]),
      username: new FormControl('', [Validators.required]),
      pay_method: new FormControl(this.pay_method, [Validators.required]),
      tp: new FormControl('', [Validators.required]),
      email_address: new FormControl('', [Validators.required]),
    });
  }
  payNow(): void {
    const alertPlaceholder = document.getElementById('alert-placeholder');

    const showAlertWarning = (message: string, type: string) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.role = 'alert';
      alertDiv.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation mx-4"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      alertPlaceholder?.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
      }, 3000);
    };

    const showAlertSuccess = (message: string, type: string) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.role = 'alert';
      alertDiv.innerHTML = `
      <i class="fa-solid fa-circle-check"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      alertPlaceholder?.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
      }, 3000);
    };

    if (this.payNowForm?.invalid) {
      console.log(this.payNowForm?.getRawValue());
      showAlertWarning("Please fill all details correctly.", "warning");
    } else {
      this.orderService.addOrder(this.payNowForm?.getRawValue()).then(result => {
        this.payNowForm?.reset();
        showAlertSuccess("Order added successfully.", "Success")
        this.router.navigate(['/payment-success']);
      });
    }
  }

}
