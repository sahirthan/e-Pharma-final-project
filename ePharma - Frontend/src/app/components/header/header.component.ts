import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('sideCard') sideCard?: ElementRef;

  cartCount: number = 0;
  cartSubscribtion!: Subscription;
  cartSideBarSubscribtion!: Subscription;

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/home']);
  }

  constructor(
    private router: Router,
    private userService: UserService,
    public cartService: CartService,
  ) { }


  cartItemCount: number = 0;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  isUser: boolean = false;
  sidebarShow: boolean = false;

  ngOnInit(): void {

    this.userService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    })

    this.userService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
    this.userService.isUser.subscribe(isUser => {
      this.isUser = isUser;
    })


    this.cartSubscribtion = this.cartService.cartItems.subscribe(cartItems => {
      this.cartItemCount = cartItems.length;
    })

    this.cartSideBarSubscribtion =  this.cartService.cartSideBarOpen.subscribe(isOpen => {
      this.sidebarShow = isOpen;
    })
  }
  closeSideBar(isShow: boolean) {
    this.sidebarShow = isShow;
  }

  ngOnDestroy() {
    this.cartSubscribtion.unsubscribe();
    this.cartSideBarSubscribtion.unsubscribe();
  }

}
