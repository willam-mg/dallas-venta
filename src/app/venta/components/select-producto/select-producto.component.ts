import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService as ProductoHttpService } from '../../../producto/http.service';
import Swal from 'sweetalert2';
import { ResponseData } from '../../../shared/models/response-data';
import { Almacen } from '../../../models/almacen';
import { Pagination } from '../../../shared/models/pagination';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-select-producto',
  templateUrl: './select-producto.component.html',
  standalone: false,
  styleUrls: ['./select-producto.component.css']
})
export class SelectProductoComponent implements OnInit, OnDestroy {

  formSearch: FormGroup = new FormGroup({});
  submitted: boolean = false;
  subscription!: Subscription;
  responseData!: ResponseData;
  almacenes: Array<Almacen> = [];
  pagination!: Pagination;

  @Input() cantidad!: number;
  @Output() isSelected: EventEmitter<Almacen> = new EventEmitter<Almacen>();

  constructor(
    public modalRef: BsModalRef,
    private httpService: ProductoHttpService,
    private cd: ChangeDetectorRef 
  ) {
    
  }

  ngOnInit(): void {
    this.submitted = false;
    this.almacenes = [];
    this.subscription = new Subscription();
    this.responseData = new ResponseData();
    this.pagination = new Pagination();
    this.formSearch = new FormGroup({ 
      fieldNombre: new FormControl(""),
      fieldCodigo: new FormControl(""), 
    });

    this.search();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pageChanged(event: any) {
    this.pagination.page = event.page;
    this.search();
  }

  search() {
    this.httpService.search(this.formSearch.value, this.pagination).subscribe((data) => {
      this.responseData = data;
      this.almacenes = this.responseData.data;
      this.pagination.totalCount = data.pages.totalCount;
      this.cd.detectChanges();
    });
  }

  select(almacen: Almacen) {
    try {
      if (this.cantidad == 0) {
        throw new Error('La cantidad no puede ser 0');
      }
      if (almacen.cantidad < this.cantidad) {
        throw new Error('La cantidad sobrepasa el stock');
      }

      this.isSelected.emit(almacen);
      this.modalRef.hide();
    } catch (error: any) {
      Swal.fire(
        'Stock',
        error.message,
        'warning',
      );
    }
  }
}
