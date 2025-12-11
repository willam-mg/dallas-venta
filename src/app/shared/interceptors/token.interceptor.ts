import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private count = 0;
  constructor(
    public auth: AuthService,
    private router: Router,
    private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }

    if (this.count === 0) {
      this.loadingService.setHttpProgressStatus(true);
    }
    this.count++;

    return next.handle(request).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loadingService.setHttpProgressStatus(false);
        }
      }));
  }
}
