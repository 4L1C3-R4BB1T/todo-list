import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ModalListComponent } from './components/modal-list/modal-list.component';
import { ModalTaskComponent } from './components/modal-task/modal-task.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CoreRoutingModule } from './core-routing.module';
import { LimitStringPipe } from './pipes/limit-string.pipe';

@NgModule({
    declarations: [
        HomeComponent,
        SidebarComponent,
        HeaderComponent,
        TaskListComponent,
        ErrorComponent,
        ModalTaskComponent,
        ModalListComponent,
        LoginComponent,
        CadastroComponent,
        LimitStringPipe,
    ],
    imports: [CommonModule, CoreRoutingModule, FormsModule, ReactiveFormsModule],
    providers: []
})
export class CoreModule { }
