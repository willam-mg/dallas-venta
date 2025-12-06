import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { LoginGuard } from './shared/login.guard';
import { AuthGuard } from './shared/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Inicio'
    }
  },
  {
    path: 'users',
    component: MainLayoutComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Usuarios'
    }
  },
  {
    path: 'clientes',
    component: MainLayoutComponent,
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Clientes'
    }
  },
  {
    path: 'productos',
    component: MainLayoutComponent,
    loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Productos'
    }
  },
  {
    path: 'ventas',
    component: MainLayoutComponent,
    loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Mis ventas'
    }
  },
  {
    path: 'reportes',
    component: MainLayoutComponent,
    loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Reportes'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard],
    data: {
      breadcrumb: 'Login'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      breadcrumb: 'Pagina no encontrada'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
