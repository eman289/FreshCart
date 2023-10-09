import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  cartData: any = {};
  isEmpty: boolean = true;

  ngOnInit(): void {
    this._CartService.getCartData().subscribe({
      next: (response) => {
        if (response.numOfCartItems == 0) {
          this.isEmpty = true;
        } else {
          this.cartData = response.data;
          this.isEmpty = false;
        }
      },
    });
  }

  changeCount(
    prodId: string,
    count: number,
    plusBtn: HTMLButtonElement,
    minusBtn: HTMLButtonElement
  ): void {
    if (count >= 1) {
      this._Renderer2.setAttribute(plusBtn, 'disabled', 'true');
      this._Renderer2.setAttribute(minusBtn, 'disabled', 'true');

      this._CartService.changeProductCount(prodId, count).subscribe({
        next: ({ data }) => {
          this.cartData = data;

          this._Renderer2.removeAttribute(plusBtn, 'disabled');
          this._Renderer2.removeAttribute(minusBtn, 'disabled');
        },
      });
    }
  }

  removeProduct(prodId: string): void {
    this._CartService.deleteProduct(prodId).subscribe({
      next: (response) => {
        this.cartData = response.data;
        this._CartService.cartCount.next(response.numOfCartItems);

        if (response.numOfCartItems == 0) {
          this.isEmpty = true;
        }
      },
    });
  }

  removeAllProducts(): void {
    this._CartService.emptyCart().subscribe({
      next: () => {
        this.cartData = {};
        this.isEmpty = true;
        this._CartService.cartCount.next(0);
      },
    });
  }
}
