import { Component, Input } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

    @Input() public message: string = "Não há listas criadas!"
}
