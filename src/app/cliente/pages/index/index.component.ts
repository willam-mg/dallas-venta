import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../../../models/user';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente';
import { ResponseData } from '../../../shared/models/response-data';
import { Pagination } from '../../../shared/models/pagination';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  standalone: false,
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  subscription: Subscription;
  submitted: Boolean;
  clientes: Array<Cliente>;
  responseData: ResponseData;
  pagination: Pagination;
  formCliente: FormGroup;
  @ViewChild(EditComponent) editComponent: any;

  constructor(
    private httpService: HttpService,
    private title: Title) {
    // private modalService: NgbModal) {
    this.subscription = new Subscription();
    this.submitted = false;
    this.clientes = [];
    this.responseData = new ResponseData();
    this.title.setTitle('Clientes');
    this.pagination = new Pagination();
    this.formCliente = new FormGroup({
      fieldSearch: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(): void {
    this.submitted = true;
    this.subscription.add(
      this.httpService.search(this.formCliente.value.fieldSearch, this.pagination).subscribe(data => {
        this.submitted = false;
        this.responseData = data;
        this.clientes = this.responseData.data;
        this.pagination.totalCount = data.pages.totalCount;
      })
    );
  }

  edit(id: number) {
    // const modalRef = this.modalService.open(EditComponent);
    // modalRef.componentInstance.setId(id);
    // modalRef.componentInstance.isUpdated.subscribe((data: boolean) => {
    //   Swal.fire(
    //     'Guardado',
    //     'los datos se guardaron correctamente',
    //     'success'
    //   );
    //   this.search();
    // });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Cliente',
      text: "¿Eliminar este elemento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.delete(id).subscribe(async (data) => {
          this.search();
          Swal.fire(
            'Eliminado',
            data.message,
            'success'
          )
        });
      }
    })
  }


}
