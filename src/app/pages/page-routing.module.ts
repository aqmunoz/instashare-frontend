import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListFilesComponent } from './list-files/list-files.component';

const routes: Routes = [
    { path: 'list-files', component: ListFilesComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }