import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate',
})
export class CreationDatePipe implements PipeTransform {
  transform(date: Date): string {
    return date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
