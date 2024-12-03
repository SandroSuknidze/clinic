import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get token from auth service
        // const token = this.authService.getToken();
        const token = null;

        const authReq = token 
            ? req.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`,
                }
            })
            : req;

            return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                  if (error.status === 401) {
                    return throwError(() => new Error('Unauthorized'));
                  }
                  
                  if (error.status === 403) {
                    return throwError(() => new Error('You do not have permission to access this resource'));
                  }
          
                  if (error.status === 404) {
                    return throwError(() => new Error('The requested resource was not found'));
                  }
          
                  return throwError(() => new Error('An error occurred. Please try again later'));
                })
              );
                
            
            }
}
