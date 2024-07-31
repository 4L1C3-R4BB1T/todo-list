import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token: string = localStorage.getItem('token') as string;

        if (token) {
            const req = request.clone({ headers: request.headers.set("Authorization", `Bearer ${token}`) });
            return next.handle(req);
        }
        return next.handle(request);
    }

}
