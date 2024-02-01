import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {
  RouterLinkActive,
  RouterLinkWithHref,
  RouterModule,
} from '@angular/router';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [CommonModule,
    RouterModule],
  bootstrap: [],

})
export class SharedModule {}
