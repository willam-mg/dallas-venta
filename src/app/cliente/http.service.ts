import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { of, throwError, Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ResponseData } from '../shared/models/response-data';
import { Pagination } from '../shared/models/pagination';
import { ResponseMessage } from '../shared/models/response-message';
import { Estudiante } from '../models/estudiante';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  clientes: Array<Cliente>;

  constructor(private http: HttpClient) {
    this.clientes = [];
  }

  /**
   * get | search clientes
   * @param filterSearch Cliente
   * @returns Observable<Cliente[]>
   */
  public search(filterSearch: string, pagination: Pagination): Observable<ResponseData> {
    let params = new HttpParams();
    params = params.append('page', pagination.page.toString());
    params = params.append('per-page', pagination.pageSize.toString());
    params = params.append('filter', filterSearch);

    return this.http.get<ResponseData>(`${path}/cliente`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }

  /**
   * create a cliente
   * @param body Observable<Cliente>
   * @returns Cliente
   */
  public create(body: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${path}/cliente/create`, body, httpHeaders);
  }

  /**
   * update a cliente
   * @param id number
   * @param body Cliente
   * @returns Observable<Cliente>
   */
  public update(id: number, body: Cliente): Observable<Cliente> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.put<Cliente>(`${path}/cliente/update`, body, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }

  /**
   * get a cliente
   * @param id number
   * @returns Observable<Cliente>
   */
  public show(id: number): Observable<Cliente> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get<Cliente>(`${path}/cliente/show`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }
  
  /**
   * get a estudiante
   * @param id number
   * @returns Observable<Cliente>
   */
  public showEstudiante(id: number): Observable<Estudiante> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get<Estudiante>(`${path}/cliente/show-estudiante`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }

  /**
   * 
   * @param id number
   * @returns Observable<String>
   */
  public delete(id: number): Observable<ResponseMessage> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.delete<ResponseMessage>(`${path}/cliente/delete`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }
  
  /**
   * 
   * @returns Observable<String>
   */
  public estudiantes(filterSearch: string, pagination: Pagination): Observable<ResponseData> {
    let params = new HttpParams();
    params = params.append('page', pagination.page.toString());
    params = params.append('per-page', pagination.pageSize.toString());
    params = params.append('filter', filterSearch);

    return this.http.get<ResponseData>(`${path}/cliente/estudiantes`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }
}
