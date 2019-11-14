import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'app/shared/models/user.model.ts'; // optional

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {map, take, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin(returnUrl) {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    return this.updateUserData(credential.user, returnUrl);
  }

  private updateUserData(user, returnUrl) {
    //

    localStorage.setItem('userID', user.uid);
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    if (!user.managedDBs) {
      user.managedDBs = {};
      user.managedDBs[user['uid']] = 'admin';
    }
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      manageDBs: user.managedDBs
    };

    this.router.navigateByUrl(returnUrl);

    return userRef.set(data, {merge: true});
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    // localStorage.setItem("userID", "");
    // this.router.navigate(["login"]);
  }

  isAuthorised() {
    return this.afAuth.authState.pipe(
      take(1),
      map(authState => !!authState),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
