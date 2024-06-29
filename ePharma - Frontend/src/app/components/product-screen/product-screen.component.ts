import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-screen',
  templateUrl: './product-screen.component.html',
  styleUrls: ['./product-screen.component.css']
})
export class ProductScreenComponent implements OnInit {

  constructor(private productService:ProductService) {this.searchProductList = this.products;}
  
  products:Product[] = [];
  searchProductList:any[]=[];

  async ngOnInit(){
    await this.loadProducts();

  }

  // async loadProducts() {
  //   this.productService.getProducts().then(products => {
  //     products.subscribe(products => {
  //       this.products = products;
  //       this.searchProductList = products;
  //     })
  //   })
  // }
  async loadProducts(){
    (await this.productService.getProducts()).subscribe((product:any) =>{
      console.log(product.products);
      this.products = product;
      this.searchProductList = this.products;
    });
  }
  onSearch(event: any) {
    this.searchProductList = this.products.filter(e =>
      String(e.name).toLowerCase().includes(String(event.target.value).trim().toLowerCase()));
  }

}
