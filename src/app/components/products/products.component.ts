import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/data-interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}

  productsData: Product[] = [];
  inputTerm: string = '';
  pageSize: number = 0;
  page: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }

  pageChanged(event: number): void {
    this._ProductsService.getProducts(event).subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
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

  addWish(
    id: string,
    addWishBtn: HTMLDivElement,
    removeWishBtn: HTMLDivElement
  ): void {
    this._WishlistService.addToWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._WishlistService.wishCount.next(response.data.length);
        this._ToastrService.success(response.message);
        this._Renderer2.addClass(addWishBtn, 'd-none');
        this._Renderer2.removeClass(removeWishBtn, 'd-none');
      },
    });
  }

  removeWish(
    id: string,
    addWishBtn: HTMLDivElement,
    removeWishBtn: HTMLDivElement
  ): void {
    this._WishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishlistService.wishCount.next(response.data.length);

        this._Renderer2.addClass(removeWishBtn, 'd-none');
        this._Renderer2.removeClass(addWishBtn, 'd-none');
      },
    });
  }
}
