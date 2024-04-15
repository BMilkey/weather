import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {WeatherService} from "../../services/weather.service";
import {AuthService} from "../../services/auth.service";
import {SwitchThemeService} from "../../services/switch-theme.service";
import {first, from} from "rxjs";
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
export class WeatherCardComponent implements OnInit, OnDestroy{

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
  cityName: string = '';
  cityAdded: boolean = false;

  @Input() set city(city: string) {
    this.cityName = city;
    from(this.weather.getWeather(city)).pipe(first()).subscribe((payload) => {
      this.state = payload.weather[0].main;
      this.temperature = Math.ceil(payload.main.temp);
    }, (err: any) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    });
  }

  constructor(public router: Router,
              public weather: WeatherService,
              public auth: AuthService,
              public switchTheme: SwitchThemeService) { }

  ngOnInit() {
    this.subscriber = this.switchTheme.darkModeState.subscribe((isDark) => {
      this.darkModeActive = isDark;
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  addCity() {
    // this.auth.addCity(this.cityName).subscribe(() => {
    //   this.cityName = '';
    //   this.maxTemperature = 60;
    //   this.minTemperature = -60;
    //   this.state = '';
    //   this.temperature = 0;
    //   this.cityAdded = true;
    //   this.cityStored.emit();
    //   setTimeout(() => this.cityAdded = false, 2000);
    // });
  }

  openDetails(){
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }
}
