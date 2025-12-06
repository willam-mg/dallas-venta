import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
// import {
//   NgbDatepickerModule,
//   NgbModule,
//   NgbPaginationModule,
//   NgbTypeaheadModule
// } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteModule } from '../cliente/cliente.module';
import { ProductosVendidosComponent } from './pages/productos-vendidos/productos-vendidos.component';


@NgModule({
  declarations: [
    ProductosVendidosComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbPaginationModule,
    // NgbTypeaheadModule,
    // NgbDatepickerModule,
    // NgbModule,
    ClienteModule,
  ]
})
export class ReporteModule { }
