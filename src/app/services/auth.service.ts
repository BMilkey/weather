import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {WeatherService} from "./weather.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public weather: WeatherService) { }

  cities: {cityName: string}[] = [
    { cityName: 'tunis'}, { cityName: 'paris'}, { cityName: 'qatar'}, { cityName: 'rabat'}, {cityName: 'chelyabinsk'},
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

  // getCities() {
  //   return this.cities;
  // };
}
