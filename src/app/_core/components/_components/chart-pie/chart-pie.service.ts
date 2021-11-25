import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

// PACKAGE

@Injectable()
export class ChartPieService {
  constructor(private decimalPipe: DecimalPipe) {}

  numberFormat(d: any): string {
    const converted = this.decimalPipe.transform(d, '1.0-3', 'id');
    return converted ? converted.toString() : '0';
  }

  percentage(x: any): string {
    return x.toFixed(2) + '%';
  }
}
