import { Injectable } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor(private papa: Papa) {}

  parseCsv(file: File): Observable<ParseResult<any>> {
    return new Observable((observer) => {
      this.papa.parse(file, {
        complete: (result) => {
          observer.next(result);
          observer.complete();
        },
        header: true,
      });
    });
  }
}
