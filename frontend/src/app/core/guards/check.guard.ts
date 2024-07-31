import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const checkGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);

    if (!auth.isAuthenticated()) {
        auth.deleteToken();
        return true;
    }

    auth.redirect();

    return false;
};
