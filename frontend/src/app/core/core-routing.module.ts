import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { checkGuard } from './guards/check.guard';

const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [checkGuard] },
    { path: 'registrar', component: CadastroComponent, canActivate: [checkGuard] },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
