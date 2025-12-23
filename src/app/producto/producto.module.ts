import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { IndexComponent } from './pages/index/index.component';
import { ShowComponent } from './pages/show/show.component';
// import {
//   NgbActiveModal,
//   NgbDatepickerModule,
//   NgbModule,
//   NgbPaginationModule,
//   NgbTypeaheadModule
// } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    PaginationModule.forRoot(),
    // NgbTypeaheadModule,
    // NgbPaginationModule,
    // NgbDatepickerModule,
    // NgbModule,
  ]
})
export class ProductoModule { }
