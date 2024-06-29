import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-popular-product-screen',
  templateUrl: './popular-product-screen.component.html',
  styleUrls: ['./popular-product-screen.component.css']
})
export class PopularProductScreenComponent implements OnInit  {
  constructor(private productService:ProductService) {}
  
  products:Product[] = [];
  category: string = "Beauty Care";

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
