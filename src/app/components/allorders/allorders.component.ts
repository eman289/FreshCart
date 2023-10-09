import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}

  cartOwner: any = '';
  ordersData: any[] = [];
  isEmpty: boolean = true;

  ngOnInit(): void {
    this.cartOwner = localStorage.getItem('cartOwner');
    this._CartService.getOrders(this.cartOwner).subscribe({
      next: (response) => {
        this.isEmpty = false;
        this.ordersData = response;
        console.log(this.ordersData);
      },
    });
  }
}
