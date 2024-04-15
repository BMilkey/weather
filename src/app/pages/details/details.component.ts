import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {SwitchThemeService} from "../../services/switch-theme.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {concatMap, forkJoin} from "rxjs";
import {KeyValuePipe, NgClass, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgSwitch,
    KeyValuePipe,
    NgSwitchCase,
    RouterLink,
    NgClass
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{

  darkModeActive: boolean = false;
  city: string = 'tunis';
  state: string = '';
  temperature: number = 0;
  wind: number = 0;
  today: string = '';
  humidity: number = 0;
  subscriber1: any;
  subscriber2: any;
  errorMessage: string = '';
  cityImagePath: string = '';
  daysForecast: Object = {};

  constructor(public weather: WeatherService, public switchTheme: SwitchThemeService, public activeRouter: ActivatedRoute) {}

  ngOnInit() {
    this.subscriber1 = this.switchTheme.darkModeState.subscribe((isDark) => {
      this.darkModeActive = isDark;
    });

    const todayNumberInWeek = new Date().getDay();
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    this.subscriber2 = this.activeRouter.paramMap.pipe(concatMap((route: any) => {
      this.city = route.params.city;
      switch (this.city.toLowerCase()) {
        case 'tunis':
          this.cityImagePath = './../../../assets/images/tunis.svg';
          break;
        default:
          this.cityImagePath = './../../../assets/images/default.svg';
      }
      return forkJoin(this.weather.getWeather(this.city));
    })).subscribe((payload: any) => {
      this.state = payload[0].weather[0].main;
      this.temperature = Math.ceil(Number(payload[0].main.temp));
      this.humidity = payload[0].main.humidity;
      this.wind = Math.round(payload[0].wind.speed);
      const dates: any = {};
      for (const res of payload[1]) {
        const date = new Date(res.dt_txt).toDateString().split(' ')[0];
        if (dates[date]) {
          dates[date].counter += 1;
          dates[date].temperature += res.main.temp;
        } else {
          dates[date] = {
            state: res.weather[0].main,
            temperature: res.main.temp,
            counter: 1
          };
        }
      }
      Object.keys(dates).forEach((day) => {
        dates[day].temperature = Math.round(dates[day].temperature / dates[day].counter);
      });
      delete dates[Object.keys(dates)[0]];
      this.daysForecast = dates;
    }, (err: any) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2500);
    });
  }

  ngOnDestroy() {
    this.subscriber1.unsubscribe();
    this.subscriber2.unsubscribe();
  }
}
