import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseData } from '../../../shared/models/response-data';
import { Title } from '@angular/platform-browser';
import { Pagination } from '../../../shared/models/pagination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente';
import { Almacen } from '../../../models/almacen';


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

  constructor(
    private httpService: HttpService,
    private title: Title) {
    // private modalService: NgbModal) {
    this.subscription = new Subscription();
    this.submitted = false;
    this.almacenes = [];
    this.responseData = new ResponseData();
    this.title.setTitle('Productos');
    this.pagination = new Pagination();
    this.formProducto = new FormGroup({
      fieldNombre: new FormControl(""),
      fieldCodigo: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pageChanged(event: any) {
    this.pagination.page = event.page;
    this.search();
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

}
