import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIConfig } from 'src/configs/Api';

import { Tarefa } from '../models/tarefa';

@Injectable({
    providedIn: 'root'
})
export class TarefaService {

    constructor(private _http: HttpClient) { }

    public create(task: Tarefa): Observable<Tarefa> {
        return this._http.post<Tarefa>(`${APIConfig.BASE_URL}/tarefas`, task);
    }

    public update(task: Tarefa): Observable<Tarefa> {
        return this._http.put<Tarefa>(`${APIConfig.BASE_URL}/tarefas/${task.codigo}`, task);
    }

    public delete(task: Tarefa): Observable<any> {
        return this._http.delete<any>(`${APIConfig.BASE_URL}/tarefas/${task.codigo}`);
    }

}
