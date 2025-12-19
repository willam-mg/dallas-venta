import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../../cash-register.service';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-close-cash-register',
  templateUrl: './close-cash-register.component.html',
  standalone: false,
  styleUrls: ['./close-cash-register.component.css']
})
export class CloseCashRegisterComponent implements OnInit {
  formCashRegister!: FormGroup;
  subscription: Subscription = new Subscription;
  puntoVentaId: number | null = null;
  isOpened: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private cashRegisterService: CashRegisterService,
    private authService: AuthService,
    public modal: BsModalService,
  ) { }

  ngOnInit(): void {
    this.puntoVentaId = this.authService.getPuntoVenta();
    console.log('punto venta id catched', this.puntoVentaId);
    this.formCashRegister = new FormGroup({ 
      puntoVentaId: new FormControl(this.puntoVentaId, Validators.required),
      openingAmount: new FormControl(null, Validators.required),
      comment: new FormControl("", Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeCashRegister() {
    this.subscription.add(
      this.cashRegisterService.closeCashRegister(
        this.formCashRegister.value.puntoVentaId, 
        this.formCashRegister.value.openingAmount, 
        this.formCashRegister.value.comment).subscribe({
          next: () => {
            this.isOpened.emit(true);
            this.modal.hide();
          },
          error: (error) => {
            Swal.fire('Error', error.error.message, 'error');
          }
        })
    );
  }

}
