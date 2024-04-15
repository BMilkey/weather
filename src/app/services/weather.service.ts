import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {first, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly weatherURL: string = "http://api.openweathermap.org/data/2.5/weather?q=";
  private readonly forecastURL: string = "http://api.openweathermap.org/data/2.5/forecast?q=";
  private readonly appID: string = 'f62e3731b7489ae221f3cf3628b3edef';

  constructor(public http: HttpClient) { }

  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.weatherURL}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()));
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forecastURL}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()));
  }
}
