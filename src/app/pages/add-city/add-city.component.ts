import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitchThemeService} from "../../services/switch-theme.service";
import {HttpClient} from "@angular/common/http";
import {WeatherService} from "../../services/weather.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf, NgSwitch, CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'add-city',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgSwitch,
    NgClass,
    CommonModule,
  ],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent implements OnInit, OnDestroy {
  city: string = 'Rome';
  subscriber: any;
  showNote: boolean = false;
  capitals: string[] = ['tunis'];
  cardCity: any;
  state: string = "Mist";
  temperature: number = 0;
  followedCM: boolean = false;

  now: Date = new Date();
  today: string = `${this.now.getDate()}.${this.now.getMonth() + 1}.${this.now.getFullYear()}`;

  constructor(public http: HttpClient, public weather: WeatherService, public router: Router) { }

  ngOnInit() {
    this.weather.getWeather(this.city).subscribe((payload) => {
      this.state = payload.weather[0].main;
      this.temperature = Math.ceil(Number(payload.main.temp));
    })
  }

  selectedCity(city: string) {
    console.log(city);
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city) {
      this.showNote = true;
    }
  }

  addCityOfTheMonth() {
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy() {
    //this.subscriber.unsubscribe();
  }
}
