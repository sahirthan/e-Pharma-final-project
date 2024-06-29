import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, public cartService: CartService,public userService:UserService) { }

  product_id!: any;
  @Input('product') product: any;

  async ngOnInit(): Promise<void> {

    this.product_id = this.route.snapshot.paramMap.get('product_id');
    console.log(this.product_id);

    this.userService.isLoggedIn;
    this.userService.isUser;

    (await this.productService.getProductById(this.product_id)).subscribe((res: any) => {
      this.product = res;
    },

    );
  }




}
