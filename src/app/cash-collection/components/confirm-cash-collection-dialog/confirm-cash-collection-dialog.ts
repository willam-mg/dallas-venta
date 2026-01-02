import { Subscription } from 'rxjs';
import { Component, EventEmitter } from '@angular/core';
import { CashCollectionService } from '../../../shared/services/cash-collection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CashCollection } from '../../../models/cash-collection';
import { CashRegister } from '../../../models/cash-register';
import { CashRegisterService } from '../../../cash-movement/cash-register.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-confirm-cash-collection-dialog',
  standalone: false,
  templateUrl: './confirm-cash-collection-dialog.html',
  styleUrl: './confirm-cash-collection-dialog.css',
})
export class ConfirmCashCollectionDialog {
  cashCollectionId!: number;
  cashCollectionCatched!: CashCollection;
  subscription: Subscription = new Subscription;
  formCashCollectionConfirm!: FormGroup;
  isconfirmed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  puntoVentaId!: number;
  cashRegister: CashRegister = new CashRegister();
  balance: number = 0;

  constructor(
    public bsModalRef: BsModalRef,
    private cashCollectionService: CashCollectionService,
    private authService: AuthService,
    private cashRegisterService: CashRegisterService
  ) {}

  ngOnInit() {
    this.formCashCollectionConfirm = new FormGroup({ 
      cash_collection_id: new FormControl(this.cashCollectionId, Validators.required),
      amount: new FormControl(0, Validators.required),
      notes: new FormControl(""),
    });

    this.puntoVentaId = this.authService.getPuntoVenta()!;

    this.getCashRegister();

    this.formCashCollectionConfirm.get('amount')!.valueChanges.subscribe(amount => {
      this.calculateBalance(amount);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  confirm(){
    Swal.fire({
      title: 'Recojo de fondos',
      text: "¿Corfirmar recojo de fondos?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Registrar'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.cashCollectionService.confirmCollection(
            this.cashCollectionId,
            this.formCashCollectionConfirm.controls['amount'].value,
            this.formCashCollectionConfirm.controls['notes'].value,
          ).subscribe({
            next: data => {
              console.log('recevide', data);
              Swal.fire('Success', 'Recojo de fondos confirmado', 'success');
              this.isconfirmed.emit(true);
              this.bsModalRef.hide();
            },
            error: error => {
              Swal.fire('Error', error.error.message, 'error');
            }
          })
        );
      }
    })
  }

  getCashRegister() {
    this.cashRegisterService.getCashRegisterOpened(this.puntoVentaId!).subscribe({
      next: (result) => {
        this.cashRegister = result!;
        this.calculateBalance(this.formCashCollectionConfirm.get('amount')!.value);
        this.balance = this.cashRegister.cash_balance;
      },
      error: (error) => {
        Swal.fire('Error', error.error.message, 'error');
      }
    });
  }

  calculateBalance(amount: number): void {
    if (!this.cashRegister || this.cashRegister.cash_balance === undefined) {
      this.balance = 0;
      return;
    }

    this.balance = Number(this.cashRegister.cash_balance) - Number(amount || 0);
  }
}
