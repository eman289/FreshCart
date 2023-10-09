import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/data-interface';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  wishlistData: Product[] = [];
  isEmpty: boolean = true;

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: ({ data }) => {
        if (data.length == 0) {
          this.isEmpty = true;
        } else {
          this.wishlistData = data;
          this.isEmpty = false;
        }
      },
    });
  }

  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartCount.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
    });
  }

  removeWish(id: string): void {
    this._WishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.getWishList().subscribe({
          next: ({ data }) => {
            if (data.length == 0) {
              this.isEmpty = true;
            } else {
              this.wishlistData = data;
              this.isEmpty = false;
            }
          },
        });

        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishlistService.wishCount.next(response.data.length);

        if (response.data.length == 0) {
          this.isEmpty = true;
        }
      },
    });
  }
}
