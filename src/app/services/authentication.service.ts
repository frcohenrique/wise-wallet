import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { Login } from '../shared/models/login';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly auth: AngularFireAuth) {}

  signIn(params: Login): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut());
  }
}
