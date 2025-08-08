import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has("skip-auth")) {
      req = req.clone({
        headers: req.headers.delete("skip-auth")
      })
      return next.handle(req);
    }

    let token = "Asdasds";
    req = req.clone({
      setHeaders: {
        "Authorization": "Bearer " + token
      }
    });

    return next.handle(req);
  }
}
