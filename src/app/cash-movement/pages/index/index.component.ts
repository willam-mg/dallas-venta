import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseData } from '../../../shared/models/response-data';
import { Title } from '@angular/platform-browser';
import { Pagination } from '../../../shared/models/pagination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Almacen } from '../../../models/almacen';
import { CashMovementService } from '../../cash-movements.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { OpenCashRegisterComponent } from '../open-cash-register/open-cash-register.component';
import { CashRegisterService } from '../../cash-register.service';
import { AuthService } from '../../../auth/auth.service';
import { CashRegister } from '../../../models/cash-register';
import { CloseCashRegisterComponent } from '../close-cash-register/close-cash-register.component';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  standalone: false,
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  subscription: Subscription;
  submitted: Boolean;
  almacenes: Array<Almacen>;
  responseData: ResponseData;
  pagination: Pagination;
  formProducto: FormGroup;
  modalRefProducto!: BsModalRef;
  isCashRegisterOpened: boolean = false;
  cashRegister: CashRegister | null = new CashRegister();
  puntoVentaId: number | null = null;

  constructor(
    private httpService: CashMovementService,
    private cashRegisterService: CashRegisterService,
    private modalProducto: BsModalService,
    private authService: AuthService,
    private title: Title) {
    this.subscription = new Subscription();
    this.submitted = false;
    this.almacenes = [];
    this.responseData = new ResponseData();
    this.title.setTitle('Movimientos');
    this.pagination = new Pagination();
    this.formProducto = new FormGroup({
      fieldNombre: new FormControl(""),
      fieldCodigo: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.search();
    this.puntoVentaId = this.authService.getPuntoVenta();
    this.cashRegisterService.getCashRegisterOpened(this.puntoVentaId!).subscribe({
      next: (result) => {
        this.cashRegister = result;
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
      this.httpService.search(this.formProducto.value, this.pagination).subscribe(data => {
        this.submitted = false;
        this.responseData = data;
        this.almacenes = this.responseData.data;
        this.pagination.totalCount = data.pages.totalCount;
      })
    );
  }


  openCashRegister() {
    const initialState: ModalOptions = {
      class: 'modal-sm',
    };
    this.modalRefProducto = this.modalProducto.show(OpenCashRegisterComponent, initialState);
    
    this.modalRefProducto.content.isSelected.subscribe((data: Almacen) => {
      Swal.fire(
        '',
        'Caja abierta',
        'success'
      );

      this.modalRefProducto.hide();
    });
  }

  closeCashRegister() {
    const initialState: ModalOptions = {
      class: 'modal-sm',
    };
    this.modalRefProducto = this.modalProducto.show(CloseCashRegisterComponent, initialState);
    
    this.modalRefProducto.content.isSelected.subscribe((data: Almacen) => {
      Swal.fire(
        '',
        'Caja abierta',
        'success'
      );

      this.modalRefProducto.hide();
    });
  }

  getOpenedAtHuman(): string {
    if (!this.cashRegister) return '';

    const date = new Date(
      this.cashRegister.date_opened_at + 'T' + this.cashRegister.time_opened_at
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
