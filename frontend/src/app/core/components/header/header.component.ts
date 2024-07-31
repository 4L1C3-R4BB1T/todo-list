import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Lista } from '../../models/lista';

@Component({
    selector: 'customHeader',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {

    @Input() public listSelected: Lista | undefined;

    @Output() public editListEvent: EventEmitter<any> = new EventEmitter();

    @Output() public markOffEvent: EventEmitter<any> = new EventEmitter();

    @Output() public addTaskEvent: EventEmitter<any> = new EventEmitter();

    constructor() { }

    public ngOnChanges(): void { }

    // Enviando informações para editar
    public edit(): void {
        this.editListEvent.emit();
    }

    public markOff(): void {
        this.markOffEvent.emit();
    }

    public add(): void {
        this.addTaskEvent.emit();
    }

}
