import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  wishCount: BehaviorSubject<any> = new BehaviorSubject(0);

  getWishList(): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/wishlist`
    );
  }

  addToWishList(id: string): Observable<any> {
    return this._HttpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/wishlist`,
      {
        productId: id,
      }
    );
  }

  removeFromWishList(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`
    );
  }
}
