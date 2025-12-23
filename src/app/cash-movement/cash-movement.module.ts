import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './pages/show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashMovementRoutingModule } from './cash-movements-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { OpenCashRegisterComponent } from './pages/open-cash-register/open-cash-register.component';
import { CloseCashRegisterComponent } from './pages/close-cash-register/close-cash-register.component';
import { BadgeCashMovementType } from './components/badge-cash-movement-type/badge-cash-movement-type';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ManualExpenseComponent } from './pages/manual-expense/manual-expense.component';
import { ManualIncomeComponent } from './pages/manual-income/manual-income.component';

@NgModule({
  declarations: [
    OpenCashRegisterComponent,
    CloseCashRegisterComponent,
    ManualIncomeComponent,
    ManualExpenseComponent,
    IndexComponent,
    ShowComponent,
    BadgeCashMovementType
  ],
  imports: [
    CommonModule,
    CashMovementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ]
})
export class CashMovementModule { }
