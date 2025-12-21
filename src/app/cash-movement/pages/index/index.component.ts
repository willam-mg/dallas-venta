import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseData } from '../../../shared/models/response-data';
import { Title } from '@angular/platform-browser';
import { Pagination } from '../../../shared/models/pagination';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Almacen } from '../../../models/almacen';
import { CashMovementService } from '../../cash-movements.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { OpenCashRegisterComponent } from '../open-cash-register/open-cash-register.component';
import { CashRegisterService } from '../../cash-register.service';
import { AuthService } from '../../../auth/auth.service';
import { CashRegister } from '../../../models/cash-register';
import { CloseCashRegisterComponent } from '../close-cash-register/close-cash-register.component';
import { CashMovement } from '../../../models/cash-movement';
import { CashMovementType } from '../../../shared/constants/cash-movement.constants';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  standalone: false,
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  subscription: Subscription = new Subscription();
  submitted: Boolean = false;
  cashMovements: CashMovement[] = [];
  responseData: ResponseData = new ResponseData();
  pagination: Pagination = new Pagination(1, 20, 0);
  formSearch!: FormGroup;
  modalRefProducto!: BsModalRef;
  isCashRegisterOpened: boolean = false;
  cashRegister: CashRegister | null = new CashRegister();
  cashRegisterClosed: CashRegister | null = new CashRegister();
  puntoVentaId: number | null = null;
  cashMovementTypeIN: CashMovementType = CashMovementType.IN;
  cashMovementTypeOUT: CashMovementType = CashMovementType.OUT;

  constructor(
    private httpService: CashMovementService,
    private cashRegisterService: CashRegisterService,
    private modalProducto: BsModalService,
    private authService: AuthService,
    private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Movimientos');

    this.formSearch = new FormGroup({
      fieldNombre: new FormControl(""),
      fieldCodigo: new FormControl(""),
    });

    this.puntoVentaId = this.authService.getPuntoVenta();
    this.search();
    this.getCashRegister();
  }

  getCashRegister() {
    this.cashRegisterService.getCashRegisterOpened(this.puntoVentaId!).subscribe({
      next: (result) => {
        if(result){
          this.cashRegister = result;
        } else {
          this.cashRegister = null;
          this.getCashRegisterClosed();
        }
      },
      error: (error) => {
        Swal.fire('Error', error.error.message, 'error');
      }
    });
  }
  
  getCashRegisterClosed() {
    this.cashRegisterService.getCashRegisterClosed(this.puntoVentaId!).subscribe({
      next: (result) => {
        this.cashRegisterClosed = result;
        console.log('closed', this.cashRegisterClosed);
      },
      error: (error) => {
        Swal.fire('Error', error.error.message, 'error');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(): void {
    this.submitted = true;
    this.subscription.add(
      this.httpService.search(this.puntoVentaId!, this.pagination).subscribe(data => {
        this.submitted = false;
        this.responseData = data;
        this.cashMovements = this.responseData.data;
        this.pagination.totalCount = data.pages.totalCount;
      })
    );
  }


  openCashRegister() {
    const initialState: ModalOptions = {
      class: 'modal-sm',
    };
    this.modalRefProducto = this.modalProducto.show(OpenCashRegisterComponent, initialState);
    
    this.modalRefProducto.content.isOpened.subscribe((data: Almacen) => {
      Swal.fire(
        '',
        'Caja abierta',
        'success'
      );
      this.getCashRegister();
      this.search();

      this.modalRefProducto.hide();
    });
  }

  closeCashRegister() {
    const initialState: ModalOptions = {
      class: 'modal-sm',
    };
    this.modalRefProducto = this.modalProducto.show(CloseCashRegisterComponent, initialState);
    
    this.modalRefProducto.content.isOpened.subscribe((data: Almacen) => {
      Swal.fire(
        '',
        'Caja cerrada',
        'success'
      );

      this.getCashRegister();
      this.search();

      this.modalRefProducto.hide();
    });
  }

  getOpenedAtHuman(): string {
    return this.getDateTimeHuman(this.cashRegister?.date_opened_at!, this.cashRegister?.time_opened_at!);
  }
  
  getClosedAtHuman(): string {
    return this.getDateTimeHuman(this.cashRegisterClosed?.date_closed_at!, this.cashRegisterClosed?.time_closed_at!);
  }
  
  getDateTimeHuman(dateParam: string, timeParam: string): string {
    if (!this.cashRegisterClosed) return '';

    const date = new Date(
      dateParam + 'T' + timeParam
    );

    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    const time = date.toLocaleTimeString('es-BO', {
      hour: '2-digit',
      minute: '2-digit'
    });

    if (diffDays === 0) return `hoy a las ${time}`;
    if (diffDays === 1) return `ayer a las ${time}`;

    return `${date.toLocaleDateString('es-BO')} a las ${time}`;
  }

}
