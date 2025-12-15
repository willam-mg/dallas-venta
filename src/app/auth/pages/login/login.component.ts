import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  submitted: boolean;
  formUser: FormGroup;
  subscription: Subscription;

  constructor(
    private userService: AuthService,
    private router: Router,
    private title: Title) {
    this.title.setTitle('Nuevo administrador');
    this.user = new User();
    this.formUser = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
      ]),
    });
    this.submitted = false;
    this.subscription = new Subscription;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    try {
      if (this.formUser.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.subscription.add(
        this.userService.login(this.formUser.value)
          .subscribe({
            next: data => {
              this.user = data;
              console.log(data);
              localStorage.setItem(environment.store.userId, String(data.id));
              localStorage.setItem(environment.store.userToken, String(data.access_token));
              localStorage.setItem(environment.store.userData, JSON.stringify(data));
              localStorage.setItem(environment.store.puntoVentaId, String(data.punto_venta_id));
              localStorage.setItem(environment.store.sucursal, String(data.puntoVenta?.sucursal));
              localStorage.setItem(environment.store.logo, String(data.puntoVenta?.logo));
              localStorage.setItem(environment.store.puntoVentaNombre, String(data.puntoVenta?.nombre));
              this.user = new User();
              this.submitted = false;
              this.router.navigate(['/']);
            },
            error: error => {
              this.submitted = false;
              alert(error.error.message);
            }
          })
      );
    } catch (error) {
      console.log(error);
    }
  }

}