import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PuntoVenta } from '../../../models/punto-venta';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  submitted: boolean;
  formUser: FormGroup;
  subscription:Subscription;
  puntosVenta: Array<PuntoVenta>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title) {
    this.title.setTitle('Nuevo administrador');
    this.user = new User();
    this.formUser = new FormGroup({
      punto_venta_id: new FormControl(this.user.punto_venta_id, [
        Validators.required,
        Validators.maxLength(50)
      ]),
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
    this.submitted = false;
    this.subscription = new Subscription;
    this.puntosVenta = [];
  }

  ngOnInit(): void {
    this.getPuntosventa();
  }
  
  getPuntosventa() {
    this.subscription.add(
      this.authService.puntosVenta()
        .subscribe(async data => {
          this.puntosVenta = data;
        })
    );
  }

  onSubmit() {
    try {
      if (this.formUser.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.subscription.add(
        this.authService.register(this.formUser.value)
          .pipe(
            finalize(() => {
              this.submitted = false;
              this.user = new User();
              this.router.navigate(['/login']);
            })
          )
          .subscribe(async data => {
            this.user = data;
          })
      );
    } catch (error) {
      console.log(error);
    }
  }

}
