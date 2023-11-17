import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category, Product } from 'src/app/data-interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}

  productsData: Product[] = [];
  categoriesData: Category[] = [];
  inputTerm: string = '';
  cartOwner: string = '';
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

    this._ProductsService.getCategories().subscribe({
      next: ({ data }) => {
        this.categoriesData = data;
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

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      360: {
        items: 1,
      },
      600: {
        items: 1,
      },
      940: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    nav: true,
  };

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      360: {
        items: 2,
      },
      600: {
        items: 4,
      },
      940: {
        items: 5,
      },
      1000: {
        items: 6,
      },
    },
    nav: true,
  };

  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this.cartOwner = response.data.cartOwner;
        localStorage.setItem('cartOwner', this.cartOwner);

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
