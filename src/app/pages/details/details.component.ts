import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {SwitchThemeService} from "../../services/switch-theme.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {switchMap} from "rxjs";
import {KeyValuePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgSwitch,
    KeyValuePipe,
    NgSwitchCase,
    RouterLink,
    NgClass,
    NgOptimizedImage,
    NgForOf,
    NgIf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  darkModeActive: boolean = false;
  cities = this.auth.cards;
  cityName = this.auth.cityNeededToShowDetails.value;
  state: string = '';
  temperature: number = 0;
  wind: number = 0;
  humidity: number = 0;
  subscriber1: any;
  weatherForecast: any[] = [];
  days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  cityImagePath: string = '';
  index = new Date().getDay();

  constructor(public weather: WeatherService, public switchTheme: SwitchThemeService,
              public activeRouter: ActivatedRoute, public auth: AuthService) {}

  ngOnInit() {
    this.subscriber1 = this.switchTheme.darkModeState.subscribe((isDark) => {
      this.darkModeActive = isDark;
    });

    this.cities.pipe(
      switchMap(() => {
        if(this.cityName) return this.weather.getWeather(this.cityName)
        throw new Error('No city')
      })
    ).subscribe((payload) => {
      this.state = payload.weather[0].main;
      this.temperature = Math.ceil(payload.main.temp);
      this.humidity = payload.main.humidity;
      this.wind = Math.round(payload.wind.speed);
      this.cityImagePath = `assets/images/${this.cityName}.svg`;
    })

    this.cities.pipe(
      switchMap(() => {
        if(this.cityName) return this.weather.getForecast(this.cityName)
        throw new Error('no city')
      })
    ).subscribe((payload) => {
      for (let i = 0; i < 5; i++) {
        if (this.index === 7) {
          this.index = 0;
        }
        let dayWithForecast = {
          day: this.days[this.index],
          state: payload.list[i].weather[0].main, temperature: Math.ceil(payload.list[i].main.temp)
        };
        this.weatherForecast.push(dayWithForecast);
        this.index++;
      }
    })
  }

}
