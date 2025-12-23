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

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;
@Injectable({
  providedIn: 'root'
})
export class CashMovementService {
  productos: Array<Producto>;

  constructor(private http: HttpClient) {
    this.productos = [];
  }

  /**
  * get | search productos
  * @param filterSearch Cliente
  * @returns Observable<Cliente[]>
  */
  public search(puntoVentaId: number, pagination: Pagination): Observable<ResponseData> {
    let params = new HttpParams();
    params = params.append('page', pagination.page.toString());
    params = params.append('per-page', pagination.pageSize.toString());
    params = params.append('puntoVentaId', puntoVentaId);

    return this.http.get<ResponseData>(`${path}/cash-movement`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }

  public registerIncome(
    puntoVentaId: number, 
    amount: number, 
    paymentMethod: string, 
    referenceType: string,
    sellerId: number,
    comment: string): Observable<ResponseData> {
    const payload = {
      punto_venta_id: puntoVentaId,
      amount: amount,
      payment_method: paymentMethod,
      reference_type: referenceType,
      user_id: null,
      vendedor_id: sellerId,
      comment: comment
    };

    return this.http.post<ResponseData>(`${path}/cash-movement/income`, payload, httpHeaders);
  }
  
  public registerExpense(
    puntoVentaId: number, 
    amount: number, 
    paymentMethod: string, 
    referenceType: string,
    sellerId: number,
    comment: string): Observable<ResponseData> {
    const payload = {
      punto_venta_id: puntoVentaId,
      amount: amount,
      payment_method: paymentMethod,
      reference_type: referenceType,
      user_id: null,
      vendedor_id: sellerId,
      commnet: comment
    };

    return this.http.post<ResponseData>(`${path}/cash-movement/revenue`, payload, httpHeaders);
  }

  // /**
  //  * get a cliente
  //  * @param id number
  //  * @returns Observable<Cliente>
  //  */
  // public getByCodeBar(codeBar: string, catnidad: number): Observable<Almacen> {
  //   let params = new HttpParams();
  //   params = params.append('codebar', codeBar.toString());
  //   params = params.append('cantidad', catnidad.toString());
  //   return this.http.get<Almacen>(`${path}/producto/find-by-codebar`, {
  //     headers: new HttpHeaders(environment.apiConfig.headers),
  //     reportProgress: true,
  //     params: params
  //   });
  // }
}
