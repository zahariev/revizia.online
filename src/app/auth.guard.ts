import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { AuthService } from "app/shared/services/auth.service";
// import { Observable } from "rxjs";
// import { tap, map, take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.userID) {
      return true;
    } else {
      this.router.navigate(["login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
}
