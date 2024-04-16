import {Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {WeatherService} from "../../services/weather.service";
import {AuthService} from "../../services/auth.service";
import {SwitchThemeService} from "../../services/switch-theme.service";
import {SignInComponent} from "../../pages/signin/signin.component";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'weather-card',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgClass, RouterLink, NgSwitchCase, NgForOf
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  //@Input() addMode: any;
  //@Output() cityStored: EventEmitter<any> = new EventEmitter();
  darkModeActive: boolean = false;
  subscriber: any;

  @Input() cityName: string = '';
  city: {cityName: string, weather: {state: string, temperature: number, maxTemperature: number,
      minTemperature: number}} | undefined;
  state: string = '';
  temperature: number = 0;
  maxTemperature: number = 60;
  minTemperature: number = -60;

  constructor(public router: Router,
              public weather: WeatherService,
              public auth: AuthService,
              public switchTheme: SwitchThemeService) {
  }

  ngOnInit() {
    this.subscriber = this.switchTheme.darkModeState.subscribe((isDark) => {
      this.darkModeActive = isDark;
    })

    this.city = this.auth.cards.value.find(item => item.cityName === this.cityName);

    if (this.city) {
      this.state = this.city.weather.state;
      this.temperature = this.city.weather.temperature;
      this.maxTemperature = this.city.weather.maxTemperature;
      this.minTemperature = this.city.weather.minTemperature;
    }

    console.log(this.city)
    // let checkCity = this.citiesCards.find(item => item.name === this.cityName);
    // console.log(this.citiesCards.find(item => item.name === this.cityName))

    // if (checkCity === undefined) {

      // this.cities.pipe(
      //   // tap(cities => {
      //   //   this.cityName = cities[0];
      //   // }),
      //   switchMap(() => {
      //     if (this.cityName) return this.weather.getWeather(this.cityName)
      //     throw new Error('No city')
      //   })
      // ).subscribe((payload) => {
      //   this.state = payload.weather[0].main;
      //   this.temperature = Math.ceil(payload.main.temp);
      //   this.maxTemperature = Math.ceil(payload.main.temp_max);
      //   this.minTemperature = Math.ceil(payload.main.temp_min);
      // });
      //
      // this.citiesCards.push({
      //   name: this.cityName, state: this.state, temp: this.temperature,
      //   maxTemp: this.maxTemperature, minTemp: this.minTemperature
      // });
      // console.log(this.citiesCards)
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  openDetails() {
    this.auth.cityNeededToShowDetails.next(this.cityName);
    this.router.navigateByUrl('/details/' + this.cityName);
  }
}
