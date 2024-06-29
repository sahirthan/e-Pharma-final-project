import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { Payment } from 'src/app/models/payment';
import { EmailService } from 'src/app/services/email.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  updateOrderForm?: FormGroup<any>;
  selectOrder?: Order;
  orders: Order[] = [];
  payments: Payment[] = [];

  constructor(private orderService: OrderService, private paymentService: PaymentService, private fb: FormBuilder, private emailService:EmailService) { }

  ngOnInit(): void {

    // Order Manage 
    this.orderService.getOrders().then(order => {
      order.subscribe(order => {
        this.orders = order;
      })
    })
    this.orderService.refreshTable.subscribe(refresh => {
      if (refresh) {
        this.loadOrders();
      }
    })
    this.updateOrderForm = this.fb.group({
      order_id: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      productname: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      pay_method: new FormControl('', [Validators.required]),
      tp: new FormControl('', [Validators.required]),
      email_address: new FormControl('', [Validators.required]),
    });
    this.orderService.selectOrder.subscribe(order => {
      this.selectOrder = order;
      this.updateOrderForm!.controls['order_id'].setValue(order.order_id);
      this.updateOrderForm!.controls['date'].setValue(order.date);
      this.updateOrderForm!.controls['location'].setValue(order.location);
      this.updateOrderForm!.controls['price'].setValue(order.price);
      this.updateOrderForm!.controls['productname'].setValue(order.productname);
      this.updateOrderForm!.controls['status'].setValue(order.status);
      this.updateOrderForm!.controls['user_id'].setValue(order.user_id);
      this.updateOrderForm!.controls['username'].setValue(order.username);
      this.updateOrderForm!.controls['pay_method'].setValue(order.pay_method);
      this.updateOrderForm!.controls['tp'].setValue(order.tp);
      this.updateOrderForm!.controls['email_address'].setValue(order.email_address);
    })

    // Payment Manage
    this.paymentService.getPayment().then(payment => {
      payment.subscribe(payment => {
        this.payments = payment;
        console.log(payment)
      })
    })
  }


  // Order Manage 

  async loadOrders() {
    this.orderService.getOrders().then(order => {
      order.subscribe(order => {
        this.orders = order;
      })
    })
  }

  updateOrder(order: Order) {
    this.orderService.setSelectOrder(order);
  }

  async addOrder() {
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

    if (this.updateOrderForm?.invalid) {
      showAlertWarning("Please Fill Order Status and Date", "warning");
    } else {
      if (this.selectOrder == null || this.selectOrder == undefined) {
        await this.orderService.addOrder(this.updateOrderForm?.getRawValue()).then(result => {
          this.updateOrderForm?.reset();
          showAlertWarning("Please Check Form Again", "warning");
        });
      } else {
        await this.orderService.updateOrder(this.updateOrderForm!.getRawValue()).then(result => {
          this.updateOrderForm?.reset();
          showAlertSuccess("Order Status Update successfully", "success");
        });
        await this.emailService.updateOrder(this.updateOrderForm?.getRawValue()).then(result => {
          this.updateOrderForm?.reset();
        })
      }
    }
  }

  async deleteOrder(order: Order) {
    await this.orderService.deleteOrder(order.order_id).then(data => {
      this.loadOrders();
    },)
  }

  deletePayment(payment: Payment) {
    this.paymentService.deletePayment(payment.payment_id).then(data => {
      this.loadPayments();
    },)
  }
  loadPayments() {
    this.paymentService.getPayment().then(payment => {
      payment.subscribe(payment => {
        this.payments = payment;
      })
    })
  }

  
}
