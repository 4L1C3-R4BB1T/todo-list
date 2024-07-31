import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Lista } from '../../models/lista';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';

@Component({
    selector: 'modal-task',
    templateUrl: './modal-task.component.html',
    styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnChanges {

    @Input() public listSelected: Lista | undefined;

    @Input() public modeEditTask: boolean = true;

    @Input() public taskSelected: Tarefa | undefined;

    @Output() public closeModalEvent: EventEmitter<any> = new EventEmitter();

    @Output() public updateAreaTasks: EventEmitter<any> = new EventEmitter();

    public formGroup: FormGroup = this._formBuilder.group({
        titulo: [''],
        descricao: [''],
        dataPrevisao: ['']
    });

    constructor(
        private _toastr: ToastrService,
        private _formBuilder: FormBuilder,
        private _taskService: TarefaService
    ) { }

    public ngOnChanges(): void {
        if (this.taskSelected && this.listSelected) {
            this.setTask(this.taskSelected);
        }
    }

    public close(): void {
        this.updateAreaTasks.emit();
        this.closeModalEvent.emit();
    }

    // Editar a tarefa
    public edit(): void {
        const task = this.getTask();

        console.log(this.listSelected);

        if (this.canSave(task)) {
            this._taskService.update(task)
                .subscribe({
                    next: value => {
                        this._toastr.success("Tarefa editada", "Operação");
                        this.close();
                    },
                    error: error => {
                        this._toastr.error("Não foi possível editar", "Operação");
                    }
                });
        }
    }

    public save(): void {
        const task = this.getTask();

        if (this.canSave(task)) {
            this._taskService.create(task)
                .subscribe({
                    next: value => {
                        this._toastr.success("Tarefa adicionada", "Operação");
                        this.close();
                    },
                    error: error => {
                        this._toastr.error("Não foi possível adicionar a tarefa", "Operação");
                    }
                });

        }
    }

    private canSave(task: Tarefa): boolean {
        let can: boolean = true;

        if (task.titulo === "") {
            this._toastr.warning("Preencha o título", "Tarefa");
            can = false;
        }

        if (task.dataPrevisao === "") {
            this._toastr.warning("Preencha a data de previsão", "Tarefa");
            can = false;
        }
       
        return can;
    }

    // Usado para setar a tarefa que sera editada
    public setTask(task: Tarefa): void {
        this.formGroup.get("titulo")?.setValue(task.titulo);
        this.formGroup.get("descricao")?.setValue(task.descricao);
        this.formGroup.get("dataPrevisao")?.setValue(task.dataPrevisao);
    }

    public getTask(): Tarefa {
        const titulo: string = this.formGroup.get("titulo")?.value.trim();
        const descricao: string = this.formGroup.get("descricao")?.value.trim();
        const dataPrevisao: string = this.formGroup.get("dataPrevisao")?.value.trim();

        if (!this.listSelected) {
            throw new Error("Lista selecionada não existe");
        }
        const listaId = this.listSelected.codigo as number;

        if (this.taskSelected) { // Verificar se a tarefa esta sendo editada
            const id = this.taskSelected.codigo as number;
            return { codigo: id, titulo, descricao, dataPrevisao, listaId };
        }

        return { titulo, descricao, dataPrevisao, listaId };
    }

}
