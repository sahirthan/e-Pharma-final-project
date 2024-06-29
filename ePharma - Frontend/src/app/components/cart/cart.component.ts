import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    public cartService: CartService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.cartService.cartItems.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }


  checkout() {
    let orderDetails = '';
    this.cartItems.forEach(item => {
      orderDetails += `${item.name}:${item.boughtQty} | `;
    });
    orderDetails = orderDetails.slice(0, -3);
    this.cartService.closeCartSideBar();
    this.router.navigate(['/paymentselect'], { queryParams: { orderDetails } });
  }



}
