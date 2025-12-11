import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize, Subscription, throwError } from 'rxjs';
// import { User } from 'src/app/models/user';
import { HttpService } from '../../http.service';
import { HttpService as HttpServiceCliente } from '../../../cliente/http.service';
// import { ResponseData } from 'src/app/shared/models/response-data';
// import { Estudiante } from 'src/app/models/estudiante';
// import { Pagination } from 'src/app/shared/models/pagination';
// import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { ResponseData } from '../../../shared/models/response-data';
import { Cliente } from '../../../models/cliente';
import { Estudiante } from '../../../models/estudiante';
import { Pagination } from '../../../shared/models/pagination';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-select-cliente',
  templateUrl: './select-cliente.component.html',
  standalone: false,
  styleUrls: ['./select-cliente.component.css']
})
export class SelectClienteComponent implements OnInit {
  model: User;
  formSearch: FormGroup;
  formSearchEstudiante: FormGroup;
  submitted: boolean;
  subscription: Subscription;
  responseData: ResponseData;
  responseDataEstudiante: ResponseData;
  clientes: Array<Cliente>;
  estudiantes: Array<Estudiante>;
  pagination: Pagination;
  paginationEstudiante: Pagination;
  @Output()
  isSelected: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  constructor(
    private httpServiceCliente: HttpServiceCliente,
    public modal: BsModalRef) {
    this.model = new User();
    this.submitted = false;
    this.clientes = [];
    this.estudiantes = [];
    this.subscription = new Subscription;
    this.responseDataEstudiante = new ResponseData();
    this.responseData = new ResponseData();
    this.pagination = new Pagination();
    this.paginationEstudiante = new Pagination();
    this.formSearch = new FormGroup({ fieldSearch: new FormControl("") });
    this.formSearchEstudiante = new FormGroup({ fieldSearch: new FormControl("") });
  }

  ngOnInit(): void {
    this.search();
    this.searchEstudiante();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pageChanged(event: any) {
    this.pagination.page = event.page;
    this.search();
  }

  search() {
    this.httpServiceCliente.search(this.formSearch.value.fieldSearch, this.pagination).subscribe((data) => {
      this.responseData = data;
      this.clientes = this.responseData.data;
      this.pagination.totalCount = data.pages.totalCount;
    });
  }
  
  searchEstudiante() {
    this.httpServiceCliente.estudiantes(this.formSearchEstudiante.value.fieldSearch, this.paginationEstudiante).subscribe((data) => {
      this.responseDataEstudiante = data;
      this.estudiantes = this.responseDataEstudiante.data;
      this.paginationEstudiante.totalCount = data.pages.totalCount;
    });
  }

  select(cliente: Cliente) {
    // this.modal.close();
    this.isSelected.emit(cliente);
  }
  
  selectEstudiante(estudiante: Estudiante) {
    let cliente:Cliente = estudiante.cliente;
    console.log(cliente);
    if(cliente) {
      this.isSelected.emit(cliente);
      // this.modal.close();
    }else {
      console.log('no tiene cliente');
      this.submitted = true;
      let bodyRequest = new Cliente();
      bodyRequest.estudiante_id = estudiante.id!;
      this.subscription.add(
        this.httpServiceCliente.create(bodyRequest)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMessage = error.error.message;
              Swal.fire(
                '',
                errorMessage,
                'warning'
              );
              return throwError(errorMessage);
            })
          )
          .subscribe(async (resCliente) => {
            this.submitted = false;
            this.searchEstudiante();
            console.log(resCliente);
            this.isSelected.emit(resCliente);
            // this.modal.close();
          })
      );
    }
  }
}
