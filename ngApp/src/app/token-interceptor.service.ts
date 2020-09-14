// we use injector to prevent a problem known
// as cyclic dependency.
import { Injectable, Injector } from '@angular/core';
// we need authService to get the token.
import { AuthService } from './auth.service';
// we need Interceptor class which alway intercepts http requests and
// generate a modified clone request.
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }
  
  // syntax: actual-request, handler<containing modified req>
  intercept(req, next) {
    const authService = this._injector.get(AuthService); // get an instance.
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
