import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }
  
  ordertList:Order[] =[];
  orders:EventEmitter<Order[]>=new EventEmitter();
  selectOrder: EventEmitter<Order> = new EventEmitter();
  refreshTable: EventEmitter<boolean> = new EventEmitter();

  async getOrders():Promise<Observable<Order[]>>{
    this.httpClient.get<Order[]>('http://localhost:8080/orders').subscribe(data=>{
     this.orders.emit(data);
   })
   
   return this.orders;
  }

  setSelectOrder(selectOrder:Order){
    this.selectOrder.emit(selectOrder);
  }
  async addOrder(order:Order){
    this.httpClient.post('http://localhost:8080/orders',{
      "order_id":order.order_id,
      "date":order.date,
      "location":order.location,
      "price":order.price,
      "productname":order.productname,
      "status":order.status,
      "user_id":order.user_id,
      "username":order.username,
      "pay_method":order.pay_method,
      "tp":order.tp,
      "email_address":order.email_address,

    }).subscribe(data=>{
      console.log(data);
     });
  }

  url:string="http://localhost:8080/orders";
  urls:string="http://localhost:8080";

  async deleteOrder(id:number){
    const url=this.url+"/"+id;
    return this.httpClient.delete<Order>(url).subscribe(data=>{console.log(data);});
  }

  async getOrdersByUserId(user_id: number): Promise<Observable<Order[]>> {
    const url=this.urls+"/orders?user_id="+user_id;
    this.httpClient.get<Order[]>(url).subscribe(data=>{
      this.orders.emit(data)
    })
    return this.orders;
  }

  async updateOrder(order: any) {
    return await this.httpClient.put<Order>(this.url, order).subscribe(data => {
      this.selectOrder.emit(undefined);
      this.refreshTable.emit(true);
    });
  }
}
