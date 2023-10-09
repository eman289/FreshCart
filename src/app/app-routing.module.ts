import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGuard],
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
        canActivate: [authGuard],
      },
      {
        path: 'payment/:id',
        component: PaymentComponent,
        title: 'Payment',
        canActivate: [authGuard],
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'Orders',
        canActivate: [authGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
        canActivate: [authGuard],
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
        canActivate: [authGuard],
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands',
        canActivate: [authGuard],
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'Wishlist',
        canActivate: [authGuard],
      },
    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Sign up' },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
        title: 'Forgot password',
      },
    ],
  },

  { path: '**', component: NotfoundComponent, title: '404 Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
