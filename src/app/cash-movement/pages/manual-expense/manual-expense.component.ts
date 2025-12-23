import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../../cash-register.service';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';
import { CashMovementService } from '../../cash-movements.service';
import { Vendedor } from '../../../models/vendedor';
import { User } from '../../../models/user';
import { PaymentMethod } from '../../../shared/constants/payment-method.constants';
import { ReferenceType } from '../../../shared/constants/reference-type.constants';

@Component({
  selector: 'app-manual-expense',
  templateUrl: './manual-expense.component.html',
  standalone: false,
  styleUrls: ['./manual-expense.component.css']
})
export class ManualExpenseComponent implements OnInit {
  formCashRegister!: FormGroup;
  subscription: Subscription = new Subscription;
  puntoVentaId: number | null = null;
  isCreated: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  userStored: User | null = null;
  paymentMethodCash: PaymentMethod = PaymentMethod.CASH;
  paymentMethodQr: PaymentMethod = PaymentMethod.QR;
  paymentMethodTransfer: PaymentMethod = PaymentMethod.TRANSFER;

  referenceTypeManualExpense: ReferenceType = ReferenceType.MANUAL_EXPENSE;
  referenceTypeSupplierPayments: ReferenceType = ReferenceType.SUPPLIER_PAYMENTS;
  referenceTypeTextPayments: ReferenceType = ReferenceType.TEXT_PAYMENTS;
  referenceCollectType: ReferenceType = ReferenceType.COLLECT_FUNDS;

  constructor(
    private cashMovementService: CashMovementService,
    private authService: AuthService,
    public modal: BsModalService,
  ) { }

  ngOnInit(): void {
    this.userStored = this.authService.getUserIdentity();
    this.puntoVentaId = this.authService.getPuntoVenta();

    this.formCashRegister = new FormGroup({
      puntoVentaId: new FormControl(this.puntoVentaId, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(0.01)
      ]),
      paymentMethod: new FormControl(this.paymentMethodCash, Validators.required),
      referenceType: new FormControl(this.referenceTypeManualExpense, Validators.required),
      sellerId: new FormControl(this.userStored?.id, Validators.required),
      comment: new FormControl('', Validators.required),
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  registerIncome() {
    this.subscription.add(
      this.cashMovementService.registerExpense(
        this.formCashRegister.value.puntoVentaId,
        this.formCashRegister.value.amount,
        this.formCashRegister.value.paymentMethod,
        this.formCashRegister.value.referenceType,
        this.formCashRegister.value.sellerId,
        this.formCashRegister.value.comment).subscribe({
          next: () => {
            this.isCreated.emit(true);
            // this.modal.hide();
          },
          error: (error) => {
            Swal.fire('Error', error.error.message, 'error');
          }
        })
    );
  }

}
