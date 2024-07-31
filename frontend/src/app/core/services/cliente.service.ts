import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIConfig } from 'src/configs/Api';

import { Usuario } from '../models/usuario';

const httpOptions = {
    headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    })
};

@Injectable({
    providedIn: 'root',
})
export class ClienteService {

    constructor(private _http: HttpClient) { }

    public create(usuario: Usuario): Observable<Usuario> {
        return this._http.post<Usuario>(`${APIConfig.BASE_URL}/usuarios`, { apelido: usuario.apelido, senha: usuario.senha });
    }

    public findById(id: number): Observable<Usuario> {
        return this._http.get<Usuario>(`${APIConfig.BASE_URL}/usuarios/${id}`, httpOptions);
    }

}
