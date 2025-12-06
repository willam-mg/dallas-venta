import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../../../models/user';
import { ResponseData } from '../../../shared/models/response-data';
import { Title } from '@angular/platform-browser';
import { Pagination } from '../../../shared/models/pagination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente';
import { SelectClienteComponent } from '../../components/select-cliente/select-cliente.component';
import { SelectProductoComponent } from '../../components/select-producto/select-producto.component';
import { Producto } from '../../../models/producto';
import { Almacen } from '../../../models/almacen';
import { HttpService as ProductoHttpService } from '../../../producto/http.service';
import { DetalleVenta } from '../../../models/detalle-venta';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Venta } from '../../../models/venta';
import { Router } from '@angular/router';
import moment from 'moment';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  standalone: false,
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  subscription: Subscription;
  submitted: Boolean;
  cliente: Cliente;
  almacen: Almacen;
  responseData: ResponseData;
  pagination: Pagination;
  formVenta: FormGroup;
  formSearchCodebar: FormGroup;
  detalleVenta: Array<DetalleVenta>;
  inputCantidad: number;
  fieldObservacion: string;
  venta: Venta;
  inputEfectivo: number;
  inputCambio: number;
  inputFecha: string;
  inputHora: string;
  @ViewChild(SelectClienteComponent) selectClienteComponent: any;
  @ViewChild(SelectProductoComponent) selectProductoComponent: any;

  constructor(
    private title: Title,
    private router: Router,
    // private modalCliente: NgbModal,
    // private modalProducto: NgbModal,
    private httpService: HttpService,
    private productoHttpService:ProductoHttpService) {
    this.title.setTitle('Nueva venta');
    this.responseData = new ResponseData();
    this.subscription = new Subscription();
    this.submitted = false;
    this.pagination = new Pagination();
    this.cliente = new Cliente();
    this.almacen = new Almacen();
    this.formVenta = new FormGroup({
      fieldSearch: new FormControl(""),
    });
    this.formSearchCodebar = new FormGroup({
      codeBar: new FormControl(""),
    });
    this.detalleVenta = [];
    this.inputCantidad = 1;
    this.fieldObservacion = "";
    this.venta = new Venta();
    this.inputEfectivo = 0;
    this.inputCambio = 0;
    this.inputFecha = moment().format('YYYY-MM-DD');
    this.inputHora = moment().format('hh:mm');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchCliente() {
    // const modalRefCliente = this.modalCliente.open(SelectClienteComponent, { size: 'lg' });
    // modalRefCliente.componentInstance.isSelected.subscribe((data: Cliente) => {
    //   this.cliente = data;
    // });
  }
  searchProducto() {
    // const modalRefProducto = this.modalProducto.open(SelectProductoComponent, { size: 'lg' });
    // modalRefProducto.componentInstance.setCantidad(this.inputCantidad);
    // modalRefProducto.componentInstance.isSelected.subscribe((data: Almacen) => {
    //   this.almacen = data;
    //   this.addDetalleVenta(this.almacen);
    // });
  }
  
  searchByCodeBar() {
    this.submitted = true;
    this.subscription.add(
      this.productoHttpService.getByCodeBar(this.formSearchCodebar.value.codeBar, this.inputCantidad).subscribe({
        next: data => {
          this.submitted = false;
          this.almacen = data;
          this.addDetalleVenta(this.almacen);
          this.formSearchCodebar.reset();
        },
        error: error => {
          Swal.fire(
            '',
            error.error.message,
            'warning'
          );
          this.submitted = false;
          this.formSearchCodebar.reset();
        }
      })
    );
  }

  existsInDetalleVenta(detalle:DetalleVenta) {
    let exists = false;
    this.detalleVenta.forEach((item) => {
      if (item.almacen.id == detalle.almacen.id) {
        exists = true;
      }
    });
    return exists;
  }

  addDetalleVenta(almacen: Almacen) {
    let detalle = new DetalleVenta();
    detalle.almacen_id = this.almacen.id!;
    detalle.producto_id = this.almacen.producto.id!;
    detalle.precio = this.almacen.producto.precio;
    detalle.almacen = this.almacen;
    detalle.cantidad = this.inputCantidad;

    if (this.existsInDetalleVenta(detalle)) {
      this.detalleVenta.forEach((item) => {
        if (item.almacen.id == detalle.almacen.id) {
          let cantidadDisponible = item.almacen.cantidad;
          let cantidadRequerida = item.cantidad + detalle.cantidad;
          if (cantidadDisponible >= cantidadRequerida) {
            item.cantidad += detalle.cantidad;
          } else {
            Swal.fire(
              'Stock',
              'La cantidad sobrepasa el stock',
              'warning'
            );
          }
        }
      });
    } else {
      this.detalleVenta.push(detalle);
    }
  }

  removeDetalle(detalle:DetalleVenta) {
    const index = this.detalleVenta.indexOf(detalle);
    if (index > -1) {
      this.detalleVenta.splice(index, 1);
    }
  }

  totalDetalleVenta() {
    let suma = 0;
    this.detalleVenta.map((item) => {
      suma += item.subtotal;
    });
    return suma;
  }

  registrarVenta() {
    Swal.fire({
      title: 'Ventas',
      text: "¿Registrar venta?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Registrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.venta.cliente_id = this.cliente.id!;
        this.venta.observacion = this.fieldObservacion;
        this.venta.detalleVenta = this.detalleVenta;
        this.venta.fecha = this.inputFecha;
        this.venta.hora = this.inputHora;
        this.httpService.create(this.venta)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMessage = error.error.message;
              Swal.fire(
                '',
                errorMessage,
                'warning'
              );
              this.submitted = false;
              this.formSearchCodebar.reset();
              return throwError(errorMessage);
            })
          ).subscribe(async (data) => {
            Swal.fire(
              'Ventas',
              'Fue registrado satisfactoriamente',
              'success'
            )
            this.venta = data;
            this.router.navigate(['/ventas/recibo'], {
              queryParams:
              {
                id: this.venta.id
              }
            });
          });
      }
    })
  }

  calcCambio() {
    let total = this.totalDetalleVenta();
    if (this.inputEfectivo >= total && total > 0 ) {
      this.inputCambio = this.inputEfectivo - total;
    }
  }

}
