import {CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";


export const authGuard: CanActivateFn = (route, state) => {
  let isAuth: boolean = inject(AuthService).isAuth();
  let redirection: Promise<boolean> = inject(Router).navigateByUrl('/');

  return isAuth ? true : redirection;
};
