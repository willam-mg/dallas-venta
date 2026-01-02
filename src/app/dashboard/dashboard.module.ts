import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { CashCollectionModule } from '../cash-collection/cash-collection.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CashCollectionModule
  ]
})
export class DashboardModule { }
