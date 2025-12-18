import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './pages/show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashMovementRoutingModule } from './cash-movements-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { OpenCashRegisterComponent } from './pages/open-cash-register/open-cash-register.component';
import { CloseCashRegisterComponent } from './pages/close-cash-register/close-cash-register.component';

@NgModule({
  declarations: [
    OpenCashRegisterComponent,
    CloseCashRegisterComponent,
    IndexComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    CashMovementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CashMovementModule { }
