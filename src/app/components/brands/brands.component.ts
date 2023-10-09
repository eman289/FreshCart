import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/data-interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) {}

  brandsData: Brand[] = [];

  ngOnInit(): void {
    this._ProductsService.getBrands().subscribe({
      next: ({ data }) => {
        this.brandsData = data;
      },
    });
  }
}
