import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  user = this.auth.currentUser;

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("You signed up successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(this.auth.currentUser);
        alert("You signed in successfully");
      })
      .catch((error) => {
        alert(error.message);
      })
  };

  isAuth() {
    console.log(this.auth.currentUser);
    return this.auth.currentUser !== null;
  };

  signOut() {
    this.auth.signOut()
      .then(() => {
        alert("You signed out successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  cities: Object[] = [
    {
      cityName: 'tunis',
      country: 'TN'
    }
  ];

  cards: string[] = [];

  addCity(cityName: string) {
    this.cards.push(cityName);
    console.log(this.cities);
  }

  getCities() {
    return this.cities;
  };
}
