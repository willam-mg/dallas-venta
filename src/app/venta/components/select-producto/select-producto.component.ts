import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpService as ProductoHttpService } from '../../../producto/http.service';
// import { ResponseData } from 'src/app/shared/models/response-data';
// import { Pagination } from 'src/app/shared/models/pagination';
// import { Cliente } from 'src/app/models/cliente';
// import { Almacen } from 'src/app/models/almacen';
import Swal from 'sweetalert2';
import { ResponseData } from '../../../shared/models/response-data';
import { Almacen } from '../../../models/almacen';
import { Pagination } from '../../../shared/models/pagination';

@Component({
  selector: 'app-select-producto',
  templateUrl: './select-producto.component.html',
  standalone: false,
  styleUrls: ['./select-producto.component.css']
})
export class SelectProductoComponent implements OnInit {
  formSearch: FormGroup;
  submitted: boolean;
  subscription: Subscription;
  responseData: ResponseData;
  almacenes: Array<Almacen>;
  pagination: Pagination;
  cantidad: number;
  @Output()
  isSelected: EventEmitter<Almacen> = new EventEmitter<Almacen>();

  constructor(
    private httpService: ProductoHttpService) {
    // public modal: NgbActiveModal) {
    this.submitted = false;
    this.almacenes = [];
    this.subscription = new Subscription;
    this.responseData = new ResponseData();
    this.pagination = new Pagination();
    this.formSearch = new FormGroup({ 
      fieldNombre: new FormControl(""),
      fieldCodigo: new FormControl(""), 
    });
    this.cantidad = 0;
  }

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setCantidad(cantidad: number): void {
    this.cantidad = cantidad;
  }

  search() {
    this.httpService.search(this.formSearch.value, this.pagination).subscribe((data) => {
      this.responseData = data;
      this.almacenes = this.responseData.data;
      this.pagination.totalCount = data.pages.totalCount;
    });
  }

  select(almacen: Almacen) {
    console.log('almacen cantidad', almacen.cantidad);
    console.log('cantidad', this.cantidad);
    try {
      if (this.cantidad == 0) {
        throw new Error('la cantidad no puede ser 0');
      }
      if (almacen.cantidad < this.cantidad) {
        throw new Error('La cantidad sobrepasa el stock');
      }
      // this.modal.close();
      this.isSelected.emit(almacen);
    } catch (error: any) {
      Swal.fire(
        'Stock',
        error.message,
        'warning',
      )
    }
  }
}
