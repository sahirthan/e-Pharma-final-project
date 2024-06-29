import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-baby-care',
  templateUrl: './baby-care.component.html',
  styleUrls: ['./baby-care.component.css']
})
export class BabyCareComponent implements OnInit {
  constructor(private productService:ProductService) {}
  
  products:Product[] = [];
  category: string = "Baby Care";

  async ngOnInit(){
    await this.productList();

  }

  async productList(){
    (await this.productService.getProductByCategory(this.category)).subscribe((products:any) =>{
      console.log(products.product);
      this.products = products;
    });
  }
}
