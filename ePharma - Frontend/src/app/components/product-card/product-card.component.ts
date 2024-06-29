import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  onImageLoadError($event: ErrorEvent) {
    console.error("Image loading error:", event);
  }
  @Input('product') product: any;

  constructor(
    public cartService: CartService,
    public userService:UserService
  ) { }

  ngOnInit(): void {
    this.userService.isLoggedIn;
    this.userService.isUser;
  }


}
