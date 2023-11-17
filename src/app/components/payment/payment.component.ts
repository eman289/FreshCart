import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}

  cartId: any = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id');
      },
    });
  }

  checkOutForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });

  submitForm(): void {
    this.isLoading = true;
    const formData = this.checkOutForm.value;

    this._CartService.checkOut(this.cartId, formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        window.open(response.session.url, '_self');
      },
    });
  }
}
