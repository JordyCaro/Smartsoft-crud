import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { SharedModule } from '../shared/shared.module';
import {
  RouterLinkActive,
  RouterLinkWithHref,
  RouterModule,
} from '@angular/router';

@NgModule({
  declarations: [
    CsvUploadComponent,
  ],
  exports: [
    CsvUploadComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class CsvModule { }
