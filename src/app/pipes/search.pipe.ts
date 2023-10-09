import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../data-interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], term: string): Product[] {
    return products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
