import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../../../models/user';
import { ResponseData } from '../../../shared/models/response-data';
import { Title } from '@angular/platform-browser';
import { Pagination } from '../../../shared/models/pagination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  standalone: false,
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  subscription: Subscription;
  submitted: Boolean;
  users: Array<User>;
  responseData: ResponseData;
  pagination: Pagination;
  formUser: FormGroup;
  @ViewChild(EditComponent) editComponent: any;

  constructor(
    private httpService:HttpService, 
    private title: Title) {
    // private modalService: NgbModal) {
    this.subscription = new Subscription();
    this.submitted = false;
    this.users = [];
    this.responseData = new ResponseData();
    this.title.setTitle('Usuarios');
    this.pagination = new Pagination();
    this.formUser = new FormGroup({
      fieldSearch: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  search():void {
    this.submitted = true;
    this.subscription.add(
      this.httpService.search(this.formUser.value.fieldSearch, this.pagination).subscribe(data => {
        this.submitted = false;
        this.responseData = data;
        this.users = this.responseData.data;
        this.pagination.totalCount = data.pages.totalCount;
      })
    );
  }

  edit(id: number) {
    // const modalRef = this.modalService.open(EditComponent);
    // modalRef.componentInstance.setId(id);
    // modalRef.componentInstance.isUpdated.subscribe((data:boolean) => {
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
      title: 'Usuario',
      text: "¿Eliminar este elemento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.delete(id).subscribe(async (data)=>{
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

  handleDenial() {
    alert('handledenial');
  }
  handleDismiss(event:any){
    console.log('dismiss modal', event);
  }

}
