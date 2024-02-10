import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { AuthenticationInterface } from '../shared/models/authentication.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly auth: AngularFireAuth) {}

  signIn(params: AuthenticationInterface): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    );
  }

  signUp(params: AuthenticationInterface): Observable<any> {
    return from(
      this.auth.createUserWithEmailAndPassword(params.email, params.password)
    );
  }

  getCurrentUser(){
    return from(this.auth.currentUser)
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut());
  }
}
