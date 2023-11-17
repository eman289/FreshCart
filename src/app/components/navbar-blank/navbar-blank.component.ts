import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss'],
})
export class NavbarBlankComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  cartCountNumber: number = 0;
  wishCountNumber: number = 0;

  ngOnInit(): void {
    this._CartService.cartCount.subscribe({
      next: (count) => {
        this.cartCountNumber = count;
      },
    });

    this._WishlistService.wishCount.subscribe({
      next: (count) => {
        this.wishCountNumber = count;
      },
    });

    this._CartService.getCartData().subscribe({
      next: (response) => {
        this._CartService.cartCount.next(response.numOfCartItems);
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this._WishlistService.wishCount.next(response.data.length);
      },
    });
  }

  signOut(): void {
    localStorage.removeItem('_token');
    localStorage.removeItem('cartOwner');
    this._Router.navigate(['/login']);
  }
}
