import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {

  let router = inject(Router);
  let authService = inject(AuthService);

  if (!await authService.validateLogin()) {
    localStorage.removeItem("user");
    router.navigateByUrl("/login", {replaceUrl: true})
    return false;
  }
  return true;
};
