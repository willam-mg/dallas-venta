import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { of, throwError, Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ResponseData } from '../shared/models/response-data';
import { Pagination } from '../shared/models/pagination';
import { ResponseMessage } from '../shared/models/response-message';
import { Producto } from '../models/producto';
import { Almacen } from '../models/almacen';
import { CashRegister } from '../models/cash-register';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;
@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  productos: Array<Producto>;

  constructor(private http: HttpClient) {
    this.productos = [];
  }

  /**
  * get | search productos
  * @param filterSearch Cliente
  * @returns Observable<Cliente[]>
  */
  public openCashRegister(
    puntoVentaId: number, 
    openingAmount: number, 
    comment: string): Observable<ResponseData> {
    const payload = {
      punto_venta_id: puntoVentaId,
      opening_amount: openingAmount,
      comment: comment
    };
    return this.http.post<ResponseData>(`${path}/cash-register/open`, payload, httpHeaders);
  }
  
  public closeCashRegister(
    puntoVentaId: number, 
    closingAmount: number, 
    comment: string): Observable<ResponseData> {
    const payload = {
      punto_venta_id: puntoVentaId,
      real_closing_amount: closingAmount,
      comment: comment
    };
    return this.http.post<ResponseData>(`${path}/cash-register/close`, payload, httpHeaders);
  }
  
  public getCashRegisterOpened(puntoVentaId: number): Observable<CashRegister | null> {
    const payload = {
      punto_venta_id: puntoVentaId
    };

    return this.http.post<CashRegister | null>(`${path}/cash-register/opened`, payload, httpHeaders);
  }
  
  public getCashRegisterClosed(puntoVentaId: number): Observable<CashRegister | null> {
    const payload = {
      punto_venta_id: puntoVentaId
    };

    return this.http.post<CashRegister | null>(`${path}/cash-register/closed`, payload, httpHeaders);
  }

}
