import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../../models/usuario';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
    
    constructor(
        private _toastr: ToastrService,
        private _clienteService: ClienteService,
        private _router: Router
    ) { }

    public register(usuario: Usuario & { confirmacao: string }): void {
        if (this.readyToRegister(usuario)) {
            this._clienteService.create(usuario)
                .subscribe({
                    next: value => {
                        this._toastr.success("Usuário cadastrado", "Cadastro");
                        this._router.navigate(['']);
                    },
                    error: error => {
                        this._toastr.error(error.error.message, "Cadastro");
                    }
                });
        }
    }

    private readyToRegister(usuario: Usuario & { confirmacao: string }): boolean {
        let ready = true;
        if (usuario.apelido.trim() == '') {
            this._toastr.warning('Insira o apelido.', "Cadastro");
            ready = false;
        }

        if (usuario.senha.trim() == '') {
            this._toastr.warning('Insira a senha.', "Cadastro");
            ready = false;
        }

        if (usuario.confirmacao.trim() == '') {
            this._toastr.warning('Insira a senha de confirmação.', "Cadastro");
            ready = false;
        } else if (usuario.senha != usuario.confirmacao) {
            this._toastr.warning('As senhas não batem.', "Cadastro");
            ready = false;
        }

        return ready;
    }

}
