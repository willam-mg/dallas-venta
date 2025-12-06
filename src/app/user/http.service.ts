import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { of, throwError, Observable } from 'rxjs';
import { User } from '../models/user';
import { ResponseData } from '../shared/models/response-data';
import { Pagination } from '../shared/models/pagination';
import { ResponseMessage } from '../shared/models/response-message';
import { environment } from '../../environments/environment';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  usuarios: Array<User>;

  constructor(private http: HttpClient) {
    this.usuarios = [];
  }

  /**
   * get | search users
   * @param filterSearch User
   * @returns Observable<User[]>
   */
  public search(filterSearch: string, pagination:Pagination): Observable<ResponseData> {
    let params = new HttpParams();
    params = params.append('page', pagination.page.toString());
    params = params.append('per-page', pagination.pageSize.toString());
    params = params.append('filter', filterSearch);

    return this.http.get<ResponseData>(`${path}/user`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }

  /**
   * create a user
   * @param body Observable<User>
   * @returns User
   */
  public create(body: User): Observable<User> {
    return this.http.post<User>(`${path}/user/create`, body, httpHeaders);
  }
  
  /**
   * update a user
   * @param id number
   * @param body User
   * @returns Observable<User>
   */
  public update(id: number, body: User): Observable<User> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.put<User>(`${path}/user/update`, body, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }
  
  /**
   * get a user
   * @param id number
   * @returns Observable<User>
   */
  public show(id: number): Observable<User> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get<User>(`${path}/user/show`, {
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
    return this.http.delete<ResponseMessage>(`${path}/user/delete`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    });
  }
}
