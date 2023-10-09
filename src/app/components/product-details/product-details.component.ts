import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  productId: any;
  productDetails: any = {};

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = param.get('id');
      },
    });

    this._ProductsService.getProductById(this.productId).subscribe({
      next: ({ data }) => {
        this.productDetails = data;
        console.log(this.productDetails);
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

  productsSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
}
