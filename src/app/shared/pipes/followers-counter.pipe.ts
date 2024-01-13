import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followersCounter',
  standalone: true,
})
export class FollowersCounterPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value) || value === null) {
      return '';
    }

    if (value < 1000) {
      return value.toString();
    } else if (value < 1000000) {
      const formattedValue = (value / 1000).toFixed(0);
      return `${formattedValue}k`;
    } else {
      const formattedValue = (value / 1000000).toFixed(1);
      return `${formattedValue} mi`;
    }
  }
}
