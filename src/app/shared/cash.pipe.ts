import {Pipe, PipeTransform} from '@angular/core';

/*
 *
 * Usage:
 *
 * Example:
 *
 */
@Pipe({name: 'hideZero'})
export class CashPipe implements PipeTransform {
  transform(value: number): string {
    if (value && Number(value)) {
      return value.toString();
    } else {
      return '';
    }
  }
}

@Pipe({name: 'BGN'})
export class BGNPipe implements PipeTransform {
  transform(value: string, item: any): string {
    if (!value) {
      return '';
    }

    return (
      Number(value)
        .toFixed(2)
        .toString() + " лв."
    );
  }
}
