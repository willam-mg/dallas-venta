import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { Venta } from '../../../models/venta';
import { HttpService } from '../../http.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  standalone: false,
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {
  subscription: Subscription;
  idVenta: number;
  venta: Venta;
  user: User;
  sucursalName: string;
  constructor(
    private route: ActivatedRoute,
    private httpsService: HttpService,
    private authService: AuthService,
    private title: Title,
    private router: Router) {
    this.subscription = new Subscription();
    this.venta = new Venta();
    this.idVenta = 0;
    this.sucursalName = this.authService.getSucursalName()!;
    this.user = this.authService.getUserIdentity() ? this.authService.getUserIdentity()! : new User();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.idVenta = Number(params['id']);
        alert(this.idVenta);
        this.title.setTitle('Venta ' + this.idVenta);
        this.loadVenta();
      })
    );
  }

  loadVenta() {
    this.subscription.add(
      this.httpsService.show(this.idVenta).subscribe(data => {
        this.venta = data;
      })
    );
  }

  totalDetalleVenta() {
    let suma = 0;
    this.venta.detalleVenta.map((item) => {
      let subtotal = item.precio * item.cantidad;
      suma += subtotal;
    });
    return suma;
  }

  printRecibo() {
    this.httpsService.printInWindow('recibo');
  }

}
