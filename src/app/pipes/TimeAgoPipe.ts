import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  standalone: true,
  name: 'timeAgo',
  pure: false, // Set to false for the pipe to update with time
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    return formatDistanceToNow(new Date(value), { addSuffix: true });
  }
}
