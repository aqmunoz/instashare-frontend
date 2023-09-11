import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";

import { ListFilesComponent } from './list-files/list-files.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    ListFilesComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  exports: [
    ListFilesComponent
  ]
})
export class PagesModule { }
