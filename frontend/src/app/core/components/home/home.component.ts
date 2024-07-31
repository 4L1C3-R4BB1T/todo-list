import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Lista } from '../../models/lista';
import { Tarefa } from '../../models/tarefa';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    // Informações do usuário
    public lists: Lista[] = [];

    public tasks: Tarefa[] = [];

    public userId!: number;

    // Modais
    public openModalList: boolean = false;

    public openModalTask: boolean = false;

    // Lista seleciona para ir para o header
    public listSelected: Lista | undefined;

    // Tarefa seleciona para ir para a area de exibição
    public taskSelected: Tarefa | undefined;

    // Avisa o model list que e pra editar
    public modeEditList: boolean = false;

    public modeEditTask: boolean = false;

    constructor(
        private _usuarioService: ClienteService,
        private _auth: AuthService,
        private _toastr: ToastrService,
    ) {
        this._toastr.success("Conectado", "Home");
        this.userId = this._auth.payload.id; // Pegando o ID do Usuário logado
        this.listsUpdate(); // Pegando informações das listas que ele tem
    }

    // Atualiza as listas do cliente
    public listsUpdate(): void {
        this._usuarioService.findById(this.userId)
            .subscribe({
                next: value => {
                    this.lists = value.listas as [];
                    console.log(this.lists)
                },
                error: error => {
                    console.log(error)
                    // this._toastr.error(error.error.message, "Error");
                }
            })
    }

    // Abrir modais
    public openModalAddList(): void {
        this.openModalList = true;
    }

    public openModalAddTask(): void {
        if (this.listSelected) {
            this.modeEditTask = false;
            this.taskSelected = undefined;
            this.openModalTask = true;
        }
    }

    // Fechar modais
    public closeModalAddOrEditList(): void {
        this.openModalList = false;
        this.modeEditList = false;
        this.listsUpdate();
    }

    public closeModalAddOrEditTask(): void {
        this.openModalTask = false;
        this.modeEditList = false;
        this.modeEditTask = false;
        this.taskSelected = undefined;
        this.updateOnAreaTasks();
        console.log("Entroua quii")
    }

    // Deslogar
    public logout(): void {
        this._auth.logout();
    }

    // Lista selecionada
    public getListSelected(list: Lista): void {
        this.listSelected = list;
        this.tasks = this.listSelected.tarefas as [];
        this.listSelected.usuarioId = this.userId; // Associando o usuário a lista selecionada
    }

    // Deseleciona Lista
    public markOffList(): void {
        this.listSelected = undefined;
        this.tasks = [];
    }

    // Editar lista
    public editList(): void {
        this.modeEditList = true;
        this.openModalList = true;
    }

    // Editar tarefa
    public editTask(task: Tarefa): void {
        this.taskSelected = task;
        this.openModalTask = true;
        this.modeEditTask = true;
    }

    // Atualizar na deletação da lista
    public updateOnDelete(): void {
        this.listsUpdate();
        this.markOffList();
    }

    // Atualiazar a lista e a tarefa quando adicionar uma tarefa ou editar.
    public updateOnAreaTasks(): void {
        if (!this.listSelected) {
            console.log("Entrou aquiii! 132");
            return;
        }

        // Pega a lista de tarefas pra obter as tarefas atualizadas
        this._usuarioService.findById(this.userId)
            .subscribe({
                next: user => {

                    this.lists = [...user.listas as Array<Lista>];

                    console.log(this.lists);

                    const listId: number = this.listSelected?.codigo as number;

                    this.listSelected = this.lists.find(list => list.codigo === listId);
                    this.tasks = this.listSelected?.tarefas as Tarefa[];

                },
                error: error => {
                    console.log(error);
                }
            })
    }

    // Calculo de quantidade tarefas
    public totalInforTasks(...args: any[]): number {
        return args.filter(x => x != null && typeof x === "number")
            .reduce((x, y) => x + y);
    }

    // Calculo
    public sub(x: any, y: any) {
        if (typeof x === "number" && typeof y === "number") {
            return x - y;
        }
        return 0;
    }

}
