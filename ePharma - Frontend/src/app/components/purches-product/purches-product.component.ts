import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-purches-product',
  templateUrl: './purches-product.component.html',
  styleUrls: ['./purches-product.component.css']
})
export class PurchesProductComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  orders: Order[] = [];
  userId!: number;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.user_id; 
    console.log(this.userId);
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrdersByUserId(this.userId).then(orders=>{
      orders.subscribe(orders=>{
        this.orders=orders;
        console.log(this.orders);
      })
    })
  }

}
