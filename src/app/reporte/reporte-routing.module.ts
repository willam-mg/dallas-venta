import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosVendidosComponent } from './pages/productos-vendidos/productos-vendidos.component';

const routes: Routes = [
  {
    path: 'productos-vendidos',
    component: ProductosVendidosComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
