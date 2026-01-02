import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseData } from '../models/response-data';
import { Pagination } from '../models/pagination';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root',
})
export class CashCollectionService {

  constructor(private http: HttpClient) {}

  public listRequestCollection(puntoVentaId: number, pagination: Pagination): Observable<ResponseData> {
    let params = new HttpParams();
    params = params.append('page', pagination.page.toString());
    params = params.append('per-page', pagination.pageSize.toString());
    params = params.append('puntoVentaId', puntoVentaId);

    return this.http.get<ResponseData>(`${path}/cash-collection/pendding`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }

  public confirmCollection(
    cashCollectionId: number, 
    amount: number, 
    notes: string) {
    console.log('sending');
    const payload = {
      cash_collection_id: cashCollectionId,
      amount: amount,
      notes: notes,
    }
    return this.http.post<ResponseData>(`${path}/cash-collection/confirm-create`, payload, httpHeaders);
  }
}
