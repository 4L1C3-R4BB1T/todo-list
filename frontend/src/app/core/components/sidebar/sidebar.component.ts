import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Lista } from '../../models/lista';
import { ListaService } from '../../services/lista.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {

    @Input() public listSelected: Lista | undefined;

    @Input() public data: Lista[] = [];

    @Output() public addListEvent: EventEmitter<any> = new EventEmitter();

    @Output() public logoutEvent: EventEmitter<any> = new EventEmitter();

    @Output() public listSelectEvent: EventEmitter<Lista> = new EventEmitter();

    @Output() public updateListsEvent: EventEmitter<any> = new EventEmitter();

    constructor(private _toastr: ToastrService, private _listService: ListaService) { }

    private clickedToRemove: number = 1;

    public copy: Lista[] = [];

    public ngOnChanges(): void {
        this.copy = this.data;
    }

    public add(): void {
        this.addListEvent.emit();
    }

    public logout(): void {
        this.logoutEvent.emit();
    }

    public searchList(search: string) {
        if (search.trim() === "") {
            this.copy = this.data;
        } else {
            this.copy = this.data.filter(list => list.titulo.trim().includes(search.trim()));
        }
    }

    public handleListSelected(list: Lista): void {
        this.listSelectEvent.emit(list);
    }

    public removeList(): void {
        if (this.canIRemoveList() && this.listSelected) {
            this._listService.delete(this.listSelected)
                .subscribe({
                    next: value => {
                        this._toastr.success("Lista deletada", "Operação");
                        this.updateListsEvent.emit();
                    },
                    error: error => {
                        console.log(error)
                        this._toastr.error("Não foi possível remover a Lista", "Operação");
                    }
                })
        }
    }

    private canIRemoveList(): boolean {
        let can: boolean = false;
        this.clickedToRemove++;

        if (this.clickedToRemove == 2) {
            can = window.confirm("Deseja deletar a lista?");
            this.clickedToRemove = 1;
        }

        return can;
    }
    
}
