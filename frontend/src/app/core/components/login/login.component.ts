import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private _auth: AuthService, private _toastr: ToastrService) { }

    public toEnter(usuario: Usuario): void {
        if (this.readyToLogIn(usuario)) {
            this._auth.authenticate(usuario.apelido, usuario.senha)
                .subscribe({
                    next: value => {
                        this._auth.saveToken(value.token);
                        this._auth.redirect();
                    },
                    error: error => {
                        if (error.error) {
                            this._toastr.error(error.error.message, "Login");
                        } else {
                            console.log(error)
                        }
                    }
                });
        }
    }

    private readyToLogIn(usuario: Usuario): boolean {
        let ready = true;

        if (usuario.apelido.trim() == "") {
            this._toastr.warning("Preencha o campo usuário", "Login");
            ready = false;
        }

        if (usuario.senha.trim() == "") {
            this._toastr.warning("Preencha o campo de senha", "Login");
            ready = false;
        }

        return ready;
    }

}
