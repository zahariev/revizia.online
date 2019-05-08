import { Pipe, PipeTransform } from "@angular/core";
/*
 *
 * Usage:
 *
 * Example:
 *
 */
@Pipe({ name: "hideZero" })
export class CashPipe implements PipeTransform {
  transform(value: number): string {
    if (value && Number(value)) return value.toString();
    else return "";
  }
}

@Pipe({ name: "Round" })
export class RoundPipe implements PipeTransform {
  transform(value: string, item: any): string {
    if (!value) return "";
    let exp =
      Math.round(parseFloat(value) / (item.qty * item.round * 1)) * item.round;
    // console.log(exp);
    return exp.toString();
  }
}
