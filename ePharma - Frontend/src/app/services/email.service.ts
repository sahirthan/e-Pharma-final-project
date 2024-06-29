import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  users: EventEmitter<User[]> = new EventEmitter();
  order: EventEmitter<Order[]> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  async addUserEmail(user: User) {
    this.httpClient.post('http://localhost:8085/emails', {
      "recipient": user.email,
      "msgBody": "Thanks for Choosing",
      "subject": "Successfully Registered"
    }).subscribe(data => {
      console.log(data);
    });
  }
  async addOrderEmail(order: Order) {
    this.httpClient.post('http://localhost:8085/emails', {
      "recipient": order.email_address,
      "msgBody": " Thanks for " +order.username+" Choosing Our Service , You Ordered Products are : " + order.productname + ". Total Amount Of Your Order : " + order.price + ". Order Delivery Location Is : " + order.location + ".Your Contact Mobile Number is :" + order.tp,
      "subject": "Order Confirmed "
    }).subscribe(data => {
      console.log(data);
    });
  }
  async updateOrder(order: Order) {
    this.httpClient.post('http://localhost:8085/emails', {
      "recipient": order.email_address,
      "msgBody": " Hey, " +order.username+" Order Status : " + order.status ,
      "subject": "Update Order Status "
    }).subscribe(data => {
      console.log(data);
    });
  }
}
