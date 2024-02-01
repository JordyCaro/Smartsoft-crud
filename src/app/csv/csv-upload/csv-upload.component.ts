import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CsvService } from 'src/app/services/csv.service';
import { ParseResult } from 'ngx-papaparse';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css'],
})
export class CsvUploadComponent {
data: any;
  constructor(
    private csvService: CsvService,
    private router: Router
    ) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.csvService.parseCsv(file).subscribe(
        (result: ParseResult<any>) => {
          this.handleCsvData(result.data);
        },
        (error) => {
          console.error('Error parsing CSV file:', error);
        }
      );
    }
  }

  private handleCsvData(data: any[]): void {
    // Aquí puedes trabajar con el array 'data'
    console.log('CSV Data:', data);
  }
}
