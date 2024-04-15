import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const appGuard: CanActivateFn = (route, state) => {
  const isAuth: boolean = inject(AuthService).isAuth();
  const redirection: Promise<boolean> = inject(Router).navigateByUrl('/signin');

  return isAuth;
};
