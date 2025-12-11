import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { ReciboComponent } from './pages/recibo/recibo.component';
// import {
//   NgbActiveModal,
//   NgbDatepickerModule,
//   NgbModule,
//   NgbPaginationModule,
//   NgbTypeaheadModule
// } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectClienteComponent } from './components/select-cliente/select-cliente.component';
import { SelectProductoComponent } from './components/select-producto/select-producto.component';
import { ClienteModule } from '../cliente/cliente.module';
import { EditComponent } from './pages/edit/edit.component';
import { RouterModule } from '@angular/router';
import { ShowComponent } from './pages/show/show.component';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ReciboComponent,
    SelectClienteComponent,
    SelectProductoComponent,
    EditComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // NgbTypeaheadModule,
    // NgbPaginationModule,
    // NgbDatepickerModule,
    // NgbModule,
    ClienteModule,
    PaginatorModule,
    DialogModule,
    PaginationModule.forRoot(),
  ]
})
export class VentaModule { }
