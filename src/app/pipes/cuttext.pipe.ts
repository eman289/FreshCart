import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
})
export class CuttextPipe implements PipeTransform {
  transform(text: string): string {
    return text.split(' ', 3).join(' ');
  }
}
