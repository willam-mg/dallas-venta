import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { HttpService } from '../../http.service';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone: false,
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: User;
  formUser: FormGroup;
  submitted: boolean;
  subscription: Subscription;
  @Output()
  isUpdated: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private authService: AuthService) {
    // public activeModal: NgbActiveModal) {
    this.model = new User();
    this.formUser = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    });
    this.submitted = false;
    this.subscription = new Subscription;
  }

  ngOnInit(): void {
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
                // this.model = new User();
                // this.activeModal.close();
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
