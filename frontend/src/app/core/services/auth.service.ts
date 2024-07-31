import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { APIConfig } from 'src/configs/Api';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _jwt: JwtHelperService = new JwtHelperService();

    constructor(private _http: HttpClient, private _router: Router) { }

    public authenticate(apelido: string, senha: string): Observable<{ token: string }> {
        return this._http.post<{ token: string }>(`${APIConfig.BASE_URL}/login`, { apelido, senha });
    }

    public isAuthenticated(): boolean {
        const token: string = localStorage.getItem('token') as string;
        return !this._jwt.isTokenExpired(token);
    }

    public saveToken(token: string): void {
        localStorage.setItem("token", token);
    }

    public deleteToken(): void {
        localStorage.removeItem('token');
    }

    public redirect(): void {
        if (this.isAuthenticated()) {
            this._router.navigate(['home']);
        } else {
            this.deleteToken();
            this._router.navigate(['']);
        }
    }

    public logout() {
        if (this.isAuthenticated()) {
            this.deleteToken();
            this._router.navigate(['']);
        }
    }

    get payload(): any {
        if (!this.isAuthenticated()) {
            return null;
        }

        const token: string = localStorage.getItem("token") as string;
        const decoded = this._jwt.decodeToken(token);
        return decoded;
    }

}
