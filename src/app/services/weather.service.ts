import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {first, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly weatherURL: string = "http://api.openweathermap.org/data/2.5/weather?q=";
  private readonly forecastURL: string = "http://api.openweathermap.org/data/2.5/forecast?q=";
  private readonly appID: string = 'b27588a12abe3085044416cad4ae2e78';

  constructor(public http: HttpClient) { }

  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.weatherURL}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()));
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forecastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map((weather) => 0));//weather['list']));
  }
}
