import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {BehaviorSubject, switchMap} from "rxjs";
import {WeatherService} from "./weather.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, public weather: WeatherService) { }

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

  cities: {cityName: string}[] = [
    { cityName: 'tunis'}, { cityName: 'paris'}, { cityName: 'qatar'}, { cityName: 'rabat'}
  ];

  cards = new BehaviorSubject<{cityName: string, weather: {state: string,
      temperature: number, maxTemperature: number, minTemperature: number}}[]>([]);

  cityNeededToAdd = new BehaviorSubject<string>('');
  cityNeededToShowDetails = new BehaviorSubject<string>('');

  addCity(city: string) {

    let weatherStorage = this.weather.getWeather(city).subscribe((weather) => {

      this.cards.next([...this.cards.value, {cityName: city, weather: {state: weather.weather[0].main,
          temperature: Math.ceil(weather.main.temp), maxTemperature: Math.ceil(weather.main.temp_max),
          minTemperature: Math.ceil(weather.main.temp_min)}}]);

      this.cityNeededToAdd.next(city);

    });
    console.log(this.cards)
  }

  getCities() {
    return this.cities;
  };
}
