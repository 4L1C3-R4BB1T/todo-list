import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Status } from '../../enums/status';
import { Lista } from '../../models/lista';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {

    @Input() public listSelected: Lista | undefined;

    @Output() public updateAreaTasks: EventEmitter<any> = new EventEmitter();

    @Output() public editTaskEvent: EventEmitter<Tarefa> = new EventEmitter();

    @Input() public data: Tarefa[] = [];

    constructor(private _taskService: TarefaService, private _toastr: ToastrService) {

    }

    public editTask(task: Tarefa): void {
        this.editTaskEvent.emit(task);
    }

    public deleteTask(task: Tarefa): void {
        this._taskService.delete(task)
            .subscribe({
                next: value => {
                    this._toastr.success("Tarefa deletada", "Operação");
                    this.updateAreaTasks.emit();
                },
                error: error => {
                    this._toastr.error("Nao foi possivel deletar a tarefa", "Operação");
                }
            })
    }

    // Alterar o status para feito ou nao de uma tarefa
    public changeTaskStatus(task: Tarefa, done: boolean): void {
        if (!this.listSelected) {
            return; // Se nao tiver lista selecionada nao faz nada
        }
        task.feito = done;
        task.listaId = this.listSelected.codigo as number;

        this._taskService.update(task)
            .subscribe({
                next: value => {

                    let status: string = Status.DONE;

                    if (!value.feito) {
                        status = Status.NOT_DONE;
                    }

                    this._toastr.warning(`Novo status: ${status}`, "Tarefa");
                    this.updateAreaTasks.emit();
                },
                error: error => {
                    this._toastr.error(`Nao foi possivel mudar o status da tarefa`, "Tarefa");
                }
            })
    }

}
