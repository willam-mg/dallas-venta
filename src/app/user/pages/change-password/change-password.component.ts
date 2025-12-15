import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { AuthService } from '../../../auth/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: User = new User();
  formUser!: FormGroup;
  submitted: boolean = false;
  subscription: Subscription = new Subscription;
  @Output()
  isUpdated: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(
    private authService: AuthService,
    public modal: BsModalRef
  ) {}

  ngOnInit(): void {
    this.formUser = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    Swal.fire({
      title: '',
      text: "¿Cambiar contraseña?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Cambiar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitted = true;
        this.subscription.add(
          this.authService.changePassword(this.formUser.controls['newPassword'].value)
            .subscribe({
              next: data => {
                this.submitted = false;
                this.modal.hide();
                this.isUpdated.emit(true);
              },
              error: error => {
                this.submitted = false;
                alert(error.error.message);
              }
            })
        );
      }
    })
  }
}
