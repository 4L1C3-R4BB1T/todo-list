import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Lista } from '../../models/lista';
import { ListaService } from '../../services/lista.service';

@Component({
    selector: 'modal-list',
    templateUrl: './modal-list.component.html',
    styleUrls: ['./modal-list.component.scss'],
})
export class ModalListComponent implements OnChanges {

    @Input() public listSelected: Lista | undefined;

    @Input() public editMode: boolean = false;

    @Input() public userId: number | null = null;

    @Output() public closeModalEvent: EventEmitter<any> = new EventEmitter();

    public formGroup: FormGroup = this._formBuilder.group({
        titulo: [''],
    });

    constructor(
        private _formBuilder: FormBuilder,
        private _toastr: ToastrService,
        private _listaService: ListaService
    ) { }

    public ngOnChanges(): void {
        if (this.editMode && this.listSelected) { // Modo editar ativado
            this.formGroup.get("titulo")?.setValue(this.listSelected.titulo);
        }
    }

    public registerList(): void {
        if (this.readyToRegisterList()) {
            const titulo: string = this.formGroup.value.titulo;

            this._listaService.create({ titulo, usuarioId: this.userId as number })
                .subscribe({
                    next: value => {
                        this.close();
                    },
                    error: error => {
                        console.log(error);
                    }
                })
        }
    }

    private readyToRegisterList(): boolean {
        if (this.formGroup.value.titulo.trim() == "") {
            this._toastr.warning("Preencha o título", "Criar Lista");
            return false;
        }
        return true;
    }

    public close(): void {
        this.closeModalEvent.emit();
    }

    public editList(): void {
        if (!this.listSelected || !this.readyToRegisterList()) {
            return;
        }
        console.log(this.userId)

        if (this.userId) {
            this.listSelected.usuarioId = this.userId;
        }

        this.listSelected.titulo = this.formGroup.get("titulo")?.value;

        this._listaService.update(this.listSelected)
            .subscribe({
                next: value => {
                    this._toastr.success("Título atualizado", "Lista");
                    this.close();
                },
                error: error => {
                    this._toastr.error("Não foi possível atualizar o título", "Lista");
                    console.log(error);
                    this.close();
                }
            })
    }

}
