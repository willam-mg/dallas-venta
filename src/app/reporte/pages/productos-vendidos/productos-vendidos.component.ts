import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseData } from '../../../shared/models/response-data';
import { Title } from '@angular/platform-browser';
import { Pagination } from '../../../shared/models/pagination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Venta } from '../../../models/venta';
import { VentaSearch } from '../../../models/filters/venta-search';
import { HttpService as ventaService } from '../../../venta/http.service';
import { DetalleVenta } from '../../../models/detalle-venta';

@Component({
  selector: 'app-productos-vendidos',
  templateUrl: './productos-vendidos.component.html',
  standalone: false,
  styleUrls: ['./productos-vendidos.component.css']
})
export class ProductosVendidosComponent implements OnInit {
  subscription: Subscription;
  submitted: Boolean;
  ventas: Array<Venta>;
  detalleVentas: Array<DetalleVenta>;
  responseData: ResponseData;
  pagination: Pagination;
  formVenta: FormGroup;

  constructor(
    private httpService: ventaService,
    private title: Title) {
    // private modalService: NgbModal) {
    this.subscription = new Subscription();
    this.submitted = false;
    this.ventas = [];
    this.responseData = new ResponseData();
    this.title.setTitle('Productos vendidos');
    this.pagination = new Pagination();
    this.formVenta = new FormGroup({
      filterCliente: new FormControl(this.httpService.filterSearch.cliente),
      filterFechaInicio: new FormControl(this.httpService.filterSearch.cliente),
      filterFechaFin: new FormControl(this.httpService.filterSearch.cliente),
      filterEstado: new FormControl(this.httpService.filterSearch.cliente),
    });
    this.detalleVentas = [];
  }

  ngOnInit(): void {
    console.log(this.httpService.filterSearch);
    this.formVenta.controls['filterCliente'].setValue(this.httpService.filterSearch.cliente);
    this.formVenta.controls['filterFechaInicio'].setValue(this.httpService.filterSearch.fechaInicio);
    this.formVenta.controls['filterFechaFin'].setValue(this.httpService.filterSearch.fechaFin);
    this.formVenta.controls['filterEstado'].setValue(this.httpService.filterSearch.estado);
    this.search();
  }

  pageChanged(event: any) {
    this.pagination.page = event.page;
    this.search();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(): void {
    this.submitted = true;
    this.subscription.add(
      this.httpService.search(this.formVenta.value, this.pagination).subscribe(data => {
        this.submitted = false;
        this.responseData = data;
        this.ventas = this.responseData.data;
        this.loadDetalleVentas();
        this.pagination.totalCount = data.pages.totalCount;
      })
    );
  }

  loadDetalleVentas(): void {
    this.detalleVentas = [];
    this.ventas.forEach(itemVenta => {
      itemVenta.detalleVenta.forEach(itemDetalle => {
        itemDetalle.venta = itemVenta;
        this.detalleVentas.push(itemDetalle);

      });
    });
  }

  cancelarVenta(id: number) {
    Swal.fire({
      title: 'Ventas',
      text: "¿Cancelar venta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Registrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.httpService.cancelarVenta(id).subscribe(data => {
            this.search();
            Swal.fire(
              'Ventas',
              'Venta fue cancelada',
              'success'
            )
          })
        );
      }
    })
  }

  totalVentas() {
    let suma = 0;
    this.ventas.map((item) => {
      suma += item.total;
    });
    return suma;
  }

}
