import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductpageComponent } from './components/productpage/productpage.component';
import { ServicesComponent } from './components/services/services.component';
import { OrderManageComponent } from './components/order-manage/order-manage.component';
import { ProductManageComponent } from './components/product-manage/product-manage.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { PaymentMethodSelectScreenComponent } from './components/payment-method-select-screen/payment-method-select-screen.component';
import { PaymentCardPaymentComponent } from './components/payment-card-payment/payment-card-payment.component';
import { PaymentSuccessfullScreenComponent } from './components/payment-successfull-screen/payment-successfull-screen.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PurchesProductComponent } from './components/purches-product/purches-product.component';
import { CashOnDeliveryComponent } from './components/cash-on-delivery/cash-on-delivery.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'product', component: ProductpageComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'ordermanage', component: OrderManageComponent},
  {path: 'productmanage', component: ProductManageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'paymentselect', component: PaymentMethodSelectScreenComponent},
  { path: 'payment-card', component: PaymentCardPaymentComponent },
  { path: 'payment-success', component: PaymentSuccessfullScreenComponent },
  {path: 'singleProduct/:product_id', component: SingleProductComponent},
  {path: 'selectPaymentMethod/:data', component:PaymentMethodSelectScreenComponent},
  {path: 'orders', component:OrdersComponent},
  {path: 'purchesProduct/:user_id', component:PurchesProductComponent},
  {path: 'cash-on-delivery', component:CashOnDeliveryComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
