import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitchThemeService} from "../../services/switch-theme.service";
import {HttpClient} from "@angular/common/http";
import {WeatherService} from "../../services/weather.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf, NgSwitch, CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'add-city',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgSwitch,
    NgClass,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent implements OnInit {
  city: string = 'Paris';
  subscriber: any;
  showNote: boolean = false;
  availableCities: string[] = [];
  cardCity: any;
  state: string = "";
  temperature: number = 0;
  followedCM: boolean = false;

  now: Date = new Date();
  today: string = `${this.now.getDate()}.${this.now.getMonth() + 1}.${this.now.getFullYear()}`;

  constructor(public http: HttpClient, public weather: WeatherService, public router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.weather.getWeather(this.city).subscribe((payload) => {
      this.state = payload.weather[0].main;
      this.temperature = Math.ceil(Number(payload.main.temp));
    })

    this.auth.cities.forEach((item) => {
      this.availableCities.push(item.cityName);
    })
  }

  selectedCity(city: string) {
    if (this.availableCities.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city) {
      this.showNote = true;
    }
  }

  addCity(cityName: string) {

    if (!(this.auth.cards.value.find(item => item.cityName === cityName))) {
      this.auth.addCity(cityName);
      this.router.navigateByUrl('/home');
    }
    this.router.navigateByUrl('/home');

  }

}
