import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  productList: Product[] = [];
  products: EventEmitter<Product[]> = new EventEmitter();
  selectedProduct: EventEmitter<Product> = new EventEmitter();
  refreshTable: EventEmitter<boolean> = new EventEmitter();

  async getProducts(): Promise<Observable<Product[]>> {
    this.httpClient.get<Product[]>('http://localhost:8081/products').subscribe(data => {
      this.products.emit(data);
    })

    return this.products;
  }

  setSelectedProduct(selectedProduct: Product) {
    this.selectedProduct.emit(selectedProduct);
  }

  async addProduct(product: Product) {
    this.httpClient.post('http://localhost:8081/products', {
      "benefits": product.benefits,
      "description": product.description,
      "image_url": product.image_url,
      "name": product.name,
      "price": product.price,
      "category": product.price,
    }).subscribe(data => {
      console.log(data);
      this.refreshTable.emit(true);
    });
  }

  url: string = "http://localhost:8081/products";
  urls: string = "http://localhost:8081";

  async getProductById(product_id: number) {
    const url = this.url + "/" + product_id;
    return this.httpClient.get(url)
  }

  async updateProduct(product: any) {

    return await this.httpClient.put<Product>(this.url, product).subscribe(data => {
      this.selectedProduct.emit(undefined);
      this.refreshTable.emit(true);
    });
  }

  async deleteProduct(id: number) {
    const url = this.url + "/" + id;
    return await this.httpClient.delete<Product>(url).subscribe(data => { console.log(data); });
  }

  getProductByCategory(category: string) {
    const url = this.urls + "/products?category="+category;
    return this.httpClient.get(url)
  }
}
