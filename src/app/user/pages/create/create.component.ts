import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { HttpService } from '../../http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  standalone: false,
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  closeResult = '';
  user: User;
  submitted: boolean;
  formUser: FormGroup;
  subscription: Subscription;
  @Output()
  change: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(
    // private modalService: NgbModal,
    private userService: HttpService,
    private router: Router,
    private title: Title) { 
    this.user = new User();
    this.user.turno = "mañana";
    this.formUser = this.initForm();
    this.submitted = false;
    this.subscription = new Subscription;
  }

  ngOnInit(): void {
  }

  initForm(): FormGroup {
    return new FormGroup({
      nombre_completo: new FormControl(this.user.nombre_completo, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
      ]),
      turno: new FormControl(this.user.turno, [
        Validators.required,
      ]),
    });
  }

  open(content:any) {
    // this.modalService.open(content);
  }

  onSubmit() {
    try {
      if (this.formUser.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.subscription.add(
        this.userService.create(this.formUser.value)
          .subscribe(async () => {
            this.submitted = false;
            this.user = new User();
            this.formUser = this.initForm();
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

}
