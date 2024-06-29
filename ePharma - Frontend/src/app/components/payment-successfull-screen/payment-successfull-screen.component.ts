import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-successfull-screen',
  templateUrl: './payment-successfull-screen.component.html',
  styleUrls: ['./payment-successfull-screen.component.css']
})
export class PaymentSuccessfullScreenComponent implements OnInit{

  constructor(public cartService: CartService, private activeRoute: ActivatedRoute, private router: Router) { }

  orderDetails: string = '';
  
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.orderDetails = params['orderDetails'];
    });

    console.log(this.orderDetails);
    console.log(this.cartService.cartTotalPrice);
  }

}
