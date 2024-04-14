import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("You signed up successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("You signed in successfully");
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  isAuth() {
    return this.auth.currentUser !== null;
  }

}
