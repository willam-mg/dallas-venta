import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize, Subscription, throwError } from 'rxjs';
import { Cliente } from '../../../models/cliente';
import { HttpService } from '../../http.service';
import Swal from 'sweetalert2';
import { Estudiante } from '../../../models/estudiante';
// import { ResponseData } from 'src/app/shared/models/response-data';
// import { Pagination } from 'src/app/shared/models/pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseData } from '../../../shared/models/response-data';
import { Pagination } from '../../../shared/models/pagination';

@Component({
  selector: 'cliente-create',
  templateUrl: './create.component.html',
  standalone: false,
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  closeResult = '';
  cliente: Cliente;
  submitted: boolean;
  formCliente: FormGroup;
  subscription: Subscription;
  responseData: ResponseData;
  estudiantes: Array<Estudiante>;
  pagination: Pagination;
  formSearch: FormGroup;
  @Output()
  change: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(
    // private modalService: NgbModal,
    private httpService: HttpService,
    private router: Router,
    private title: Title) {
    this.cliente = new Cliente();
    this.formCliente = this.initForm();
    this.submitted = false;
    this.subscription = new Subscription;
    this.estudiantes = [];
    this.responseData = new ResponseData();
    this.pagination = new Pagination();
    this.formSearch = new FormGroup({fieldSearch: new FormControl("")});
  }

  ngOnInit(): void {
    this.search();
  }

  initForm(): FormGroup {
    return new FormGroup({
      nombre_completo: new FormControl(this.cliente.nombre_completo, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      ci: new FormControl(this.cliente.ci, [
        Validators.required,
      ])
    });
  }

  open(content: any, size = "") {
    // this.modalService.open(content, {
    //   size: size
    // });
  }

  createExterno() {
    try {
      if (this.formCliente.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.subscription.add(
        this.httpService.create(this.formCliente.value)
          .subscribe(async () => {
            this.submitted = false;
            this.cliente = new Cliente();
            this.formCliente = this.initForm();
            // this.modalService.dismissAll();
            this.change.emit(true);
            Swal.fire(
              'Registrado',
              'los datos se registraron correctamente',
              'success'
            );
          })
      );
    } catch (error) {
      console.log(error);
    }
  }

  search() {
    this.httpService.estudiantes(this.formSearch.value.fieldSearch, this.pagination).subscribe( (data)=>{
      console.log(data);
      this.responseData = data;
      this.estudiantes = this.responseData.data;
      this.pagination.totalCount = data.pages.totalCount;
    });
  }

  createEstudiante(id:number) {
    try {
      this.submitted = true;
      let bodyRequest = new Cliente();
      bodyRequest.estudiante_id = id;
      this.subscription.add(
        this.httpService.create(bodyRequest)
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
          .subscribe(async () => {
            this.submitted = false;
            // this.modalService.dismissAll();
            this.change.emit(true);
            Swal.fire(
              'Registrado',
              'los datos se registraron correctamente',
              'success'
            );
          })
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }

}
