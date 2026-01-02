import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfirmCashCollectionDialog } from './components/confirm-cash-collection-dialog/confirm-cash-collection-dialog';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    ConfirmCashCollectionDialog
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    ConfirmCashCollectionDialog
  ]
})
export class CashCollectionModule {}
