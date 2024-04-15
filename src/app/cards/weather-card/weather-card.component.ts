import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {WeatherService} from "../../services/weather.service";
import {AuthService} from "../../services/auth.service";
import {SwitchThemeService} from "../../services/switch-theme.service";
import {first, from, switchMap, tap} from "rxjs";
import {SignInComponent} from "../../pages/signin/signin.component";
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'weather-card',
  standalone: true,
  imports: [
    SignInComponent,
    NgIf,
    NgSwitch,
    NgClass, RouterLink, NgSwitchCase
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  @Input() addMode: any;
  @Output() cityStored: EventEmitter<any> = new EventEmitter();
  cityWeather: Object = {};
  darkModeActive: boolean = false;
  subscriber: any;
  state: string = "";
  temperature: number = 0;
  maxTemperature: number = 60;
  minTemperature: number = -60;
  errorMessage: string = '';
  cities = this.auth.cards;
  cityName: string = this.cities.value[0];

  cityAdded: boolean = false;

  constructor(public router: Router,
              public weather: WeatherService,
              public auth: AuthService,
              public switchTheme: SwitchThemeService) {
  }

  ngOnInit() {
    this.subscriber = this.switchTheme.darkModeState.subscribe((isDark) => {
      this.darkModeActive = isDark;
    })
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
      this.maxTemperature = Math.ceil(payload.main.temp_max);
      this.minTemperature = Math.ceil(payload.main.temp_min);
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }
}
