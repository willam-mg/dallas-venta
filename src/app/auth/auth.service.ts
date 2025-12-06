import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { of, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { PuntoVenta } from '../models/punto-venta';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarios: any;

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): Observable<Boolean> {
    let res = localStorage.getItem(environment.store.userToken)?true:false;
    return of(res);
  }

  public getUserIdentity():User | null {
    return JSON.parse(localStorage.getItem(environment.store.userData)!);
  }

  public getSucursalName():string | null {
    return localStorage.getItem(environment.store.sucursal);
  }

  public register(body: User): Observable<User> {
    return this.http.post<User>(path + '/auth/register', body, httpHeaders);
  }
  
  public login(body: User): Observable<User> {
    return this.http.post<User>(path + '/auth/login', body, httpHeaders);
  }

  public logout() {
    localStorage.removeItem(environment.store.userId);
    localStorage.removeItem(environment.store.userToken);
    localStorage.removeItem(environment.store.userData);
    localStorage.removeItem(environment.store.puntoVentaId);
    localStorage.removeItem(environment.store.sucursal);
    localStorage.removeItem(environment.store.puntoVentaNombre);
  }

  public getToken(): string | null {
    return localStorage.getItem(environment.store.userToken);
  }

  public puntosVenta():Observable<PuntoVenta[]> {
    return this.http.get<PuntoVenta[]>(`${path}/punto-venta`);
  }

  public changePassword(newPassword: string) {
    return this.http.post(`${path}/auth/change-password`, {
      'newPassword': newPassword
    }, httpHeaders);
  }
}
