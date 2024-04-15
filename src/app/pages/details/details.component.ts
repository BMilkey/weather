import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {SwitchThemeService} from "../../services/switch-theme.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {concatMap, forkJoin, switchMap, tap} from "rxjs";
import {KeyValuePipe, NgClass, NgForOf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
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
    NgForOf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{

  darkModeActive: boolean = false;
  cities = this.auth.cards;
  cityName = this.cities.value[0];
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
      tap(cities => {
        this.cityName = cities[0];
      }),
      switchMap(() => {
        if(this.cityName) return this.weather.getWeather(this.cityName)
        throw new Error('no city')
      })
    ).subscribe((payload) => {
      this.state = payload.weather[0].main;
      this.temperature = Math.ceil(payload.main.temp);
      this.humidity = payload.main.humidity;
      this.wind = Math.round(payload.wind.speed);
      this.cityImagePath = `./../../../assets/images/${this.cityName}.svg`;
    })

    this.cities.pipe(
      tap(cities => {
        this.cityName = cities[0];
      }),
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

    // const todayNumberInWeek = new Date().getDay();
    // const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // this.today = days[todayNumberInWeek];
    // this.subscriber2 = this.activeRouter.paramMap.pipe(concatMap((route: any) => {
    //   this.city = route.params.city;
    //   switch (this.city.toLowerCase()) {
    //     case 'tunis':
    //       this.cityImagePath = './../../../assets/images/tunis.svg';
    //       break;
    //     default:
    //       this.cityImagePath = './../../../assets/images/default.svg';
    //   }
    //   return forkJoin(this.weather.getWeather(this.city));
    // })).subscribe((payload: any) => {
    //   this.state = payload[0].weather[0].main;
    //   this.temperature = Math.ceil(Number(payload[0].main.temp));
    //   this.humidity = payload[0].main.humidity;
    //   this.wind = Math.round(payload[0].wind.speed);
    //   const dates: any = {};
    //   for (const res of payload[1]) {
    //     const date = new Date(res.dt_txt).toDateString().split(' ')[0];
    //     if (dates[date]) {
    //       dates[date].counter += 1;
    //       dates[date].temperature += res.main.temp;
    //     } else {
    //       dates[date] = {
    //         state: res.weather[0].main,
    //         temperature: res.main.temp,
    //         counter: 1
    //       };
    //     }
    //   }
    //   Object.keys(dates).forEach((day) => {
    //     dates[day].temperature = Math.round(dates[day].temperature / dates[day].counter);
    //   });
    //   delete dates[Object.keys(dates)[0]];
    //   this.daysForecast = dates;
    // }, (err: any) => {
    //   this.errorMessage = err.error.message;
    //   setTimeout(() => {
    //     this.errorMessage = '';
    //   }, 2500);
    // });
  //}

  ngOnDestroy() {
    // this.subscriber1.unsubscribe();
    // this.subscriber2.unsubscribe();
  }

  protected readonly alert = alert;
  protected readonly console = console;
}
