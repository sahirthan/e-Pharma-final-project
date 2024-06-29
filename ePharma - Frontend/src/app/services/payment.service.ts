import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  paymentList: Payment[] = [];
  payments: EventEmitter<Payment[]> = new EventEmitter();
  refreshTable: EventEmitter<boolean> = new EventEmitter();

  async getPayment(): Promise<Observable<Payment[]>> {
    this.httpClient.get<Payment[]>('http://localhost:8083/payments').subscribe(data => {
      this.payments.emit(data);
    })
    return this.payments;
  }

  async addPayment(payment: Payment) {
    this.httpClient.post('http://localhost:8083/payments', {
      "payment_id": payment.payment_id,
      "order_details": payment.order_details,
      "order_no": payment.order_no,
      "pay_method": payment.pay_method,
    }).subscribe(data => {
      this.refreshTable.emit(true);
    });
  }

  url: string = "http://localhost:8083/payments";

  async deletePayment(payment_id: number) {
    const url = this.url + "/" + payment_id;
    return await this.httpClient.delete<Payment>(url).subscribe(data => { console.log(data); });
  }

}
