import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { map, take, tap } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import {AuthService} from 'app/shared/services/auth.service';
// import { Observable } from "rxjs";
// import { tap, map, take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  private afs;

  constructor(
    private auth: AuthService,
    afs: AngularFirestore,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.isAuthorised();
  }
}
