import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  productList: any[] = [];
  cartItems: EventEmitter<any[]> = new EventEmitter();
  totalAmount: EventEmitter<Object> = new EventEmitter();
  totalPrice: number = 0
  cartTotal: EventEmitter<number> = new EventEmitter();
  cartTotalPrice: number = 0;

  cartSideBarOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  etTotalPrice(total: number) {
    this.totalPrice = total;
    this.cartTotal.emit(total);
  }

  async getCartItems() {
    let items: any[] = [];
    await this.cartItems.subscribe(cartItems => {

      items = cartItems;
    })
    return items;
  }

  modifyTotal(object: Object) {
    this.totalAmount.emit(object);
  }

  addToCart(product: any) {
    if (this.productList.filter(prod => prod.product_id == product.product_id).length > 0) {
      this.toggleQty(product.product_id, true);
    } else {
      this.cartTotalPrice += product.price;
      this.modifyTotal({
        "totalAmount": product.price,
        "isIncrement": true,
      });
      if (product.boughtQty == undefined)
        product.boughtQty = 1;
      else
        product.boughtQty += 1;
      this.productList.push(product);
      this.cartItems.emit(this.productList);
    }

  }
  toggleQty(productId: number, isIncrement: boolean) {
    debugger
    let productItem = this.productList.filter(prod => prod.product_id == productId)[0];
    let index = this.productList.findIndex(prod => prod.product_id == productId);

    if (productItem.boughtQty == 0) {
      this.productList.splice(index, 1);
    } else {
      if (isIncrement) {
        productItem.boughtQty += 1;
      } else {
        if (productItem.boughtQty >= 1) {
          productItem.boughtQty -= 1;
        }
      }
      if (isIncrement) {
        this.cartTotalPrice += productItem.price;
      } else {
        this.cartTotalPrice -= productItem.price;
      }
      this.modifyTotal({
        "totalAmount": productItem.price,
        "isIncrement": isIncrement,
      });
      this.productList[index] = productItem;
    }

    this.cartItems.emit(this.productList);
  }

  clear() {
    this.cartItems.emit([]);
    this.cartTotal.emit(0);
    this.cartTotalPrice = 0;
    this.productList = [];

  }

  openCartSideBar() {
    this.cartSideBarOpen.next(true);
  }

  closeCartSideBar() {
    this.cartSideBarOpen.next(false);
  }

}
